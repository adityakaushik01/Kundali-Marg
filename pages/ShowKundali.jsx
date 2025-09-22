import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Stars from "../components/Stars";
import DecorativeElement from "../components/DecorativeElement";
import BottomDecorativeElement from "../components/BottomDecorativeElement";

const ShowKundali = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { kundaliData, name, birthDetails } = location.state || {};
  const [activeTab, setActiveTab] = useState('chart');

  // Redirect if no data
  if (!kundaliData || !kundaliData.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center p-10 rounded-2xl backdrop-blur-md border border-white/20 bg-white/5">
          <h2 className="text-2xl font-bold text-amber-300 mb-4">No Kundali Data Found</h2>
          <p className="text-lg text-gray-300 mb-6">Please generate your Kundali first.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-300"
          >
            Generate Kundali
          </button>
        </div>
      </div>
    );
  }

  // Helper function to get planets in a house
  const getPlanetsInHouse = (houseNumber) => {
    if (!kundaliData?.data?.chart?.rasi) return [];
    const houseData = kundaliData.data.chart.rasi.find(item => item.house === houseNumber);
    if (!houseData || !houseData.planet) return [];
    
    return houseData.planet.split(',').map(planet => planet.trim()).filter(planet => planet);
  };

  // Helper function to get sign for a house
  const getSignInHouse = (houseNumber) => {
    if (!kundaliData?.data?.chart?.rasi) return '';
    const houseData = kundaliData.data.chart.rasi.find(item => item.house === houseNumber);
    return houseData ? houseData.sign : '';
  };

  // Traditional Vedic Chart Component
  const VedicChart = () => {
    const houses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    return (
      <div className="flex justify-center">
        <div className="relative" style={{ width: '600px', height: '600px' }}>
          <svg width="600" height="600" viewBox="0 0 600 600" className="border-2 border-amber-400 rounded-lg bg-black/20">
            {/* Chart Background */}
            <rect width="600" height="600" fill="rgba(0,0,0,0.2)" />
            
            {/* Diamond Shape Chart - North Indian Style */}
            <polygon
              points="300,80 520,300 300,520 80,300"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            
            {/* Internal divisions */}
            <line x1="300" y1="80" x2="300" y2="520" stroke="#f59e0b" strokeWidth="2" />
            <line x1="80" y1="300" x2="520" y2="300" stroke="#f59e0b" strokeWidth="2" />
            <line x1="190" y1="190" x2="410" y2="410" stroke="#f59e0b" strokeWidth="2" />
            <line x1="190" y1="410" x2="410" y2="190" stroke="#f59e0b" strokeWidth="2" />
            
            {/* House positions and content */}
            {houses.map((house) => {
              const planets = getPlanetsInHouse(house);
              const sign = getSignInHouse(house);
              
              let x, y, width = 100, height = 80;
              
              // Position calculation for North Indian diamond chart
              switch(house) {
                case 1: x = 250; y = 100; break;   // Top
                case 2: x = 370; y = 140; break;   // Top-right
                case 3: x = 430; y = 250; break;   // Right
                case 4: x = 370; y = 360; break;   // Bottom-right
                case 5: x = 250; y = 400; break;   // Bottom
                case 6: x = 130; y = 360; break;   // Bottom-left
                case 7: x = 70; y = 250; break;    // Left
                case 8: x = 130; y = 140; break;   // Top-left
                case 9: x = 190; y = 190; break;   // Inner top-left
                case 10: x = 310; y = 190; break;  // Inner top-right
                case 11: x = 310; y = 310; break;  // Inner bottom-right
                case 12: x = 190; y = 310; break;  // Inner bottom-left
                default: x = 300; y = 300; break;
              }
              
              return (
                <g key={house}>
                  {/* House background for better visibility */}
                  <rect
                    x={x - width/2}
                    y={y - height/2}
                    width={width}
                    height={height}
                    fill="rgba(245, 158, 11, 0.05)"
                    stroke="rgba(245, 158, 11, 0.2)"
                    strokeWidth="1"
                    rx="8"
                  />
                  
                  {/* House number */}
                  <text
                    x={x}
                    y={y - 25}
                    textAnchor="middle"
                    className="fill-amber-300 text-sm font-bold"
                    fontSize="14"
                  >
                    {house}
                  </text>
                  
                  {/* Sign */}
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    className="fill-white text-xs"
                    fontSize="11"
                  >
                    {sign}
                  </text>
                  
                  {/* Planets */}
                  {planets.map((planet, index) => (
                    <text
                      key={index}
                      x={x}
                      y={y + 5 + (index * 15)}
                      textAnchor="middle"
                      className="fill-orange-300 text-xs font-semibold"
                      fontSize="12"
                    >
                      {planet}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  // Planetary Positions Component
  const PlanetaryPositions = () => {
    const planets = kundaliData?.data?.planets || [];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planets.map((planet, index) => (
          <div
            key={index}
            className="p-6 border-2 border-amber-400/50 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:border-amber-400 hover:shadow-lg hover:scale-105"
          >
            <h3 className="text-amber-300 font-bold text-xl mb-4 text-center">{planet.name}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-300 font-medium">Sign:</span> 
                <span className="text-white font-semibold">{planet.sign}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300 font-medium">House:</span> 
                <span className="text-white font-semibold">{planet.house}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300 font-medium">Degree:</span> 
                <span className="text-white font-semibold">{planet.degree}°</span>
              </div>
              {planet.nakshatra && (
                <div className="flex justify-between">
                  <span className="text-amber-300 font-medium">Nakshatra:</span> 
                  <span className="text-white font-semibold">{planet.nakshatra}</span>
                </div>
              )}
              {planet.retrograde && (
                <div className="text-center">
                  <span className="text-red-400 font-semibold text-xs px-2 py-1 bg-red-400/20 rounded-full">
                    RETROGRADE
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // House Details Component
  const HouseDetails = () => {
    const houses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const houseNames = {
      1: "Lagna (Ascendant)",
      2: "Dhana (Wealth)",
      3: "Sahaja (Siblings)",
      4: "Sukha (Happiness)",
      5: "Putra (Children)",
      6: "Ripu (Enemies)",
      7: "Kalatra (Spouse)",
      8: "Ayur (Longevity)",
      9: "Bhagya (Fortune)",
      10: "Karma (Career)",
      11: "Labha (Gains)",
      12: "Vyaya (Losses)"
    };

    const houseMeanings = {
      1: "Self, personality, physical appearance, health",
      2: "Money, family, speech, food, values",
      3: "Siblings, courage, short journeys, communication",
      4: "Home, mother, education, property, happiness",
      5: "Children, creativity, intelligence, romance",
      6: "Enemies, diseases, debts, service, daily routine",
      7: "Marriage, partnerships, business, spouse",
      8: "Longevity, transformation, occult, inheritance",
      9: "Luck, higher learning, spirituality, father",
      10: "Career, reputation, status, public image",
      11: "Gains, friends, elder siblings, aspirations",
      12: "Losses, expenses, foreign travels, liberation"
    };
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {houses.map((house) => {
          const planets = getPlanetsInHouse(house);
          const sign = getSignInHouse(house);
          
          return (
            <div
              key={house}
              className="p-6 border-2 border-amber-400/50 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:border-amber-400"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-amber-300 font-bold text-xl">
                  House {house}
                </h3>
                <span className="text-xs text-gray-400 text-right leading-tight max-w-[120px]">
                  {houseNames[house]}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-amber-300 font-medium">Sign:</span>
                  <span className="text-white font-semibold">{sign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300 font-medium">Planets:</span>
                  <span className="text-white font-semibold">
                    {planets.length > 0 ? planets.join(', ') : 'None'}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-amber-300 font-medium">Significance:</span> {houseMeanings[house]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Birth Details Component
  const BirthDetails = () => {
    const birthData = kundaliData?.data?.birth_details || {};
    
    return (
      <div className="space-y-8">
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
          <h3 className="text-3xl font-bold text-amber-300 mb-6 text-center">Birth Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="text-amber-300 font-semibold block mb-2">Full Name:</span>
                <p className="text-white text-lg">{name || birthData.name || 'Not provided'}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="text-amber-300 font-semibold block mb-2">Date of Birth:</span>
                <p className="text-white text-lg">{birthDetails?.date || birthData.date || 'Not available'}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="text-amber-300 font-semibold block mb-2">Time of Birth:</span>
                <p className="text-white text-lg">{birthDetails?.time || birthData.time || 'Not available'}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="text-amber-300 font-semibold block mb-2">Place of Birth:</span>
                <p className="text-white text-lg">{birthDetails?.place || birthData.place || 'Not available'}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="text-amber-300 font-semibold block mb-2">Coordinates:</span>
                <p className="text-white">
                  <span className="block">Latitude: {birthData.latitude || 'Not available'}</span>
                  <span className="block">Longitude: {birthData.longitude || 'Not available'}</span>
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="text-amber-300 font-semibold block mb-2">Timezone:</span>
                <p className="text-white text-lg">{birthData.timezone || 'Not available'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Summary */}
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
          <h3 className="text-2xl font-bold text-amber-300 mb-6 text-center">Chart Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
              <h4 className="text-amber-300 font-semibold mb-3 text-lg">Ascendant (Lagna)</h4>
              <p className="text-white text-xl font-bold">{getSignInHouse(1) || 'Not available'}</p>
              <p className="text-gray-300 text-sm mt-2">Your rising sign</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
              <h4 className="text-amber-300 font-semibold mb-3 text-lg">Moon Sign</h4>
              <p className="text-white text-xl font-bold">
                {kundaliData?.data?.planets?.find(p => p.name === 'Moon')?.sign || 'Not available'}
              </p>
              <p className="text-gray-300 text-sm mt-2">Your emotional nature</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
              <h4 className="text-amber-300 font-semibold mb-3 text-lg">Sun Sign</h4>
              <p className="text-white text-xl font-bold">
                {kundaliData?.data?.planets?.find(p => p.name === 'Sun')?.sign || 'Not available'}
              </p>
              <p className="text-gray-300 text-sm mt-2">Your core identity</p>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
          <h3 className="text-2xl font-bold text-amber-300 mb-6 text-center">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-300">Planetary Strengths</h4>
              {kundaliData?.data?.planets?.slice(0, 4).map((planet, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">{planet.name}</span>
                  <span className="text-amber-300">{planet.sign}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-300">Houses with Planets</h4>
              {[1, 7, 10, 4].map(house => {
                const planets = getPlanetsInHouse(house);
                return (
                  <div key={house} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white font-medium">House {house}</span>
                    <span className="text-amber-300 text-sm">
                      {planets.length > 0 ? planets.join(', ') : 'Empty'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 text-white overflow-hidden">
      <Stars />
      <DecorativeElement />
      <BottomDecorativeElement />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            {name ? `${name}'s Kundali` : "Your Kundali"}
          </h1>
          <p className="text-xl text-gray-300 max-w-5xl mx-auto">
            Explore your Vedic birth chart and discover the cosmic influences on your life
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-sm transition-all duration-300"
          >
            ← Generate New Kundali
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 flex gap-6 p-5 rounded-full shadow-2xl">
            {[
              { id: 'chart', label: 'Birth Chart', icon: '🔮' },
              { id: 'planets', label: 'Planets', icon: '🪐' },
              { id: 'houses', label: 'Houses', icon: '🏠' },
              { id: 'birth', label: 'Details', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'chart' && (
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-md border border-white/20">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Vedic Birth Chart (Rasi Chart)
              </h2>
              <VedicChart />
              <div className="text-center text-gray-300 mt-8 space-y-2">
                <p className="text-lg">This is your North Indian style birth chart showing planetary positions</p>
                <p className="text-sm">Houses are numbered 1-12, with zodiac signs and planets displayed in each house</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-6 bg-white/5 rounded-xl">
                  <div className="text-center">
                    <span className="text-amber-300 font-semibold">Chart Style:</span>
                    <p className="text-white">North Indian Diamond</p>
                  </div>
                  <div className="text-center">
                    <span className="text-amber-300 font-semibold">Chart Type:</span>
                    <p className="text-white">Rasi Chart (D-1)</p>
                  </div>
                  <div className="text-center">
                    <span className="text-amber-300 font-semibold">Ayanamsa:</span>
                    <p className="text-white">Lahiri</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'planets' && (
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-md border border-white/20">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Planetary Positions
              </h2>
              <PlanetaryPositions />
              <div className="mt-8 p-6 bg-white/5 rounded-xl">
                <h3 className="text-lg font-semibold text-amber-300 mb-4">Understanding Planetary Positions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p><strong className="text-amber-300">Sign:</strong> The zodiac sign where the planet is placed</p>
                    <p><strong className="text-amber-300">Degree:</strong> Exact position within the sign (0°-30°)</p>
                  </div>
                  <div>
                    <p><strong className="text-amber-300">House:</strong> The life area influenced by the planet</p>
                    <p><strong className="text-amber-300">Nakshatra:</strong> Lunar mansion (for Moon)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'houses' && (
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-md border border-white/20">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                House Analysis
              </h2>
              <HouseDetails />
              <div className="mt-8 p-6 bg-white/5 rounded-xl">
                <h3 className="text-lg font-semibold text-amber-300 mb-4">House System Explained</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  In Vedic astrology, the 12 houses represent different areas of life. Each house has a specific meaning and the planets placed in these houses influence those life areas. The sign on each house cusp (beginning) also provides additional insights into how you approach these life themes.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'birth' && (
            <div>
              <BirthDetails />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 max-w-7xl mx-auto p-6 bg-white/5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">
            Generated using Vedic Astrology principles • For entertainment and educational purposes
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Consult a qualified astrologer for detailed interpretation
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowKundali;