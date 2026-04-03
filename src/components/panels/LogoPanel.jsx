import { useState } from 'react'

const logoVariants = [
  {
    section: 'Color',
    items: [
      { id: 'color-1', bg: '#2563EB', text: '#FFFFFF', name: 'ipop' },
      { id: 'color-2', bg: '#111827', text: '#FFFFFF', name: 'ipop' },
      { id: 'color-3', bg: '#BFDBFE', text: '#1D4ED8', name: 'ipop' },
      { id: 'color-4', bg: '#1E3A8A', text: '#FFFFFF', name: 'ipop' },
    ],
  },
  {
    section: 'Black & White',
    items: [
      { id: 'bw-1', bg: '#FFFFFF', text: '#111827', name: 'ipop', border: true },
      { id: 'bw-2', bg: '#F3F4F6', text: '#374151', name: 'ipop' },
    ],
  },
  {
    section: 'Solar',
    items: [
      { id: 'solar-1', bg: '#FFFFFF', text: '#111827', name: 'ipop', icon: 'solar', border: true },
      { id: 'solar-2', bg: '#111827', text: '#FFFFFF', name: 'ipop', icon: 'solar' },
      { id: 'solar-3', bg: '#EFF6FF', text: '#1D4ED8', name: 'ipop', icon: 'solar' },
      { id: 'solar-4', bg: '#1E3A8A', text: '#BFDBFE', name: 'ipop', icon: 'solar' },
    ],
  },
  {
    section: 'Planet',
    items: [
      { id: 'planet-1', bg: '#FFFFFF', text: '#111827', name: 'ipop', icon: 'planet', border: true },
      { id: 'planet-2', bg: '#0F172A', text: '#E2E8F0', name: 'ipop', icon: 'planet' },
      { id: 'planet-3', bg: '#F0FDF4', text: '#166534', name: 'ipop', icon: 'planet' },
      { id: 'planet-4', bg: '#FFF7ED', text: '#9A3412', name: 'ipop', icon: 'planet' },
    ],
  },
]

function SolarIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="4" fill={color} />
      <ellipse cx="14" cy="14" rx="12" ry="5" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(30 14 14)" />
      <ellipse cx="14" cy="14" rx="12" ry="5" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(150 14 14)" />
    </svg>
  )
}

function PlanetIcon({ color }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="6" fill={color} />
      <ellipse cx="14" cy="14" rx="13" ry="5" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(-20 14 14)" />
    </svg>
  )
}

function LogoThumb({ item, onInsert }) {
  return (
    <button
      onClick={onInsert}
      className={`rounded-lg flex flex-col items-center justify-center gap-2 hover:opacity-90 transition-opacity p-3 ${item.border ? 'border border-gray-200' : ''}`}
      style={{ backgroundColor: item.bg, aspectRatio: '1/1' }}
    >
      {item.icon === 'solar' && <SolarIcon color={item.text} />}
      {item.icon === 'planet' && <PlanetIcon color={item.text} />}
      <span className="text-lg font-black italic tracking-tight leading-none" style={{ color: item.text }}>
        {item.name}
      </span>
    </button>
  )
}

export default function LogoPanel({ onAddElement }) {
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
            placeholder="Search logos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-4">
        {logoVariants.map((group) => (
          <div key={group.section}>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-2">
              {group.section}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {group.items.map((item) => (
                <LogoThumb
                  key={item.id}
                  item={item}
                  onInsert={() => onAddElement({
                    type: 'logo',
                    width: 180,
                    height: 90,
                    logoMeta: { bg: item.bg, text: item.text, name: item.name, border: item.border },
                  })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
