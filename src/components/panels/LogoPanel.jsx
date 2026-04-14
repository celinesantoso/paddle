import { useState } from 'react'

// Figma MCP asset URLs (node 1797-23256)
const imgVector8  = "https://www.figma.com/api/mcp/asset/5311d3ae-acea-4d2d-af32-bd5f74e06490"
const imgGroup1   = "https://www.figma.com/api/mcp/asset/ac2213b2-7125-4bb1-856e-aa806f587c87"
const imgGroup2   = "https://www.figma.com/api/mcp/asset/746d1589-f368-48aa-9370-018754af395f"
const imgGroup3   = "https://www.figma.com/api/mcp/asset/ab2cce5d-5ad5-4301-900b-56838959a8d3"
const imgGroup4   = "https://www.figma.com/api/mcp/asset/d8c16b14-85a1-4b8a-9d1b-61905683ca44"
const imgGroup5   = "https://www.figma.com/api/mcp/asset/e142b2cc-c904-4122-915e-8520790b9694"
const imgGroup6   = "https://www.figma.com/api/mcp/asset/0fabdc89-d418-40c1-a692-bd051c979dae"
const imgGroup7   = "https://www.figma.com/api/mcp/asset/40ca3e1b-4351-444f-9276-c8425c4a734e"
const imgGroup8   = "https://www.figma.com/api/mcp/asset/84ae871a-fa4c-4f28-99e9-0607a18d7599"
const imgGroup9   = "https://www.figma.com/api/mcp/asset/2f5dea0f-8c0c-4030-b277-ae4e99d3a572"
const imgGroup10  = "https://www.figma.com/api/mcp/asset/39cbd0ba-9ede-46a3-b5be-635edca9a72c"
const imgGroup11  = "https://www.figma.com/api/mcp/asset/52b594c7-8f47-45c8-8447-1471ad17516a"
const imgGroup12  = "https://www.figma.com/api/mcp/asset/c4c90381-0051-4159-8ab9-4b05cb239f8a"
const imgGroup13  = "https://www.figma.com/api/mcp/asset/dc2689d9-94b6-44a3-a885-6b65eab68003"
const imgGroup14  = "https://www.figma.com/api/mcp/asset/7309fb3f-456b-4d47-a8ab-e4aa2b7f00b7"
const imgGroup15  = "https://www.figma.com/api/mcp/asset/2dcd0340-cbb2-4369-8b07-642246dcb8f1"
const imgGroup16  = "https://www.figma.com/api/mcp/asset/8a28787d-b91a-4d3a-9f39-11792fb690c6"
const imgGroup17  = "https://www.figma.com/api/mcp/asset/43438c4b-098b-4d78-981f-942807633bb3"
const imgGroup18  = "https://www.figma.com/api/mcp/asset/86dc119b-91d5-4161-88d3-8c858bd5a96b"
const imgGroup19  = "https://www.figma.com/api/mcp/asset/6af7ae80-9c03-4b3d-853d-f4a4ed110bda"
const imgGroup20  = "https://www.figma.com/api/mcp/asset/1912f36d-28de-4841-b3ab-df83d428a922"
const imgGroup21  = "https://www.figma.com/api/mcp/asset/c1ab63f6-f601-4465-b263-4fccb0fd29f9"
const imgVector9  = "https://www.figma.com/api/mcp/asset/c1f56edd-d10d-4bea-a8b8-f281c370de7a"
const imgGroup22  = "https://www.figma.com/api/mcp/asset/8c4463d0-6ea1-498b-b6f9-460f5536ee9d"
const imgGroup23  = "https://www.figma.com/api/mcp/asset/24f732b0-260e-4e10-8b5e-ce2055e20fa3"
const imgVector10 = "https://www.figma.com/api/mcp/asset/93aabc6b-fe9e-46b7-ab9a-60c067638633"
const imgGroup24  = "https://www.figma.com/api/mcp/asset/80735cef-82b4-4b8a-8ca8-8432eeac8bad"
const imgGroup25  = "https://www.figma.com/api/mcp/asset/0f93d34c-8a66-478c-b261-8b143682e8e6"
const imgVector11 = "https://www.figma.com/api/mcp/asset/04bb5b1e-cb1a-4697-aece-369a69d7c8a1"
const imgGroup26  = "https://www.figma.com/api/mcp/asset/bca3dcfe-9b15-4a8c-ac62-f2bf9504c508"
const imgGroup27  = "https://www.figma.com/api/mcp/asset/f040ef8d-edc5-46e7-ac90-0cffa648620e"
const imgVector12 = "https://www.figma.com/api/mcp/asset/e1e14fb7-36f0-4d7b-9c52-29a62c95c8e0"
const imgGroup28  = "https://www.figma.com/api/mcp/asset/2765929a-34d6-46ef-9bab-a76de14e1b74"
const imgGroup29  = "https://www.figma.com/api/mcp/asset/274ef935-dea4-4ad7-a699-c6072edf8652"
const imgVector13 = "https://www.figma.com/api/mcp/asset/6bd40adc-59ce-4609-b9df-3db4ceeb4a0b"
const imgVector14 = "https://www.figma.com/api/mcp/asset/2b7695f6-d1ff-4f3b-8543-cac4ded99a87"
const imgVector15 = "https://www.figma.com/api/mcp/asset/ebb8d617-a51e-456e-9387-27d1c9a047c3"
const imgVector16 = "https://www.figma.com/api/mcp/asset/46a1c507-6147-4917-aa86-f6bdb8795547"
const imgVector17 = "https://www.figma.com/api/mcp/asset/d1936bc0-505e-4013-8f65-c59ed06d3899"
const imgGroup30  = "https://www.figma.com/api/mcp/asset/594c4127-9f21-4011-b1f5-ebe8cddba1f7"
const imgGroup31  = "https://www.figma.com/api/mcp/asset/6a4bce3d-9f21-43b2-a8d5-42daf5ed6c63"
const imgGroup32  = "https://www.figma.com/api/mcp/asset/c2ddfec5-670c-4351-bfee-d37fcc5c88a7"
const imgVector18 = "https://www.figma.com/api/mcp/asset/020cffb2-3f23-4a7d-b0e7-0c46943f3ba2"
const imgVector19 = "https://www.figma.com/api/mcp/asset/195a95f3-08f6-4d65-a16a-d2bd3a3b56a7"
const imgVector20 = "https://www.figma.com/api/mcp/asset/d1d2b618-3046-4620-a268-e894d635c88e"
const imgVector21 = "https://www.figma.com/api/mcp/asset/3d27ff65-3928-4549-8e49-75f7e3efebdb"
const imgVector22 = "https://www.figma.com/api/mcp/asset/b799db34-5210-4fd8-bb94-afb12d6f51f7"
const imgGroup33  = "https://www.figma.com/api/mcp/asset/11961eb2-7e51-48c5-b2b1-eb265862b72b"
const imgGroup34  = "https://www.figma.com/api/mcp/asset/9c61cf10-1602-429d-9f21-4e358b91ba78"
const imgVector23 = "https://www.figma.com/api/mcp/asset/92c8b4e6-600f-414c-8322-bc3e22410405"
const imgVector24 = "https://www.figma.com/api/mcp/asset/6d6e1310-060b-4f3d-a37e-725afa4f4df1"
const imgVector25 = "https://www.figma.com/api/mcp/asset/b4eb6fd7-5528-4b34-b167-9d5e8cad80ae"
const imgVector26 = "https://www.figma.com/api/mcp/asset/8fdf5574-4bd9-40d0-b7b3-ef9faefb7110"
const imgVector27 = "https://www.figma.com/api/mcp/asset/9624a4d6-363e-4fe5-ac0d-635205375f2e"
const imgGroup35  = "https://www.figma.com/api/mcp/asset/5ea04612-d969-47a2-9ff7-b5be17f9ba4d"
const imgGroup36  = "https://www.figma.com/api/mcp/asset/d60387bf-ec85-4589-a0aa-ee04fb38cf3e"
const imgVector28 = "https://www.figma.com/api/mcp/asset/2b808d09-66d9-4d57-838c-955699d8dc9b"
const imgVector29 = "https://www.figma.com/api/mcp/asset/47b0f185-ed34-405d-a80a-4e181b953e99"
const imgVector30 = "https://www.figma.com/api/mcp/asset/6e43e551-3452-4842-b8ac-2cdec891c6e2"
const imgVector31 = "https://www.figma.com/api/mcp/asset/d7c13c6f-240c-4585-ad69-c4c79b859da5"
const imgVector32 = "https://www.figma.com/api/mcp/asset/b7ed920c-9379-42ae-9b75-f4af0fc39af4"
const imgGroup37  = "https://www.figma.com/api/mcp/asset/b25826f5-a80f-401e-b8f5-e87643301809"

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
            <Tile bg={DS.indigo600} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'ipop', bg: DS.indigo600, g1: imgGroup1, g2: imgGroup2, g3: imgGroup3, maskImg: imgGroup4, fill: imgGroup5 } })}>
              <IpopLogo g1={imgGroup1} g2={imgGroup2} g3={imgGroup3} maskImg={imgGroup4} fill={imgGroup5} />
            </Tile>
            <Tile bg="#000000" style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'ipop', bg: '#000000', g1: imgGroup6, g2: imgGroup7, g3: imgGroup8, maskImg: imgGroup4, fill: imgGroup5 } })}>
              <IpopLogo g1={imgGroup6} g2={imgGroup7} g3={imgGroup8} maskImg={imgGroup4} fill={imgGroup5} />
            </Tile>
            <Tile bg={DS.indigo300} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'ipop', bg: DS.indigo300, g1: imgGroup9, g2: imgGroup10, g3: imgGroup11, maskImg: imgGroup4, fill: imgGroup12 } })}>
              <IpopLogo g1={imgGroup9} g2={imgGroup10} g3={imgGroup11} maskImg={imgGroup4} fill={imgGroup12} />
            </Tile>
            <Tile bg={DS.indigo900} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'ipop', bg: DS.indigo900, g1: imgGroup1, g2: imgGroup2, g3: imgGroup3, maskImg: imgGroup4, fill: imgGroup5 } })}>
              <IpopLogo g1={imgGroup1} g2={imgGroup2} g3={imgGroup3} maskImg={imgGroup4} fill={imgGroup5} />
            </Tile>
          </div>
        </div>

        {/* Black & White section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', flexShrink: 0 }}>
          <SectionLabel>Black &amp; White</SectionLabel>
          <div style={{ display: 'flex', gap: 10, width: '100%' }}>
            <Tile bg={DS.bgSecondary} style={tileFluid} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'ipop', bg: DS.bgSecondary, g1: imgGroup13, g2: imgGroup14, g3: imgGroup15, maskImg: imgGroup4, fill: imgGroup16 } })}>
              <IpopLogo g1={imgGroup13} g2={imgGroup14} g3={imgGroup15} maskImg={imgGroup4} fill={imgGroup16} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFluid} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'ipop', bg: DS.bgSecondary, g1: imgGroup1, g2: imgGroup2, g3: imgGroup3, maskImg: imgGroup4, fill: imgGroup17 } })}>
              <IpopLogo g1={imgGroup1} g2={imgGroup2} g3={imgGroup3} maskImg={imgGroup4} fill={imgGroup17} />
            </Tile>
          </div>
        </div>

        {/* Solar section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', flexShrink: 0 }}>
          <SectionLabel>Solar</SectionLabel>
          <div style={tileWrap}>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'solar', bg: DS.bgSecondary, fillInner: imgGroup19, fillOuter: imgGroup21, vector: imgVector9 } })}>
              <SolarLogo fillInner={imgGroup19} fillOuter={imgGroup21} vector={imgVector9} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'solar', bg: DS.bgSecondary, fillInner: imgGroup22, fillOuter: imgGroup23, vector: imgVector10 } })}>
              <SolarLogo fillInner={imgGroup22} fillOuter={imgGroup23} vector={imgVector10} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'solar', bg: DS.bgSecondary, fillInner: imgGroup24, fillOuter: imgGroup25, vector: imgVector11 } })}>
              <SolarLogo fillInner={imgGroup24} fillOuter={imgGroup25} vector={imgVector11} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'solar', bg: DS.bgSecondary, fillInner: imgGroup26, fillOuter: imgGroup27, vector: imgVector12 } })}>
              <SolarLogo fillInner={imgGroup26} fillOuter={imgGroup27} vector={imgVector12} />
            </Tile>
          </div>
        </div>

        {/* Planet section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', flexShrink: 0 }}>
          <SectionLabel>Planet</SectionLabel>
          <div style={tileWrap}>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'planet', bg: DS.bgSecondary, fillBg: imgGroup29, v1: imgVector13, v2: imgVector14, v3: imgVector15, v4: imgVector16, v5: imgVector17, fillPlanet: imgGroup31 } })}>
              <PlanetLogo fillBg={imgGroup29} v1={imgVector13} v2={imgVector14} v3={imgVector15} v4={imgVector16} v5={imgVector17} fillPlanet={imgGroup31} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'planet', bg: DS.bgSecondary, fillBg: imgGroup32, v1: imgVector18, v2: imgVector19, v3: imgVector20, v4: imgVector21, v5: imgVector22, fillPlanet: imgGroup33 } })}>
              <PlanetLogo fillBg={imgGroup32} v1={imgVector18} v2={imgVector19} v3={imgVector20} v4={imgVector21} v5={imgVector22} fillPlanet={imgGroup33} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'planet', bg: DS.bgSecondary, fillBg: imgGroup34, v1: imgVector23, v2: imgVector24, v3: imgVector25, v4: imgVector26, v5: imgVector27, fillPlanet: imgGroup35 } })}>
              <PlanetLogo fillBg={imgGroup34} v1={imgVector23} v2={imgVector24} v3={imgVector25} v4={imgVector26} v5={imgVector27} fillPlanet={imgGroup35} />
            </Tile>
            <Tile bg={DS.bgSecondary} style={tileFixed} onClick={() => onAddElement({ type: 'logo', width: 200, height: 115, opacity: 100, logoMeta: { type: 'planet', bg: DS.bgSecondary, fillBg: imgGroup36, v1: imgVector28, v2: imgVector29, v3: imgVector30, v4: imgVector31, v5: imgVector32, fillPlanet: imgGroup37 } })}>
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
