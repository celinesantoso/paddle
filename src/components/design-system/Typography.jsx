const typeScale = [
  { label: 'Display 2xl', size: '72px', lineHeight: '90px', tracking: '-0.02em', tailwind: 'text-7xl' },
  { label: 'Display xl',  size: '60px', lineHeight: '72px', tracking: '-0.02em', tailwind: 'text-6xl' },
  { label: 'Display lg',  size: '48px', lineHeight: '60px', tracking: '-0.02em', tailwind: 'text-5xl' },
  { label: 'Display md',  size: '36px', lineHeight: '44px', tracking: '-0.02em', tailwind: 'text-4xl' },
  { label: 'Display sm',  size: '30px', lineHeight: '38px', tracking: '-0.01em', tailwind: 'text-3xl' },
  { label: 'Display xs',  size: '24px', lineHeight: '32px', tracking: '0',       tailwind: 'text-2xl' },
  { label: 'Text xl',     size: '20px', lineHeight: '30px', tracking: '0',       tailwind: 'text-xl' },
  { label: 'Text lg',     size: '18px', lineHeight: '28px', tracking: '0',       tailwind: 'text-lg' },
  { label: 'Text md',     size: '16px', lineHeight: '24px', tracking: '0',       tailwind: 'text-base' },
  { label: 'Text sm',     size: '14px', lineHeight: '20px', tracking: '0',       tailwind: 'text-sm' },
  { label: 'Text xs',     size: '12px', lineHeight: '18px', tracking: '0',       tailwind: 'text-xs' },
]

const weights = [
  { label: 'Regular',   weight: '400', tailwind: 'font-normal' },
  { label: 'Medium',    weight: '500', tailwind: 'font-medium' },
  { label: 'Semibold',  weight: '600', tailwind: 'font-semibold' },
  { label: 'Bold',      weight: '700', tailwind: 'font-bold' },
]

export default function Typography() {
  return (
    <div className="space-y-2">
      {/* Header row */}
      <div className="grid grid-cols-[160px_1fr] gap-4 pb-3 border-b border-gray-200">
        <div />
        <div className="grid grid-cols-4 gap-4">
          {weights.map((w) => (
            <div key={w.label} className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {w.label}
            </div>
          ))}
        </div>
      </div>

      {typeScale.map((type) => (
        <div
          key={type.label}
          className="grid grid-cols-[160px_1fr] gap-4 py-4 border-b border-gray-100 items-center"
        >
          {/* Label + spec */}
          <div>
            <div className="text-xs font-semibold text-gray-700">{type.label}</div>
            <div className="text-xs text-gray-400 mt-0.5 font-mono">
              {type.size} / {type.lineHeight}
            </div>
            {type.tracking !== '0' && (
              <div className="text-xs text-gray-400 font-mono">{type.tracking}</div>
            )}
          </div>

          {/* Weight columns */}
          <div className="grid grid-cols-4 gap-4 items-center overflow-hidden">
            {weights.map((w) => (
              <div
                key={w.label}
                className={`${type.tailwind} ${w.tailwind} text-gray-900 truncate`}
                style={{ lineHeight: type.lineHeight, letterSpacing: type.tracking }}
              >
                Geist
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
