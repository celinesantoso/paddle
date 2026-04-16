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
        <div
          className="flex items-center gap-3"
          style={{ background: '#FFFFFF', border: '1px solid #D5D7DA', borderRadius: 8, padding: '8px 12px' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path d="M17.5 17.5001L13.8833 13.8835M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search fonts or styles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-base text-[#0A0D12] placeholder-[#A4A7AE] focus:outline-none"
            style={{ fontSize: 16, lineHeight: '24px' }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
        {/* Add Text Box */}
        <button
          onClick={() => onAddElement({ type: 'text', content: 'Click to edit text', fontSize: 16, fontWeight: 400, color: '#0A0D12', width: 220, height: 40 })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
          style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', color: '#0A0D12', cursor: 'pointer', fontFamily: 'inherit' }}
        >
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
