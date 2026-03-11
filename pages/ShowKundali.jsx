import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Stars from "../components/Stars";
import DecorativeElement from "../components/DecorativeElement";
import BottomDecorativeElement from "../components/BottomDecorativeElement";
import ZodiacRing from "../components/ZodiacRing";
import AmbientGlow from "../components/AmbientGlow";

const ShowKundali = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { kundaliData, name, birthDetails } = location.state || {};
  const [activeTab, setActiveTab] = useState('chart');

  // ── No data guard ──────────────────────────────────────────────────────────
  if (!kundaliData || !kundaliData.data) {
    return (
      <div
        className="min-h-screen text-white flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#050810 0%,#0a0f1e 30%,#0d1225 60%,#080d1a 100%)' }}
      >
        <div className="text-center p-10 rounded-2xl backdrop-blur-md border border-amber-400/20 bg-white/5">
          <div className="text-5xl mb-4">🔮</div>
          <h2 className="text-2xl font-bold text-amber-300 mb-3">No Kundali Data Found</h2>
          <p className="text-gray-400 mb-6">Please generate your Kundali first.</p>
          <button
            onClick={() => navigate('/GenerateKundali')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold rounded-xl transition-all duration-300"
          >
            Generate Kundali
          </button>
        </div>
      </div>
    );
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getPlanetsInHouse = (houseNumber) => {
    if (!kundaliData?.data?.chart?.rasi) return [];
    const houseData = kundaliData.data.chart.rasi.find(item => item.house === houseNumber);
    if (!houseData || !houseData.planet) return [];
    return houseData.planet.split(',').map(p => p.trim()).filter(Boolean);
  };

  const getSignInHouse = (houseNumber) => {
    if (!kundaliData?.data?.chart?.rasi) return '';
    const houseData = kundaliData.data.chart.rasi.find(item => item.house === houseNumber);
    return houseData ? houseData.sign : '';
  };

  // Planet abbreviations so they fit inside chart cells
  const ABBR = {
    Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me',
    Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra',
    Ketu: 'Ke', Uranus: 'Ur', Neptune: 'Ne', Pluto: 'Pl',
    Ascendant: 'As', Lagna: 'La',
  };
  const abbr = (p) => ABBR[p] || p.slice(0, 2);

  // ── North Indian Vedic Chart ───────────────────────────────────────────────
  // The North Indian chart is a fixed diamond grid.
  // Houses are FIXED positions — the sign rotates, not the house shape.
  //
  //         ┌───────┬───────┬───────┐
  //         │  12   │   1   │   2   │
  //         ├───────┼───────┼───────┤
  //         │  11   │ (ctr) │   3   │
  //         ├───────┼───────┼───────┤
  //         │  10   │   9   │   4   │  ← wait, North Indian is diamond not grid
  //         └───────┴───────┴───────┘
  //
  // True North Indian diamond layout (600×600 SVG):
  //
  //   House 1  → top    triangle  (between top vertex and center)
  //   House 2  → top-right small triangle
  //   House 3  → right  triangle
  //   House 4  → bottom triangle
  //   House 5  → bottom-right small triangle ... etc.
  //
  //  Correct fixed diamond positions for text labels:
  //
  //        12 | 1 | 2
  //       ————+———+————
  //        11 |   | 3
  //       ————+———+————
  //        10 | 9 | 8   ← bottom half
  //              |
  //              5 (bottom tip)  etc.
  //
  // Standard North Indian house label centers (in a 540×540 chart):

  const S = 540; // SVG size
  const C = S / 2; // center = 270
  const T = 30;  // top margin to diamond tip

  // Diamond vertices
  const top    = { x: C,     y: T };
  const right  = { x: S - T, y: C };
  const bottom = { x: C,     y: S - T };
  const left   = { x: T,     y: C };

  // Inner diamond (center box) corners
  const innerOff = (S - T * 2) / 4;  // ~120
  const itl = { x: C - innerOff, y: C - innerOff }; // inner top-left
  const itr = { x: C + innerOff, y: C - innerOff }; // inner top-right
  const ibr = { x: C + innerOff, y: C + innerOff }; // inner bottom-right
  const ibl = { x: C - innerOff, y: C + innerOff }; // inner bottom-left

  // House cell label centers
  // North Indian fixed layout:
  // House 1 = top diamond cell
  // House 2 = top-right small triangle
  // House 3 = right cell
  // House 4 = bottom-right small triangle
  // House 5 = bottom cell
  // House 6 = bottom-left small triangle
  // House 7 = left cell
  // House 8 = top-left small triangle
  // House 9 = inner top-left
  // House 10 = inner top-right
  // House 11 = inner bottom-right
  // House 12 = inner bottom-left

  const houseCenters = {
    1:  { x: C,                    y: (top.y + itl.y) / 2 + 5 },           // top
    2:  { x: (right.x + itr.x) / 2 + 5, y: (top.y + itr.y) / 2 + 5 },    // top-right
    3:  { x: (right.x + itr.x) / 2 + 5, y: C },                           // right
    4:  { x: (right.x + ibr.x) / 2 + 5, y: (bottom.y + ibr.y) / 2 - 5 }, // bottom-right
    5:  { x: C,                    y: (bottom.y + ibl.y) / 2 - 5 },        // bottom
    6:  { x: (left.x + ibl.x) / 2 - 5,  y: (bottom.y + ibl.y) / 2 - 5 }, // bottom-left
    7:  { x: (left.x + itl.x) / 2 - 5,  y: C },                           // left
    8:  { x: (left.x + itl.x) / 2 - 5,  y: (top.y + itl.y) / 2 + 5 },    // top-left
    9:  { x: (itl.x + C) / 2,     y: (itl.y + C) / 2 },                   // inner top-left
    10: { x: (itr.x + C) / 2,     y: (itr.y + C) / 2 },                   // inner top-right
    11: { x: (ibr.x + C) / 2,     y: (ibr.y + C) / 2 },                   // inner bottom-right
    12: { x: (ibl.x + C) / 2,     y: (ibl.y + C) / 2 },                   // inner bottom-left
  };

  const VedicChart = () => {
    const stroke = '#f59e0b';
    const sw = 1.5;

    return (
      <div className="flex justify-center">
        <div style={{ width: '100%', maxWidth: '560px' }}>
          <svg
            viewBox={`0 0 ${S} ${S}`}
            style={{
              width: '100%',
              height: 'auto',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '12px',
              border: '1.5px solid rgba(245,158,11,0.4)',
            }}
          >
            {/* ── Outer diamond ── */}
            <polygon
              points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`}
              fill="none" stroke={stroke} strokeWidth="2"
            />

            {/* ── Outer border rect ── */}
            <rect x={T} y={T} width={S - T * 2} height={S - T * 2}
              fill="none" stroke={stroke} strokeWidth={sw} />

            {/* ── Cross lines (vertex to vertex) ── */}
            <line x1={top.x}   y1={top.y}   x2={bottom.x} y2={bottom.y} stroke={stroke} strokeWidth={sw} />
            <line x1={left.x}  y1={left.y}  x2={right.x}  y2={right.y}  stroke={stroke} strokeWidth={sw} />

            {/* ── Inner diamond ── */}
            <polygon
              points={`${itl.x},${itl.y} ${itr.x},${itr.y} ${ibr.x},${ibr.y} ${ibl.x},${ibl.y}`}
              fill="none" stroke={stroke} strokeWidth={sw}
            />

            {/* ── Corner to inner corner lines ── */}
            {/* top-left corner → inner top-left */}
            <line x1={T}     y1={T}     x2={itl.x} y2={itl.y} stroke={stroke} strokeWidth={sw} />
            {/* top-right corner → inner top-right */}
            <line x1={S-T}   y1={T}     x2={itr.x} y2={itr.y} stroke={stroke} strokeWidth={sw} />
            {/* bottom-right corner → inner bottom-right */}
            <line x1={S-T}   y1={S-T}   x2={ibr.x} y2={ibr.y} stroke={stroke} strokeWidth={sw} />
            {/* bottom-left corner → inner bottom-left */}
            <line x1={T}     y1={S-T}   x2={ibl.x} y2={ibl.y} stroke={stroke} strokeWidth={sw} />

            {/* ── House content ── */}
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((house) => {
              const center = houseCenters[house];
              const planets = getPlanetsInHouse(house);
              const sign    = getSignInHouse(house);
              const lineH   = 16;
              const totalLines = 1 + (sign ? 1 : 0) + planets.length;
              const startY  = center.y - ((totalLines - 1) * lineH) / 2;

              return (
                <g key={house}>
                  {/* House number */}
                  <text
                    x={center.x} y={startY}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="13" fontWeight="bold"
                    fill="rgba(245,158,11,0.9)"
                  >
                    {house}
                  </text>

                  {/* Sign */}
                  {sign && (
                    <text
                      x={center.x} y={startY + lineH}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="10" fill="rgba(255,255,255,0.6)"
                    >
                      {sign.slice(0, 3)}
                    </text>
                  )}

                  {/* Planets */}
                  {planets.map((planet, i) => (
                    <text
                      key={i}
                      x={center.x}
                      y={startY + lineH * (i + (sign ? 2 : 1))}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="11" fontWeight="600"
                      fill="#fb923c"
                    >
                      {abbr(planet)}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {Object.entries(ABBR).slice(0, 9).map(([full, short]) => (
              <span key={full} className="text-xs px-2 py-1 rounded-md"
                style={{ background: 'rgba(245,158,11,0.08)', color: 'rgba(245,158,11,0.8)', border: '1px solid rgba(245,158,11,0.15)' }}>
                {short} = {full}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── Planetary Positions ────────────────────────────────────────────────────
  const PlanetaryPositions = () => {
    const planets = kundaliData?.data?.planets || [];
    const planetIcons = {
      Sun: '☀️', Moon: '🌙', Mars: '♂️', Mercury: '☿', Jupiter: '♃',
      Venus: '♀️', Saturn: '♄', Rahu: '☊', Ketu: '☋',
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {planets.map((planet, index) => (
          <div key={index}
            className="p-5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] border border-white/20 bg-white/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{planetIcons[planet.name] || '⭐'}</span>
              <h3 className="text-amber-300 font-bold text-lg">{planet.name}</h3>
              {planet.retrograde && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
                  ℞
                </span>
              )}
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['Sign',       planet.sign],
                ['House',      planet.house],
                ['Degree',     planet.degree ? `${planet.degree}°` : null],
                ['Nakshatra',  planet.nakshatra],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-amber-400/70">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── House Details ──────────────────────────────────────────────────────────
  const HouseDetails = () => {
    const houseNames = {
      1: 'Lagna — Self & Body',        2: 'Dhana — Wealth & Family',
      3: 'Sahaja — Siblings & Courage', 4: 'Sukha — Home & Mother',
      5: 'Putra — Children & Mind',     6: 'Ripu — Enemies & Health',
      7: 'Kalatra — Spouse & Partners', 8: 'Ayur — Longevity & Occult',
      9: 'Bhagya — Fortune & Dharma',  10: 'Karma — Career & Fame',
      11: 'Labha — Gains & Friends',   12: 'Vyaya — Losses & Moksha',
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((house) => {
          const planets = getPlanetsInHouse(house);
          const sign    = getSignInHouse(house);
          return (
            <div key={house}
              className="p-5 rounded-xl backdrop-blur-sm border border-white/20 bg-white/5"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-amber-400 font-bold text-lg">House {house}</span>
                <span className="text-xs text-gray-400 text-right leading-snug max-w-[160px]">
                  {houseNames[house]}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sign</span>
                  <span className="text-white font-medium">{sign || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Planets</span>
                  <span className="text-orange-300 font-medium text-right max-w-[180px]">
                    {planets.length > 0 ? planets.join(', ') : 'Empty'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── Birth Details ──────────────────────────────────────────────────────────
  const BirthDetails = () => {
    const birthData = kundaliData?.data?.birth_details || {};
    const fields = [
      ['Full Name',      name || birthData.name || '—'],
      ['Date of Birth',  birthDetails?.date || birthData.date || '—'],
      ['Time of Birth',  birthDetails?.time || birthData.time || '—'],
      ['Place of Birth', birthDetails?.place || birthData.place || '—'],
      ['Latitude',       birthData.latitude || '—'],
      ['Longitude',      birthData.longitude || '—'],
      ['Timezone',       birthData.timezone || '—'],
    ];

    return (
      <div className="space-y-6">
        {/* Birth info */}
        <div className="p-5 rounded-xl backdrop-blur-sm border border-white/20 bg-white/5">
          <h3 className="text-xl font-bold text-amber-300 mb-5">Birth Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map(([label, value]) => (
              <div key={label} className="flex justify-between items-center p-3 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-amber-400/70 text-sm">{label}</span>
                <span className="text-white font-medium text-sm text-right max-w-[55%]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart summary */}
        <div className="p-5 rounded-xl backdrop-blur-sm border border-white/20 bg-white/5">
          <h3 className="text-xl font-bold text-amber-300 mb-5">Chart Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Ascendant (Lagna)', value: getSignInHouse(1),  sub: 'Rising sign' },
              { label: 'Moon Sign (Rashi)', value: kundaliData?.data?.planets?.find(p => p.name === 'Moon')?.sign, sub: 'Emotional self' },
              { label: 'Sun Sign',          value: kundaliData?.data?.planets?.find(p => p.name === 'Sun')?.sign,  sub: 'Core identity' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="text-center p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <p className="text-amber-400/70 text-xs uppercase tracking-wider mb-2">{label}</p>
                <p className="text-white text-2xl font-bold mb-1">{value || '—'}</p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── Tabs config ────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'chart',   label: 'Birth Chart',  icon: '🔮' },
    { id: 'planets', label: 'Planets',      icon: '🪐' },
    { id: 'houses',  label: 'Houses',       icon: '🏠' },
    { id: 'birth',   label: 'Details',      icon: '📋' },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 text-white overflow-x-hidden">

      <AmbientGlow />
      <ZodiacRing />
      <Stars />
      <DecorativeElement />
      <BottomDecorativeElement />

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <p className="text-amber-400/50 tracking-[0.25em] text-sm mb-2 uppercase">Janam Kundali</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg,#fde68a 0%,#f59e0b 50%,#fb923c 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
            {name ? `${name}'s Kundali` : 'Your Kundali'}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-5">
            {birthDetails ? `${birthDetails.date} • ${birthDetails.time} • ${birthDetails.place}` : 'Vedic birth chart'}
          </p>
          <button
            onClick={() => navigate('/GenerateKundali')}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}
          >
            ← Generate New Kundali
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 p-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white/10"
                style={activeTab === tab.id
                  ? { background: '#f59e0b', color: '#000', boxShadow: '0 4px 15px rgba(245,158,11,0.4)' }
                  : { color: 'rgba(255,255,255,0.6)' }}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div>
          {activeTab === 'chart' && (
            <div className="rounded-2xl p-6 md:p-10 backdrop-blur-md border border-white/20 bg-white/5">
              <h2 className="text-2xl font-bold text-center text-amber-300 mb-8">
                North Indian Rasi Chart
              </h2>
              <VedicChart />
              <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
                {[
                  ['Chart Style', 'North Indian'],
                  ['Chart Type',  'Rasi (D-1)'],
                  ['Ayanamsa',    'Lahiri'],
                ].map(([label, value]) => (
                  <div key={label} className="p-3 rounded-xl"
                    style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.1)' }}>
                    <p className="text-amber-400/60 text-xs mb-1">{label}</p>
                    <p className="text-white font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'planets' && (
            <div className="rounded-2xl p-6 md:p-10 backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}>
              <h2 className="text-2xl font-bold text-center text-amber-300 mb-8">Planetary Positions</h2>
              <PlanetaryPositions />
            </div>
          )}

          {activeTab === 'houses' && (
            <div className="rounded-2xl p-6 md:p-10 backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}>
              <h2 className="text-2xl font-bold text-center text-amber-300 mb-8">House Analysis</h2>
              <HouseDetails />
            </div>
          )}

          {activeTab === 'birth' && (
            <BirthDetails />
          )}
        </div>

        {/* ── Footer ── */}
        <div className="text-center mt-14 text-gray-600 text-xs">
          <p>Generated using Vedic Astrology • Lahiri Ayanamsa • For educational purposes</p>
          <p className="mt-1">Consult a qualified Jyotishi for detailed interpretation</p>
        </div>
      </div>
    </div>
  );
};

export default ShowKundali;