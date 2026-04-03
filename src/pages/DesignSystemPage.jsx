import { useState } from 'react'
import { Link } from 'react-router-dom'
import ColorTokens from '../components/design-system/ColorTokens'
import Typography from '../components/design-system/Typography'

const tabs = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
]

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('colors')

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/editor" className="text-gray-900 font-black italic text-lg tracking-tight">
              paddle
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">Design System</span>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-700 font-medium capitalize">{activeTab}</span>
          </div>
          <Link
            to="/editor"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M3 10h14M3 10l5-5M3 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="scale(-1,1) translate(-20,0)"/>
            </svg>
            Back to Editor
          </Link>
        </div>

        {/* Tab bar */}
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span>Foundations</span>
          <span>→</span>
          <span className="text-gray-900 font-medium capitalize">{activeTab}</span>
        </div>

        {activeTab === 'colors' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Colors</h1>
              <p className="text-gray-500 mt-2 text-sm max-w-xl">
                The Paddle color system uses semantic scales across five categories.
                Each scale contains 12 steps (25–950) to cover the full range of UI use cases.
              </p>
            </div>
            <ColorTokens />
          </div>
        )}

        {activeTab === 'typography' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Typography</h1>
              <p className="text-gray-500 mt-2 text-sm max-w-xl">
                Geist is the primary typeface. The type scale covers 11 sizes from
                Display 2xl (72px) down to Text xs (12px), each available in Regular, Medium, Semibold, and Bold.
              </p>
            </div>
            <Typography />
          </div>
        )}
      </main>
    </div>
  )
}
