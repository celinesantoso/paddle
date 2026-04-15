import { useState } from 'react'

// ─── QR Code SVG ────────────────────────────────────────────────────────────

function QRPattern() {
  // Finder patterns + data cells for a realistic QR look
  const cells = []
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      // Outer ring
      const onBorder = r === 0 || r === 6 || c === 0 || c === 6
      // Inner square
      const onInner = r >= 2 && r <= 4 && c >= 2 && c <= 4
      if (onBorder || onInner) cells.push({ r, c })
    }
  }
  // Add some data-region dots for visual fidelity
  const data = [[0,4],[0,5],[0,6],[1,5],[2,3],[3,4],[4,0],[4,3],[5,1],[5,4],[6,2],[6,5]]
  const allCells = [...cells, ...data]
  return (
    <svg width="38" height="38" viewBox="0 0 9 9" shapeRendering="crispEdges">
      {allCells.map(({ r, c }) => (
        <rect key={`${r}-${c}`} x={c + 1} y={r + 1} width="1" height="1" fill="#111827" />
      ))}
    </svg>
  )
}

// ─── Search Icon ─────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M17.5 17.5001L13.8833 13.8835M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Globe Icon ──────────────────────────────────────────────────────────────

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
      <path d="M12 3C12 3 9 7.5 9 12s3 9 3 9M12 3c0 0 3 4.5 3 9s-3 9-3 9M3 12h18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Widget Card ─────────────────────────────────────────────────────────────

function WidgetCard({ label, onClick, children, previewStyle }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-primary)',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
        width: '100%',
      }}
    >
      {/* Preview area */}
      <div
        style={{
          height: 82,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
          width: '100%',
          ...previewStyle,
        }}
      >
        {children}
      </div>
      {/* Label */}
      <div
        style={{
          paddingTop: 'var(--spacing-sm)',
          paddingBottom: 'var(--spacing-lg)',
          paddingLeft: 'var(--spacing-lg)',
          paddingRight: 'var(--spacing-lg)',
          width: '100%',
        }}
      >
        <span
          style={{
            fontSize: 'var(--font-size-p4)',
            lineHeight: 'var(--line-height-p4)',
            fontWeight: 400,
            color: 'var(--foreground-primary)',
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      </div>
    </button>
  )
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{ paddingLeft: 'var(--spacing-lg)', paddingRight: 'var(--spacing-lg)', paddingTop: 'var(--spacing-xs)', paddingBottom: 'var(--spacing-xs)' }}>
      <span
        style={{
          fontSize: 'var(--font-size-p3)',
          lineHeight: 'var(--line-height-p3)',
          fontWeight: 500,
          color: 'var(--foreground-primary)',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </div>
  )
}

// ─── Widget Grid ──────────────────────────────────────────────────────────────

function WidgetGrid({ children }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 10,
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}

// ─── Date Preview ─────────────────────────────────────────────────────────────

function DatePreview() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-s)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xs)',
        width: 48,
      }}
    >
      {/* Green accent bar */}
      <div style={{ background: 'var(--color-secondary-300)', height: 4, flexShrink: 0 }} />
      {/* Content */}
      <div
        style={{
          background: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          height: 40,
          padding: '0 4px',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground-primary)', lineHeight: '14px', fontFamily: 'Inter, sans-serif', width: '100%', textAlign: 'center' }}>09</span>
        <span style={{ fontSize: 7, fontWeight: 400, color: 'var(--foreground-quaternary)', lineHeight: '10px', width: '100%', textAlign: 'center' }}>Mar 26</span>
      </div>
    </div>
  )
}

// ─── YouTube Preview ──────────────────────────────────────────────────────────

function YouTubePreview() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#cc0000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* YouTube wordmark style */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div
          style={{
            background: 'white',
            borderRadius: 4,
            width: 28,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#cc0000">
            <path d="M10 15l5.19-3L10 9v6z"/>
          </svg>
        </div>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 14, letterSpacing: -0.5 }}>YouTube</span>
      </div>
    </div>
  )
}

// ─── QR Preview Container ─────────────────────────────────────────────────────

function QRPreview() {
  return (
    <div
      style={{
        background: 'var(--bg-primary)',
        borderRadius: 3,
        width: 48,
        height: 48,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <QRPattern />
    </div>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function WidgetsPanel({ onAddElement }) {
  const [search, setSearch] = useState('')

  const add = (name, w = 120, h = 100) =>
    onAddElement({ type: 'widget', widgetName: name, width: w, height: h })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)' }}>
      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--spacing-2xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-4xl)',
        }}
      >
        {/* Search field */}
        <div
          className="flex items-center gap-3"
          style={{ background: '#FFFFFF', border: '1px solid #D5D7DA', borderRadius: 8, padding: '8px 12px' }}
        >
          <SearchIcon />
          <input
            type="text"
            placeholder="Search widgets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-base text-[#0A0D12] placeholder-[#A4A7AE] focus:outline-none"
            style={{ fontSize: 16, lineHeight: '24px', fontFamily: 'inherit' }}
          />
        </div>

        {/* Most Recent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
          <SectionLabel>Most Recent</SectionLabel>
          <WidgetGrid>
            <WidgetCard label="QR Code" onClick={() => add('qr-code', 120, 120)}>
              <QRPreview />
            </WidgetCard>
          </WidgetGrid>
        </div>

        {/* Source */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
          <SectionLabel>Source</SectionLabel>
          <WidgetGrid>
            <WidgetCard label="YouTube" onClick={() => add('youtube', 140, 90)} previewStyle={{ background: 'transparent', border: '1px solid var(--border-default)', padding: 0 }}>
              <YouTubePreview />
            </WidgetCard>
          </WidgetGrid>
        </div>

        {/* Utilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%', overflow: 'hidden' }}>
          <SectionLabel>Utilities</SectionLabel>
          <WidgetGrid>
            <WidgetCard label="QR Code" onClick={() => add('qr-code', 120, 120)}>
              <QRPreview />
            </WidgetCard>
            <WidgetCard label="Web Content" onClick={() => add('web-content', 280, 200)}>
              <div
                style={{
                  background: 'var(--color-orange-500)',
                  borderRadius: 8,
                  padding: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GlobeIcon />
              </div>
            </WidgetCard>
          </WidgetGrid>
        </div>

        {/* Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
          <SectionLabel>Time</SectionLabel>
          <WidgetGrid>
            <WidgetCard label="Date" onClick={() => add('date', 220, 50)}>
              <DatePreview />
            </WidgetCard>
            <WidgetCard label="Digital Clock" onClick={() => add('clock', 180, 50)}>
              <span
                style={{
                  fontFamily: "'Chivo Mono', monospace",
                  fontWeight: 500,
                  fontSize: 'var(--font-size-p3)',
                  lineHeight: 'var(--line-height-p3)',
                  color: '#000000',
                  letterSpacing: 0,
                }}
              >
                00:00:00
              </span>
            </WidgetCard>
          </WidgetGrid>
        </div>
      </div>
    </div>
  )
}
