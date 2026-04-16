import { useState } from 'react'

// ─── Zone color tokens (from Figma) ───────────────────────────────────────────
const Z = {
  light:  { background: '#E9EAEB', border: '1px solid #D5D7DA' },
  mid:    { background: '#D5D7DA', border: '1px solid #A4A7AE' },
  white:  { background: '#FFFFFF', border: '1px solid #E9EAEB' },
  xlight: { background: '#FAFAFA', border: '1px solid #D5D7DA' },
}

// ─── Thumbnail inner renders (match Figma zone visuals exactly) ───────────────
function Thumb1ZoneFull() {
  return <div className="h-full rounded-[6px]" style={Z.light} />
}

function Thumb2ZoneLR() {
  return (
    <div className="flex flex-row gap-1.5 h-full">
      <div className="rounded-[6px]" style={{ ...Z.light, flex: '2' }} />
      <div className="rounded-[6px]" style={{ ...Z.mid,   flex: '1' }} />
    </div>
  )
}

function Thumb2ZoneTB() {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <div className="flex-1 rounded-[6px]" style={Z.light} />
      <div className="shrink-0 rounded-[6px]" style={{ ...Z.mid, height: 12 }} />
    </div>
  )
}

// Large left zone + 2 stacked right + thin bottom bar across full width
function Thumb3ZoneLR2() {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <div className="flex flex-row gap-1.5 flex-1">
        <div className="rounded-[6px]" style={{ ...Z.xlight, flex: '2' }} />
        <div className="rounded-[6px]" style={{ ...Z.light,  flex: '1' }} />
      </div>
      <div className="shrink-0 rounded-[6px]" style={{ ...Z.mid, height: 12 }} />
    </div>
  )
}

// 2 stacked left zones + tall right zone
function Thumb3ZoneT2B() {
  return (
    <div className="flex flex-row gap-1.5 h-full">
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex-1 rounded-[6px]" style={Z.white} />
        <div className="flex-1 rounded-[6px]" style={Z.light} />
      </div>
      <div className="flex-1 h-full rounded-[6px]" style={Z.mid} />
    </div>
  )
}

// Large left + 3 stacked right
function Thumb4ZoneL3R() {
  return (
    <div className="flex flex-row gap-1.5 h-full">
      <div className="rounded-[6px]" style={{ ...Z.white, flex: '2' }} />
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex-1 rounded-[6px]" style={Z.light} />
        <div className="flex-1 rounded-[6px]" style={Z.mid} />
        <div className="flex-1 rounded-[6px]" style={Z.xlight} />
      </div>
    </div>
  )
}

// ─── Layout presets (data for canvas rendering + thumbnail component) ─────────
export const LAYOUT_PRESETS = [
  {
    section: 'Most Used',
    items: [
      {
        id: 'split-lr-65',
        Thumb: Thumb2ZoneLR,
        zones: [
          { id: 'z1', style: { gridColumn: '1', gridRow: '1' } },
          { id: 'z2', style: { gridColumn: '2', gridRow: '1' } },
        ],
        gridCols: '2fr 1fr',
        gridRows: '1fr',
      },
      {
        id: 'split-tb',
        Thumb: Thumb2ZoneTB,
        zones: [
          { id: 'z1', style: { gridColumn: '1', gridRow: '1' } },
          { id: 'z2', style: { gridColumn: '1', gridRow: '2' } },
        ],
        gridCols: '1fr',
        gridRows: '3fr 1fr',
      },
    ],
  },
  {
    section: '1 Zone',
    items: [
      {
        id: 'full',
        Thumb: Thumb1ZoneFull,
        zones: [{ id: 'z1', style: { gridColumn: '1', gridRow: '1' } }],
        gridCols: '1fr',
        gridRows: '1fr',
      },
    ],
  },
  {
    section: '2 Zone',
    items: [
      {
        id: 'two-lr',
        Thumb: Thumb2ZoneLR,
        zones: [
          { id: 'z1', style: { gridColumn: '1', gridRow: '1' } },
          { id: 'z2', style: { gridColumn: '2', gridRow: '1' } },
        ],
        gridCols: '2fr 1fr',
        gridRows: '1fr',
      },
      {
        id: 'two-tb',
        Thumb: Thumb2ZoneTB,
        zones: [
          { id: 'z1', style: { gridColumn: '1', gridRow: '1' } },
          { id: 'z2', style: { gridColumn: '1', gridRow: '2' } },
        ],
        gridCols: '1fr',
        gridRows: '3fr 1fr',
      },
    ],
  },
  {
    section: '3 Zones',
    items: [
      {
        id: 'three-l-2r',
        Thumb: Thumb3ZoneLR2,
        zones: [
          { id: 'z1', style: { gridColumn: '1', gridRow: '1' } },
          { id: 'z2', style: { gridColumn: '2', gridRow: '1' } },
          { id: 'z3', style: { gridColumn: '1 / 3', gridRow: '2' } },
        ],
        gridCols: '2fr 1fr',
        gridRows: '1fr 0.15fr',
      },
      {
        id: 'three-t-2b',
        Thumb: Thumb3ZoneT2B,
        zones: [
          { id: 'z1', style: { gridColumn: '1', gridRow: '1' } },
          { id: 'z2', style: { gridColumn: '1', gridRow: '2' } },
          { id: 'z3', style: { gridColumn: '2', gridRow: '1 / 3' } },
        ],
        gridCols: '1fr 1fr',
        gridRows: '1fr 1fr',
      },
    ],
  },
  {
    section: '4 Zones',
    items: [
      {
        id: 'four-l-3r',
        Thumb: Thumb4ZoneL3R,
        zones: [
          { id: 'z1', style: { gridColumn: '1', gridRow: '1 / 4' } },
          { id: 'z2', style: { gridColumn: '2', gridRow: '1' } },
          { id: 'z3', style: { gridColumn: '2', gridRow: '2' } },
          { id: 'z4', style: { gridColumn: '2', gridRow: '3' } },
        ],
        gridCols: '2fr 1fr',
        gridRows: '1fr 1fr 1fr',
      },
    ],
  },
]

// ─── Thumbnail card ───────────────────────────────────────────────────────────
function LayoutThumbnail({ item, isSelected, onClick }) {
  const { Thumb } = item
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full overflow-hidden transition-colors"
      style={{
        height: 82,
        padding: 6,
        borderRadius: 10,
        background: hovered ? '#E9EAEB' : '#F5F5F5',
        border: isSelected ? '2px solid #0A0D12' : '1px solid #E9EAEB',
        boxSizing: 'border-box',
      }}
    >
      <Thumb />
    </button>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────
export default function LayoutPanel({ selectedLayoutId, onSelectLayout }) {
  const [search, setSearch] = useState('')

  const filtered = LAYOUT_PRESETS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      group.section.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="flex flex-col h-full">

      {/* Search bar — matches Figma: white bg, #D5D7DA border, 8px radius, 8px 12px padding */}
      <div className="px-3 pt-3 pb-2">
        <div
          className="flex items-center gap-3"
          style={{
            background: '#FFFFFF',
            border: '1px solid #D5D7DA',
            borderRadius: 8,
            padding: '8px 12px',
          }}
        >
          {/* Search icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M17.5 17.5001L13.8833 13.8835M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
              stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search layouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-base text-[#0A0D12] placeholder-[#A4A7AE] focus:outline-none"
            style={{ fontSize: 16, lineHeight: '24px' }}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4">
        {filtered.map((group) => (
          <div key={group.section}>
            {/* Section label — Figma: 16px medium, #0A0D12, padding 2px 8px */}
            <div
              className="font-medium"
              style={{
                fontSize: 16,
                lineHeight: '24px',
                color: '#0A0D12',
                padding: '2px 8px',
                marginBottom: 8,
              }}
            >
              {group.section}
            </div>

            {/* Thumbnails grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {group.items.map((item) => (
                <LayoutThumbnail
                  key={item.id}
                  item={item}
                  isSelected={selectedLayoutId === item.id}
                  onClick={() => onSelectLayout(item)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
