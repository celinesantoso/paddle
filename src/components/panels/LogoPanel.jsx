import { useState } from 'react'

// Figma MCP asset URLs (node 1797-23256)
const imgVector8  = "https://www.figma.com/api/mcp/asset/98a07263-c627-4ea7-9c3a-b5cbfcbeac75"
const imgGroup1   = "https://www.figma.com/api/mcp/asset/25270bc8-d648-4cb3-945d-1802a11193f8"
const imgGroup2   = "https://www.figma.com/api/mcp/asset/80845d73-0819-4305-a76a-76a7568da7b0"
const imgGroup3   = "https://www.figma.com/api/mcp/asset/ae089d35-4a9a-4cdf-a06b-4adf06725a4e"
const imgGroup4   = "https://www.figma.com/api/mcp/asset/f90da30e-7c83-4a4a-ba30-09c5a7d51d39"
const imgGroup5   = "https://www.figma.com/api/mcp/asset/038e93cb-f49f-49d2-9080-96fc7097a4c7"
const imgGroup6   = "https://www.figma.com/api/mcp/asset/0f00186f-de15-47a5-982d-dd03eaec095b"
const imgGroup7   = "https://www.figma.com/api/mcp/asset/d6b4dcbd-c3a0-4d5e-ae3f-d42a7def6d26"
const imgGroup8   = "https://www.figma.com/api/mcp/asset/66271aac-4bad-46cd-a710-4740f242a2c5"
const imgGroup9   = "https://www.figma.com/api/mcp/asset/f9ae5604-f8a8-4687-ab99-42d6dcb78345"
const imgGroup10  = "https://www.figma.com/api/mcp/asset/e8245117-04b3-4539-92cc-c5bc402589d3"
const imgGroup11  = "https://www.figma.com/api/mcp/asset/997142f2-8ddf-421c-98b4-8029a21db821"
const imgGroup12  = "https://www.figma.com/api/mcp/asset/fc13dd40-83ec-4b93-b199-01ce885d33ad"
const imgGroup13  = "https://www.figma.com/api/mcp/asset/0487ade0-d8d0-4566-aa58-2618120720cd"
const imgGroup14  = "https://www.figma.com/api/mcp/asset/7e30ac2d-5539-4916-a7f5-54ec0f1a1dd9"
const imgGroup15  = "https://www.figma.com/api/mcp/asset/d2027982-0bfe-4661-a610-cf817dc3021f"
const imgGroup16  = "https://www.figma.com/api/mcp/asset/56191d04-5fe1-4249-82be-3ea2b3cbcd8f"
const imgGroup17  = "https://www.figma.com/api/mcp/asset/6254aed9-3554-4d49-ae65-f144bd095689"
const imgGroup18  = "https://www.figma.com/api/mcp/asset/49d57029-967f-4c2a-a8ae-c66fd16bb3ab"
const imgGroup19  = "https://www.figma.com/api/mcp/asset/642e6e7f-d61a-4c28-b93d-20be4bceefbd"
const imgGroup20  = "https://www.figma.com/api/mcp/asset/63d88ac1-a34b-4df0-bad7-aefc2ea6c4b6"
const imgGroup21  = "https://www.figma.com/api/mcp/asset/9da472d6-543c-44b2-a94d-20f6d0efff0a"
const imgVector9  = "https://www.figma.com/api/mcp/asset/9c11c219-91e0-4044-ab67-fa44a6f09d77"
const imgGroup22  = "https://www.figma.com/api/mcp/asset/392904fb-ac6f-4f29-97cb-30928284407a"
const imgGroup23  = "https://www.figma.com/api/mcp/asset/bc33258a-f7ea-42e4-a7da-13513a5eddb8"
const imgVector10 = "https://www.figma.com/api/mcp/asset/9387e9d8-8e8e-470e-9669-2391d2d68c6e"
const imgGroup24  = "https://www.figma.com/api/mcp/asset/705bda0d-09ee-4abc-94cf-ae648a38d100"
const imgGroup25  = "https://www.figma.com/api/mcp/asset/5c33a828-f911-476f-b697-e7367ef6eebb"
const imgVector11 = "https://www.figma.com/api/mcp/asset/fa8cc885-8799-40f2-903e-42bbb85aa409"
const imgGroup26  = "https://www.figma.com/api/mcp/asset/acde6e5d-6e60-490a-a05e-9eacdb23c0bc"
const imgGroup27  = "https://www.figma.com/api/mcp/asset/05224695-3612-4e37-8ba2-5bc2f50214a3"
const imgVector12 = "https://www.figma.com/api/mcp/asset/edf2c11c-370d-4466-9a46-9b8c29c49f45"
const imgGroup28  = "https://www.figma.com/api/mcp/asset/591e5752-06e2-4ce9-80e6-d1c65d084570"
const imgGroup29  = "https://www.figma.com/api/mcp/asset/690d633a-6f9e-4b61-b014-14085651391c"
const imgVector13 = "https://www.figma.com/api/mcp/asset/20eec41a-6a3c-4cad-aabe-9e6e8c3fccda"
const imgVector14 = "https://www.figma.com/api/mcp/asset/4ee09127-5ece-4b00-995f-8d9093b036da"
const imgVector15 = "https://www.figma.com/api/mcp/asset/58487d1b-a97f-4dc2-b6ea-16d66170c914"
const imgVector16 = "https://www.figma.com/api/mcp/asset/2a3d9cf8-8edb-4f53-b744-ce6255e0f03e"
const imgVector17 = "https://www.figma.com/api/mcp/asset/a29d8916-96c5-4eac-a32e-cbc0643740c2"
const imgGroup30  = "https://www.figma.com/api/mcp/asset/29cc1184-bcba-4b64-b5b0-76980fb04e97"
const imgGroup31  = "https://www.figma.com/api/mcp/asset/6219f218-22e9-4984-a4db-e2c79fdc1e9c"
const imgGroup32  = "https://www.figma.com/api/mcp/asset/65ba2fa2-6dd4-4238-bab1-6d6c4b0b0324"
const imgVector18 = "https://www.figma.com/api/mcp/asset/f0c5e976-fb5b-49d0-805f-19196f22f3c2"
const imgVector19 = "https://www.figma.com/api/mcp/asset/8820635c-223a-4c43-b2dd-ab203a56aa33"
const imgVector20 = "https://www.figma.com/api/mcp/asset/fe4d4d3f-68f8-47fe-8119-4515123f4567"
const imgVector21 = "https://www.figma.com/api/mcp/asset/67066302-0515-49d3-b3dd-67bf8da7f7c1"
const imgVector22 = "https://www.figma.com/api/mcp/asset/6963eaae-660e-4e55-aaff-311d0f28743b"
const imgGroup33  = "https://www.figma.com/api/mcp/asset/c958ad87-e7be-44cc-8f7b-ed1f0f598542"
const imgGroup34  = "https://www.figma.com/api/mcp/asset/3c02d7c6-e8f6-47c4-9305-6eb253e1bf9a"
const imgVector23 = "https://www.figma.com/api/mcp/asset/a5c59f3a-4e3a-4a18-9210-e0b99f856c3a"
const imgVector24 = "https://www.figma.com/api/mcp/asset/a4945f3b-d86f-4ca2-900b-b73f5839db4c"
const imgVector25 = "https://www.figma.com/api/mcp/asset/45142e3d-9027-4a7b-9ca8-fbedb91c65c8"
const imgVector26 = "https://www.figma.com/api/mcp/asset/bbbf12c0-3699-4d0d-a5ca-491f16c943d1"
const imgVector27 = "https://www.figma.com/api/mcp/asset/81bb46a2-3f81-41fd-bf3d-0d297af7fdf8"
const imgGroup35  = "https://www.figma.com/api/mcp/asset/c15d2117-37b2-40c9-8da1-3df43aab29b8"
const imgGroup36  = "https://www.figma.com/api/mcp/asset/83e1b261-cbba-401c-828a-29850aa8755e"
const imgVector28 = "https://www.figma.com/api/mcp/asset/5c902087-f2c5-431c-b192-d6393907a6b3"
const imgVector29 = "https://www.figma.com/api/mcp/asset/077c9ba9-c94e-4ed2-a490-c8b131d7198d"
const imgVector30 = "https://www.figma.com/api/mcp/asset/68eb7d25-d73a-47d4-b8e7-7e648401a8e8"
const imgVector31 = "https://www.figma.com/api/mcp/asset/a8de3286-6d27-48ca-a144-f87f6cc13535"
const imgVector32 = "https://www.figma.com/api/mcp/asset/763d9d86-defe-4d57-938d-ee0749a20a2e"
const imgGroup37  = "https://www.figma.com/api/mcp/asset/20a4b25e-d92b-42bb-b3ac-f99a4bfd7404"

// Design tokens
const DS = {
  bgPrimary:    '#FFFFFF',
  bgSecondary:  '#F5F5F5',
  borderDefault:'#E9EAEB',
  borderPrimary:'#D5D7DA',
  borderBrand:  '#175CD3',
  bgBrand:      '#1570EF',
  fgPrimary:    '#0A0D12',
  fgOnAction:   '#FFFFFF',
  fgPlaceholder:'#A4A7AE',
  indigo600:    '#444CE7',
  indigo300:    '#A4BCFD',
  indigo900:    '#2D3282',
  radiusXl:     10,
  radiusL:      8,
  shadowXs:     '0px 1px 2px 0px rgba(10,13,18,0.05)',
  skeumorphic:  'inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18)',
}

const abs = { position: 'absolute' }
const imgStyle = { ...abs, display: 'block', width: '100%', height: '100%', maxWidth: 'none' }

function mask(url, size, pos) {
  return {
    WebkitMaskImage: `url('${url}')`, maskImage: `url('${url}')`,
    WebkitMaskSize: size, maskSize: size,
    WebkitMaskPosition: pos, maskPosition: pos,
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
  }
}

function inset(t, r, b, l) {
  return { ...abs, top: t, right: r, bottom: b, left: l }
}

// ipop text logo (used for Color + B&W tiles)
// container is 80×37px, centered in the tile
function IpopLogo({ g1, g2, g3, maskImg, fill }) {
  return (
    <div style={{ ...abs, left: '50%', top: 'calc(50% - 0.48px)', transform: 'translate(-50%,-50%)', width: 80, height: 37.044 }}>
      {/* "i" glyph */}
      <div style={inset('0.12%','81.71%','21.09%','-0.09%')}>
        <div style={inset('-5.63%','-5.63%','-5.63%','-5.63%')}>
          <img alt="" style={imgStyle} src={g1} />
        </div>
      </div>
      {/* first "p" glyph */}
      <div style={inset('25.03%','54.99%','0.37%','10.58%')}>
        <div style={inset('-5%','-5%','-5%','-5%')}>
          <img alt="" style={imgStyle} src={g2} />
        </div>
      </div>
      {/* second "p" glyph */}
      <div style={inset('25.03%','-0.12%','0.37%','65.69%')}>
        <div style={inset('-5%','-5%','-5%','-5%')}>
          <img alt="" style={imgStyle} src={g3} />
        </div>
      </div>
      {/* planet "o" (clipped) */}
      <div style={{ ...inset('26.58%','29.7%','17.46%','44.39%'), ...mask(maskImg, '20.735px 20.734px', '0.008px 0.006px') }}>
        <img alt="" style={imgStyle} src={fill} />
      </div>
    </div>
  )
}

// Solar logo (64×64px)
function SolarLogo({ fillInner, fillOuter, vector }) {
  return (
    <div style={{ ...abs, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 64, height: 64, overflow: 'hidden' }}>
      <div style={{ ...inset('27.65%','27.94%','27.95%','27.65%'), ...mask(imgGroup18, '28.367px 28.364px', '0px 0px') }}>
        <img alt="" style={imgStyle} src={fillInner} />
      </div>
      <div style={{ ...inset('0.01%','0.3%','0.3%','0.01%'), ...mask(imgGroup20, '63.82px 63.819px', '-0.008px -0.004px') }}>
        <img alt="" style={imgStyle} src={fillOuter} />
      </div>
      <div style={inset('20.07%','20.37%','20.37%','20.07%')}>
        <img alt="" style={imgStyle} src={vector} />
      </div>
    </div>
  )
}

// Planet logo (90.23×64px)
function PlanetLogo({ fillBg, v1, v2, v3, v4, v5, fillPlanet }) {
  return (
    <div style={{ ...abs, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 90.23, height: 64, overflow: 'hidden' }}>
      <div style={{ ...inset('0.31%','0.41%','0.26%','0.22%'), ...mask(imgGroup28, '90.09px 63.902px', '-0.195px -0.182px') }}>
        <img alt="" style={imgStyle} src={fillBg} />
      </div>
      <div style={inset('13.56%','45.62%','68.49%','21.36%')}><img alt="" style={imgStyle} src={v1} /></div>
      <div style={inset('68.54%','21.55%','13.52%','45.43%')}><img alt="" style={imgStyle} src={v2} /></div>
      <div style={inset('42.25%','57.31%','24.33%','16.02%')}><img alt="" style={imgStyle} src={v3} /></div>
      <div style={inset('24.27%','22.38%','24.22%','22.19%')}><img alt="" style={imgStyle} src={v4} /></div>
      <div style={inset('24.37%','16.21%','42.21%','57.12%')}><img alt="" style={imgStyle} src={v5} /></div>
      <div style={{ ...inset('24.76%','32.27%','24.99%','32.08%'), ...mask(imgGroup30, '32.164px 32.161px', '0px 0px') }}>
        <img alt="" style={imgStyle} src={fillPlanet} />
      </div>
    </div>
  )
}

// Shared tile shell
function Tile({ bg, style, children, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: bg,
        border: `1px solid ${DS.borderDefault}`,
        borderRadius: DS.radiusXl,
        height: 82,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Section label
function SectionLabel({ children }) {
  return (
    <div style={{ padding: '2px 8px' }}>
      <span style={{ fontWeight: 500, fontSize: 16, lineHeight: '24px', color: DS.fgPrimary, whiteSpace: 'nowrap' }}>
        {children}
      </span>
    </div>
  )
}

export default function LogoPanel({ onAddElement }) {
  const [search, setSearch] = useState('')

  const tileWrap = { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-start', alignContent: 'flex-start', width: '100%' }
  const tileFixed = { width: 120, flexShrink: 0 }
  const tileFluid = { flex: '1 0 0', minWidth: 0, minHeight: 1 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: DS.bgPrimary }}>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 10, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Search field */}
        <div style={{
          background: DS.bgPrimary,
          border: `1px solid ${DS.borderPrimary}`,
          borderRadius: DS.radiusL,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 12px',
          flexShrink: 0,
        }}>
          <div style={{ width: 20, height: 20, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12.5%', right: '12.5%', bottom: '12.5%', left: '12.5%' }}>
              <div style={{ position: 'absolute', top: '-5%', right: '-5%', bottom: '-5%', left: '-5%' }}>
                <img alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={imgVector8} />
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search logos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontWeight: 400,
              fontSize: 16,
              lineHeight: '24px',
              color: DS.fgPrimary,
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Color section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', flexShrink: 0 }}>
          <SectionLabel>Color</SectionLabel>
          <div style={tileWrap}>
            <Tile bg={DS.indigo600} style={tileFixed}>
              <IpopLogo g1={imgGroup1} g2={imgGroup2} g3={imgGroup3} maskImg={imgGroup4} fill={imgGroup5} />
            </Tile>
            <Tile bg="#000000" style={tileFixed}>
              <IpopLogo g1={imgGroup6} g2={imgGroup7} g3={imgGroup8} maskImg={imgGroup4} fill={imgGroup5} />
            </Tile>
            <Tile bg={DS.indigo300} style={tileFixed}>
              <IpopLogo g1={imgGroup9} g2={imgGroup10} g3={imgGroup11} maskImg={imgGroup4} fill={imgGroup12} />
            </Tile>
            <Tile bg={DS.indigo900} style={tileFixed}>
              <IpopLogo g1={imgGroup1} g2={imgGroup2} g3={imgGroup3} maskImg={imgGroup4} fill={imgGroup5} />
            </Tile>
          </div>
        </div>

        {/* Black & White section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', flexShrink: 0 }}>
          <SectionLabel>Black &amp; White</SectionLabel>
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <Tile bg={DS.bgSecondary} style={tileFluid}>
              <IpopLogo g1={imgGroup13} g2={imgGroup14} g3={imgGroup15} maskImg={imgGroup4} fill={imgGroup16} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFluid}>
              <IpopLogo g1={imgGroup1} g2={imgGroup2} g3={imgGroup3} maskImg={imgGroup4} fill={imgGroup17} />
            </Tile>
          </div>
        </div>

        {/* Solar section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', flexShrink: 0 }}>
          <SectionLabel>Solar</SectionLabel>
          <div style={tileWrap}>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <SolarLogo fillInner={imgGroup19} fillOuter={imgGroup21} vector={imgVector9} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <SolarLogo fillInner={imgGroup22} fillOuter={imgGroup23} vector={imgVector10} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <SolarLogo fillInner={imgGroup24} fillOuter={imgGroup25} vector={imgVector11} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <SolarLogo fillInner={imgGroup26} fillOuter={imgGroup27} vector={imgVector12} />
            </Tile>
          </div>
        </div>

        {/* Planet section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', flexShrink: 0 }}>
          <SectionLabel>Planet</SectionLabel>
          <div style={tileWrap}>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <PlanetLogo fillBg={imgGroup29} v1={imgVector13} v2={imgVector14} v3={imgVector15} v4={imgVector16} v5={imgVector17} fillPlanet={imgGroup31} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <PlanetLogo fillBg={imgGroup32} v1={imgVector18} v2={imgVector19} v3={imgVector20} v4={imgVector21} v5={imgVector22} fillPlanet={imgGroup33} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <PlanetLogo fillBg={imgGroup34} v1={imgVector23} v2={imgVector24} v3={imgVector25} v4={imgVector26} v5={imgVector27} fillPlanet={imgGroup35} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed}>
              <PlanetLogo fillBg={imgGroup36} v1={imgVector28} v2={imgVector29} v3={imgVector30} v4={imgVector31} v5={imgVector32} fillPlanet={imgGroup37} />
            </Tile>
          </div>
        </div>

      </div>

      {/* Bottom action bar */}
      <div style={{
        borderTop: `1px solid ${DS.borderDefault}`,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: DS.bgPrimary,
        flexShrink: 0,
      }}>
        {/* Edit Logos button */}
        <button
          style={{
            width: '100%',
            background: DS.bgPrimary,
            border: `1px solid ${DS.borderPrimary}`,
            borderRadius: DS.radiusXl,
            padding: '8px 14px',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '24px',
            color: DS.fgPrimary,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: `${DS.shadowXs}, ${DS.skeumorphic}`,
            position: 'relative',
          }}
        >
          Edit Logos
        </button>
        {/* Upload File button */}
        <button
          style={{
            width: '100%',
            background: DS.bgBrand,
            border: `1px solid ${DS.borderBrand}`,
            borderRadius: DS.radiusXl,
            padding: '8px 14px',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '24px',
            color: DS.fgOnAction,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: `${DS.shadowXs}, ${DS.skeumorphic}`,
            position: 'relative',
          }}
        >
          Upload File
        </button>
      </div>

    </div>
  )
}
