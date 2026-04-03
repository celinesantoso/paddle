const brandColors = [
  { hex: '#2563EB', label: 'Primary Blue' },
  { hex: '#1E3A8A', label: 'Navy' },
  { hex: '#111827', label: 'Black' },
  { hex: '#FFFFFF', label: 'White', border: true },
  { hex: '#84CC16', label: 'Green-Yellow' },
]

const brandGradients = [
  { from: '#2563EB', to: '#1E3A8A', label: 'Blue Navy' },
  { from: '#84CC16', to: '#2563EB', label: 'Green Blue' },
]

const fontVariants = [
  { weight: '400', label: 'Regular' },
  { weight: '600', label: 'Semibold' },
  { weight: '700', label: 'Bold' },
  { weight: '900', label: 'Black' },
]

export default function BrandKitPanel({ selectedZoneId, onInsert }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-3 pt-3 pb-3 space-y-5">

        {/* Brand header */}
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-black italic">i</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">ipop</div>
            <div className="text-xs text-gray-400">Brand Kit</div>
          </div>
        </div>

        {/* Brand Colors */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-3">
            Brand Colors
          </div>
          <div className="flex gap-2 flex-wrap">
            {brandColors.map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-lg ${c.border ? 'border border-gray-200' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
                <span className="text-xs text-gray-500 text-center leading-tight" style={{ fontSize: '10px' }}>
                  {c.label.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-3">
            Typography
          </div>
          <div className="space-y-2">
            <div className="text-xs text-gray-400 mb-1">Geist</div>
            {fontVariants.map((v) => (
              <div
                key={v.label}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
              >
                <span
                  className="text-gray-800 text-sm"
                  style={{ fontWeight: v.weight }}
                >
                  The quick brown fox
                </span>
                <span className="text-xs text-gray-400 ml-2 shrink-0">{v.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gradients */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-3">
            Gradients
          </div>
          <div className="grid grid-cols-2 gap-2">
            {brandGradients.map((g) => (
              <div key={g.label} className="flex flex-col gap-1">
                <div
                  className="w-full rounded-lg"
                  style={{
                    aspectRatio: '2/1',
                    background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                  }}
                />
                <span className="text-xs text-gray-500">{g.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logos placeholder */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide py-2 border-b border-gray-100 mb-3">
            Logos
          </div>
          <div className="bg-gray-50 rounded-lg border border-dashed border-gray-200 p-4 text-center">
            <p className="text-xs text-gray-400">No logos added yet</p>
          </div>
        </div>

      </div>
    </div>
  )
}
