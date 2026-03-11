const PlanetaryPositions = ({ planets }) => {

  const planetIcons = {
    Sun: "☀️",
    Moon: "🌙",
    Mars: "♂️",
    Mercury: "☿",
    Jupiter: "♃",
    Venus: "♀️",
    Saturn: "♄",
    Rahu: "☊",
    Ketu: "☋",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {planets.map((planet,index)=>(
        <div key={index} className="p-5 rounded-xl border border-white/20 bg-white/5">

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{planetIcons[planet.name]}</span>
            <h3 className="text-amber-300 font-bold">{planet.name}</h3>
          </div>

          <div className="text-sm space-y-1">

            <div className="flex justify-between">
              <span className="text-gray-400">Sign</span>
              <span>{planet.sign}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">House</span>
              <span>{planet.house}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Nakshatra</span>
              <span>{planet.nakshatra}</span>
            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

export default PlanetaryPositions;