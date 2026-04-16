import { useState, useRef } from 'react'

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function EmptyThumb() {
  return (
    <div
      className="flex-1 min-w-0 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1"
      style={{ aspectRatio: '16/9' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-300">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      </svg>
      <span className="text-xs text-gray-400">No media yet</span>
    </div>
  )
}

function MediaCard({ item, onInsert }) {
  const [duration, setDuration] = useState(null)

  return (
    <div
      className="relative rounded-md overflow-hidden cursor-pointer group"
      style={{ breakInside: 'avoid', marginBottom: 6 }}
      onClick={() => onInsert && onInsert(item)}
    >
      {item.type === 'image' ? (
        <img src={item.url} alt={item.name} className="w-full h-auto block" />
      ) : (
        <video
          src={item.url}
          className="w-full h-auto block"
          muted
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-md" />
      {item.type === 'video' && duration !== null && (
        <span className="absolute bottom-1.5 left-1.5 text-white text-[11px] font-medium leading-none bg-black/50 rounded px-1 py-0.5">
          {formatDuration(duration)}
        </span>
      )}
    </div>
  )
}

function SectionLabel({ title, showSeeAll = false, hasMedia = false }) {
  return (
    <div className="flex items-center justify-between px-2 py-0.5 w-full">
      <span className="text-[16px] leading-6 font-medium text-[#0A0D12] whitespace-nowrap">
        {title}
      </span>
      {showSeeAll && (
        <button
          className="text-[12px] leading-4 font-medium whitespace-nowrap bg-transparent border-0 p-0"
          style={{ fontFamily: 'inherit', color: hasMedia ? '#155EEF' : '#D5D7DA', cursor: hasMedia ? 'pointer' : 'default' }}
        >
          See all
        </button>
      )}
    </div>
  )
}

function MediaGrid({ items, onInsert }) {
  if (items.length === 0) {
    return (
      <div className="flex gap-[6px] items-start w-full">
        <EmptyThumb />
        <EmptyThumb />
      </div>
    )
  }
  return (
    <div style={{ columns: 2, columnGap: 6 }}>
      {items.map((item) => (
        <MediaCard key={item.id} item={item} onInsert={onInsert} />
      ))}
    </div>
  )
}

export default function MediaPanel({ onInsert }) {
  const [search, setSearch] = useState('')
  const [mediaItems, setMediaItems] = useState([])
  const fileInputRef = useRef(null)

  function handleUploadClick() {
    fileInputRef.current.click()
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files)
    const newItems = files.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file),
      uploadedAt: Date.now(),
    }))
    setMediaItems((prev) => [...newItems, ...prev])
    e.target.value = ''
  }

  const filtered = search.trim()
    ? mediaItems.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : mediaItems

  const recentItems = filtered.slice(0, 2)
  const images = filtered.filter((item) => item.type === 'image')
  const videos = filtered.filter((item) => item.type === 'video')

  return (
    <div className="flex flex-col h-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div
          className="flex items-center gap-3"
          style={{ background: '#FFFFFF', border: '1px solid #D5D7DA', borderRadius: 8, padding: '8px 12px' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path d="M17.5 17.5001L13.8833 13.8835M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-base text-[#0A0D12] placeholder-[#A4A7AE] focus:outline-none"
            style={{ fontSize: 16, lineHeight: '24px' }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <SectionLabel title="Most Recent" showSeeAll hasMedia={recentItems.length > 0} />
            <MediaGrid items={recentItems} onInsert={onInsert} />
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel title="Images" showSeeAll hasMedia={images.length > 0} />
            <MediaGrid items={images} onInsert={onInsert} />
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel title="Videos" showSeeAll hasMedia={videos.length > 0} />
            <MediaGrid items={videos} onInsert={onInsert} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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
          Edit Media
        </button>
        <button
          onClick={handleUploadClick}
          style={{
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
          }}
        >
          Upload File
        </button>
      </div>
    </div>
  )
}
