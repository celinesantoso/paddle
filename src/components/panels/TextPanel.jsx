import { useState } from 'react'

const TEXT_PRESETS = [
  { label: 'Add a heading',    fontSize: 32, fontWeight: 700, width: 360, height: 56 },
  { label: 'Add a subheading', fontSize: 20, fontWeight: 600, width: 300, height: 44 },
  { label: 'Add body text',    fontSize: 14, fontWeight: 400, width: 260, height: 36 },
]

export default function TextPanel({ onAddElement }) {
  const [search, setSearch] = useState('')

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
            placeholder="Search fonts or styles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
        {/* Add Text Box */}
        <button
          onClick={() => onAddElement({ type: 'text', content: 'Click to edit text', fontSize: 16, fontWeight: 400, color: '#0A0D12', width: 220, height: 40 })}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 text-sm transition-colors flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Text Box
        </button>

        {/* Default Text Styles */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-2">
            Default Text Styles
          </div>
          <div className="space-y-2">
            {TEXT_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => onAddElement({ type: 'text', content: p.label, fontSize: p.fontSize, fontWeight: p.fontWeight, color: '#0A0D12', width: p.width, height: p.height })}
                className="w-full text-left border border-gray-200 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <span style={{ fontSize: p.fontSize, fontWeight: p.fontWeight }} className="text-gray-900">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Components placeholder */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-2">
            Text Components
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400" style={{ aspectRatio: '16/9' }}>
                {i === 1 && 'No components'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
