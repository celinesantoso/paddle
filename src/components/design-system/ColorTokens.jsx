const colorScales = [
  {
    name: 'Base',
    description: 'Foundation colors used across all surfaces.',
    swatches: [
      { shade: 'White', hex: '#FFFFFF', label: 'White' },
      { shade: 'Black', hex: '#000000', label: 'Black' },
    ],
    isBase: true,
  },
  {
    name: 'Neutral',
    description: 'Used for text, borders, backgrounds, and subtle UI elements.',
    shades: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    hexValues: {
      25: '#FDFDFD',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E9EAEB',
      300: '#D5D7DA',
      400: '#A4A7AE',
      500: '#717680',
      600: '#535862',
      700: '#414651',
      800: '#252B37',
      900: '#181D27',
      950: '#0A0012',
    },
  },
  {
    name: 'Primary',
    description: 'Brand blue — used for primary actions, links, and focus states.',
    shades: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    hexValues: {
      25: '#F5F8FF',
      50: '#EFF4FF',
      100: '#D1E0FF',
      200: '#B2CCFF',
      300: '#84ADFF',
      400: '#528BFF',
      500: '#2970FF',
      600: '#155EEF',
      700: '#004EEB',
      800: '#0040C1',
      900: '#00359E',
      950: '#002266',
    },
  },
  {
    name: 'Error',
    description: 'Used for destructive actions, error states, and alerts.',
    shades: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    hexValues: {
      25: '#FFFBFA',
      50: '#FEF3F2',
      100: '#FEE4E2',
      200: '#FECDCA',
      300: '#FDA29B',
      400: '#F97066',
      500: '#F04438',
      600: '#D92D20',
      700: '#B42318',
      800: '#912018',
      900: '#7A271A',
      950: '#55160C',
    },
  },
  {
    name: 'Warning',
    description: 'Used for caution states, warnings, and attention-required indicators.',
    shades: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    hexValues: {
      25: '#FFFCF5',
      50: '#FFFAEB',
      100: '#FEF0C7',
      200: '#FEDF89',
      300: '#FEC84B',
      400: '#FDB022',
      500: '#F79009',
      600: '#DC6803',
      700: '#B54708',
      800: '#93370D',
      900: '#7A2E0E',
      950: '#4E1D09',
    },
  },
  {
    name: 'Success',
    description: 'Used for positive states, confirmations, and completed actions.',
    shades: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    hexValues: {
      25: '#F6FEF9',
      50: '#ECFDF3',
      100: '#DCFAE6',
      200: '#A9EFC5',
      300: '#75E0A7',
      400: '#47CD89',
      500: '#17B26A',
      600: '#079455',
      700: '#067647',
      800: '#085D3A',
      900: '#074D31',
      950: '#053321',
    },
  },
]

function isDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.5
}

function Swatch({ hex, label, shade }) {
  const dark = isDark(hex)
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-full rounded-lg border border-black/5"
        style={{ backgroundColor: hex, aspectRatio: '3/2', minWidth: '60px' }}
      />
      <div className="text-center">
        <div className="text-xs font-medium text-gray-700">{shade !== undefined ? shade : label}</div>
        <div className="text-xs text-gray-400 font-mono">{hex}</div>
      </div>
    </div>
  )
}

export default function ColorTokens() {
  return (
    <div className="space-y-12">
      {colorScales.map((scale) => (
        <div key={scale.name} className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{scale.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{scale.description}</p>
          </div>

          {scale.isBase ? (
            <div className="flex gap-4">
              {scale.swatches.map((s) => (
                <div key={s.label} className="w-24">
                  <Swatch hex={s.hex} label={s.label} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-3 xl:grid-cols-12">
              {scale.shades.map((shade) => (
                <Swatch
                  key={shade}
                  hex={scale.hexValues[shade]}
                  shade={shade}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
