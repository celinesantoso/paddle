import { useState } from 'react'

function QRPattern() {
  // Simple visual QR code representation
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,1,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  ]
  return (
    <svg width="40" height="40" viewBox="0 0 7 7" shapeRendering="crispEdges">
      {[0,1,2,3,4,5,6].map(row =>
        [0,1,2,3,4,5,6].map(col => {
          const val = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3)
            ? ((row % 2 === 0 || col % 2 === 0) ? 1 : 0)
            : ((row + col) % 2)
          return val ? (
            <rect key={`${row}-${col}`} x={col} y={row} width="1" height="1" fill="#111827" />
          ) : null
        })
      )}
    </svg>
  )
}

function WidgetThumb({ label, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity"
    >
      <div
        className="w-full bg-white rounded-lg border border-gray-200 flex items-center justify-center"
        style={{ aspectRatio: '16/9' }}
      >
        {children}
      </div>
      <span className="text-xs text-gray-600">{label}</span>
    </button>
  )
}

export default function WidgetsPanel({ onAddElement }) {
  const [search, setSearch] = useState('')

  const add = (name, w = 120, h = 100) => onAddElement({ type: 'widget', widgetName: name, width: w, height: h })

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 15l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search widgets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
        {/* Most Recent */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-2">Most Recent</div>
          <div className="grid grid-cols-2 gap-2">
            <WidgetThumb label="QR Code" onClick={() => add('qr-code', 120, 120)}><QRPattern /></WidgetThumb>
          </div>
        </div>

        {/* Source */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-2">Source</div>
          <div className="grid grid-cols-2 gap-2">
            <WidgetThumb label="YouTube" onClick={() => add('youtube', 140, 90)}>
              <div className="bg-red-600 rounded-lg w-10 h-7 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M10 15l5.19-3L10 9v6z"/></svg>
              </div>
            </WidgetThumb>
          </div>
        </div>

        {/* Utilities */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-2">Utilities</div>
          <div className="grid grid-cols-2 gap-2">
            <WidgetThumb label="QR Code" onClick={() => add('qr-code', 120, 120)}><QRPattern /></WidgetThumb>
          </div>
        </div>

        {/* Time */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-2">Time</div>
          <div className="grid grid-cols-2 gap-2">
            <WidgetThumb label="Date" onClick={() => add('date', 220, 50)}>
              <div className="bg-white border border-gray-100 rounded px-2 py-1 text-center">
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </WidgetThumb>
            <WidgetThumb label="Digital Clock" onClick={() => add('clock', 180, 50)}>
              <div className="bg-gray-900 rounded px-2 py-1">
                <span className="text-xs font-mono font-bold text-green-400 tracking-widest">00:00:00</span>
              </div>
            </WidgetThumb>
          </div>
        </div>
      </div>
    </div>
  )
}
