import { useState } from 'react'

export default function TemplatePanel({ selectedZoneId, onInsert, onSelectLayout }) {
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
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-base text-[#0A0D12] placeholder-[#A4A7AE] focus:outline-none"
            style={{ fontSize: 16, lineHeight: '24px' }}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="flex flex-col gap-4 py-2">
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">No templates yet</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Save your current design as a template to use it later.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — matches Figma .navDropdown pattern */}
      <div style={{
        borderTop: '1px solid #E9EAEB',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: '#FFFFFF',
        flexShrink: 0,
      }}>
        <button style={{
          width: '100%',
          background: '#FFFFFF',
          border: '1px solid #D5D7DA',
          borderRadius: 10,
          padding: '8px 14px',
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          color: '#0A0D12',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: '0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18)',
        }}>
          Edit Templates
        </button>
        <button style={{
          width: '100%',
          background: '#1570EF',
          border: '1px solid #175CD3',
          borderRadius: 10,
          padding: '8px 14px',
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          color: '#FFFFFF',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: '0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18)',
        }}>
          Save as Template
        </button>
      </div>
    </div>
  )
}
