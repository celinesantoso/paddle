import { useState } from 'react'

function EmptyThumb() {
  return (
    <div
      className="w-full bg-gray-100 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1"
      style={{ aspectRatio: '16/9' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-300">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
      </svg>
      <span className="text-xs text-gray-400">No media yet</span>
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </span>
      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" className="text-gray-400">
        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-90 10 10)"/>
      </svg>
    </div>
  )
}

export default function MediaPanel({ selectedZoneId, onInsert }) {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            width="14" height="14" viewBox="0 0 20 20" fill="none"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 15l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
        {/* Most Recent */}
        <div>
          <SectionHeader title="Most Recent ›" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <EmptyThumb />
            <EmptyThumb />
          </div>
        </div>

        {/* Images */}
        <div>
          <SectionHeader title="Images ›" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <EmptyThumb />
            <EmptyThumb />
          </div>
        </div>

        {/* Videos */}
        <div>
          <SectionHeader title="Videos ›" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <EmptyThumb />
            <EmptyThumb />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 px-3 py-2.5 flex gap-2">
        <button className="flex-1 border border-gray-200 text-gray-700 rounded-lg py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors">
          Edit Media
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-1.5 text-sm font-medium transition-colors">
          Upload
        </button>
      </div>
    </div>
  )
}
