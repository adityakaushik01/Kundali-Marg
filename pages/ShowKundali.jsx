import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Stars from "../components/Stars";
import DecorativeElement from "../components/DecorativeElement";
import BottomDecorativeElement from "../components/BottomDecorativeElement";

const ShowKundali = () => {
  const location = useLocation();
  const { kundaliData, name } = location.state || {};
  const [activeTab, setActiveTab] = useState('chart');

  if (!kundaliData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">No Kundali data found. Please generate your Kundali first.</p>
      </div>
    );
  }

  // Helper function to get planets in a house
  const getPlanetsInHouse = (houseNumber) => {
    if (!kundaliData?.data?.chart?.rasi) return [];
    return kundaliData.data.chart.rasi
      .filter(item => item.house === houseNumber)
      .map(item => item.planet)
      .filter(planet => planet && planet.trim() !== '');
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
      <div className="relative mx-auto" style={{ width: '500px', height: '500px' }}>
        <svg width="500" height="500" viewBox="0 0 500 500" className="border-2 border-amber-400">
          {/* Chart Background */}
          <rect width="500" height="500" fill="rgba(0,0,0,0.1)" />
          
          {/* Diamond Shape Chart */}
          <polygon
            points="250,50 450,250 250,450 50,250"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          
          {/* Internal divisions */}
          <line x1="250" y1="50" x2="250" y2="450" stroke="#fbbf24" strokeWidth="1" />
          <line x1="50" y1="250" x2="450" y2="250" stroke="#fbbf24" strokeWidth="1" />
          <line x1="150" y1="150" x2="350" y2="350" stroke="#fbbf24" strokeWidth="1" />
          <line x1="150" y1="350" x2="350" y2="150" stroke="#fbbf24" strokeWidth="1" />
          
          {/* House positions and content */}
          {houses.map((house) => {
            const planets = getPlanetsInHouse(house);
            const sign = getSignInHouse(house);
            
            let x, y, textAnchor = "middle";
            
            // Position calculation for diamond chart
            switch(house) {
              case 1: x = 250; y = 100; break;
              case 2: x = 350; y = 150; break;
              case 3: x = 400; y = 250; break;
              case 4: x = 350; y = 350; break;
              case 5: x = 250; y = 400; break;
              case 6: x = 150; y = 350; break;
              case 7: x = 100; y = 250; break;
              case 8: x = 150; y = 150; break;
              case 9: x = 200; y = 200; break;
              case 10: x = 300; y = 200; break;
              case 11: x = 300; y = 300; break;
              case 12: x = 200; y = 300; break;
            }
            
            return (
              <g key={house}>
                {/* House number */}
                <text
                  x={x}
                  y={y - 15}
                  textAnchor={textAnchor}
                  className="fill-amber-300 text-xs font-bold"
                >
                  {house}
                </text>
                
                {/* Sign */}
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  className="fill-white text-xs"
                >
                  {sign}
                </text>
                
                {/* Planets */}
                {planets.map((planet, index) => (
                  <text
                    key={index}
                    x={x}
                    y={y + 15 + (index * 12)}
                    textAnchor={textAnchor}
                    className="fill-orange-300 text-xs font-semibold"
                  >
                    {planet}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
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
            className="p-6 border-2 border-amber-400/50 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:border-amber-400 hover:shadow-lg"
          >
            <h3 className="text-amber-300 font-bold text-lg mb-3">{planet.name}</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-amber-300">Sign:</span> <span className="text-white">{planet.sign}</span></p>
              <p><span className="text-amber-300">House:</span> <span className="text-white">{planet.house}</span></p>
              <p><span className="text-amber-300">Degree:</span> <span className="text-white">{planet.degree}°</span></p>
              <p><span className="text-amber-300">Nakshatra:</span> <span className="text-white">{planet.nakshatra}</span></p>
              {planet.retrograde && (
                <p className="text-red-400 font-semibold">Retrograde</p>
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
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {houses.map((house) => {
          const planets = getPlanetsInHouse(house);
          const sign = getSignInHouse(house);
          
          return (
            <div
              key={house}
              className="p-6 border-2 border-amber-400/50 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-amber-300 font-bold text-lg">
                  House {house}
                </h3>
                <span className="text-xs text-gray-400">{houseNames[house]}</span>
              </div>
              
              <div className="space-y-2">
                <p><span className="text-amber-300">Sign:</span> <span className="text-white">{sign}</span></p>
                <p><span className="text-amber-300">Planets:</span> 
                  <span className="text-white ml-2">
                    {planets.length > 0 ? planets.join(', ') : 'None'}
                  </span>
                </p>
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
      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
        <h3 className="text-2xl font-bold text-amber-300 mb-6 text-center">Birth Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-amber-300 font-semibold">Date of Birth:</span>
              <p className="text-white">{birthData.date || 'Not available'}</p>
            </div>
            <div>
              <span className="text-amber-300 font-semibold">Time of Birth:</span>
              <p className="text-white">{birthData.time || 'Not available'}</p>
            </div>
            <div>
              <span className="text-amber-300 font-semibold">Place of Birth:</span>
              <p className="text-white">{birthData.place || 'Not available'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-amber-300 font-semibold">Latitude:</span>
              <p className="text-white">{birthData.latitude || 'Not available'}</p>
            </div>
            <div>
              <span className="text-amber-300 font-semibold">Longitude:</span>
              <p className="text-white">{birthData.longitude || 'Not available'}</p>
            </div>
            <div>
              <span className="text-amber-300 font-semibold">Timezone:</span>
              <p className="text-white">{birthData.timezone || 'Not available'}</p>
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
            Kundali of {name || "User"}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore your Vedic chart and planetary positions
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            {[
              { id: 'chart', label: 'Vedic Chart' },
              { id: 'planets', label: 'Planetary Positions' },
              { id: 'houses', label: 'House Details' },
              { id: 'birth', label: 'Birth Details' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
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
              <div className="flex justify-center mb-8">
                <VedicChart />
              </div>
              <div className="text-center text-gray-300">
                <p className="mb-2">This is your Rasi Chart (D-1) showing planetary positions at birth</p>
                <p className="text-sm">Houses are numbered 1-12, with signs and planets displayed in each house</p>
              </div>
            </div>
          )}

          {activeTab === 'planets' && (
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-md border border-white/20">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Planetary Positions
              </h2>
              <PlanetaryPositions />
            </div>
          )}

          {activeTab === 'houses' && (
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur-md border border-white/20">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                House Details
              </h2>
              <HouseDetails />
            </div>
          )}

          {activeTab === 'birth' && (
            <div className="space-y-8">
              <BirthDetails />
              
              {/* Additional Birth Chart Info */}
              <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
                <h3 className="text-2xl font-bold text-amber-300 mb-6 text-center">Chart Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="text-amber-300 font-semibold mb-2">Ascendant</h4>
                    <p className="text-white">{getSignInHouse(1) || 'Not available'}</p>
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-semibold mb-2">Moon Sign</h4>
                    <p className="text-white">
                      {kundaliData?.data?.planets?.find(p => p.name === 'Moon')?.sign || 'Not available'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-semibold mb-2">Sun Sign</h4>
                    <p className="text-white">
                      {kundaliData?.data?.planets?.find(p => p.name === 'Sun')?.sign || 'Not available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowKundali;