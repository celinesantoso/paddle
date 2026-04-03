import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FreeCanvas, { buildTemplate } from '../components/canvas/FreeCanvas'
import LayoutPanel, { LAYOUT_PRESETS } from '../components/panels/LayoutPanel'
import TextPanel from '../components/panels/TextPanel'
import LogoPanel from '../components/panels/LogoPanel'
import WidgetsPanel from '../components/panels/WidgetsPanel'
import MediaPanel from '../components/panels/MediaPanel'
import BrandKitPanel from '../components/panels/BrandKitPanel'
import TemplatePanel from '../components/panels/TemplatePanel'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconLayout() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function IconText() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 5h12M10 5v10M7 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function IconLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7h2.5a1.5 1.5 0 010 3H8v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function IconWidgets() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="6" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function IconMedia() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 13l4-4 3 3 3-3 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="7" cy="8" r="1.5" fill="currentColor"/>
    </svg>
  )
}
function IconBrandKit() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="14" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function IconTemplate() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="14" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="9" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="4" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

const SIDEBAR_TABS = [
  { id: 'layout',   label: 'Layout',    Icon: IconLayout },
  { id: 'text',     label: 'Text',      Icon: IconText },
  { id: 'logo',     label: 'Logo',      Icon: IconLogo },
  { id: 'widgets',  label: 'Widgets',   Icon: IconWidgets },
  { id: 'media',    label: 'Media',     Icon: IconMedia },
  { id: 'brandkit', label: 'Brand Kit', Icon: IconBrandKit },
  { id: 'template', label: 'Template',  Icon: IconTemplate },
]

// ─── Canvas Zone Content Renderer ─────────────────────────────────────────────

function ZoneContent({ items }) {
  if (!items || items.length === 0) return null

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3 overflow-hidden">
      {items.map((item, idx) => {
        if (item.type === 'text') {
          const cls =
            item.style === 'heading'
              ? 'text-2xl font-bold text-gray-900'
              : item.style === 'subheading'
              ? 'text-base font-semibold text-gray-700'
              : 'text-sm text-gray-600'
          return <p key={idx} className={`${cls} text-center leading-tight`}>{item.content}</p>
        }

        if (item.type === 'logo') {
          const logoMap = {
            'color-1': { bg: '#2563EB', text: '#fff' },
            'color-2': { bg: '#111827', text: '#fff' },
            'color-3': { bg: '#BFDBFE', text: '#1D4ED8' },
            'color-4': { bg: '#1E3A8A', text: '#fff' },
            'bw-1':    { bg: '#fff', text: '#111827' },
            'bw-2':    { bg: '#F3F4F6', text: '#374151' },
          }
          const style = logoMap[item.name] || { bg: '#2563EB', text: '#fff' }
          return (
            <div key={idx} className="rounded-lg px-4 py-2" style={{ backgroundColor: style.bg }}>
              <span className="text-xl font-black italic" style={{ color: style.text }}>ipop</span>
            </div>
          )
        }

        if (item.type === 'widget') {
          if (item.name === 'qr-code') {
            return (
              <div key={idx} className="bg-white rounded p-2 border border-gray-100">
                <svg width="48" height="48" viewBox="0 0 7 7" shapeRendering="crispEdges">
                  {/* QR pattern */}
                  {[
                    [1,1,1,0,1,1,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],
                    [0,0,0,0,0,0,0],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[1,1,1,0,1,1,1]
                  ].map((row, r) =>
                    row.map((cell, c) =>
                      cell ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#111" /> : null
                    )
                  )}
                </svg>
              </div>
            )
          }
          if (item.name === 'youtube') {
            return (
              <div key={idx} className="bg-red-600 rounded-lg w-14 h-10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M10 15l5.19-3L10 9v6z"/>
                </svg>
              </div>
            )
          }
          if (item.name === 'date') {
            const d = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            return (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 px-3 py-1.5">
                <span className="text-sm font-medium text-gray-700">{d}</span>
              </div>
            )
          }
          if (item.name === 'clock') {
            return (
              <div key={idx} className="bg-gray-900 rounded-lg px-3 py-1.5">
                <span className="text-sm font-mono font-bold text-green-400 tracking-widest">00:00:00</span>
              </div>
            )
          }
        }

        return null
      })}
    </div>
  )
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

function Canvas({ layout, selectedZoneId, onSelectZone, zoneContents, bgColor }) {
  if (!layout) return (
    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
      Select a layout to get started
    </div>
  )

  return (
    <div
      className="w-full h-full"
      style={{
        display: 'grid',
        gridTemplateColumns: layout.gridCols,
        gridTemplateRows: layout.gridRows,
        gap: '2px',
        backgroundColor: bgColor,
      }}
    >
      {layout.zones.map((zone) => {
        const isSelected = selectedZoneId === zone.id
        const contents = zoneContents[zone.id] || []
        const hasContent = contents.length > 0

        return (
          <div
            key={zone.id}
            onClick={(e) => { e.stopPropagation(); onSelectZone(zone.id) }}
            className={`relative cursor-pointer bg-white transition-all overflow-hidden
              ${isSelected
                ? 'border-2 border-blue-500'
                : 'border border-gray-200 hover:border-gray-300'
              }`}
            style={zone.style}
          >
            {/* Corner handles when selected */}
            {isSelected && (
              <>
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-500 z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-blue-500 z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 z-10" />
              </>
            )}

            {/* Zone content */}
            {hasContent ? (
              <ZoneContent items={contents} />
            ) : (
              isSelected && (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-gray-400 text-center px-2">
                    Click a panel item to add content
                  </span>
                </div>
              )
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Right Panel ──────────────────────────────────────────────────────────────

const EL_TYPE_LABEL = { rect: 'Rectangle', text: 'Text', image: 'Image', logo: 'Logo', widget: 'Widget' }

// Compact numeric input used throughout the right panel
function NumInput({ value, onChange, unit }) {
  return (
    <div
      className="flex items-center gap-2"
      style={{ background: '#FAFAFA', border: '1px solid #D5D7DA', borderRadius: 10, padding: '6px 10px 6px 8px' }}
    >
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', background: 'transparent', fontSize: 14, fontWeight: 500, color: '#0A0D12', outline: 'none', border: 'none' }}
      />
      <span style={{ fontSize: 13, color: '#717680', flexShrink: 0 }}>{unit}</span>
    </div>
  )
}

// Reusable input row: label | value input | unit
function DimInput({ label, defaultValue, unit }) {
  return (
    <div
      className="flex items-center gap-2"
      style={{
        background: '#FAFAFA',
        border: '1px solid #D5D7DA',
        borderRadius: 10,
        padding: '8px 14px 8px 8px',
      }}
    >
      {/* Label chip */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: '#F5F5F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: '#717680', lineHeight: '16px' }}>{label}</span>
      </div>
      {/* Value */}
      <input
        type="text"
        defaultValue={defaultValue}
        className="flex-1 bg-transparent focus:outline-none"
        style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: '#0A0D12' }}
      />
      {/* Unit */}
      <span style={{ fontSize: 14, lineHeight: '20px', color: '#717680', flexShrink: 0 }}>{unit}</span>
    </div>
  )
}

// Section header with collapse toggle
function SectionHeader({ label, open, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between"
      style={{
        padding: '12px 20px',
        borderTop: '1px solid #E9EAEB',
        background: 'transparent',
      }}
    >
      <span style={{ fontSize: 16, lineHeight: '24px', fontWeight: 400, color: '#0A0D12' }}>{label}</span>
      <svg
        width="16" height="16" viewBox="0 0 20 20" fill="none"
        style={{ transition: 'transform 0.15s', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', flexShrink: 0 }}
      >
        <path d="M5 8l5 5 5-5" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// Track W/H input with fr | px | fill unit dropdown
function TrackInput({ label, track, onChange }) {
  const isFill = track.unit === 'fill'
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', gap: 4 }}>
        <div style={{ flex: 1, background: '#FAFAFA', border: '1px solid #D5D7DA', borderRadius: 10, padding: '6px 8px', display: 'flex', alignItems: 'center' }}>
          <input
            type="number"
            value={isFill ? '' : track.value}
            disabled={isFill}
            placeholder={isFill ? '—' : ''}
            onChange={(e) => onChange({ ...track, value: Math.max(0.1, parseFloat(e.target.value) || 1) })}
            style={{ width: '100%', background: 'transparent', fontSize: 13, fontWeight: 500, color: isFill ? '#A4A7AE' : '#0A0D12', outline: 'none', border: 'none' }}
          />
        </div>
        <select
          value={track.unit}
          onChange={(e) => {
            const u = e.target.value
            onChange(u === 'fill' ? { value: 1, unit: 'fill' } : { value: track.unit === 'fill' ? 1 : track.value, unit: u })
          }}
          style={{ background: '#F5F5F5', border: '1px solid #D5D7DA', borderRadius: 8, fontSize: 12, color: '#414651', padding: '0 4px', cursor: 'pointer', outline: 'none' }}
        >
          <option value="fr">fr</option>
          <option value="px">px</option>
          <option value="fill">fill</option>
        </select>
      </div>
    </div>
  )
}

function RightPanel({ bgColor, onBgColorChange, selectedElement, onUpdateElement, onDeleteElement, onBringForward, onSendBackward,
  selectedZoneId, zoneColTrack, zoneRowTrack, zoneStyle, gridGap, onUpdateZoneColTrack, onUpdateZoneRowTrack, onUpdateZoneStyle, onUpdateGridGap }) {
  const [rightTab, setRightTab] = useState('design')
  const [dimsOpen, setDimsOpen] = useState(true)
  const [bgOpen, setBgOpen]     = useState(true)

  const tabs = [{ id: 'design', label: 'Design' }, { id: 'presentation', label: 'Presentation' }]

  const panelStyle = { width: 320, borderLeft: '1px solid #E9EAEB', background: '#FFFFFF' }

  // ── Element properties panel (shown when an element is selected) ──────────
  if (selectedElement) {
    const el = selectedElement
    const typeLabel = EL_TYPE_LABEL[el.type] || 'Element'
    return (
      <div className="flex flex-col shrink-0 overflow-y-auto" style={panelStyle}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #E9EAEB' }}>
          <div style={{ fontSize: 13, color: '#717680', marginBottom: 2 }}>Selected</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#0A0D12' }}>{typeLabel}</div>
        </div>

        {/* Position */}
        <SectionHeader label="Position" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>X</div>
            <NumInput value={el.x} onChange={(v) => onUpdateElement(el.id, { x: v })} unit="px" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>Y</div>
            <NumInput value={el.y} onChange={(v) => onUpdateElement(el.id, { y: v })} unit="px" />
          </div>
        </div>

        {/* Size */}
        <SectionHeader label="Size" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>W</div>
            <NumInput value={el.width}  onChange={(v) => onUpdateElement(el.id, { width: Math.max(1, v) })}  unit="px" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>H</div>
            <NumInput value={el.height} onChange={(v) => onUpdateElement(el.id, { height: Math.max(1, v) })} unit="px" />
          </div>
        </div>

        {/* Style — rect fill */}
        {el.type === 'rect' && (
          <>
            <SectionHeader label="Fill" open={true} onToggle={() => {}} />
            <div style={{ padding: '0 20px 16px' }}>
              <div className="flex items-center gap-3" style={{ background: '#FAFAFA', border: '1px solid #D5D7DA', borderRadius: 10, padding: '8px 14px 8px 8px' }}>
                <input
                  type="color"
                  value={el.fill || '#E9EAEB'}
                  onChange={(e) => onUpdateElement(el.id, { fill: e.target.value })}
                  style={{ width: 24, height: 24, borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer', background: 'none' }}
                />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0A0D12' }}>
                  {(el.fill || '#E9EAEB').replace('#', '').toUpperCase()}
                </span>
                <span style={{ fontSize: 13, color: '#717680' }}>100 %</span>
              </div>
            </div>
          </>
        )}

        {/* Style — text */}
        {el.type === 'text' && (
          <>
            <SectionHeader label="Text" open={true} onToggle={() => {}} />
            <div style={{ padding: '0 20px 16px', display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>Size</div>
                <NumInput value={el.fontSize || 16} onChange={(v) => onUpdateElement(el.id, { fontSize: Math.max(8, v) })} unit="px" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>Color</div>
                <div className="flex items-center gap-2" style={{ background: '#FAFAFA', border: '1px solid #D5D7DA', borderRadius: 10, padding: '6px 10px 6px 8px' }}>
                  <input
                    type="color"
                    value={el.color || '#0A0D12'}
                    onChange={(e) => onUpdateElement(el.id, { color: e.target.value })}
                    style={{ width: 22, height: 22, borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer', background: 'none' }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Layer controls */}
        <SectionHeader label="Layer" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 8 }}>
          <button
            onClick={() => onBringForward(el.id)}
            style={{ flex: 1, padding: '8px 0', background: '#F5F5F5', border: '1px solid #E9EAEB', borderRadius: 8, fontSize: 13, color: '#0A0D12', cursor: 'pointer' }}
          >
            ↑ Forward
          </button>
          <button
            onClick={() => onSendBackward(el.id)}
            style={{ flex: 1, padding: '8px 0', background: '#F5F5F5', border: '1px solid #E9EAEB', borderRadius: 8, fontSize: 13, color: '#0A0D12', cursor: 'pointer' }}
          >
            ↓ Backward
          </button>
        </div>

        {/* Delete */}
        <div style={{ padding: '0 20px 20px' }}>
          <button
            onClick={() => onDeleteElement(el.id)}
            style={{ width: '100%', padding: '8px 0', background: '#FEF3F2', border: '1px solid #FECDCA', borderRadius: 8, fontSize: 13, color: '#D92D20', cursor: 'pointer' }}
          >
            Delete element
          </button>
        </div>
      </div>
    )
  }

  // ── Zone properties panel ────────────────────────────────────────────────
  if (selectedZoneId && !selectedElement) {
    return (
      <div className="flex flex-col shrink-0 overflow-y-auto" style={panelStyle}>
        {/* Header */}
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #E9EAEB' }}>
          <div style={{ fontSize: 13, color: '#717680', marginBottom: 2 }}>Selected</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#0A0D12' }}>Zone</div>
        </div>

        {/* W / H with unit */}
        <SectionHeader label="Size" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 12 }}>
          <TrackInput label="W" track={zoneColTrack} onChange={onUpdateZoneColTrack} />
          <TrackInput label="H" track={zoneRowTrack} onChange={onUpdateZoneRowTrack} />
        </div>

        {/* Gap */}
        <SectionHeader label="Gap" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 16px' }}>
          <NumInput value={gridGap} onChange={(v) => onUpdateGridGap(Math.max(0, v))} unit="px" />
        </div>

        {/* Padding */}
        <SectionHeader label="Padding" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 16px' }}>
          <NumInput
            value={zoneStyle.padding ?? 0}
            onChange={(v) => onUpdateZoneStyle({ padding: Math.max(0, v) })}
            unit="px"
          />
        </div>

        {/* Corner Radius */}
        <SectionHeader label="Corner Radius" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 20px' }}>
          <NumInput
            value={zoneStyle.borderRadius ?? 0}
            onChange={(v) => onUpdateZoneStyle({ borderRadius: Math.max(0, v) })}
            unit="px"
          />
        </div>
      </div>
    )
  }

  // ── Slide properties panel (default: no element selected) ─────────────────
  return (
    <div className="flex flex-col shrink-0 overflow-y-auto" style={panelStyle}>
      {/* Pill tabs */}
      <div style={{ padding: '12px 20px 20px', borderBottom: '1px solid #E9EAEB' }}>
        <div className="flex gap-2" style={{ background: '#FFFFFF', padding: 4, borderRadius: 12, border: '1px solid #E9EAEB' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setRightTab(t.id)}
              className="flex-1 transition-colors"
              style={{ padding: '6px 12px', borderRadius: 8, background: rightTab === t.id ? '#F5F5F5' : 'transparent', fontSize: 14, fontWeight: rightTab === t.id ? 500 : 400, color: rightTab === t.id ? '#0A0D12' : '#717680', border: 'none', cursor: 'pointer' }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {rightTab === 'design' && (
        <>
          <SectionHeader label="Dimensions" open={dimsOpen} onToggle={() => setDimsOpen(!dimsOpen)} />
          {dimsOpen && (
            <div style={{ padding: '0 20px 20px', display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}><DimInput label="W" defaultValue="1920" unit="px" /></div>
              <div style={{ flex: 1 }}><DimInput label="H" defaultValue="1080" unit="px" /></div>
            </div>
          )}

          <SectionHeader label="Background" open={bgOpen} onToggle={() => setBgOpen(!bgOpen)} />
          {bgOpen && (
            <div style={{ padding: '0 20px 20px' }}>
              <div className="flex items-center gap-3" style={{ background: '#FAFAFA', border: '1px solid #D5D7DA', borderRadius: 10, padding: '8px 14px 8px 8px' }}>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => onBgColorChange(e.target.value)}
                  style={{ width: 24, height: 24, borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer', background: 'none' }}
                  title={bgColor}
                />
                <span className="flex-1" style={{ fontSize: 14, fontWeight: 500, color: '#0A0D12' }}>
                  {bgColor.replace('#', '').toUpperCase()}
                </span>
                <span style={{ fontSize: 14, color: '#717680', flexShrink: 0 }}>100 %</span>
              </div>
            </div>
          )}
        </>
      )}

      {rightTab === 'presentation' && (
        <div className="flex flex-col items-center justify-center flex-1 text-center gap-3" style={{ padding: 24 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="13" rx="1.5" stroke="#D5D7DA" strokeWidth="1.5"/>
            <path d="M12 18v2M9 20h6" stroke="#D5D7DA" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p style={{ fontSize: 14, color: '#A4A7AE' }}>Presentation settings will appear here</p>
        </div>
      )}
    </div>
  )
}

// ─── Bottom Bar ───────────────────────────────────────────────────────────────

function BottomBar() {
  return (
    <div className="border-t border-gray-200 bg-white" style={{ height: 160 }}>
      {/* Timeline header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <span className="text-xs text-gray-500 font-mono">0:00:00.0 / 00:00:00.0</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Page thumbnails */}
      <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto">
        {/* Page 1 - active */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-20 bg-white border-2 border-blue-500 rounded overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-0.5 p-1">
                <div className="bg-gray-200 rounded-sm col-span-2" />
                <div className="bg-gray-200 rounded-sm" />
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500">Page 1</span>
        </div>

        {/* Add page button */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <button
            className="w-20 border-2 border-dashed border-gray-200 rounded hover:border-gray-300 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-500"
            style={{ aspectRatio: '16/9' }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="text-xs text-gray-400">add</span>
        </div>
      </div>
    </div>
  )
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function CanvasToolbar({ activeTool, setActiveTool }) {
  const tools = [
    {
      id: 'cursor', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M4 4l12 7-6 1-3 6L4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'pen', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M14 3l3 3-9 9-4 1 1-4 9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'rect', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="5" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      id: 'circle', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      id: 'triangle', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M10 4l7 12H3L10 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'star', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M10 2l2.4 5.2H18l-4.5 3.3 1.7 5.2L10 13l-5.2 2.7 1.7-5.2L2 7.2h5.6L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'arrow', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'line', icon: (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M4 16L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
  ]

  return (
    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTool(t.id)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
            activeTool === t.id
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          }`}
          title={t.id}
        >
          {t.icon}
        </button>
      ))}
    </div>
  )
}

// ─── Main Editor Page ─────────────────────────────────────────────────────────

// ─── Grid track parsing ───────────────────────────────────────────────────────

function parseGrid(templateStr) {
  if (!templateStr) return [{ value: 1, unit: 'fr' }]
  return templateStr.trim().split(/\s+/).map((token) => {
    const fr = token.match(/^([\d.]+)fr$/)
    if (fr) return { value: parseFloat(fr[1]), unit: 'fr' }
    const px = token.match(/^([\d.]+)px$/)
    if (px) return { value: parseFloat(px[1]), unit: 'px' }
    return { value: 1, unit: 'fr' }
  })
}

// ─────────────────────────────────────────────────────────────────────────────

const defaultLayout = LAYOUT_PRESETS[0].items[0]

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('layout')
  const [selectedLayout, setSelectedLayout] = useState(defaultLayout)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [activeTool, setActiveTool] = useState('cursor')

  // ── Free canvas elements ─────────────────────────────────────────────────
  const [elements, setElements] = useState([])
  const [selectedElementId, setSelectedElementId] = useState(null)
  const [editingElementId, setEditingElementId] = useState(null)
  const elementCounter = useRef(0)

  // ── Zone state ───────────────────────────────────────────────────────────
  const [selectedZoneId, setSelectedZoneId] = useState(null)
  const [zoneStyles, setZoneStyles] = useState({}) // { [zoneId]: { padding, borderRadius } }
  const [gridTracks, setGridTracks] = useState(() => ({
    cols: parseGrid(defaultLayout.gridCols),
    rows: parseGrid(defaultLayout.gridRows),
  }))
  const [gridGap, setGridGap] = useState(2)

  const selectedElement = elements.find((el) => el.id === selectedElementId) ?? null
  const selectedZone    = selectedLayout?.zones.find((z) => z.id === selectedZoneId) ?? null

  // Which track does the selected zone use?
  const zoneColIdx  = selectedZone ? (parseInt(String(selectedZone.style.gridColumn ?? '1').split('/')[0].trim(), 10) - 1) : 0
  const zoneRowIdx  = selectedZone ? (parseInt(String(selectedZone.style.gridRow    ?? '1').split('/')[0].trim(), 10) - 1) : 0
  const zoneColTrack = gridTracks?.cols?.[zoneColIdx] ?? { value: 1, unit: 'fr' }
  const zoneRowTrack = gridTracks?.rows?.[zoneRowIdx] ?? { value: 1, unit: 'fr' }

  const handleSelectLayout = (layout) => {
    setSelectedLayout(layout)
    setGridTracks({ cols: parseGrid(layout.gridCols), rows: parseGrid(layout.gridRows) })
    setZoneStyles({})
    setSelectedZoneId(null)
  }

  const handleSelectZone = (zoneId) => {
    setSelectedZoneId(zoneId)
    setSelectedElementId(null)
    setEditingElementId(null)
  }

  const handleUpdateZoneStyle = (zoneId, patch) => {
    setZoneStyles((prev) => ({ ...prev, [zoneId]: { ...prev[zoneId], ...patch } }))
  }

  const handleUpdateZoneColTrack = (track) => {
    if (!gridTracks) return
    const cols = [...gridTracks.cols]
    cols[zoneColIdx] = track
    setGridTracks({ ...gridTracks, cols })
  }

  const handleUpdateZoneRowTrack = (track) => {
    if (!gridTracks) return
    const rows = [...gridTracks.rows]
    rows[zoneRowIdx] = track
    setGridTracks({ ...gridTracks, rows })
  }

  const handleAddElement = (partial) => {
    const n = ++elementCounter.current
    const el = {
      // sensible defaults — overridden by partial
      x: 80 + (n % 10) * 24,
      y: 80 + (n % 8) * 18,
      width: 180,
      height: 100,
      zIndex: n,
      ...partial,
      id: `el_${n}`,
    }
    setElements((prev) => [...prev, el])
    setSelectedElementId(el.id)
    setEditingElementId(null)
    setActiveTool('cursor') // return to cursor after placing
  }

  const handleUpdateElement = (id, changes) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...changes } : el)))
  }

  const handleDeleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id))
    setSelectedElementId(null)
    setEditingElementId(null)
  }

  const handleBringForward = (id) => {
    setElements((prev) => {
      const maxZ = Math.max(...prev.map((e) => e.zIndex))
      return prev.map((e) => (e.id === id ? { ...e, zIndex: maxZ + 1 } : e))
    })
  }

  const handleSendBackward = (id) => {
    setElements((prev) => {
      const el = prev.find((e) => e.id === id)
      if (!el) return prev
      return prev.map((e) => (e.id === id ? { ...e, zIndex: Math.max(0, el.zIndex - 1) } : e))
    })
  }

  const handleDeselectAll = () => {
    setSelectedElementId(null)
    setEditingElementId(null)
    setSelectedZoneId(null)
  }

  const panelProps = { onAddElement: handleAddElement }

  return (
    <div className="flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>

      {/* ── Top Bar ── */}
      <header
        className="flex items-center justify-between px-4 shrink-0 border-b"
        style={{ height: 56, backgroundColor: '#fff', borderColor: '#E4E7EC' }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link to="/design-system" className="text-gray-900 font-black italic text-lg tracking-tight hover:opacity-80">
            paddle
          </Link>
          {/* Auto-save pill */}
          <div className="flex items-center gap-1.5 border border-gray-200 rounded-full px-2.5 py-1 text-xs text-gray-500">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Auto-save on
          </div>
          {/* Plus button */}
          <button className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Center */}
        <span className="text-sm font-medium text-gray-700">Untitled Presentation</span>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M6 4l10 6-10 6V4z" fill="currentColor"/>
            </svg>
            Preview
          </button>
        </div>
      </header>

      {/* ── Main area ── */}
      <div className="flex flex-1 min-h-0">

        {/* ── Left Icon Sidebar ── */}
        <div
          className="flex flex-col py-3 shrink-0 border-r gap-1.5"
          style={{ width: 72, backgroundColor: '#fff', borderColor: '#E9EAEB' }}
        >
          {SIDEBAR_TABS.map(({ id, label, Icon }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex flex-col items-center gap-1.5 mx-1.5 rounded-lg cursor-pointer transition-colors"
                style={{
                  padding: '10px 12px',
                  backgroundColor: isActive ? '#F5F5F5' : 'transparent',
                  color: isActive ? '#0A0D12' : '#717680',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = '#F9FAFB' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                <Icon />
                <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 400 }}>{label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Left Panel ── */}
        <div
          className="flex flex-col shrink-0 border-r overflow-hidden"
          style={{ width: 298, backgroundColor: '#fff', borderColor: '#E9EAEB' }}
        >
          {/* Panel header — hidden, each panel owns its own search/header */}

          {/* Panel content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === 'layout' && (
              <LayoutPanel
                selectedLayoutId={selectedLayout?.id}
                onSelectLayout={handleSelectLayout}
              />
            )}
            {activeTab === 'text' && <TextPanel {...panelProps} />}
            {activeTab === 'logo' && <LogoPanel {...panelProps} />}
            {activeTab === 'widgets' && <WidgetsPanel {...panelProps} />}
            {activeTab === 'media' && <MediaPanel {...panelProps} />}
            {activeTab === 'brandkit' && <BrandKitPanel {...panelProps} />}
            {activeTab === 'template' && (
              <TemplatePanel {...panelProps} onSelectLayout={handleSelectLayout} />
            )}
          </div>
        </div>

        {/* ── Canvas Area ── */}
        <div
          className="flex-1 flex flex-col min-w-0 overflow-hidden"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          {/* Canvas top controls */}
          <div className="flex items-center justify-between px-4 py-2 shrink-0">
            <span className="text-xs font-medium text-gray-500">Page 1</span>
            <div className="flex items-center gap-2">
              <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-white hover:bg-gray-50 transition-colors">
                <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                New Page
              </button>
              <button className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <circle cx="4" cy="10" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="16" cy="10" r="1.5"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center px-6 min-h-0">
            <div
              className="shadow-lg overflow-hidden"
              style={{
                aspectRatio: '16/9',
                maxWidth: '90%',
                maxHeight: '85%',
                width: 'min(760px, 90%)',
                backgroundColor: bgColor,
              }}
            >
              <FreeCanvas
                elements={elements}
                selectedId={selectedElementId}
                editingId={editingElementId}
                selectedZoneId={selectedZoneId}
                zoneStyles={zoneStyles}
                gridTracks={gridTracks}
                gridGap={gridGap}
                bgColor={bgColor}
                layout={selectedLayout}
                activeTool={activeTool}
                onSelectElement={(id) => { setSelectedElementId(id); setEditingElementId(null); setSelectedZoneId(null) }}
                onDeselectAll={handleDeselectAll}
                onUpdateElement={handleUpdateElement}
                onAddElement={handleAddElement}
                onSetEditing={(id) => { setSelectedElementId(id); setEditingElementId(id) }}
                onSelectZone={handleSelectZone}
                onUpdateGridTracks={setGridTracks}
              />
            </div>
          </div>

          {/* Canvas toolbar */}
          <div className="flex justify-center py-3 shrink-0" onClick={(e) => e.stopPropagation()}>
            <CanvasToolbar activeTool={activeTool} setActiveTool={setActiveTool} />
          </div>
        </div>

        {/* ── Right Panel ── */}
        <RightPanel
          bgColor={bgColor}
          onBgColorChange={setBgColor}
          selectedElement={selectedElement}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
          onBringForward={handleBringForward}
          onSendBackward={handleSendBackward}
          selectedZoneId={selectedZoneId}
          zoneColTrack={zoneColTrack}
          zoneRowTrack={zoneRowTrack}
          zoneStyle={zoneStyles[selectedZoneId] ?? { padding: 0, borderRadius: 0 }}
          gridGap={gridGap}
          onUpdateZoneColTrack={handleUpdateZoneColTrack}
          onUpdateZoneRowTrack={handleUpdateZoneRowTrack}
          onUpdateZoneStyle={(patch) => handleUpdateZoneStyle(selectedZoneId, patch)}
          onUpdateGridGap={setGridGap}
        />
      </div>

      {/* ── Bottom Bar ── */}
      <BottomBar />
    </div>
  )
}
