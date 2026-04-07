import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FreeCanvas from '../components/canvas/FreeCanvas'
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

// ─── Right Panel ──────────────────────────────────────────────────────────────

const EL_TYPE_LABEL = { rect: 'Rectangle', text: 'Text', image: 'Image', logo: 'Logo', widget: 'Widget' }

// Compact numeric input used throughout the right panel
function NumInput({ value, onChange, unit }) {
  return (
    <div
      className="flex items-center gap-2"
      style={{ background: '#FAFAFA', border: '1px solid #D5D7DA', borderRadius: 10, padding: '8px 14px 8px 8px' }}
    >
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', background: 'transparent', fontSize: 16, fontWeight: 500, color: '#0A0D12', outline: 'none', border: 'none' }}
      />
      <span style={{ fontSize: 16, color: '#717680', flexShrink: 0 }}>{unit}</span>
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


// ── Presentation panel — shared between zone and slide contexts ───────────────
// All tokens passed in as props to avoid re-declaring DS inside the function body.
function PresentationPanel({ presDetailsOpen, setPresDetailsOpen, presName, setPresName, pages, presPageMeta, setPresPageMeta, onAddPage, DS, bodyM, bodyMMedium, bodyMMedQuart, SectionHeader }) {
  const fieldStyle = {
    background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`,
    borderRadius: DS.radiusXl, padding: '8px 16px',
    minHeight: 40, display: 'flex', alignItems: 'center',
  }
  const inputStyle = (hasValue) => ({
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    fontSize: 16, lineHeight: '24px', fontWeight: 400,
    color: hasValue ? DS.fgPrimary : '#A4A7AE',
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Presentation Details section */}
        <SectionHeader label="Presentation Details" open={presDetailsOpen} onToggle={() => setPresDetailsOpen(!presDetailsOpen)} />
        {presDetailsOpen && (
          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ ...bodyMMedQuart }}>Presentation Name</span>
              <div style={fieldStyle}>
                <input
                  type="text" value={presName} onChange={(e) => setPresName(e.target.value)}
                  placeholder="Untitled Presentation" style={inputStyle(presName)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...bodyMMedQuart }}>Total Duration</span>
              <span style={{ ...bodyMMedium }}>00:00:00.0</span>
            </div>
          </div>
        )}

        {/* One section per page — driven by bottom-bar pages */}
        {pages.map((page, idx) => {
          const meta = presPageMeta[page.id] ?? { name: '', duration: '' }
          return (
            <div key={page.id}>
              <div style={{ borderTop: `1px solid ${DS.borderDefault}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ ...bodyM }}>{page.label || `Page ${idx + 1}`}</span>
              </div>
              <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ ...bodyMMedQuart }}>Page Name</span>
                  <div style={fieldStyle}>
                    <input
                      type="text" value={meta.name}
                      onChange={(e) => setPresPageMeta((prev) => ({ ...prev, [page.id]: { ...meta, name: e.target.value } }))}
                      placeholder={`Page ${idx + 1}`} style={inputStyle(meta.name)}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ ...bodyMMedQuart }}>Duration</span>
                  <div style={{ ...fieldStyle, height: 40 }}>
                    <input
                      type="text" value={meta.duration}
                      onChange={(e) => setPresPageMeta((prev) => ({ ...prev, [page.id]: { ...meta, duration: e.target.value } }))}
                      placeholder="00:00:00.0" style={inputStyle(meta.duration)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Page — pinned bottom, bg/brand full-width button */}
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, padding: 20, background: DS.bgPrimary }}>
        <button
          onClick={onAddPage}
          style={{
            width: '100%', padding: '8px 14px',
            background: '#1570EF', border: '1px solid #175CD3',
            borderRadius: DS.radiusXl, cursor: 'pointer',
            fontSize: 16, lineHeight: '24px', fontWeight: 600, color: '#FFFFFF',
            boxShadow: 'inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), 0px 1px 2px 0px rgba(10,13,18,0.05)',
          }}
        >Add Page</button>
      </div>
    </div>
  )
}

function RightPanel({
  bgColor,
  onBgColorChange,
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  onBringForward,
  onSendBackward,
  selectedZoneId,
  zoneStyle,
  onUpdateZoneStyle,
  pages,
  onAddPage,
  presPageMeta,
  setPresPageMeta,
}) {
  const [rightTab, setRightTab] = useState('design')
  const [dimsOpen, setDimsOpen] = useState(true)
  const [bgOpen, setBgOpen] = useState(true)
  const [appearanceOpen, setAppearanceOpen] = useState(true)
  const [layersOpen, setLayersOpen] = useState(false)
  const [presDetailsOpen, setPresDetailsOpen] = useState(true)
  const [presName, setPresName] = useState('')

  const panelStyle = { width: 320, borderLeft: '1px solid #E9EAEB', background: '#FFFFFF' }

  const DS = {
    bgPrimary: '#FFFFFF',
    bgPage: '#FAFAFA',
    bgHover: '#F5F5F5',
    borderDefault: '#E9EAEB',
    borderPrimary: '#D5D7DA',
    fgPrimary: '#0A0D12',
    fgQuaternary: '#717680',
    radiusXl: 10,
    radiusL: 8,
    radiusSm: 4,
    shadow: '0px 1px 2px 0px rgba(10,13,18,0.05)',
  }

  const COLOR_TOKEN = {
    '#FFFFFF': 'Neutral/White', '#ffffff': 'Neutral/White',
    '#F5F5F5': 'Neutral/100', '#f5f5f5': 'Neutral/100',
    '#E9EAEB': 'Neutral/200', '#D5D7DA': 'Neutral/300',
    '#0A0D12': 'Neutral/950', '#000000': 'Neutral/Black',
  }

  const colorTokenName = (hex) =>
    COLOR_TOKEN[hex] ??
    COLOR_TOKEN[hex?.toUpperCase()] ??
    (hex ?? '').replace('#', '').toUpperCase()

  const bodyMMedium = { fontSize: 16, lineHeight: '24px', fontWeight: 500, color: DS.fgPrimary }
  const bodyM = { fontSize: 16, lineHeight: '24px', fontWeight: 400, color: DS.fgPrimary }
  const bodyMQuart = { fontSize: 16, lineHeight: '24px', fontWeight: 400, color: DS.fgQuaternary }
  const bodyMMedQuart = { fontSize: 16, lineHeight: '24px', fontWeight: 500, color: DS.fgQuaternary }

  const propInputPrimary = {
    background: DS.bgPrimary,
    border: `1px solid ${DS.borderPrimary}`,
    borderRadius: DS.radiusXl,
    padding: '8px 14px 8px 8px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    overflow: 'hidden',
    boxShadow: DS.shadow,
  }

  const numInputInner = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    ...bodyMMedium,
    minWidth: 0,
  }

  const iconBtn = {
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: DS.radiusL,
  }

  const iconBtnFlat = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: DS.fgQuaternary,
    display: 'flex',
    alignItems: 'center',
  }

  const IconRadius = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 13V8C3 5.239 5.239 3 8 3H13" stroke={DS.fgQuaternary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )

  const IconOpacity = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="5" height="5" fill={DS.borderDefault} />
      <rect x="9" y="2" width="5" height="5" fill={DS.borderPrimary} />
      <rect x="2" y="9" width="5" height="5" fill={DS.borderPrimary} />
      <rect x="9" y="9" width="5" height="5" fill={DS.borderDefault} />
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke={DS.fgQuaternary} strokeWidth="1.25" />
    </svg>
  )

  const IconEye = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8C1.5 8 4 3.5 8 3.5C12 3.5 14.5 8 14.5 8C14.5 8 12 12.5 8 12.5C4 12.5 1.5 8 1.5 8Z" stroke={DS.fgQuaternary} strokeWidth="1.25" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="2" stroke={DS.fgQuaternary} strokeWidth="1.25" />
    </svg>
  )

  const IconMinus = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13" stroke={DS.fgQuaternary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )

  const IconBorderWidth = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4H14" stroke={DS.fgQuaternary} strokeWidth="2" strokeLinecap="round" />
      <path d="M2 8H14" stroke={DS.fgQuaternary} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M2 12H14" stroke={DS.fgQuaternary} strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  )

  const IconChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 8l5 5 5-5" stroke={DS.fgQuaternary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const IconMinusSm = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 10H16" stroke={DS.fgQuaternary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )

  const IconSquareSm = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="14" height="14" rx="1.5" stroke={DS.fgQuaternary} strokeWidth="1.5" />
    </svg>
  )

  function StyledSelect({ value, onChange, options, leadingIcon, style: extraStyle }) {
    return (
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          ...propInputPrimary,
          padding: '8px 14px',
          ...extraStyle
        }}
      >
        {leadingIcon && (
          <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', marginRight: 2 }}>
            {leadingIcon}
          </span>
        )}
        <select
          value={value}
          onChange={onChange}
          style={{
            flex: 1,
            appearance: 'none',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            ...bodyMMedium,
            paddingRight: 16,
            cursor: 'pointer',
            minWidth: 0,
          }}
        >
          {options.map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
        <span
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex'
          }}
        >
          <IconChevronDown />
        </span>
      </div>
    )
  }

  function FillBorderHeader({ label }) {
    return (
      <div
        style={{
          borderTop: `1px solid ${DS.borderDefault}`,
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={bodyM}>{label}</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button style={iconBtnFlat}><IconEye /></button>
          <button style={iconBtnFlat}><IconMinus /></button>
        </div>
      </div>
    )
  }

  const skeuShadowPanel = `inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), 0px 1px 2px 0px rgba(10,13,18,0.05)`

  const renderTabBar = () => (
    <div style={{ background: '#FFFFFF', flexShrink: 0 }}>
      {/* Save + Preview header */}
      <div style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, borderBottom: `1px solid ${DS.borderDefault}` }}>
        <button style={{ border: '1px solid #D5D7DA', borderRadius: 10, padding: '8px 14px', background: '#FFFFFF', fontSize: 14, fontWeight: 600, color: '#0A0D12', cursor: 'pointer', fontFamily: 'inherit', lineHeight: '20px', boxShadow: skeuShadowPanel }}>
          Save
        </button>
        <button style={{ border: '1px solid #175CD3', borderRadius: 10, padding: '8px 14px', background: '#1570EF', fontSize: 14, fontWeight: 600, color: '#FFFFFF', cursor: 'pointer', fontFamily: 'inherit', lineHeight: '20px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: skeuShadowPanel }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M6 4l10 6-10 6V4z" fill="currentColor"/>
          </svg>
          Preview
        </button>
      </div>
      {/* Tabs */}
      <div style={{ padding: '20px 20px 20px', borderBottom: `1px solid ${DS.borderDefault}`, display: 'flex', gap: 8 }}>
        {[{ id: 'design', label: 'Design' }, { id: 'presentation', label: 'Presentation' }].map((t) => (
          <button
            key={t.id}
            onClick={() => setRightTab(t.id)}
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: DS.radiusXl,
              background: rightTab === t.id ? '#F5F5F5' : 'transparent',
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 500,
              color: rightTab === t.id ? DS.fgPrimary : DS.fgQuaternary,
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              fontFamily: 'inherit',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )

  const renderPresentationPanel = () => (
    <PresentationPanel
      presDetailsOpen={presDetailsOpen}
      setPresDetailsOpen={setPresDetailsOpen}
      presName={presName}
      setPresName={setPresName}
      pages={pages}
      presPageMeta={presPageMeta}
      setPresPageMeta={setPresPageMeta}
      onAddPage={onAddPage}
      DS={DS}
      bodyM={bodyM}
      bodyMMedium={bodyMMedium}
      bodyMMedQuart={bodyMMedQuart}
      SectionHeader={SectionHeader}
    />
  )

  const renderLogoDesignPanel = () => {
    if (selectedElement?.type !== 'logo') return null

    const el = selectedElement
    const m = el.logoMeta || {}
    const opacity = el.opacity ?? 100

    const _v2 = 'https://www.figma.com/api/mcp/asset/13ba673c-5fa1-41a4-bf2a-8384806b1422'
    const _v3 = 'https://www.figma.com/api/mcp/asset/53c67ef5-8238-4e2f-8476-4b5ee6fbc226'
    const _v4 = 'https://www.figma.com/api/mcp/asset/6c1b6171-0aa0-49e9-b758-724400cf0853'
    const _v5 = 'https://www.figma.com/api/mcp/asset/577753b3-e2d8-4592-8418-f6a37328b8ca'
    const _v6 = 'https://www.figma.com/api/mcp/asset/dea19023-d3ef-4a35-b0b4-075958f557c5'
    const _v7 = 'https://www.figma.com/api/mcp/asset/3ad2b7e7-6a1e-44ae-bf56-3fcf3b4e8a7d'
    const _sq = 'https://www.figma.com/api/mcp/asset/8f215aa1-e3bd-41ac-9c74-5e78a5750738'
    const _sq1 = 'https://www.figma.com/api/mcp/asset/abfb243b-b2c0-4708-ae6c-6d4fa1fae54a'
    const _vol = 'https://www.figma.com/api/mcp/asset/144ae2a7-1d07-4e5c-bd76-411004630bb3'
    const _g28 = 'https://www.figma.com/api/mcp/asset/bf646124-389a-4b59-a5e3-cf5f62ad126d'
    const _fvH = 'https://www.figma.com/api/mcp/asset/0cd55f59-e129-450a-80f4-f417263eb1bf'
    const _fvV = 'https://www.figma.com/api/mcp/asset/419f526a-1d83-416c-a0a7-a52ed8341763'
    const _sun = 'https://www.figma.com/api/mcp/asset/74a92172-8d73-4362-9f38-0024c04a4581'
    const _v12 = 'https://www.figma.com/api/mcp/asset/ea8451c8-ca6d-42ea-866b-f5d8797f75dd'
    const _v10 = 'https://www.figma.com/api/mcp/asset/2bf73a33-cfd5-4c26-af49-a4e817d78f87'
    const _v11 = 'https://www.figma.com/api/mcp/asset/5c1a9459-372e-4df5-9b18-fe68f9524c3e'

    const selIn = {
      background: DS.bgPage,
      border: `1px solid ${DS.borderPrimary}`,
      borderRadius: DS.radiusXl,
      padding: '8px 14px 8px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflow: 'hidden',
      height: 40,
    }

    const skeuShadow = `inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), ${DS.shadow}`

    const AlignGroup = ({ icons }) => (
      <div style={{ flex: 1, display: 'flex', background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl }}>
        {icons.map((src, i) => (
          <button
            key={i}
            style={{
              flex: 1,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: i === 0 ? DS.bgPrimary : 'transparent',
              border: i === 0 ? `1px solid ${DS.borderPrimary}` : 'none',
              borderRadius: i === 0 ? DS.radiusXl : 0,
              cursor: 'pointer',
              padding: 0,
              boxShadow: i === 0 ? skeuShadow : 'none',
            }}
          >
            <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: '8.33%' }}>
                <div style={{ position: 'absolute', inset: '-3.33%' }}>
                  <img alt="" src={src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    )

    const LRow = ({ label, invisible, children }) => (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
        <span style={{ width: 70, flexShrink: 0, ...bodyMMedQuart, opacity: invisible ? 0 : 1 }}>{label}</span>
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      </div>
    )

    const ImgFillHeader = ({ label }) => (
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={bodyM}>{label}</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button style={iconBtnFlat}>
            <div style={{ width: 24, height: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '20.84% 8.33%' }}>
                <div style={{ position: 'absolute', inset: '-7.14% -5%' }}>
                  <img alt="" src={_v10} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
          <button style={iconBtnFlat}>
            <div style={{ width: 24, height: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '50%', left: '20.83%', right: '20.83%', top: '50%' }}>
                <div style={{ position: 'absolute', inset: '-1px -7.14%' }}>
                  <img alt="" src={_v11} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    )

    return (
      <>
        <SectionHeader label="Position" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <AlignGroup icons={[_v5, _v6, _v7]} />
            <AlignGroup icons={[_v2, _v3, _v4]} />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {[['X', el.x, (v) => onUpdateElement(el.id, { x: v })], ['Y', el.y, (v) => onUpdateElement(el.id, { y: v })]].map(([label, val, onChange]) => (
              <div key={label} style={{ flex: 1, ...selIn }}>
                <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                  <span style={{ ...bodyMQuart, fontSize: 16 }}>{label}</span>
                </div>
                <input
                  type="number"
                  value={Math.round(val)}
                  onChange={(e) => onChange(Number(e.target.value))}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0 }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, position: 'relative' }}>
                <img alt="" src={_vol} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <span style={bodyMMedium}>0°</span>
            </div>

            <div style={{ flex: 1, display: 'flex', background: '#F5F5F5', border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl }}>
              <button
                style={{
                  flex: 1,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: DS.bgPrimary,
                  border: `1px solid ${DS.borderPrimary}`,
                  borderRadius: DS.radiusXl,
                  cursor: 'pointer',
                  padding: 0,
                  boxShadow: skeuShadow,
                }}
              >
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: 'rotate(45deg)', width: 18.29, height: 16.29, position: 'relative' }}>
                    <img alt="" src={_g28} style={{ position: 'absolute', inset: '-3.62% 0 0 -4.08%', width: '107%', height: '107%', display: 'block', maxWidth: 'none' }} />
                  </div>
                </div>
              </button>

              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '8.33% 12.5%' }}>
                    <div style={{ position: 'absolute', inset: '-3.33% -3.69%' }}>
                      <img alt="" src={_fvH} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>

              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '12.5% 8.33%' }}>
                    <div style={{ position: 'absolute', inset: '-3.69% -3.33%' }}>
                      <img alt="" src={_fvV} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <SectionHeader label="Appearance" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <LRow label="Radius">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, padding: 4, borderRadius: DS.radiusL, position: 'relative' }}>
                <img alt="" src={_sq} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <span style={{ ...bodyMMedium }}>12</span>
            </div>
          </LRow>

          <LRow label="Opacity">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, padding: 4, borderRadius: DS.radiusL, position: 'relative' }}>
                <img alt="" src={_sq1} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <input
                type="number"
                min={0}
                max={100}
                value={opacity}
                onChange={(e) => onUpdateElement(el.id, { opacity: Math.max(0, Math.min(100, Number(e.target.value))) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0 }}
              />
              <span style={{ ...bodyMQuart, flexShrink: 0 }}>%</span>
            </div>
          </LRow>
        </div>

        <ImgFillHeader label="Fill" />
        <div style={{ padding: '0 20px 20px' }}>
          <div
            style={{
              background: DS.bgPrimary,
              border: `1px solid ${DS.borderPrimary}`,
              borderRadius: DS.radiusXl,
              padding: '8px 14px 8px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              overflow: 'hidden',
              boxShadow: DS.shadow,
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: 4, background: m.bg || '#444CE7', border: `1px solid ${DS.borderPrimary}`, flexShrink: 0 }} />
            <span style={{ ...bodyMMedium, flex: 1 }}>Primary/600</span>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${DS.borderDefault}`, borderBottom: `1px solid ${DS.borderDefault}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={bodyM}>Border</span>
          <button style={iconBtnFlat}>
            <div style={{ width: 24, height: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '20.83%' }}>
                <div style={{ position: 'absolute', inset: '-7.14%' }}>
                  <img alt="" src={_v12} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
        </div>

        <ImgFillHeader label="Drop Shadow" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <LRow label="Position">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                <span style={{ ...bodyMQuart }}>X</span>
              </div>
              <span style={{ ...bodyMMedium, flex: 1 }}>12</span>
            </div>
          </LRow>

          <LRow label="Position" invisible>
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                <span style={{ ...bodyMQuart }}>Y</span>
              </div>
              <span style={{ ...bodyMMedium, flex: 1 }}>16</span>
            </div>
          </LRow>

          <LRow label="Blur">
            <div style={{ ...selIn }}>
              <div style={{ width: 20, height: 20, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {[[1.33, 2, 1.33], [2, 2, 2], [1.33, 2, 1.33]].map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {row.map((sz, ci) => (
                      <div key={ci} style={{ width: sz, height: sz, borderRadius: 10, background: DS.fgQuaternary, flexShrink: 0 }} />
                    ))}
                  </div>
                ))}
              </div>
              <span style={{ ...bodyMMedium, flex: 1 }}>32</span>
              <span style={{ ...bodyMQuart, flexShrink: 0 }}>%</span>
            </div>
          </LRow>

          <LRow label="Spread">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, padding: 4, borderRadius: DS.radiusL, position: 'relative' }}>
                <img alt="" src={_sun} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <span style={{ ...bodyMMedium, flex: 1 }}>4</span>
              <span style={{ ...bodyMQuart, flexShrink: 0 }}>%</span>
            </div>
          </LRow>

          <LRow label="Color">
            <div style={{ ...selIn }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: '#0A0D12', border: `1px solid ${DS.borderPrimary}`, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', right: 0, top: -1, width: 10, bottom: 0, background: '#535862' }}>
                  {[[0, 2], [2, 0], [4, 2], [6, 0], [8, 2]].map(([t, l], i) => (
                    <div key={i} style={{ position: 'absolute', width: 2, height: 2, background: '#A4A7AE', top: t, left: l }} />
                  ))}
                </div>
              </div>
              <span style={{ ...bodyMMedium, flex: 1 }}>#000000</span>
              <span style={{ ...bodyMQuart, flexShrink: 0 }}>10 %</span>
            </div>
          </LRow>
        </div>

        <div style={{ padding: '16px 20px 20px', borderTop: `1px solid ${DS.borderDefault}` }}>
          <button
            onClick={() => onDeleteElement(el.id)}
            style={{ width: '100%', padding: '8px 0', background: '#FEF3F2', border: '1px solid #FECDCA', borderRadius: DS.radiusL, fontSize: 13, color: '#D92D20', cursor: 'pointer' }}
          >
            Delete logo
          </button>
        </div>
      </>
    )
  }

  const renderSelectedElementDesignPanel = () => {
    if (!selectedElement || selectedElement.type === 'logo') return null

    const el = selectedElement
    const typeLabel = EL_TYPE_LABEL[el.type] || 'Element'

    return (
      <>
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #E9EAEB' }}>
          <div style={{ fontSize: 13, color: '#717680', marginBottom: 2 }}>Selected</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#0A0D12' }}>{typeLabel}</div>
        </div>

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

        <SectionHeader label="Size" open={true} onToggle={() => {}} />
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>W</div>
            <NumInput value={el.width} onChange={(v) => onUpdateElement(el.id, { width: Math.max(1, v) })} unit="px" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#717680', marginBottom: 6 }}>H</div>
            <NumInput value={el.height} onChange={(v) => onUpdateElement(el.id, { height: Math.max(1, v) })} unit="px" />
          </div>
        </div>

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

        <div style={{ padding: '0 20px 20px' }}>
          <button
            onClick={() => onDeleteElement(el.id)}
            style={{ width: '100%', padding: '8px 0', background: '#FEF3F2', border: '1px solid #FECDCA', borderRadius: 8, fontSize: 13, color: '#D92D20', cursor: 'pointer' }}
          >
            Delete element
          </button>
        </div>
      </>
    )
  }

  const renderQRCodeDesignPanel = () => {
    const el = selectedElement

    const _linkIcon   = 'https://www.figma.com/api/mcp/asset/2082d894-92b2-4ea9-b7a9-36d71f2f42cf'
    const _eyeIcon    = 'https://www.figma.com/api/mcp/asset/8d9df9d2-27ea-4dd3-b445-6c045d0879b2'
    const _minusIcon  = 'https://www.figma.com/api/mcp/asset/6bdfdc19-83da-4d74-8068-8921986c22ac'
    const _chevronUp  = 'https://www.figma.com/api/mcp/asset/5d708a3b-02d4-45ac-b511-e533d459efc2'
    const _plusIcon   = 'https://www.figma.com/api/mcp/asset/11d46a61-1cc3-46a3-9705-6d859dd510c1'
    const _sqPlay     = 'https://www.figma.com/api/mcp/asset/70669b81-6a79-431a-8afb-6765cde47f81'
    const _sqPlay2    = 'https://www.figma.com/api/mcp/asset/e684ad94-c40a-407a-9cdc-d8a280ca7e78'
    const _rotateIcon = 'https://www.figma.com/api/mcp/asset/e427b599-ad2d-4340-80d8-d7aa0a143ca6'
    const _flipDiag   = 'https://www.figma.com/api/mcp/asset/479471ab-0a92-459a-b608-9366419be6b2'
    const _flipH      = 'https://www.figma.com/api/mcp/asset/80d8a167-0cb7-43e8-90da-d0813e8e60a5'
    const _flipV      = 'https://www.figma.com/api/mcp/asset/f2c3b7fa-1391-4cfd-ab68-6e51c3dc5a5f'
    const _alignSV    = 'https://www.figma.com/api/mcp/asset/979a4747-3e66-466b-b5cc-d0a5c27a55b3'
    const _alignCV    = 'https://www.figma.com/api/mcp/asset/452046a0-0c9e-43e5-89c0-8a187fe05eed'
    const _alignEV    = 'https://www.figma.com/api/mcp/asset/969673be-7405-4be4-b361-84aef31ae69a'
    const _alignSH    = 'https://www.figma.com/api/mcp/asset/a314c5f2-d1cb-4184-b914-d7915c1756c5'
    const _alignCH    = 'https://www.figma.com/api/mcp/asset/4c579e50-dfdb-4154-b839-602acdecfb97'
    const _alignEH    = 'https://www.figma.com/api/mcp/asset/6dffa306-4e3d-4ec9-8081-d3d4a1d04dda'

    const skeuShadow = `inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), ${DS.shadow}`

    const selIn = {
      background: DS.bgPage,
      border: `1px solid ${DS.borderPrimary}`,
      borderRadius: DS.radiusXl,
      padding: '8px 14px 8px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflow: 'hidden',
      height: 40,
    }

    const SectionDropdown = ({ label }) => (
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px' }}>
        <span style={{ flex: 1, ...bodyM }}>{label}</span>
        <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', bottom: '37.5%', left: '25%', right: '25%', top: '37.5%' }}>
            <div style={{ position: 'absolute', inset: '-16.67% -8.33%' }}>
              <img alt="" src={_chevronUp} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    )

    const ColorSectionHeader = ({ label }) => (
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px' }}>
        <span style={{ flex: 1, ...bodyM }}>{label}</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button style={iconBtnFlat}>
            <div style={{ width: 24, height: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '20.84% 8.33%' }}>
                <div style={{ position: 'absolute', inset: '-7.14% -5%' }}>
                  <img alt="" src={_eyeIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
          <button style={iconBtnFlat}>
            <div style={{ width: 24, height: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '50%', left: '20.83%', right: '20.83%', top: '50%' }}>
                <div style={{ position: 'absolute', inset: '-1px -7.14%' }}>
                  <img alt="" src={_minusIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    )

    const SectionAdd = ({ label }) => (
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px' }}>
        <span style={{ flex: 1, ...bodyM }}>{label}</span>
        <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: '20.83%' }}>
            <div style={{ position: 'absolute', inset: '-7.14%' }}>
              <img alt="" src={_plusIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    )

    const AlignGroup = ({ icons, selectedIdx = 0 }) => (
      <div style={{ flex: 1, display: 'flex', background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
        {icons.map((src, i) => (
          <button key={i} style={{
            flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: i === selectedIdx ? DS.bgPrimary : 'transparent',
            border: i === selectedIdx ? `1px solid ${DS.borderPrimary}` : 'none',
            borderRadius: i === selectedIdx ? DS.radiusXl : 0,
            cursor: 'pointer', padding: 0,
            boxShadow: i === selectedIdx ? skeuShadow : 'none',
          }}>
            <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '8.33%' }}>
                <div style={{ position: 'absolute', inset: '-3.33%' }}>
                  <img alt="" src={src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    )

    const LRow = ({ label, children }) => (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
        <span style={{ width: 70, flexShrink: 0, ...bodyMMedQuart }}>{label}</span>
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      </div>
    )

    const qrUrl    = el?.qrUrl    ?? ''
    const qrBgColor = el?.qrBgColor ?? '#FFFFFF'
    const qrFgColor = el?.qrFgColor ?? '#000000'
    const radius   = el?.borderRadius ?? 12
    const opacity  = el?.opacity      ?? 100

    const hasUrl = !!qrUrl

    return (
      <>
        {/* ── Position ──────────────────────────────────────────── */}
        <SectionDropdown label="Position" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <AlignGroup icons={[_alignSV, _alignCV, _alignEV]} />
            <AlignGroup icons={[_alignSH, _alignCH, _alignEH]} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['X', el?.x ?? 0, (v) => onUpdateElement(el.id, { x: v })],
              ['Y', el?.y ?? 0, (v) => onUpdateElement(el.id, { y: v })]].map(([lbl, val, onChange]) => (
              <div key={lbl} style={{ flex: 1, ...selIn }}>
                <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                  <span style={{ ...bodyMQuart, fontSize: 16 }}>{lbl}</span>
                </div>
                <input
                  type="number"
                  value={Math.round(val)}
                  onChange={(e) => onChange(Number(e.target.value))}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, position: 'relative' }}>
                <img alt="" src={_rotateIcon} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <span style={bodyMMedium}>0°</span>
            </div>
            <div style={{ flex: 1, display: 'flex', background: DS.bgHover, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, cursor: 'pointer', padding: 0, boxShadow: skeuShadow }}>
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: 'rotate(45deg)', width: 18.29, height: 16.29, position: 'relative' }}>
                    <img alt="" src={_flipDiag} style={{ position: 'absolute', inset: '-3.62% 0 0 -4.08%', width: '107%', height: '107%', display: 'block', maxWidth: 'none' }} />
                  </div>
                </div>
              </button>
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '8.33% 12.5%' }}>
                    <div style={{ position: 'absolute', inset: '-3.33% -3.69%' }}>
                      <img alt="" src={_flipH} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '12.5% 8.33%' }}>
                    <div style={{ position: 'absolute', inset: '-3.69% -3.33%' }}>
                      <img alt="" src={_flipV} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── QR Code ───────────────────────────────────────────── */}
        <SectionDropdown label="QR Code" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* URL input */}
          <div style={{ background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, padding: '8px 14px 8px 8px', display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
            <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: '8.61% 8.57%' }}>
                <div style={{ position: 'absolute', inset: '-3.35% -3.34%' }}>
                  <img alt="" src={_linkIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter your URL here..."
              value={qrUrl}
              onChange={(e) => el && onUpdateElement(el.id, { qrUrl: e.target.value })}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 16, lineHeight: '24px', fontWeight: 500, color: hasUrl ? DS.fgPrimary : '#a4a7ae', fontFamily: 'inherit', minWidth: 0 }}
            />
          </div>
          {/* Generate QR Code button — disabled state */}
          <button
            disabled={!hasUrl}
            style={{
              width: '100%',
              padding: '8px 14px',
              background: hasUrl ? '#1570EF' : '#F5F5F5',
              border: `1px solid ${hasUrl ? '#175CD3' : '#D5D7DA'}`,
              borderRadius: DS.radiusXl,
              fontSize: 16, lineHeight: '24px', fontWeight: 600,
              color: hasUrl ? '#FFFFFF' : '#A4A7AE',
              cursor: hasUrl ? 'pointer' : 'default',
              fontFamily: 'inherit',
              boxShadow: hasUrl ? `inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), ${DS.shadow}` : DS.shadow,
            }}
          >
            Generate QR Code
          </button>
        </div>

        {/* ── Background Color ──────────────────────────────────── */}
        <ColorSectionHeader label="Background Color" />
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, padding: '8px 14px 8px 8px', display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: qrBgColor, border: `1px solid ${DS.borderPrimary}`, flexShrink: 0, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <input type="color" value={qrBgColor} onChange={(e) => el && onUpdateElement(el.id, { qrBgColor: e.target.value })} style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
            </div>
            <span style={{ flex: 1, ...bodyMMedium }}>{qrBgColor.replace('#', '#').toUpperCase()}</span>
            <span style={{ ...bodyMQuart, flexShrink: 0 }}>100 %</span>
          </div>
        </div>

        {/* ── Foreground Color ──────────────────────────────────── */}
        <ColorSectionHeader label="Foreground Color" />
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, padding: '8px 14px 8px 8px', display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: qrFgColor, border: `1px solid ${DS.borderPrimary}`, flexShrink: 0, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <input type="color" value={qrFgColor} onChange={(e) => el && onUpdateElement(el.id, { qrFgColor: e.target.value })} style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
            </div>
            <span style={{ flex: 1, ...bodyMMedium }}>{qrFgColor.replace('#', '#').toUpperCase()}</span>
            <span style={{ ...bodyMQuart, flexShrink: 0 }}>100 %</span>
          </div>
        </div>

        {/* ── Appearance ────────────────────────────────────────── */}
        <SectionDropdown label="Appearance" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <LRow label="Radius">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, padding: 4, borderRadius: DS.radiusL, position: 'relative' }}>
                <img alt="" src={_sqPlay} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <input
                type="number"
                min={0}
                value={Math.round(radius)}
                onChange={(e) => el && onUpdateElement(el.id, { borderRadius: Math.max(0, Number(e.target.value)) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
            </div>
          </LRow>
          <LRow label="Opacity">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, padding: 4, borderRadius: DS.radiusL, position: 'relative' }}>
                <img alt="" src={_sqPlay2} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <input
                type="number"
                min={0} max={100}
                value={Math.round(opacity)}
                onChange={(e) => el && onUpdateElement(el.id, { opacity: Math.max(0, Math.min(100, Number(e.target.value))) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
              <span style={{ ...bodyMQuart, flexShrink: 0 }}>%</span>
            </div>
          </LRow>
        </div>

        {/* ── Border ────────────────────────────────────────────── */}
        <div style={{ borderTop: `1px solid ${DS.borderDefault}`, borderBottom: `1px solid ${DS.borderDefault}`, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px' }}>
          <span style={{ flex: 1, ...bodyM }}>Border</span>
          <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: '20.83%' }}>
              <div style={{ position: 'absolute', inset: '-7.14%' }}>
                <img alt="" src={_plusIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Drop Shadow ───────────────────────────────────────── */}
        <SectionAdd label="Drop Shadow" />
      </>
    )
  }

  const renderYouTubeDesignPanel = () => {
    const el = selectedElement
    // Figma asset URLs (valid ~7 days from fetch)
    const _linkIcon    = 'https://www.figma.com/api/mcp/asset/c104c723-e752-436f-b98d-0fd483afc949'
    const _checkIcon   = 'https://www.figma.com/api/mcp/asset/ae389879-e6cc-44ed-b6ba-416f88764ebd'
    const _flipDiag    = 'https://www.figma.com/api/mcp/asset/479471ab-0a92-459a-b608-9366419be6b2'
    const _flipH       = 'https://www.figma.com/api/mcp/asset/80d8a167-0cb7-43e8-90da-d0813e8e60a5'
    const _flipV       = 'https://www.figma.com/api/mcp/asset/f2c3b7fa-1391-4cfd-ab68-6e51c3dc5a5f'
    const _alignSH     = 'https://www.figma.com/api/mcp/asset/a314c5f2-d1cb-4184-b914-d7915c1756c5'
    const _alignCH     = 'https://www.figma.com/api/mcp/asset/4c579e50-dfdb-4154-b839-602acdecfb97'
    const _alignEH     = 'https://www.figma.com/api/mcp/asset/6dffa306-4e3d-4ec9-8081-d3d4a1d04dda'
    const _alignSV     = 'https://www.figma.com/api/mcp/asset/979a4747-3e66-466b-b5cc-d0a5c27a55b3'
    const _alignCV     = 'https://www.figma.com/api/mcp/asset/452046a0-0c9e-43e5-89c0-8a187fe05eed'
    const _alignEV     = 'https://www.figma.com/api/mcp/asset/969673be-7405-4be4-b361-84aef31ae69a'
    const _rotateIcon  = 'https://www.figma.com/api/mcp/asset/e427b599-ad2d-4340-80d8-d7aa0a143ca6'
    const _sqPlay      = 'https://www.figma.com/api/mcp/asset/70669b81-6a79-431a-8afb-6765cde47f81'
    const _sqPlay2     = 'https://www.figma.com/api/mcp/asset/e684ad94-c40a-407a-9cdc-d8a280ca7e78'
    const _chevronUp   = 'https://www.figma.com/api/mcp/asset/5d708a3b-02d4-45ac-b511-e533d459efc2'
    const _plusIcon    = 'https://www.figma.com/api/mcp/asset/11d46a61-1cc3-46a3-9705-6d859dd510c1'

    const skeuShadow = `inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), ${DS.shadow}`

    const selIn = {
      background: DS.bgPage,
      border: `1px solid ${DS.borderPrimary}`,
      borderRadius: DS.radiusXl,
      padding: '8px 14px 8px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflow: 'hidden',
      height: 40,
    }

    // Section header: label + chevron-up (always expanded in Figma)
    const SectionDropdown = ({ label }) => (
      <div style={{
        borderTop: `1px solid var(--border-default)`,
        display: 'flex', gap: 12, alignItems: 'center',
        padding: '12px 20px',
      }}>
        <span style={{ flex: 1, ...bodyM }}>{label}</span>
        <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', bottom: '37.5%', left: '25%', right: '25%', top: '37.5%' }}>
            <div style={{ position: 'absolute', inset: '-16.67% -8.33%' }}>
              <img alt="" src={_chevronUp} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    )

    // Section header with + button (Border / Drop Shadow)
    const SectionAdd = ({ label }) => (
      <div style={{
        borderTop: `1px solid var(--border-default)`,
        display: 'flex', gap: 12, alignItems: 'center',
        padding: '12px 20px',
      }}>
        <span style={{ flex: 1, ...bodyM }}>{label}</span>
        <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: '20.83%' }}>
            <div style={{ position: 'absolute', inset: '-7.14%' }}>
              <img alt="" src={_plusIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    )

    // 3-button alignment toggle group
    const AlignGroup = ({ icons, selectedIdx = 0 }) => (
      <div style={{
        flex: 1, display: 'flex',
        background: DS.bgPage,
        border: `1px solid ${DS.borderPrimary}`,
        borderRadius: DS.radiusXl,
        overflow: 'hidden',
      }}>
        {icons.map((src, i) => (
          <button key={i} style={{
            flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: i === selectedIdx ? DS.bgPrimary : 'transparent',
            border: i === selectedIdx ? `1px solid ${DS.borderPrimary}` : 'none',
            borderRadius: i === selectedIdx ? DS.radiusXl : 0,
            cursor: 'pointer', padding: 0,
            boxShadow: i === selectedIdx ? skeuShadow : 'none',
          }}>
            <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '8.33%' }}>
                <div style={{ position: 'absolute', inset: '-3.33%' }}>
                  <img alt="" src={src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    )

    // Labeled row: "Radius" | field
    const LRow = ({ label, children }) => (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
        <span style={{ width: 70, flexShrink: 0, ...bodyMMedQuart }}>{label}</span>
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      </div>
    )

    // Blue checked checkbox
    const Checkbox = ({ checked, onChange }) => (
      <div
        onClick={() => onChange?.(!checked)}
        style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0, cursor: 'pointer', overflow: 'hidden', position: 'relative',
          background: checked ? '#1570ef' : DS.bgPrimary,
          border: checked ? '1px solid #175cd3' : `1px solid ${DS.borderPrimary}`,
        }}
      >
        {checked && (
          <div style={{ position: 'absolute', inset: 'calc(12.5% - 0.75px)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '29.17%', left: '16.67%', right: '16.67%', top: '25%' }}>
              <div style={{ position: 'absolute', inset: '-15.18% -10.44%' }}>
                <img alt="" src={_checkIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    )

    const youtubeUrl   = el?.youtubeUrl   ?? ''
    const youtubeLoop  = el?.youtubeLoop  ?? true
    const youtubeAudio = el?.youtubeAudio ?? true
    const radius       = el?.borderRadius ?? 12
    const opacity      = el?.opacity      ?? 100

    return (
      <>
        {/* ── Position ─────────────────────────────────────────────── */}
        <SectionDropdown label="Position" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Align groups row */}
          <div style={{ display: 'flex', gap: 8 }}>
            <AlignGroup icons={[_alignSV, _alignCV, _alignEV]} />
            <AlignGroup icons={[_alignSH, _alignCH, _alignEH]} />
          </div>

          {/* X / Y inputs */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[['X', el?.x ?? 0, (v) => onUpdateElement(el.id, { x: v })],
              ['Y', el?.y ?? 0, (v) => onUpdateElement(el.id, { y: v })]].map(([lbl, val, onChange]) => (
              <div key={lbl} style={{ flex: 1, ...selIn }}>
                <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                  <span style={{ ...bodyMQuart, fontSize: 16 }}>{lbl}</span>
                </div>
                <input
                  type="number"
                  value={Math.round(val)}
                  onChange={(e) => onChange(Number(e.target.value))}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
                />
              </div>
            ))}
          </div>

          {/* Rotate + Flip */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Rotate field */}
            <div style={{ flex: 1, ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, position: 'relative' }}>
                <img alt="" src={_rotateIcon} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <span style={bodyMMedium}>0°</span>
            </div>

            {/* Flip group: diagonal (selected), H, V */}
            <div style={{
              flex: 1, display: 'flex',
              background: DS.bgHover,
              border: `1px solid ${DS.borderPrimary}`,
              borderRadius: DS.radiusXl,
              overflow: 'hidden',
            }}>
              {/* Flip diagonal — selected */}
              <button style={{
                flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`,
                borderRadius: DS.radiusXl, cursor: 'pointer', padding: 0, boxShadow: skeuShadow,
              }}>
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: 'rotate(45deg)', width: 18.29, height: 16.29, position: 'relative' }}>
                    <img alt="" src={_flipDiag} style={{ position: 'absolute', inset: '-3.62% 0 0 -4.08%', width: '107%', height: '107%', display: 'block', maxWidth: 'none' }} />
                  </div>
                </div>
              </button>
              {/* Flip H */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '8.33% 12.5%' }}>
                    <div style={{ position: 'absolute', inset: '-3.33% -3.69%' }}>
                      <img alt="" src={_flipH} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              {/* Flip V */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '12.5% 8.33%' }}>
                    <div style={{ position: 'absolute', inset: '-3.69% -3.33%' }}>
                      <img alt="" src={_flipV} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Video Settings ────────────────────────────────────────── */}
        <SectionDropdown label="Video Settings" />
        <div style={{ padding: '10px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Checkbox checked={youtubeLoop} onChange={(v) => el && onUpdateElement(el.id, { youtubeLoop: v })} />
            <span style={bodyMMedium}>Loop</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Checkbox checked={youtubeAudio} onChange={(v) => el && onUpdateElement(el.id, { youtubeAudio: v })} />
            <span style={bodyMMedium}>Audio</span>
          </div>
        </div>

        {/* ── URL ──────────────────────────────────────────────────── */}
        <SectionDropdown label="URL" />
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{
            background: DS.bgPage,
            border: `1px solid ${DS.borderPrimary}`,
            borderRadius: DS.radiusXl,
            padding: '8px 14px 8px 8px',
            display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden',
          }}>
            {/* Link icon */}
            <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: '8.61% 8.57%' }}>
                <div style={{ position: 'absolute', inset: '-3.35% -3.34%' }}>
                  <img alt="" src={_linkIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter your URL here..."
              value={youtubeUrl}
              onChange={(e) => el && onUpdateElement(el.id, { youtubeUrl: e.target.value })}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 16, lineHeight: '24px', fontWeight: 500,
                color: youtubeUrl ? DS.fgPrimary : '#a4a7ae',
                fontFamily: 'inherit', minWidth: 0,
              }}
            />
          </div>
        </div>

        {/* ── Appearance ───────────────────────────────────────────── */}
        <SectionDropdown label="Appearance" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <LRow label="Radius">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, padding: 4, borderRadius: DS.radiusL, position: 'relative' }}>
                <img alt="" src={_sqPlay} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <input
                type="number"
                min={0}
                value={Math.round(radius)}
                onChange={(e) => el && onUpdateElement(el.id, { borderRadius: Math.max(0, Number(e.target.value)) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
            </div>
          </LRow>
          <LRow label="Opacity">
            <div style={{ ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, padding: 4, borderRadius: DS.radiusL, position: 'relative' }}>
                <img alt="" src={_sqPlay2} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
              </div>
              <input
                type="number"
                min={0} max={100}
                value={Math.round(opacity)}
                onChange={(e) => el && onUpdateElement(el.id, { opacity: Math.max(0, Math.min(100, Number(e.target.value))) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
              <span style={{ ...bodyMQuart, flexShrink: 0 }}>%</span>
            </div>
          </LRow>
        </div>

        {/* ── Border ───────────────────────────────────────────────── */}
        <div style={{
          borderTop: `1px solid var(--border-default)`,
          borderBottom: `1px solid var(--border-default)`,
          display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px',
        }}>
          <span style={{ flex: 1, ...bodyM }}>Border</span>
          <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: '20.83%' }}>
              <div style={{ position: 'absolute', inset: '-7.14%' }}>
                <img alt="" src={_plusIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Drop Shadow ──────────────────────────────────────────── */}
        <SectionAdd label="Drop Shadow" />
      </>
    )
  }

  const renderZoneDesignPanel = () => {
    if (!selectedZoneId || selectedElement) return null

    const fill = zoneStyle.fill ?? '#F5F5F5'
    const fillOpacity = zoneStyle.fillOpacity ?? 100
    const opacity = zoneStyle.opacity ?? 100
    const radius = zoneStyle.borderRadius ?? 0
    const bColor = zoneStyle.borderColor ?? '#FFFFFF'
    const bPos = zoneStyle.borderPosition ?? 'inside'
    const bWidth = zoneStyle.borderWidth ?? 1
    const bStyle = zoneStyle.borderStyle ?? 'solid'
    const bSides = zoneStyle.borderSides ?? 'all'

    const Row = ({ label, children }) => (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%', minWidth: 0 }}>
        <span style={{ width: 70, flexShrink: 0, ...bodyMMedQuart }}>{label}</span>
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      </div>
    )

    return (
      <>
        <SectionHeader label="Appearance" open={appearanceOpen} onToggle={() => setAppearanceOpen(!appearanceOpen)} />
        {appearanceOpen && (
          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Row label="Radius">
              <div style={{ ...propInputPrimary, minWidth: 0 }}>
                <span style={iconBtn}><IconRadius /></span>
                <input
                  type="number"
                  value={Math.round(radius)}
                  onChange={(e) => onUpdateZoneStyle({ borderRadius: Math.max(0, Number(e.target.value)) })}
                  style={{ ...numInputInner, width: 0 }}
                />
              </div>
            </Row>

            <Row label="Opacity">
              <div style={{ ...propInputPrimary, minWidth: 0 }}>
                <span style={iconBtn}><IconOpacity /></span>
                <input
                  type="number"
                  value={Math.round(opacity)}
                  onChange={(e) => onUpdateZoneStyle({ opacity: Math.max(0, Math.min(100, Number(e.target.value))) })}
                  style={{ ...numInputInner, width: 0 }}
                />
                <span style={{ ...bodyMQuart, flexShrink: 0 }}>%</span>
              </div>
            </Row>
          </div>
        )}

        <FillBorderHeader label="Fill" />
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ ...propInputPrimary, gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                flexShrink: 0,
                background: fill,
                border: `1px solid ${DS.borderPrimary}`,
                borderRadius: DS.radiusSm,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <input
                type="color"
                value={fill}
                onChange={(e) => onUpdateZoneStyle({ fill: e.target.value })}
                style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
            </div>
            <span style={{ flex: 1, ...bodyMMedium }}>{colorTokenName(fill)}</span>
            <span style={{ ...bodyMQuart, flexShrink: 0 }}>{fillOpacity} %</span>
          </div>
        </div>

        <FillBorderHeader label="Border" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ ...propInputPrimary, gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                flexShrink: 0,
                background: bColor,
                border: `1px solid ${DS.borderPrimary}`,
                borderRadius: DS.radiusSm,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <input
                type="color"
                value={bColor}
                onChange={(e) => onUpdateZoneStyle({ borderColor: e.target.value })}
                style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
            </div>
            <span style={{ flex: 1, ...bodyMMedium }}>{colorTokenName(bColor)}</span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <StyledSelect
              value={bPos}
              onChange={(e) => onUpdateZoneStyle({ borderPosition: e.target.value })}
              options={[['inside', 'Inside'], ['outside', 'Outside'], ['center', 'Center']]}
            />
            <div style={{ ...propInputPrimary, flex: 1, background: DS.bgPage, boxShadow: 'none', gap: 8 }}>
              <span style={iconBtn}><IconBorderWidth /></span>
              <input
                type="number"
                value={bWidth}
                onChange={(e) => onUpdateZoneStyle({ borderWidth: Math.max(0, Number(e.target.value)) })}
                style={numInputInner}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <StyledSelect
              value={bStyle}
              onChange={(e) => onUpdateZoneStyle({ borderStyle: e.target.value })}
              options={[['solid', 'Solid'], ['dashed', 'Dashed'], ['dotted', 'Dotted']]}
              leadingIcon={<IconMinusSm />}
            />
            <StyledSelect
              value={bSides}
              onChange={(e) => onUpdateZoneStyle({ borderSides: e.target.value })}
              options={[['all', 'All'], ['top', 'Top'], ['right', 'Right'], ['bottom', 'Bottom'], ['left', 'Left']]}
              leadingIcon={<IconSquareSm />}
            />
          </div>
        </div>

        <SectionHeader label="Layers" open={layersOpen} onToggle={() => setLayersOpen(!layersOpen)} />
      </>
    )
  }

  const renderSlideDesignPanel = () => (
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
  )

  const renderTextDesignPanel = () => {
    const el = selectedElement

    // ── Figma asset URLs — fetched fresh from node 1922:24504 ──────────────
    const _minus         = 'https://www.figma.com/api/mcp/asset/445df7a8-85e0-4a7d-8d9b-e2c4bf5f7d10' // minus (decoration/list none)
    const _listBullet    = 'https://www.figma.com/api/mcp/asset/d1c4c6fd-d3cf-4d8d-89e8-4017dcbc68b3' // list (bullet)
    const _listNumber    = 'https://www.figma.com/api/mcp/asset/a39bbd3d-daca-4b62-8bd8-e81c284e952a' // number-list
    const _underline     = 'https://www.figma.com/api/mcp/asset/9eb29b12-05e5-454a-bb01-fca69f86d623' // underline
    const _strikethrough = 'https://www.figma.com/api/mcp/asset/e2a54736-8400-4733-b705-93da746425ae' // strikethrough
    const _textVA        = 'https://www.figma.com/api/mcp/asset/8229e605-6d95-4e74-972a-feed48a57b49' // text-align-bottom (btn1 flipped = top)
    const _textVB        = 'https://www.figma.com/api/mcp/asset/6084dad5-1bbf-497b-bef5-f47f4a6b113b' // text-align-middle
    const _textVC        = 'https://www.figma.com/api/mcp/asset/40707cba-05aa-48b1-a933-2b06c828e10c' // text-align-bottom (btn3)
    const _textHLeft     = 'https://www.figma.com/api/mcp/asset/92e3d0b0-b6ae-4922-9818-2ecb4bdbbb09' // text-align-start
    const _textHCenter   = 'https://www.figma.com/api/mcp/asset/41724783-006e-4e70-8398-c79d89e22286' // text-align-center
    const _textHRight    = 'https://www.figma.com/api/mcp/asset/7473fac2-b7ec-47fb-95a3-2075a6fff411' // text-align-end
    const _flipDiag      = 'https://www.figma.com/api/mcp/asset/682b0d54-83c4-4a8c-a9d7-338911df2932' // flip diagonal (Group28225)
    const _flipH         = 'https://www.figma.com/api/mcp/asset/8ccb1c5a-deaf-4f14-be53-fd4d14448c9a' // flip-horizontal-2
    const _flipV         = 'https://www.figma.com/api/mcp/asset/8859653a-7d6a-4b43-98e7-255109f023ab' // flip-vertical-2
    const _rotateIcon    = 'https://www.figma.com/api/mcp/asset/4448b434-4c5f-4699-9802-929e3018217f' // volume-2 (rotation)
    const _alignSV       = 'https://www.figma.com/api/mcp/asset/5e31250a-0039-461b-89a3-c30f75cdc0eb' // align-start-vertical
    const _alignCV       = 'https://www.figma.com/api/mcp/asset/ff8c9e61-a2bf-4789-9454-5f64fa925bbd' // align-center-vertical
    const _alignEV       = 'https://www.figma.com/api/mcp/asset/7833d4d3-47fd-43cd-88d8-f63d321eff4d' // align-end-vertical
    const _alignSH       = 'https://www.figma.com/api/mcp/asset/e4fb050b-7b96-4b4d-bc7a-4cae5735896d' // align-start-horizontal
    const _alignCH       = 'https://www.figma.com/api/mcp/asset/223ecf22-26c8-46ee-855c-23f8b3244c17' // align-center-horizontal
    const _alignEH       = 'https://www.figma.com/api/mcp/asset/c3524171-06c7-49a7-9733-56a679d132ab' // align-end-horizontal
    const _chevronUp     = 'https://www.figma.com/api/mcp/asset/e6365a7e-9c99-4c8f-8597-1afc88e90b8b' // chevron-up (section headers)
    const _sqPlay        = 'https://www.figma.com/api/mcp/asset/ed5aea01-bfb1-463f-ad80-3829489e255b' // square-play (opacity icon)
    const _chevronDown   = 'https://www.figma.com/api/mcp/asset/25026397-4a5e-4570-a83e-c8eaed977751' // chevron-down (selects)
    const _scaleV18      = 'https://www.figma.com/api/mcp/asset/0c4a9718-5bdd-4f21-a4d1-d92103fb761a' // scale-object arrow top-right
    const _scaleV19      = 'https://www.figma.com/api/mcp/asset/3c894978-4fdc-469e-abda-17ba9d6b32f0' // scale-object arrow bottom-right
    const _scaleV20      = 'https://www.figma.com/api/mcp/asset/35a5f064-1f1a-467d-b79f-1d023e96dac2' // scale-object arrow top-left
    const _scaleV21      = 'https://www.figma.com/api/mcp/asset/a0e3c0ad-5f31-45c5-b2b0-043b08ee63e1' // scale-object arrow bottom-left
    const _lineHIcon     = 'https://www.figma.com/api/mcp/asset/0f608195-0adb-4d39-ac0e-7a6b88de80dc' // align-vertical-space-around (line-height)
    const _trackIcon     = 'https://www.figma.com/api/mcp/asset/f09ef587-b8c6-401f-89eb-0725718ba065' // align-vertical-space-around rotated (letter-spacing)
    const _eyeIcon2      = 'https://www.figma.com/api/mcp/asset/e35739bd-76b3-4944-b532-3685ad521bbd' // eye (fill header)
    const _minusFill     = 'https://www.figma.com/api/mcp/asset/1b15ed6e-ad4f-4614-9573-54e984449c4f' // minus (fill header)
    const _plusIcon      = 'https://www.figma.com/api/mcp/asset/4115bf0f-56d4-47c7-a6dc-cfd8273a115c' // plus (border/shadow)

    const skeuShadow = `inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), ${DS.shadow}`

    const selIn = {
      background: DS.bgPage,
      border: `1px solid ${DS.borderPrimary}`,
      borderRadius: DS.radiusXl,
      padding: '8px 14px 8px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflow: 'hidden',
      height: 40,
    }

    // Chevron-down img used in select dropdowns (20x20)
    const ChevronDownImg = () => (
      <div style={{ width: 20, height: 20, overflow: 'hidden', position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: '37.5%', left: '25%', right: '25%', top: '37.5%' }}>
          <div style={{ position: 'absolute', inset: '-20% -10%' }}>
            <img alt="" src={_chevronDown} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
          </div>
        </div>
      </div>
    )

    // Section header with chevron-up (always expanded) — matches Figma Property/Grouping/Dropdown
    const SectionDropdown = ({ label }) => (
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px' }}>
        <span style={{ flex: 1, ...bodyM }}>{label}</span>
        <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', bottom: '37.5%', left: '25%', right: '25%', top: '37.5%' }}>
            <div style={{ position: 'absolute', inset: '-16.67% -8.33%' }}>
              <img alt="" src={_chevronUp} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    )

    // Section header with + button (Border / Drop Shadow)
    const SectionAdd = ({ label, borderBottom = false }) => (
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, borderBottom: borderBottom ? `1px solid ${DS.borderDefault}` : 'none', display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px' }}>
        <span style={{ flex: 1, ...bodyM }}>{label}</span>
        <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: '20.83%' }}>
            <div style={{ position: 'absolute', inset: '-7.14%' }}>
              <img alt="" src={_plusIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    )

    // Fill section header with eye + minus — matches Figma node 1922:24875
    const FillSectionHeader = () => (
      <div style={{ borderTop: `1px solid ${DS.borderDefault}`, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px' }}>
        <span style={{ flex: 1, ...bodyM }}>Fill</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button style={iconBtnFlat}>
            <div style={{ width: 24, height: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20.84%', bottom: '20.84%', left: '8.33%', right: '8.33%' }}>
                <div style={{ position: 'absolute', inset: '-7.14% -5%' }}>
                  <img alt="" src={_eyeIcon2} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
          <button style={iconBtnFlat}>
            <div style={{ width: 24, height: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '50%', left: '20.83%', right: '20.83%', top: '50%' }}>
                <div style={{ position: 'absolute', inset: '-1px -7.14%' }}>
                  <img alt="" src={_minusFill} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    )

    const fontSize   = el?.fontSize   ?? 64
    const fontWeight = el?.fontWeight ?? 700
    const color      = el?.color      ?? '#000000'
    const opacity    = el?.opacity    ?? 100

    return (
      <>
        {/* ── Position ──────────────────────────────────────────────────────── */}
        <SectionDropdown label="Position" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Row 1 — PropertyVerticalAlignment | PropertyHorizontalAlignment */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Vertical alignment group — 24px icons, inset 8.33% / -3.33% */}
            {[
              [_alignSV, _alignCV, _alignEV],
              [_alignSH, _alignCH, _alignEH],
            ].map((icons, gi) => (
              <div key={gi} style={{ flex: 1, display: 'flex', background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
                {icons.map((src, i) => (
                  <button key={i} style={{
                    flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: i === 0 ? DS.bgPrimary : 'transparent',
                    border: i === 0 ? `1px solid ${DS.borderPrimary}` : 'none',
                    borderRadius: i === 0 ? DS.radiusXl : 0,
                    cursor: 'pointer', padding: 0,
                    boxShadow: i === 0 ? skeuShadow : 'none',
                  }}>
                    <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: '8.33%' }}>
                        <div style={{ position: 'absolute', inset: '-3.33%' }}>
                          <img alt="" src={src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2 — X | Y inputs */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[['X', el?.x ?? 0, (v) => onUpdateElement(el.id, { x: v })],
              ['Y', el?.y ?? 0, (v) => onUpdateElement(el.id, { y: v })]].map(([lbl, val, onChange]) => (
              <div key={lbl} style={{ flex: 1, ...selIn }}>
                <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                  <span style={{ ...bodyMQuart, fontSize: 16 }}>{lbl}</span>
                </div>
                <input
                  type="number"
                  value={Math.round(val)}
                  onChange={(e) => onChange(Number(e.target.value))}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
                />
              </div>
            ))}
          </div>

          {/* Row 3 — Property (rotate) | PropertyFlip */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Rotation input — volume-2 icon is full 24x24 img */}
            <div style={{ flex: 1, ...selIn }}>
              <div style={{ width: 24, height: 24, flexShrink: 0, position: 'relative' }}>
                <img alt="" src={_rotateIcon} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', maxWidth: 'none' }} />
              </div>
              <span style={bodyMMedium}>0°</span>
            </div>
            {/* PropertyFlip — bg secondary (#F5F5F5) */}
            <div style={{ flex: 1, display: 'flex', background: '#F5F5F5', border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
              {/* Btn 1 selected — diagonal flip (Group28225, rotated 45deg) */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, cursor: 'pointer', padding: 0, boxShadow: skeuShadow }}>
                <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', left: '0.5px', top: '-1px', width: 24.455, height: 24.455 }}>
                    <div style={{ transform: 'rotate(45deg)', flexShrink: 0 }}>
                      <div style={{ width: 16.293, height: 18.291, position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: '-3.62% 0 0 -4.08%' }}>
                          <img alt="" src={_flipDiag} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 2 — flip-horizontal-2: inset 8.33% 12.5% / -3.33% -3.69% */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8.33%', bottom: '8.33%', left: '12.5%', right: '12.5%' }}>
                    <div style={{ position: 'absolute', inset: '-3.33% -3.69%' }}>
                      <img alt="" src={_flipH} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 3 — flip-vertical-2: inset 12.5% 8.33% / -3.69% -3.33% */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '12.5%', bottom: '12.5%', left: '8.33%', right: '8.33%' }}>
                    <div style={{ position: 'absolute', inset: '-3.69% -3.33%' }}>
                      <img alt="" src={_flipV} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Appearance ────────────────────────────────────────────────────── */}
        <SectionDropdown label="Appearance" />
        <div style={{ padding: '0 20px 20px' }}>
          {/* Opacity row — matches node 1922:24519 */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
            <span style={{ width: 70, flexShrink: 0, fontSize: 16, lineHeight: '24px', fontWeight: 500, color: DS.fgQuaternary }}>Opacity</span>
            <div style={{ flex: 1, ...selIn }}>
              {/* square-play icon — full 24x24 img (absolute) */}
              <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
                <img alt="" src={_sqPlay} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', maxWidth: 'none' }} />
              </div>
              <input
                type="number"
                min={0}
                max={100}
                value={Math.round(opacity)}
                onChange={(e) => onUpdateElement(el.id, { opacity: Math.max(0, Math.min(100, Number(e.target.value))) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
              <span style={{ fontSize: 16, lineHeight: '24px', fontWeight: 400, color: DS.fgQuaternary, flexShrink: 0 }}>%</span>
            </div>
          </div>
        </div>

        {/* ── Typography ────────────────────────────────────────────────────── */}
        <SectionDropdown label="Typography" />
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Font family select — node 1922:24736 */}
          <div style={{ border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, padding: '8px 14px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: DS.bgPrimary, position: 'relative', boxShadow: skeuShadow, width: '100%' }}>
            <div aria-hidden="true" style={{ position: 'absolute', background: DS.bgPrimary, inset: 0, borderRadius: DS.radiusXl, pointerEvents: 'none' }} />
            <select
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, cursor: 'pointer', fontFamily: 'inherit', appearance: 'none', paddingRight: 28, minWidth: 0 }}
            >
              <option>Loubag</option>
              <option>Inter</option>
              <option>Geist</option>
            </select>
            <ChevronDownImg />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', boxShadow: skeuShadow }} />
          </div>

          {/* Font weight | Font size — node 1922:24737 */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Weight select — node 1922:24738, bg white with skeu shadow */}
            <div style={{ flex: 1, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, padding: '8px 14px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: DS.bgPrimary, position: 'relative', boxShadow: skeuShadow }}>
              <div aria-hidden="true" style={{ position: 'absolute', background: DS.bgPrimary, inset: 0, borderRadius: DS.radiusXl, pointerEvents: 'none' }} />
              <select
                value={fontWeight}
                onChange={(e) => onUpdateElement(el.id, { fontWeight: Number(e.target.value) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, cursor: 'pointer', fontFamily: 'inherit', appearance: 'none', paddingRight: 28, minWidth: 0 }}
              >
                <option value={400}>Regular</option>
                <option value={500}>Medium</option>
                <option value={600}>Semibold</option>
                <option value={700}>Bold</option>
              </select>
              <ChevronDownImg />
              <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', boxShadow: skeuShadow }} />
            </div>

            {/* Font size — node 1922:24739, bg page, scale-object icon */}
            <div style={{ flex: 1, ...selIn }}>
              {/* scale-object composite icon — node 1922:24740 */}
              <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                {/* "A" text — inset 0 0 4.17% 0, centered */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '4.17%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textAlign: 'center', color: DS.fgQuaternary, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  <span>A</span>
                </div>
                {/* Arrow top-right — 6x6 at right:2 top:2 */}
                <div style={{ position: 'absolute', right: 2, top: 2, width: 6, height: 6 }}>
                  <div style={{ position: 'absolute', inset: '-11.08%' }}>
                    <img alt="" src={_scaleV18} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                  </div>
                </div>
                {/* Arrow bottom-right — 4x4 at right:3 bottom:3, rotate 90 */}
                <div style={{ position: 'absolute', bottom: 3, right: 3, width: 4, height: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: 'rotate(90deg)', flexShrink: 0 }}>
                    <div style={{ width: 4, height: 4, position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: '-16.63%' }}>
                        <img alt="" src={_scaleV19} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Arrow top-left — 4x4 at right:17 top:3, scaleY(-1) rotate(180) */}
                <div style={{ position: 'absolute', top: 3, right: 17, width: 4, height: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}>
                    <div style={{ width: 4, height: 4, position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: '-16.63%' }}>
                        <img alt="" src={_scaleV20} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Arrow bottom-left — 4x4 at right:17 bottom:3, scaleY(-1) rotate(90) */}
                <div style={{ position: 'absolute', bottom: 3, right: 17, width: 4, height: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: 'scaleY(-1) rotate(90deg)', flexShrink: 0 }}>
                    <div style={{ width: 4, height: 4, position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: '-16.63%' }}>
                        <img alt="" src={_scaleV21} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={8}
                value={Math.round(fontSize)}
                onChange={(e) => onUpdateElement(el.id, { fontSize: Math.max(8, Number(e.target.value)) })}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Line height | Letter spacing — node 1922:24748 */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Line height — node 1922:24749/24750: align-vertical-space-around + "A" overlays */}
            <div style={{ flex: 1, ...selIn }}>
              <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                {/* main icon: inset 12.5%, inner -3.69% */}
                <div style={{ position: 'absolute', inset: '12.5%' }}>
                  <div style={{ position: 'absolute', inset: '-3.69%' }}>
                    <img alt="" src={_lineHIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                  </div>
                </div>
                {/* "A" right overlay — inset 0 -70.83% 0 70.83% */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '70.83%', right: '-70.83%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textAlign: 'center', color: DS.fgQuaternary, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  <span>A</span>
                </div>
                {/* "A" center overlay */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textAlign: 'center', color: DS.fgQuaternary, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  <span>A</span>
                </div>
              </div>
              <input
                type="number"
                defaultValue={80}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
            </div>

            {/* Letter spacing — node 1922:24756/24757: rotated -90deg + "A" overlays */}
            <div style={{ flex: 1, ...selIn }}>
              <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                {/* rotated icon: inset 12.5%, flex center, 18x18 rotate(-90deg) */}
                <div style={{ position: 'absolute', inset: '12.5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ transform: 'rotate(-90deg)', flexShrink: 0, width: 18, height: 18, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '-3.69%' }}>
                      <img alt="" src={_trackIcon} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
                {/* "A" right overlay */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '70.83%', right: '-70.83%', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textAlign: 'center', color: DS.fgQuaternary, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  <span>A</span>
                </div>
                {/* "A" center overlay */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textAlign: 'center', color: DS.fgQuaternary, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  <span>A</span>
                </div>
              </div>
              <input
                type="text"
                defaultValue="0%"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', ...bodyMMedium, minWidth: 0, fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Text align horizontal | vertical — node 1922:24763 */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* PropertyTextAlignHorizontal — 20px icons, inset 20.83% 12.5% / -5.7% -4.43% */}
            <div style={{ flex: 1, display: 'flex', background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
              {[_textHLeft, _textHCenter, _textHRight].map((src, i) => (
                <button key={i} style={{
                  flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i === 0 ? DS.bgPrimary : 'transparent',
                  border: i === 0 ? `1px solid ${DS.borderPrimary}` : 'none',
                  borderRadius: i === 0 ? DS.radiusXl : 0,
                  cursor: 'pointer', padding: 0,
                  boxShadow: i === 0 ? skeuShadow : 'none',
                }}>
                  <div style={{ width: 20, height: 20, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '20.83%', bottom: '20.83%', left: '12.5%', right: '12.5%' }}>
                      <div style={{ position: 'absolute', inset: '-5.7% -4.43%' }}>
                        <img alt="" src={src} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* PropertyTextAlignVertical — 20px icons with complex transforms */}
            <div style={{ flex: 1, display: 'flex', background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
              {/* Btn 1 selected — text-align-bottom flipped vertically (-scale-y-100), h=14.097, w=16 */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, cursor: 'pointer', padding: 0, boxShadow: skeuShadow }}>
                <div style={{ width: 20, height: 20, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 14.097 }}>
                    <div style={{ transform: 'scaleY(-1)', flexShrink: 0 }}>
                      <div style={{ width: 16, height: 14.097, position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: '-4.72% -4.16%' }}>
                          <img alt="" src={_textVA} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 2 — text-align-middle, h=18.194, w=16, no flip */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 20, height: 20, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 18.194 }}>
                    <div style={{ position: 'absolute', inset: '-3.66% -4.16%' }}>
                      <img alt="" src={_textVB} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 3 — text-align-bottom (no flip), h=14.097, w=16 */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 20, height: 20, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 14.097 }}>
                    <div style={{ position: 'absolute', inset: '-4.72% -4.16%' }}>
                      <img alt="" src={_textVC} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Decoration | List style — node 2179:111710 */}
          <div style={{ display: 'flex', gap: 8 }}>
            {/* PropertyDecoration — minus(selected) | underline | strikethrough */}
            <div style={{ flex: 1, display: 'flex', background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
              {/* Btn 1 (minus selected): bottom-1/2 left-20.83% right-20.83% top-1/2, inner -0.67px -4.75% */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, cursor: 'pointer', padding: 0, boxShadow: skeuShadow }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '50%', top: '50%', left: '20.83%', right: '20.83%' }}>
                    <div style={{ position: 'absolute', inset: '-0.67px -4.75%' }}>
                      <img alt="" src={_minus} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 2 (underline): inset 16.67%, inner -4.16% */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '16.67%' }}>
                    <div style={{ position: 'absolute', inset: '-4.16%' }}>
                      <img alt="" src={_underline} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 3 (strikethrough): inset 16.67%, inner -4.16% */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '16.67%' }}>
                    <div style={{ position: 'absolute', inset: '-4.16%' }}>
                      <img alt="" src={_strikethrough} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* PropertyListStyle — minus(selected) | list(bullet) | number-list */}
            <div style={{ flex: 1, display: 'flex', background: DS.bgPage, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, overflow: 'hidden' }}>
              {/* Btn 1 (minus selected): same as decoration btn 1 */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, cursor: 'pointer', padding: 0, boxShadow: skeuShadow }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '50%', top: '50%', left: '20.83%', right: '20.83%' }}>
                    <div style={{ position: 'absolute', inset: '-0.67px -4.75%' }}>
                      <img alt="" src={_minus} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 2 (list/bullet): inset 20.83% 12.5%, inner -4.75% -3.69% */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '20.83%', bottom: '20.83%', left: '12.5%', right: '12.5%' }}>
                    <div style={{ position: 'absolute', inset: '-4.75% -3.69%' }}>
                      <img alt="" src={_listBullet} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                    </div>
                  </div>
                </div>
              </button>
              {/* Btn 3 (number-list): full 24x24 absolute img, no nested divs */}
              <button style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 24, height: 24, position: 'relative', flexShrink: 0 }}>
                  <img alt="" src={_listNumber} style={{ position: 'absolute', display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Fill ──────────────────────────────────────────────────────────── */}
        <FillSectionHeader />
        <div style={{ padding: '0 20px 20px' }}>
          {/* Fill row — node 1922:24877: bg white, skeu shadow, black swatch */}
          <div style={{ background: DS.bgPrimary, border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, padding: '8px 14px 8px 8px', display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', boxShadow: DS.shadow }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: color, border: `1px solid ${DS.borderPrimary}`, flexShrink: 0, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <input type="color" value={color} onChange={(e) => onUpdateElement(el.id, { color: e.target.value })} style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
            </div>
            <span style={{ flex: 1, ...bodyMMedium }}>
              {color === '#000000' || color === '#0a0d12' || color === '#0A0D12' ? 'Neutral/Black' : color.replace('#', '').toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Border — border top AND bottom, node 1922:26111 ───────────────── */}
        <SectionAdd label="Border" borderBottom />

        {/* ── Drop Shadow — node 1921:87667 ─────────────────────────────────── */}
        <SectionAdd label="Drop Shadow" />
      </>
    )
  }

  const renderDesignContent = () => {
    if (selectedElement?.type === 'logo') return renderLogoDesignPanel()
    if (selectedElement?.type === 'widget' && selectedElement?.widgetName === 'youtube') return renderYouTubeDesignPanel()
    if (selectedElement?.type === 'widget' && selectedElement?.widgetName === 'qr-code') return renderQRCodeDesignPanel()
    if (selectedElement?.type === 'text') return renderTextDesignPanel()
    if (selectedElement) return renderSelectedElementDesignPanel()
    if (selectedZoneId) return renderZoneDesignPanel()
    return renderSlideDesignPanel()
  }

  return (
    <div className="flex flex-col shrink-0 overflow-y-auto" style={panelStyle}>
      {renderTabBar()}
      {rightTab === 'presentation' ? renderPresentationPanel() : renderDesignContent()}
    </div>
  )
}

// ─── Page Thumbnail ───────────────────────────────────────────────────────────

const THUMB_W = 176
const THUMB_H = Math.round(THUMB_W * 9 / 16) // ~99px, true 16:9
const REF_W = 760
const THUMB_SCALE = THUMB_W / REF_W

function buildGridTemplate(tracks) {
  if (!tracks?.length) return '1fr'
  return tracks.map((t) => (t.unit === 'fill' ? '1fr' : `${t.value}${t.unit}`)).join(' ')
}

function PageThumbnail({ pageData }) {
  if (!pageData) return <div style={{ width: THUMB_W, height: THUMB_H, background: '#F5F5F5', borderRadius: 8 }} />
  const { selectedLayout, gridTracks, zoneStyles = {}, elements = [], bgColor = '#ffffff' } = pageData
  const colTemplate = buildGridTemplate(gridTracks?.cols)
  const rowTemplate = buildGridTemplate(gridTracks?.rows)
  const gap = Math.round(24 * THUMB_SCALE) // scaled gridGap

  return (
    <div style={{ width: THUMB_W, height: THUMB_H, overflow: 'hidden', position: 'relative', background: bgColor, borderRadius: 8, flexShrink: 0 }}>
      {/* Zone grid */}
      {selectedLayout && (
        <div style={{ position: 'absolute', inset: 0, padding: gap, boxSizing: 'border-box' }}>
          <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: colTemplate, gridTemplateRows: rowTemplate, gap }}>
            {selectedLayout.zones.map((zone) => {
              const zs = zoneStyles[zone.id] || {}
              return (
                <div key={zone.id} style={{
                  ...zone.style,
                  background: zs.fill ?? '#F5F5F5',
                  borderRadius: Math.round((zs.borderRadius ?? 12) * THUMB_SCALE),
                  border: `1px solid ${zs.borderColor ?? '#E9EAEB'}`,
                  boxSizing: 'border-box',
                  opacity: (zs.opacity ?? 100) / 100,
                }} />
              )
            })}
          </div>
        </div>
      )}
      {/* Free-form elements */}
      {elements.map((el) => (
        <div key={el.id} style={{
          position: 'absolute',
          left: el.x * THUMB_SCALE,
          top: el.y * THUMB_SCALE,
          width: el.width * THUMB_SCALE,
          height: el.height * THUMB_SCALE,
          zIndex: el.zIndex,
          opacity: (el.opacity ?? 100) / 100,
          background: el.type === 'text' ? 'transparent' : (el.fill || '#D0D5DD'),
          borderRadius: (el.borderRadius || 0) * THUMB_SCALE,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {el.type === 'text' && (
            <div style={{
              fontSize: Math.max(4, (el.fontSize || 16) * THUMB_SCALE),
              fontWeight: el.fontWeight || 400,
              color: el.color || '#0A0D12',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflow: 'hidden',
            }}>
              {el.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Bottom Bar ───────────────────────────────────────────────────────────────

function BottomBar({ activeTool, setActiveTool, pages, currentPageId, currentPageData, savedPageStates, onSelectPage, onAddPage }) {
  const DS = {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F5F5F5',
    bgHover: '#F5F5F5',
    bgTertiary: '#E9EAEB',
    borderDefault: '#E9EAEB',
    borderPrimary: '#D5D7DA',
    borderAction: '#000000',
    fgPrimary: '#0A0D12',
    fgPlaceholder: '#A4A7AE',
    shadow: '0px 1px 2px 0px rgba(10,13,18,0.05)',
    radiusXl: 10,
    radiusL: 8,
    radiusXxl: 12,
    radiusM: 6,
  }
  const skeuShadow = `inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18), ${DS.shadow}`

  const tools = [
    {
      id: 'cursor', active: activeTool === 'cursor', dot: true,
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8.5 7.5l9 12.5-4-1.5-2.5 4.5L8.5 7.5z" stroke="#0A0D12" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
    },
    { id: '_div1', divider: true },
    {
      id: 'undo', action: true,
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 12.5C8 10 10 8 13 8h3a5 5 0 010 10h-6" stroke="#717680" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 10l-3 2.5 3 2.5" stroke="#717680" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      id: 'redo', action: true,
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M20 12.5C20 10 18 8 15 8h-3a5 5 0 000 10h6" stroke="#717680" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 10l3 2.5-3 2.5" stroke="#717680" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    { id: '_div2', divider: true },
    {
      id: 'pen', active: activeTool === 'pen', dot: true,
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M18.5 8.5l1 1-8 8-3 .5.5-3 8-8z" stroke="#717680" strokeWidth="1.4" strokeLinejoin="round"/><path d="M16.5 10.5l1 1" stroke="#717680" strokeWidth="1.4"/></svg>,
    },
    {
      id: 'rect', active: activeTool === 'rect',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="7" y="8" width="14" height="12" rx="1" stroke="#717680" strokeWidth="1.4"/></svg>,
    },
    {
      id: 'circle', active: activeTool === 'circle',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="6" stroke="#717680" strokeWidth="1.4"/></svg>,
    },
    {
      id: 'triangle', active: activeTool === 'triangle',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 8l7 12H7L14 8z" stroke="#717680" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
    },
    {
      id: 'star', active: activeTool === 'star',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 7l1.8 4H20l-3.4 2.5 1.3 4L14 15l-3.9 2.5 1.3-4L8 11h4.2L14 7z" stroke="#717680" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
    },
    {
      id: 'arrow', active: activeTool === 'arrow',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M9 19L19 9M19 9h-7M19 9v7" stroke="#717680" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      id: 'line', active: activeTool === 'line',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 20L20 8" stroke="#717680" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      {/* Floating Toolbar */}
      <div style={{ padding: '0 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ background: DS.bgPrimary, border: `1px solid ${DS.borderDefault}`, borderRadius: DS.radiusXxl, display: 'flex', gap: 8, alignItems: 'center', padding: 8, boxShadow: DS.shadow }}>
          {tools.map((t) => {
            if (t.divider) {
              return (
                <div key={t.id} style={{ width: 16, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 1, height: 20, background: DS.borderDefault }} />
                </div>
              )
            }
            const isActive = t.active && !t.action
            return (
              <div key={t.id} style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  onClick={() => !t.action && setActiveTool(t.id)}
                  title={t.id}
                  style={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: isActive ? `1px solid ${DS.borderDefault}` : 'none',
                    borderRadius: DS.radiusL,
                    background: isActive ? DS.bgHover : 'transparent',
                    cursor: t.action ? 'default' : 'pointer',
                    padding: 0,
                    boxShadow: isActive ? skeuShadow : 'none',
                  }}
                >
                  {t.icon}
                </button>
                {t.dot && (
                  <div style={{ position: 'absolute', bottom: 4, right: 4, width: 3, height: 3, borderRadius: '50%', background: isActive ? DS.fgPrimary : '#717680', pointerEvents: 'none' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Panel */}
      <div style={{ background: DS.bgPrimary, borderTop: `1px solid ${DS.borderDefault}`, borderLeft: `1px solid ${DS.borderDefault}`, borderRight: `1px solid ${DS.borderDefault}`, width: '100%', boxSizing: 'border-box' }}>

        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px 20px', gap: 12, position: 'relative' }}>
          {/* Time / Play / Duration — centered absolutely */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: 16, alignItems: 'center', pointerEvents: 'none' }}>
            <span style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500, color: DS.fgPrimary, whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
              0:00:00.0
            </span>
            <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${DS.borderPrimary}`, borderRadius: DS.radiusXl, background: DS.bgPrimary, cursor: 'pointer', padding: 0, position: 'relative', pointerEvents: 'all', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 2.5L13 8l-9.5 5.5V2.5z" fill="#0A0D12"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', boxShadow: skeuShadow }} />
            </button>
            <span style={{ fontSize: 16, lineHeight: '24px', fontWeight: 400, color: DS.fgPlaceholder, whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
              00:00:00.0
            </span>
          </div>

          {/* Collapse button — right-aligned */}
          <button style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: DS.radiusXl, background: DS.bgHover, cursor: 'pointer', padding: 0, position: 'relative', flexShrink: 0 }}>
            {/* Chevron down (collapse = rotate -90deg → pointing up) */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: 'rotate(-90deg)' }}>
              <path d="M4 8l6 6 6-6" stroke="#0A0D12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', boxShadow: skeuShadow }} />
          </button>
        </div>

        {/* Thumbnails row — fixed 180px columns, scrolls horizontally */}
        <div style={{ overflowX: 'auto', padding: '0 20px 20px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${pages.length + 1}, 180px)`, gap: 16, width: 'fit-content' }}>
            {/* Page cards */}
            {pages.map((page) => {
              const isSelected = page.id === currentPageId
              const pageData = isSelected ? currentPageData : savedPageStates[page.id]
              return (
                <div key={page.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }} onClick={() => onSelectPage(page.id)}>
                  <div style={{ position: 'relative', height: THUMB_H + 4, border: `2px solid ${isSelected ? DS.borderAction : 'transparent'}`, borderRadius: DS.radiusXl, overflow: 'hidden', background: DS.bgPrimary, flexShrink: 0, boxShadow: isSelected ? 'none' : `0 0 0 1px ${DS.borderDefault}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PageThumbnail pageData={pageData} />
                    {/* Duration badge */}
                    <div style={{ position: 'absolute', bottom: 6, left: 6 }}>
                      <div style={{ background: DS.bgPrimary, border: `1px solid ${DS.borderDefault}`, borderRadius: DS.radiusM, padding: '4px 8px', fontSize: 12, lineHeight: '16px', fontWeight: 500, color: DS.fgPlaceholder, whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
                        00:00:00.0
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500, color: DS.fgPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
                    {page.label}
                  </span>
                </div>
              )
            })}

            {/* Add page card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div
                onClick={onAddPage}
                style={{ height: THUMB_H + 4, borderRadius: DS.radiusXl, background: DS.bgSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 8v16M8 16h16" stroke="#717680" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scrubber */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', boxSizing: 'border-box' }}>
          {/* Left arrow */}
          <div style={{ width: 7, height: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
              <path d="M6 1L1 4l5 3" stroke="#717680" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Track */}
          <div style={{ flex: 1, height: 8, background: DS.bgTertiary, borderRadius: 99, minWidth: 0 }} />
          {/* Right arrow */}
          <div style={{ width: 7, height: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
              <path d="M1 1l5 3-5 3" stroke="#717680" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

      </div>
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

  // ── Pages ────────────────────────────────────────────────────────────────
  const pageCounter = useRef(1)
  const [pages, setPages] = useState([{ id: 'page_1', label: 'Page 1' }])
  const [currentPageId, setCurrentPageId] = useState('page_1')
  const [presPageMeta, setPresPageMeta] = useState({})
  // Per-page state snapshots (for non-active pages)
  const savedPageStates = useRef({})

  const handleRenameCurrentPage = (name) => {
    setPages((prev) => prev.map((p) => p.id === currentPageId ? { ...p, label: name } : p))
  }

  const handleAddPage = () => {
    const n = ++pageCounter.current
    const newPage = { id: `page_${n}`, label: `Page ${n}` }
    // Save current page state before switching
    savedPageStates.current[currentPageId] = { selectedLayout, gridTracks, zoneStyles, elements, bgColor }
    setPages((prev) => [...prev, newPage])
    // Reset to defaults for the new page
    setSelectedLayout(defaultLayout)
    setGridTracks({ cols: parseGrid(defaultLayout.gridCols), rows: parseGrid(defaultLayout.gridRows) })
    setZoneStyles({})
    setElements([])
    setBgColor('#ffffff')
    setCurrentPageId(newPage.id)
    setSelectedElementId(null)
    setEditingElementId(null)
    setSelectedNode(null)
  }

  const handleSelectPage = (pageId) => {
    if (pageId === currentPageId) return
    // Save current page state
    savedPageStates.current[currentPageId] = { selectedLayout, gridTracks, zoneStyles, elements, bgColor }
    // Load new page state
    const saved = savedPageStates.current[pageId]
    if (saved) {
      setSelectedLayout(saved.selectedLayout)
      setGridTracks(saved.gridTracks)
      setZoneStyles(saved.zoneStyles)
      setElements(saved.elements)
      setBgColor(saved.bgColor)
    } else {
      setSelectedLayout(defaultLayout)
      setGridTracks({ cols: parseGrid(defaultLayout.gridCols), rows: parseGrid(defaultLayout.gridRows) })
      setZoneStyles({})
      setElements([])
      setBgColor('#ffffff')
    }
    setCurrentPageId(pageId)
    setSelectedElementId(null)
    setEditingElementId(null)
    setSelectedNode(null)
  }

  // ── Free canvas elements ─────────────────────────────────────────────────
  const [elements, setElements] = useState([])
  const [selectedElementId, setSelectedElementId] = useState(null)
  const [editingElementId, setEditingElementId] = useState(null)
  const elementCounter = useRef(0)

  // ── Zone state ───────────────────────────────────────────────────────────
  const [selectedNode, setSelectedNode] = useState(null) // { type: 'frame'|'zone', id } | null
  const [zoneStyles, setZoneStyles] = useState({})
  const [gridTracks, setGridTracks] = useState(() => ({
    cols: parseGrid(defaultLayout.gridCols),
    rows: parseGrid(defaultLayout.gridRows),
  }))
  const gridGap = 24

  const selectedZoneId  = selectedNode?.type === 'zone' ? selectedNode.id : null
  const selectedElement = elements.find((el) => el.id === selectedElementId) ?? null

  const handleSelectLayout = (layout) => {
    setSelectedLayout(layout)
    setGridTracks({ cols: parseGrid(layout.gridCols), rows: parseGrid(layout.gridRows) })
    setZoneStyles({})
    setSelectedNode(null)
  }

  const handleSelectFrame = () => {
    setSelectedNode({ type: 'frame', id: 'canvas' })
    setSelectedElementId(null)
    setEditingElementId(null)
  }

  const handleSelectZone = (zoneId) => {
    setSelectedNode({ type: 'zone', id: zoneId })
    setSelectedElementId(null)
    setEditingElementId(null)
  }

  const handleUpdateZoneStyle = (zoneId, patch) => {
    setZoneStyles((prev) => ({ ...prev, [zoneId]: { ...prev[zoneId], ...patch } }))
  }


  const handleAddElement = (partial) => {
    const n = ++elementCounter.current
    const el = {
      // sensible defaults — overridden by partial
      x: 80 + (n % 10) * 24,
      y: 80 + (n % 8) * 18,
      width: 180,
      height: 100,
      opacity: 100,
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
    setSelectedNode(null)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Backspace' && e.key !== 'Delete') return
      // Don't fire when user is typing in an input/textarea/contenteditable
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return
      if (selectedElementId) {
        handleDeleteElement(selectedElementId)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElementId])

  const panelProps = { onAddElement: handleAddElement }

  return (
    <div className="flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>

      {/* ── Main area ── */}
      <div className="flex flex-1 min-h-0">

        {/* ── Left Panel Area (icon sidebar + content panel, with own top section) ── */}
        <div className="flex flex-col shrink-0 border-r" style={{ width: 370, backgroundColor: '#fff', borderColor: '#E9EAEB' }}>

          {/* Left panel top section */}
          <div className="shrink-0" style={{ borderBottom: '1px solid #E9EAEB' }}>
            {/* Row 1: paddle + autosave */}
            <div className="flex items-center justify-between" style={{ padding: '10px 12px', height: 56 }}>
              <Link to="/design-system" className="text-gray-900 font-black italic text-lg tracking-tight hover:opacity-80">
                paddle
              </Link>
              <div className="flex items-center" style={{ gap: 6, background: '#F5F5F5', border: '1px solid #E9EAEB', borderRadius: 8, padding: '6px 14px', fontSize: 14, fontWeight: 500, color: '#717680', lineHeight: '20px' }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Autosave On
              </div>
            </div>
            {/* Row 2: editable page name */}
            <div style={{ paddingLeft: 24, paddingRight: 12, paddingBottom: 12, paddingTop: 0 }}>
              <input
                type="text"
                value={pages.find((p) => p.id === currentPageId)?.label ?? ''}
                onChange={(e) => handleRenameCurrentPage(e.target.value)}
                style={{
                  fontSize: 20, fontWeight: 500, lineHeight: '32px',
                  color: '#0A0D12', background: 'transparent', border: 'none',
                  outline: 'none', width: '100%', fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          {/* Icon sidebar + content panel side by side */}
          <div className="flex flex-1 min-h-0">
            {/* ── Left Icon Sidebar ── */}
            <div
              className="flex flex-col py-3 shrink-0 border-r gap-1.5"
              style={{ width: 72, borderColor: '#E9EAEB' }}
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
                      backgroundColor: isActive ? 'var(--bg-primary-hover)' : 'transparent',
                      color: isActive ? 'var(--foreground-primary)' : 'var(--foreground-quaternary)',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-primary-hover)' }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    <Icon />
                    <span style={{ fontSize: 12, lineHeight: '16px', fontWeight: 400 }}>{label}</span>
                  </button>
                )
              })}
            </div>

            {/* ── Left Content Panel ── */}
            <div className="flex flex-col flex-1 overflow-hidden">
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
          </div>
        </div>

        {/* ── Canvas Area ── */}
        <div
          className="flex-1 flex flex-col min-w-0 overflow-hidden"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center px-6 min-h-0" onClick={handleDeselectAll}>
            <div
              className="shadow-lg overflow-hidden"
              style={{
                aspectRatio: '16/9',
                maxWidth: '90%',
                maxHeight: '85%',
                width: 'min(760px, 90%)',
                backgroundColor: bgColor,
                outline: selectedNode?.type === 'frame' ? '2px solid #1570EF' : 'none',
                outlineOffset: 1,
              }}
              onClick={(e) => e.stopPropagation()}
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
                onSelectElement={(id) => { setSelectedElementId(id); setEditingElementId(null); setSelectedNode(null) }}
                onSelectFrame={handleSelectFrame}
                onDeselectAll={handleDeselectAll}
                onUpdateElement={handleUpdateElement}
                onAddElement={handleAddElement}
                onSetEditing={(id) => { setSelectedElementId(id); setEditingElementId(id) }}
                onSelectZone={handleSelectZone}
                onUpdateGridTracks={setGridTracks}
              />
            </div>
          </div>

          {/* ── Bottom Sheet ── sits inside canvas column, naturally constrained to canvas width */}
          <BottomBar
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            pages={pages}
            currentPageId={currentPageId}
            currentPageData={{ selectedLayout, gridTracks, zoneStyles, elements, bgColor }}
            savedPageStates={savedPageStates.current}
            onSelectPage={handleSelectPage}
            onAddPage={handleAddPage}
          />
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
          zoneStyle={zoneStyles[selectedZoneId] ?? {}}
          onUpdateZoneStyle={(patch) => handleUpdateZoneStyle(selectedZoneId, patch)}
          pages={pages}
          onAddPage={handleAddPage}
          presPageMeta={presPageMeta}
          setPresPageMeta={setPresPageMeta}
        />
      </div>

    </div>
  )
}
