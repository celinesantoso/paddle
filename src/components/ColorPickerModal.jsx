import { useState, useRef, useCallback, useEffect } from 'react'

// ── Color utilities ───────────────────────────────────────────────────────────

function hsvToRgb(h, s, v) {
  const hi = Math.floor(h / 60) % 6
  const f = h / 60 - Math.floor(h / 60)
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const map = [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]]
  const [r, g, b] = map[hi]
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function hsvToHex(h, s, v) {
  return rgbToHex(...hsvToRgb(h, s, v))
}

function hexToRgb(hex) {
  const c = (hex || '').replace('#', '')
  if (c.length !== 6) return [255, 255, 255]
  return [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)]
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min
  let h = 0
  if (d) {
    if (max === r)      h = ((g - b) / d + 6) % 6
    else if (max === g) h = (b - r) / d + 2
    else                h = (r - g) / d + 4
    h *= 60
  }
  return [h, max ? d / max : 0, max]
}

function hexToHsv(hex) {
  return rgbToHsv(...hexToRgb(hex))
}

const hueToHex = (h) => rgbToHex(...hsvToRgb(h, 1, 1))

// ── Color style palette (matches Figma Color Styles tab) ─────────────────────

const COLOR_STYLES = [
  { name: 'Neutral', colors: [
    { hex: '#000000', name: 'Black' },
    { hex: '#FFFFFF', name: 'White' },
  ]},
  { name: 'Primary', colors: [
    { hex: '#2D3282', name: '900' }, { hex: '#2D31A6', name: '800' },
    { hex: '#3538CD', name: '700' }, { hex: '#444CE7', name: '600' },
    { hex: '#6172F3', name: '500' }, { hex: '#8098F9', name: '400' },
    { hex: '#A4BCFD', name: '300' }, { hex: '#C7D7FE', name: '200' },
    { hex: '#E0EAFF', name: '100' }, { hex: '#EEF4FF', name: '50' },
  ]},
  { name: 'Secondary', colors: [
    { hex: '#39590E', name: '900' }, { hex: '#43690B', name: '800' },
    { hex: '#538605', name: '700' }, { hex: '#6DB100', name: '600' },
    { hex: '#8FDD05', name: '500' }, { hex: '#AEF625', name: '400' },
    { hex: '#D0FF71', name: '300' }, { hex: '#E0FF95', name: '200' },
    { hex: '#F0FFC7', name: '100' }, { hex: '#F9FFE5', name: '50' },
  ]},
  { name: 'Accents', colors: [
    { hex: '#FF7237', name: 'Orange' },
    { hex: '#C4BAFF', name: 'Purple' },
    { hex: '#24CB71', name: 'Green' },
    { hex: '#FFC9C1', name: 'Salmon' },
    { hex: '#F04438', name: 'Red' },
  ]},
]

// ── DS tokens ─────────────────────────────────────────────────────────────────

const DS = {
  bg: '#FFFFFF',
  bgPage: '#FAFAFA',
  bgHover: '#F5F5F5',
  border: '#E9EAEB',
  borderPrimary: '#D5D7DA',
  fgPrimary: '#0A0D12',
  fgQuart: '#717680',
  r12: 12, r10: 10, r8: 8, r4: 4,
  shadow: '0px 3px 3px -1.5px rgba(10,13,18,0.04), 0px 20px 24px -4px rgba(10,13,18,0.08), 0px 8px 8px -4px rgba(10,13,18,0.03)',
  skeu: 'inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), 0px 1px 2px 0px rgba(10,13,18,0.05)',
}

// ── ColorStyleGroup ───────────────────────────────────────────────────────────

function ColorStyleGroup({ group, onSelect }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 20px', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s', flexShrink: 0 }}
        >
          <path d="M4 6l4 4 4-4" stroke={DS.fgPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 16, lineHeight: '24px', fontWeight: 400, color: DS.fgPrimary }}>{group.name}</span>
      </button>
      {open && (
        <div style={{ paddingLeft: 32, paddingRight: 20, paddingBottom: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {group.colors.map((c) => (
            <button
              key={c.hex + c.name}
              onClick={() => onSelect(c.hex)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', borderRadius: DS.r10,
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.background = DS.bgHover}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 24, height: 24, borderRadius: DS.r4,
                background: c.hex, border: `1px solid ${DS.borderPrimary}`, flexShrink: 0,
              }} />
              <span style={{
                fontSize: 16, lineHeight: '24px', fontWeight: 500, color: DS.fgPrimary,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

/**
 * ColorPickerModal
 *
 * Props:
 *   initialColor  — hex string, e.g. '#444CE7' (default '#444CE7')
 *   onColorChange — (hex: string) => void  — fires in real-time while dragging
 *   onClose       — () => void
 */
export default function ColorPickerModal({ initialColor = '#444CE7', onColorChange, onClose }) {
  const [tab, setTab] = useState('custom')
  const [hue, setHue]       = useState(() => hexToHsv(initialColor)[0])
  const [sat, setSat]       = useState(() => hexToHsv(initialColor)[1])
  const [val, setVal]       = useState(() => hexToHsv(initialColor)[2])
  const [opacity]           = useState(100)
  const [hexInput, setHexInput] = useState(() => (initialColor || '#444CE7').replace('#','').toUpperCase())

  const canvasRef = useRef(null)
  const hueRef    = useRef(null)
  const dragging  = useRef(null) // 'canvas' | 'hue' | null

  const currentHex = hsvToHex(hue, sat, val)

  // Keep hex input in sync when dragging
  useEffect(() => {
    setHexInput(currentHex.replace('#',''))
  }, [currentHex])

  // Fire onColorChange in real-time
  useEffect(() => {
    onColorChange?.(currentHex)
  }, [currentHex]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateFromCanvas = useCallback((clientX, clientY) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(1, (clientX - rect.left)  / rect.width))
    const y = Math.max(0, Math.min(1, (clientY - rect.top)   / rect.height))
    setSat(x)
    setVal(1 - y)
  }, [])

  const updateFromHue = useCallback((clientX) => {
    const rect = hueRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    setHue(x * 360)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (dragging.current === 'canvas') updateFromCanvas(e.clientX, e.clientY)
      if (dragging.current === 'hue')    updateFromHue(e.clientX)
    }
    const onUp = () => { dragging.current = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [updateFromCanvas, updateFromHue])

  const handleHexInput = (e) => {
    const raw = e.target.value.replace(/^#/, '').toUpperCase().slice(0, 6)
    setHexInput(raw)
    if (raw.length === 6) {
      const [h, s, v] = hexToHsv('#' + raw)
      setHue(h); setSat(s); setVal(v)
    }
  }

  const handleStyleSelect = (hex) => {
    const [h, s, v] = hexToHsv(hex)
    setHue(h); setSat(s); setVal(v)
    onColorChange?.(hex)
    onClose?.()
  }

  const tabBtn = (id) => ({
    padding: '6px 10px',
    borderRadius: DS.r10,
    background: tab === id ? DS.bgHover : 'transparent',
    border: 'none',
    cursor: tab === id ? 'default' : 'pointer',
    fontSize: 16, lineHeight: '24px', fontWeight: 500,
    color: tab === id ? DS.fgPrimary : DS.fgQuart,
    fontFamily: 'inherit', flexShrink: 0,
  })

  return (
    <div style={{
      background: DS.bg,
      border: `1px solid ${DS.border}`,
      borderRadius: DS.r12,
      width: 360,
      maxHeight: 720,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: DS.shadow,
    }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 12px 12px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={tabBtn('custom')} onClick={() => setTab('custom')}>Custom</button>
          <button style={tabBtn('styles')} onClick={() => setTab('styles')}>Color Styles</button>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 24, height: 24, border: 'none', background: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 4, borderRadius: DS.r10, flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke={DS.fgQuart} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Custom tab ── */}
      {tab === 'custom' && (
        <>
          {/* Solid / Gradient toggle */}
          <div style={{
            borderTop: `1px solid ${DS.border}`,
            display: 'flex', gap: 12, alignItems: 'center',
            padding: '12px 16px', height: 60, flexShrink: 0,
          }}>
            {/* Solid (active) */}
            <button style={{
              padding: 4, borderRadius: DS.r8, background: DS.bgHover,
              border: 'none', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', width: 32, height: 32,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="3" width="12" height="12" rx="2"
                  stroke={DS.fgPrimary} strokeWidth="1.33" fill={DS.fgQuart}/>
              </svg>
            </button>
            {/* Gradient (inactive) */}
            <button style={{
              padding: 4, borderRadius: DS.r8, background: 'none',
              border: 'none', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', width: 32, height: 32,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="3" width="12" height="12" rx="2" stroke={DS.fgQuart} strokeWidth="1.33"/>
                <line x1="5"    y1="4.5" x2="5"    y2="13.5" stroke={DS.fgQuart} strokeWidth="1.33"/>
                <line x1="7.5"  y1="4.5" x2="7.5"  y2="9.5"  stroke={DS.fgQuart} strokeWidth="1.33"/>
                <line x1="10"   y1="4.5" x2="10"   y2="12"   stroke={DS.fgQuart} strokeWidth="1.33"/>
                <line x1="12.5" y1="4.5" x2="12.5" y2="8.5"  stroke={DS.fgQuart} strokeWidth="1.33"/>
              </svg>
            </button>
          </div>

          {/* Picker area */}
          <div style={{
            borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}`,
            display: 'flex', flexDirection: 'column', gap: 20,
            padding: 20, flexShrink: 0,
          }}>
            {/* Gradient canvas */}
            <div
              ref={canvasRef}
              onMouseDown={(e) => { dragging.current = 'canvas'; updateFromCanvas(e.clientX, e.clientY) }}
              style={{
                width: '100%', height: 320, borderRadius: DS.r8,
                position: 'relative', cursor: 'crosshair',
                border: `1px solid ${DS.border}`, overflow: 'hidden', flexShrink: 0,
                userSelect: 'none',
              }}
            >
              {/* White-to-hue horizontal gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to right, #FFFFFF, ${hueToHex(hue)})`,
              }} />
              {/* Transparent-to-black vertical overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent, #000000)',
              }} />
              {/* Handle */}
              <div style={{
                position: 'absolute',
                left: `${sat * 100}%`,
                top: `${(1 - val) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: 12, height: 12, borderRadius: '50%',
                border: '2px solid #FFFFFF',
                boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Eyedropper + Hue slider */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <button style={{
                width: 32, height: 32, border: 'none', background: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', padding: 0, flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M14.5 2.5a2.121 2.121 0 013 3L7 16l-4 1 1-4L14.5 2.5z"
                    stroke={DS.fgQuart} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 4.5l3 3" stroke={DS.fgQuart} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div
                ref={hueRef}
                onMouseDown={(e) => { dragging.current = 'hue'; updateFromHue(e.clientX) }}
                style={{
                  flex: 1, height: 16, borderRadius: 100,
                  background: 'linear-gradient(90deg,rgb(255,0,0) 0%,rgb(255,78,0) 8%,rgb(255,196,0) 17%,rgb(234,249,0) 21.1%,rgb(140,255,0) 25.6%,rgb(47,255,0) 31.1%,rgb(0,255,178) 44.1%,rgb(0,187,255) 54.1%,rgb(0,55,255) 70%,rgb(106,0,245) 70.01%,rgb(254,0,212) 83%,rgb(253,0,127) 88.6%,rgb(255,0,43) 95.5%,rgb(255,0,48) 100%)',
                  position: 'relative', cursor: 'pointer',
                  border: `1px solid ${DS.border}`, flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: `${(hue / 360) * 100}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 12, height: 12, borderRadius: '50%',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            {/* Hex + opacity row */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{
                fontSize: 16, lineHeight: '24px', fontWeight: 500,
                color: DS.fgQuart, width: 70, flexShrink: 0,
              }}>Color</span>
              <div style={{
                flex: 1, background: DS.bgPage,
                border: `1px solid ${DS.borderPrimary}`,
                borderRadius: DS.r10,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 14px 8px 8px', overflow: 'hidden',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: DS.r4,
                  background: currentHex, border: `1px solid ${DS.borderPrimary}`,
                  flexShrink: 0,
                }} />
                <input
                  value={'#' + hexInput}
                  onChange={handleHexInput}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontSize: 16, lineHeight: '24px', fontWeight: 500,
                    color: DS.fgPrimary, fontFamily: 'inherit', minWidth: 0,
                  }}
                />
                <span style={{
                  fontSize: 16, lineHeight: '24px', fontWeight: 400,
                  color: DS.fgQuart, flexShrink: 0, whiteSpace: 'nowrap',
                }}>{opacity} %</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Color Styles tab ── */}
      {tab === 'styles' && (
        <>
          <div style={{
            flex: 1, overflowY: 'auto',
            borderTop: `1px solid ${DS.border}`,
            borderBottom: `1px solid ${DS.border}`,
            minHeight: 0,
          }}>
            {COLOR_STYLES.map((group) => (
              <ColorStyleGroup key={group.name} group={group} onSelect={handleStyleSelect} />
            ))}
          </div>
          <div style={{ padding: 20, background: DS.bg, flexShrink: 0 }}>
            <button style={{
              width: '100%', padding: '8px 14px',
              background: DS.bg, border: `1px solid ${DS.borderPrimary}`,
              borderRadius: DS.r10, fontSize: 16, lineHeight: '24px',
              fontWeight: 600, color: DS.fgPrimary, cursor: 'pointer',
              fontFamily: 'inherit', boxShadow: DS.skeu,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              Edit Color Styles
            </button>
          </div>
        </>
      )}
    </div>
  )
}
