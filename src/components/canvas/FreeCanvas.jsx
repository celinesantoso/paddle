/**
 * FreeCanvas — DOM-based interactive canvas
 *
 * Zone interaction model:
 *  - Zones are CSS grid cells that render inside a grid overlay
 *  - The grid overlay container has pointer-events:none; each zone cell has pointer-events:auto
 *    → clicks on elements (higher z-index) are NOT intercepted by zones
 *    → clicks on empty zone area select the zone
 *  - Hovering near a zone's RIGHT edge shows col-resize cursor → drag redistributes adjacent fr/px columns
 *  - Hovering near a zone's BOTTOM edge shows row-resize cursor → drag redistributes adjacent fr/px rows
 *
 * Element interaction model (unchanged):
 *  - Absolutely-positioned divs above the zone layer
 *  - Drag via interactionRef (avoids 60fps re-renders)
 *  - 4-corner resize handles
 *  - Double-click text element to enter contentEditable
 */

import { useEffect, useRef, useState } from 'react'

// ─── Grid utilities ───────────────────────────────────────────────────────────

export function buildTemplate(tracks) {
  if (!tracks?.length) return '1fr'
  return tracks.map((t) => (t.unit === 'fill' ? '1fr' : `${t.value}${t.unit}`)).join(' ')
}

/**
 * Returns 0-indexed column-boundary index for the RIGHT edge of this zone.
 * Returns -1 if this zone is at the rightmost edge (nothing to resize).
 */
function rightBoundary(gridColumnStr, numCols) {
  const str = String(gridColumnStr ?? '1').trim()
  const parts = str.split('/')
  const start = parseInt(parts[0].trim(), 10)
  const end   = parts[1] ? parseInt(parts[1].trim(), 10) : start + 1
  const idx   = end - 2 // 0-indexed left col of the boundary
  return idx >= 0 && idx < numCols - 1 ? idx : -1
}

/** Same for bottom (row) edge. */
function bottomBoundary(gridRowStr, numRows) {
  const str = String(gridRowStr ?? '1').trim()
  const parts = str.split('/')
  const start = parseInt(parts[0].trim(), 10)
  const end   = parts[1] ? parseInt(parts[1].trim(), 10) : start + 1
  const idx   = end - 2
  return idx >= 0 && idx < numRows - 1 ? idx : -1
}

// ─── Element resize handles (4 corners) ──────────────────────────────────────

const H = 8
const CORNERS = [
  { id: 'nw', cursor: 'nw-resize', style: { top: -(H / 2), left: -(H / 2) } },
  { id: 'ne', cursor: 'ne-resize', style: { top: -(H / 2), right: -(H / 2) } },
  { id: 'se', cursor: 'se-resize', style: { bottom: -(H / 2), right: -(H / 2) } },
  { id: 'sw', cursor: 'sw-resize', style: { bottom: -(H / 2), left: -(H / 2) } },
]

function ResizeHandles({ onResizeStart }) {
  return CORNERS.map((c) => (
    <div
      key={c.id}
      onPointerDown={(e) => { e.stopPropagation(); onResizeStart(e, c.id) }}
      style={{
        position: 'absolute', width: H, height: H,
        background: '#fff', border: '1.5px solid #1570EF',
        borderRadius: 2, cursor: c.cursor, zIndex: 10,
        boxSizing: 'border-box', ...c.style,
      }}
    />
  ))
}

// ─── Shared element base style ────────────────────────────────────────────────

function elBase(el, isSelected, cursor = 'move') {
  return {
    position: 'absolute',
    left: el.x, top: el.y,
    width: el.width, height: el.height,
    zIndex: el.zIndex,
    outline: isSelected ? '2px solid #1570EF' : 'none',
    outlineOffset: 1,
    boxSizing: 'border-box',
    cursor,
    touchAction: 'none',
  }
}

// ─── Element renderers ────────────────────────────────────────────────────────

function TextEl({ el, isSelected, isEditing, onPointerDown, onResizeStart, onDoubleClick, onTextBlur }) {
  return (
    <div style={{ ...elBase(el, isSelected, isEditing ? 'text' : 'move'), minHeight: 20, overflow: 'visible' }}
      onPointerDown={onPointerDown} onDoubleClick={onDoubleClick}>
      <div contentEditable={isEditing} suppressContentEditableWarning onBlur={onTextBlur}
        style={{
          fontSize: el.fontSize || 16, fontWeight: el.fontWeight || 400,
          color: el.color || '#0A0D12', fontFamily: 'Geist, system-ui, sans-serif',
          lineHeight: 1.4, outline: 'none', cursor: isEditing ? 'text' : 'inherit',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          pointerEvents: isEditing ? 'auto' : 'none',
          userSelect: isEditing ? 'text' : 'none', padding: '2px 0',
        }}>
        {el.content}
      </div>
      {isSelected && !isEditing && <ResizeHandles onResizeStart={onResizeStart} />}
    </div>
  )
}

function RectEl({ el, isSelected, onPointerDown, onResizeStart }) {
  return (
    <div style={{ ...elBase(el, isSelected), background: el.fill || '#E9EAEB', borderRadius: el.borderRadius || 0 }}
      onPointerDown={onPointerDown}>
      {isSelected && <ResizeHandles onResizeStart={onResizeStart} />}
    </div>
  )
}

function ImageEl({ el, isSelected, onPointerDown, onResizeStart }) {
  return (
    <div style={{ ...elBase(el, isSelected), background: '#F5F5F5', border: '1px solid #E9EAEB', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      onPointerDown={onPointerDown}>
      {el.src
        ? <img src={el.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        : <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#D5D7DA" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="#D5D7DA"/>
            <path d="M3 15l5-5 4 4 3-3 6 4" stroke="#D5D7DA" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
      }
      {isSelected && <ResizeHandles onResizeStart={onResizeStart} />}
    </div>
  )
}

// ─── Logo canvas rendering helpers ───────────────────────────────────────────
// Shared mask URLs (hardcoded — same across all tiles of each type)
const _IPOP_MASK   = 'https://www.figma.com/api/mcp/asset/f90da30e-7c83-4a4a-ba30-09c5a7d51d39'
const _SOLAR_MSK1  = 'https://www.figma.com/api/mcp/asset/49d57029-967f-4c2a-a8ae-c66fd16bb3ab'
const _SOLAR_MSK2  = 'https://www.figma.com/api/mcp/asset/63d88ac1-a34b-4df0-bad7-aefc2ea6c4b6'
const _PLNT_MSK1   = 'https://www.figma.com/api/mcp/asset/591e5752-06e2-4ce9-80e6-d1c65d084570'
const _PLNT_MSK2   = 'https://www.figma.com/api/mcp/asset/29cc1184-bcba-4b64-b5b0-76980fb04e97'

const _a = { position: 'absolute' }
const _img = { ..._a, display: 'block', width: '100%', height: '100%', maxWidth: 'none' }
const _ins = (t, r, b, l) => ({ ..._a, top: t, right: r, bottom: b, left: l })
const _msk = (url, size, pos) => ({
  WebkitMaskImage: `url('${url}')`, maskImage: `url('${url}')`,
  WebkitMaskSize: size, maskSize: size,
  WebkitMaskPosition: pos, maskPosition: pos,
  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
})

function _IpopLogo({ g1, g2, g3, maskImg, fill }) {
  const mk = maskImg || _IPOP_MASK
  return (
    <div style={{ ..._a, left: '50%', top: 'calc(50% - 0.48px)', transform: 'translate(-50%,-50%)', width: 80, height: 37.044 }}>
      <div style={_ins('0.12%','81.71%','21.09%','-0.09%')}>
        <div style={_ins('-5.63%','-5.63%','-5.63%','-5.63%')}><img alt="" style={_img} src={g1} /></div>
      </div>
      <div style={_ins('25.03%','54.99%','0.37%','10.58%')}>
        <div style={_ins('-5%','-5%','-5%','-5%')}><img alt="" style={_img} src={g2} /></div>
      </div>
      <div style={_ins('25.03%','-0.12%','0.37%','65.69%')}>
        <div style={_ins('-5%','-5%','-5%','-5%')}><img alt="" style={_img} src={g3} /></div>
      </div>
      <div style={{ ..._ins('26.58%','29.7%','17.46%','44.39%'), ..._msk(mk,'20.735px 20.734px','0.008px 0.006px') }}>
        <img alt="" style={_img} src={fill} />
      </div>
    </div>
  )
}

function _SolarLogo({ fillInner, fillOuter, vector }) {
  return (
    <div style={{ ..._a, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 64, height: 64, overflow: 'hidden' }}>
      <div style={{ ..._ins('27.65%','27.94%','27.95%','27.65%'), ..._msk(_SOLAR_MSK1,'28.367px 28.364px','0px 0px') }}>
        <img alt="" style={_img} src={fillInner} />
      </div>
      <div style={{ ..._ins('0.01%','0.3%','0.3%','0.01%'), ..._msk(_SOLAR_MSK2,'63.82px 63.819px','-0.008px -0.004px') }}>
        <img alt="" style={_img} src={fillOuter} />
      </div>
      <div style={_ins('20.07%','20.37%','20.37%','20.07%')}><img alt="" style={_img} src={vector} /></div>
    </div>
  )
}

function _PlanetLogo({ fillBg, v1, v2, v3, v4, v5, fillPlanet }) {
  return (
    <div style={{ ..._a, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 90.23, height: 64, overflow: 'hidden' }}>
      <div style={{ ..._ins('0.31%','0.41%','0.26%','0.22%'), ..._msk(_PLNT_MSK1,'90.09px 63.902px','-0.195px -0.182px') }}>
        <img alt="" style={_img} src={fillBg} />
      </div>
      <div style={_ins('13.56%','45.62%','68.49%','21.36%')}><img alt="" style={_img} src={v1} /></div>
      <div style={_ins('68.54%','21.55%','13.52%','45.43%')}><img alt="" style={_img} src={v2} /></div>
      <div style={_ins('42.25%','57.31%','24.33%','16.02%')}><img alt="" style={_img} src={v3} /></div>
      <div style={_ins('24.27%','22.38%','24.22%','22.19%')}><img alt="" style={_img} src={v4} /></div>
      <div style={_ins('24.37%','16.21%','42.21%','57.12%')}><img alt="" style={_img} src={v5} /></div>
      <div style={{ ..._ins('24.76%','32.27%','24.99%','32.08%'), ..._msk(_PLNT_MSK2,'32.164px 32.161px','0px 0px') }}>
        <img alt="" style={_img} src={fillPlanet} />
      </div>
    </div>
  )
}

// 8 circular handles for logo elements (#1B6FFF, corners = proportional, midpoints = single-axis)
const _LOGO_HANDLES = [
  { id: 'nw', cursor: 'nw-resize', pos: { top: -(H/2), left: -(H/2) } },
  { id: 'n',  cursor: 'n-resize',  pos: { top: -(H/2), left: '50%', transform: 'translateX(-50%)' } },
  { id: 'ne', cursor: 'ne-resize', pos: { top: -(H/2), right: -(H/2) } },
  { id: 'e',  cursor: 'e-resize',  pos: { top: '50%',  right: -(H/2), transform: 'translateY(-50%)' } },
  { id: 'se', cursor: 'se-resize', pos: { bottom: -(H/2), right: -(H/2) } },
  { id: 's',  cursor: 's-resize',  pos: { bottom: -(H/2), left: '50%', transform: 'translateX(-50%)' } },
  { id: 'sw', cursor: 'sw-resize', pos: { bottom: -(H/2), left: -(H/2) } },
  { id: 'w',  cursor: 'w-resize',  pos: { top: '50%',  left: -(H/2), transform: 'translateY(-50%)' } },
]

function LogoResizeHandles({ onResizeStart }) {
  return _LOGO_HANDLES.map((h) => (
    <div
      key={h.id}
      onPointerDown={(e) => { e.stopPropagation(); onResizeStart(e, h.id) }}
      style={{
        position: 'absolute', width: H, height: H,
        background: '#1B6FFF', borderRadius: '50%',
        border: '1.5px solid #fff', cursor: h.cursor,
        zIndex: 10, boxSizing: 'border-box', ...h.pos,
      }}
    />
  ))
}

function LogoEl({ el, isSelected, onPointerDown, onResizeStart }) {
  const m = el.logoMeta || {}
  const opacity = (el.opacity ?? 100) / 100
  // Scale 120×82 tile content uniformly to fit element bounds (letterbox)
  const origW = 120, origH = 82
  const scale = Math.min(el.width / origW, el.height / origH)
  const tx = (el.width  - origW * scale) / 2
  const ty = (el.height - origH * scale) / 2
  return (
    <div
      style={{ ...elBase(el, isSelected), background: m.bg || '#444CE7', overflow: 'hidden', opacity }}
      onPointerDown={onPointerDown}
    >
      <div style={{ position: 'absolute', left: tx, top: ty, width: origW, height: origH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {m.type === 'ipop'   && <_IpopLogo   {...m} />}
        {m.type === 'solar'  && <_SolarLogo  {...m} />}
        {m.type === 'planet' && <_PlanetLogo {...m} />}
      </div>
      {isSelected && <LogoResizeHandles onResizeStart={onResizeStart} />}
    </div>
  )
}

function WidgetEl({ el, isSelected, onPointerDown, onResizeStart }) {
  let inner = null
  if (el.widgetName === 'qr-code') inner = (
    <div style={{ background: '#fff', borderRadius: 4, padding: 8, border: '1px solid #E9EAEB' }}>
      <svg width="48" height="48" viewBox="0 0 7 7" shapeRendering="crispEdges">
        {[[1,1,1,0,1,1,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[0,0,0,0,0,0,0],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[1,1,1,0,1,1,1]].map((row, r) =>
          row.map((cell, c) => cell ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#111"/> : null)
        )}
      </svg>
    </div>
  )
  if (el.widgetName === 'youtube') inner = (
    <div style={{ background: '#DC2626', borderRadius: 8, width: 48, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M10 15l5.19-3L10 9v6z"/></svg>
    </div>
  )
  if (el.widgetName === 'date') inner = (
    <div style={{ background: '#fff', border: '1px solid #E9EAEB', borderRadius: 8, padding: '4px 10px' }}>
      <span style={{ fontSize: 11, fontWeight: 500, color: '#414651', whiteSpace: 'nowrap' }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
    </div>
  )
  if (el.widgetName === 'clock') inner = (
    <div style={{ background: '#111827', borderRadius: 8, padding: '4px 10px' }}>
      <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 700, color: '#4ADE80', letterSpacing: '0.1em' }}>00:00:00</span>
    </div>
  )
  return (
    <div style={{ ...elBase(el, isSelected), display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPointerDown={onPointerDown}>
      {inner}
      {isSelected && <ResizeHandles onResizeStart={onResizeStart} />}
    </div>
  )
}

// ─── FreeCanvas ───────────────────────────────────────────────────────────────

export default function FreeCanvas({
  // Elements
  elements, selectedId, editingId,
  // Zones
  selectedZoneId, zoneStyles, gridTracks, gridGap,
  // Shared
  bgColor, layout, activeTool,
  // Element callbacks
  onSelectElement, onSelectFrame, onDeselectAll, onUpdateElement, onAddElement, onSetEditing,
  // Zone callbacks
  onSelectZone, onUpdateGridTracks,
}) {
  const canvasRef = useRef(null)
  const frameRef  = useRef(null)
  const ix = useRef(null) // current drag/resize/zone-resize interaction
  const [hoveredZoneId, setHoveredZoneId] = useState(null)
  const [frameWidth, setFrameWidth] = useState(720) // tracks rendered frame width for proportional gap

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setFrameWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const gap   = gridGap ?? 24  // numeric px — used for zone-resize math
  const gapPx = Math.round((frameWidth / 960) * gap) // proportional px, consistent across axes
  const colTemplate = gridTracks ? buildTemplate(gridTracks.cols) : layout?.gridCols ?? '1fr'
  const rowTemplate = gridTracks ? buildTemplate(gridTracks.rows) : layout?.gridRows ?? '1fr'

  // ── Create element at canvas-local position ─────────────────────────────
  function createElementAt(x, y) {
    if (activeTool === 'rect')     onAddElement({ type: 'rect',  x: x-60, y: y-40, width: 120, height: 80,  fill: '#E9EAEB' })
    else if (activeTool === 'circle')   onAddElement({ type: 'rect',  x: x-50, y: y-50, width: 100, height: 100, fill: '#E9EAEB', borderRadius: 999 })
    else if (activeTool === 'triangle') onAddElement({ type: 'rect',  x: x-50, y: y-50, width: 100, height: 100, fill: '#E9EAEB' })
    else if (activeTool === 'text')     onAddElement({ type: 'text',  x: x-75, y: y-16, width: 200, height: 40, content: 'Text', fontSize: 24, fontWeight: 400, color: '#0A0D12' })
    else if (activeTool === 'image')    onAddElement({ type: 'image', x: x-80, y: y-60, width: 160, height: 120 })
  }


  // ── Zone interaction ────────────────────────────────────────────────────

  /** Start zone-edge resize if pointer is within EDGE_SIZE of a resizable edge. */
  function tryStartZoneResize(e, zone) {
    const el  = e.currentTarget
    const ox  = e.nativeEvent.offsetX
    const oy  = e.nativeEvent.offsetY
    const ow  = el.offsetWidth
    const oh  = el.offsetHeight
    const EDGE = 8

    const numCols = gridTracks?.cols.length ?? 1
    const numRows = gridTracks?.rows.length ?? 1

    const rIdx = rightBoundary(zone.style.gridColumn, numCols)
    const bIdx = bottomBoundary(zone.style.gridRow, numRows)

    const nearRight  = ox >= ow - EDGE && rIdx >= 0
    const nearBottom = oy >= oh - EDGE && bIdx >= 0

    if (!nearRight && !nearBottom) return false

    e.stopPropagation()

    if (nearRight) {
      const W       = canvasRef.current.clientWidth
      const cols    = gridTracks.cols
      const totFr   = cols.reduce((s, t) => t.unit !== 'px' ? s + t.value : s, 0)
      const totPx   = cols.reduce((s, t) => t.unit === 'px' ? s + t.value : s, 0)
      const frAvail = W - totPx - gap * (cols.length - 1)

      const lTrack = cols[rIdx]
      const rTrack = cols[rIdx + 1]
      const lPx = lTrack.unit === 'px' ? lTrack.value : (lTrack.value / totFr) * frAvail
      const rPx = rTrack.unit === 'px' ? rTrack.value : (rTrack.value / totFr) * frAvail

      ix.current = {
        type: 'zone-col', idx: rIdx, startX: e.clientX,
        lPx, rPx, lUnit: lTrack.unit === 'fill' ? 'fr' : lTrack.unit,
        rUnit: rTrack.unit === 'fill' ? 'fr' : rTrack.unit, totFr, frAvail,
      }
    } else {
      const H2      = canvasRef.current.clientHeight
      const rows    = gridTracks.rows
      const totFr   = rows.reduce((s, t) => t.unit !== 'px' ? s + t.value : s, 0)
      const totPx   = rows.reduce((s, t) => t.unit === 'px' ? s + t.value : s, 0)
      const frAvail = H2 - totPx - gap * (rows.length - 1)

      const tTrack = rows[bIdx]
      const bTrack = rows[bIdx + 1]
      const tPx = tTrack.unit === 'px' ? tTrack.value : (tTrack.value / totFr) * frAvail
      const bPx = bTrack.unit === 'px' ? bTrack.value : (bTrack.value / totFr) * frAvail

      ix.current = {
        type: 'zone-row', idx: bIdx, startY: e.clientY,
        tPx, bPx, tUnit: tTrack.unit === 'fill' ? 'fr' : tTrack.unit,
        bUnit: bTrack.unit === 'fill' ? 'fr' : bTrack.unit, totFr, frAvail,
      }
    }
    return true
  }

  function handleZonePointerDown(e, zone) {
    // Attempt resize first
    if (tryStartZoneResize(e, zone)) return

    e.stopPropagation()

    if (activeTool !== 'cursor') {
      const r = canvasRef.current.getBoundingClientRect()
      createElementAt(Math.round(e.clientX - r.left), Math.round(e.clientY - r.top))
      return
    }
    onSelectZone(zone.id)
  }

  /** Update cursor dynamically when hovering near zone edges */
  function handleZoneMouseMove(e, zone) {
    const el   = e.currentTarget
    const ox   = e.nativeEvent.offsetX
    const oy   = e.nativeEvent.offsetY
    const ow   = el.offsetWidth
    const oh   = el.offsetHeight
    const EDGE = 8
    const rIdx = rightBoundary(zone.style.gridColumn, gridTracks?.cols.length ?? 1)
    const bIdx = bottomBoundary(zone.style.gridRow, gridTracks?.rows.length ?? 1)

    if      (ox >= ow - EDGE && rIdx >= 0) el.style.cursor = 'col-resize'
    else if (oy >= oh - EDGE && bIdx >= 0) el.style.cursor = 'row-resize'
    else                                   el.style.cursor = 'default'
  }

  // ── Pointer move: apply drag / resize delta ─────────────────────────────
  function handlePointerMove(e) {
    const i = ix.current
    if (!i) return
    const dx = e.clientX - (i.startX ?? 0)
    const dy = e.clientY - (i.startY ?? 0)

    // Element drag
    if (i.type === 'drag') {
      onUpdateElement(i.id, { x: Math.round(i.ox + dx), y: Math.round(i.oy + dy) })

    // Element corner/midpoint resize
    } else if (i.type === 'resize') {
      const { handle: h, ox, oy, ow, oh, proportional } = i
      let x = ox, y = oy, w = ow, ht = oh
      const isCorner = ['nw','ne','se','sw'].includes(h)
      if (proportional && isCorner) {
        // Proportional resize: use the larger magnitude delta as the driver
        const primary = Math.abs(dx) >= Math.abs(dy) ? dx : dy
        const newW = Math.max(32, h.includes('w') ? ow - primary : ow + primary)
        const newH = Math.max(20, newW / (ow / oh))
        if (h.includes('w')) x = ox + (ow - newW)
        if (h.includes('n')) y = oy + (oh - newH)
        w = newW; ht = newH
      } else {
        if (h.includes('e')) w  = Math.max(32, ow + dx)
        if (h.includes('s')) ht = Math.max(20, oh + dy)
        if (h.includes('w')) { x = ox + dx; w  = Math.max(32, ow - dx) }
        if (h.includes('n')) { y = oy + dy; ht = Math.max(20, oh - dy) }
      }
      onUpdateElement(i.id, { x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(ht) })

    // Zone column boundary resize
    } else if (i.type === 'zone-col') {
      const nL = Math.max(20, i.lPx + dx)
      const nR = Math.max(20, i.rPx - dx)
      const cols = [...gridTracks.cols]
      cols[i.idx]     = i.lUnit === 'px' ? { value: Math.round(nL), unit: 'px' } : { value: +((nL / i.frAvail) * i.totFr).toFixed(3), unit: i.lUnit }
      cols[i.idx + 1] = i.rUnit === 'px' ? { value: Math.round(nR), unit: 'px' } : { value: +((nR / i.frAvail) * i.totFr).toFixed(3), unit: i.rUnit }
      onUpdateGridTracks({ ...gridTracks, cols })

    // Zone row boundary resize
    } else if (i.type === 'zone-row') {
      const nT = Math.max(20, i.tPx + dy)
      const nB = Math.max(20, i.bPx - dy)
      const rows = [...gridTracks.rows]
      rows[i.idx]     = i.tUnit === 'px' ? { value: Math.round(nT), unit: 'px' } : { value: +((nT / i.frAvail) * i.totFr).toFixed(3), unit: i.tUnit }
      rows[i.idx + 1] = i.bUnit === 'px' ? { value: Math.round(nB), unit: 'px' } : { value: +((nB / i.frAvail) * i.totFr).toFixed(3), unit: i.bUnit }
      onUpdateGridTracks({ ...gridTracks, rows })
    }
  }

  function handlePointerUp() { ix.current = null }

  // ─────────────────────────────────────────────────────────────────────────
  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex)

  function handleFramePointerDown(e) {
    if (activeTool !== 'cursor') {
      const r = canvasRef.current.getBoundingClientRect()
      createElementAt(Math.round(e.clientX - r.left), Math.round(e.clientY - r.top))
    } else {
      onSelectFrame()
    }
  }

  return (
    <div
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        width: '100%', height: '100%',
        position: 'relative', overflow: 'hidden',
        userSelect: 'none', touchAction: 'none',
      }}
    >
      {/* ── Parent frame + zone grid ─────────────────────────────────────── */}
      {layout && (
        <div
          ref={frameRef}
          onPointerDown={handleFramePointerDown}
          style={{
            position: 'absolute', inset: 0,
            backgroundColor: bgColor,
            padding: gapPx,
            boxSizing: 'border-box',
            cursor: activeTool === 'cursor' ? 'default' : 'crosshair',
          }}
        >
          <div
            style={{
              width: '100%', height: '100%',
              pointerEvents: 'none',
              display: 'grid',
              gridTemplateColumns: colTemplate,
              gridTemplateRows: rowTemplate,
              gap: gapPx,
            }}
          >
            {layout.zones.map((zone) => {
              const isSelected = selectedZoneId === zone.id
              const isHovered  = hoveredZoneId  === zone.id && !isSelected
              const zStyle     = zoneStyles?.[zone.id] || {}

              return (
                <div
                  key={zone.id}
                  style={{
                    ...zone.style,
                    pointerEvents: 'auto',
                    borderRadius: zStyle.borderRadius ?? 12,
                    opacity: (zStyle.opacity ?? 100) / 100,
                    background: isSelected ? 'rgba(21,112,239,0.06)'
                              : isHovered  ? 'rgba(21,112,239,0.03)'
                              : (zStyle.fill ?? '#F5F5F5'),
                    border: isSelected ? '2px solid #1570EF'
                          : isHovered  ? '1px solid rgba(21,112,239,0.4)'
                          : `${zStyle.borderWidth ?? 1}px ${zStyle.borderStyle ?? 'solid'} ${zStyle.borderColor ?? '#E9EAEB'}`,
                    boxSizing: 'border-box',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.08s, border-color 0.08s',
                    cursor: 'default',
                  }}
                  onPointerDown={(e) => handleZonePointerDown(e, zone)}
                  onMouseEnter={() => setHoveredZoneId(zone.id)}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  onMouseMove={(e) => handleZoneMouseMove(e, zone)}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* ── Free-form element layer ──────────────────────────────────────── */}
      {sorted.map((el) => {
        const isSelected = selectedId === el.id
        const isEditing  = editingId  === el.id

        const onPointerDown = (e) => {
          e.stopPropagation()
          onSelectElement(el.id)
          if (activeTool === 'cursor' && !isEditing) {
            ix.current = { type: 'drag', id: el.id, startX: e.clientX, startY: e.clientY, ox: el.x, oy: el.y }
          }
        }
        const onResizeStart = (e, handle) => {
          const isCorner = ['nw','ne','se','sw'].includes(handle)
          ix.current = { type: 'resize', id: el.id, handle, startX: e.clientX, startY: e.clientY, ox: el.x, oy: el.y, ow: el.width, oh: el.height, proportional: el.type === 'logo' && isCorner }
        }
        const onDoubleClick = () => el.type === 'text' && onSetEditing(el.id)
        const onTextBlur    = (e) => onUpdateElement(el.id, { content: e.currentTarget.innerText })

        if (el.type === 'text')   return <TextEl   key={el.id} el={el} isSelected={isSelected} isEditing={isEditing} onPointerDown={onPointerDown} onResizeStart={onResizeStart} onDoubleClick={onDoubleClick} onTextBlur={onTextBlur} />
        if (el.type === 'rect')   return <RectEl   key={el.id} el={el} isSelected={isSelected} onPointerDown={onPointerDown} onResizeStart={onResizeStart} />
        if (el.type === 'image')  return <ImageEl  key={el.id} el={el} isSelected={isSelected} onPointerDown={onPointerDown} onResizeStart={onResizeStart} />
        if (el.type === 'logo')   return <LogoEl   key={el.id} el={el} isSelected={isSelected} onPointerDown={onPointerDown} onResizeStart={onResizeStart} />
        if (el.type === 'widget') return <WidgetEl key={el.id} el={el} isSelected={isSelected} onPointerDown={onPointerDown} onResizeStart={onResizeStart} />
        return null
      })}
    </div>
  )
}
