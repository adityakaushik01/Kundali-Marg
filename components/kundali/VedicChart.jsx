import React from "react";

const ABBR = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

const abbr = (p) => ABBR[p] || p.slice(0, 2);

const VedicChart = ({ getPlanetsInHouse, getSignInHouse }) => {
  const housePositions = {
    1: { x: 270, y: 120 },
    2: { x: 400, y: 80 },
    3: { x: 460, y: 270 },
    4: { x: 400, y: 460 },
    5: { x: 270, y: 520 },
    6: { x: 140, y: 460 },
    7: { x: 80, y: 270 },
    8: { x: 140, y: 80 },
    9: { x: 200, y: 350 },
    10: { x: 340, y: 350 },
    11: { x: 340, y: 200 },
    12: { x: 200, y: 200 },
  };

  return (
    <div className="flex justify-center">
      <svg width="540" height="540">
        {/* Outer diamond */}
        <polygon
          points="270,20 520,270 270,520 20,270"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
        />

        {/* Cross lines */}
        <line x1="270" y1="20" x2="270" y2="520" stroke="#f59e0b" />
        <line x1="20" y1="270" x2="520" y2="270" stroke="#f59e0b" />

        <line x1="20" y1="20" x2="520" y2="520" stroke="#f59e0b" />
        <line x1="520" y1="20" x2="20" y2="520" stroke="#f59e0b" />

        {Object.entries(housePositions).map(([house, pos]) => {
          const planets = getPlanetsInHouse(Number(house));
          const sign = getSignInHouse(Number(house));

          return (
            <g key={house}>
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                fill="#fbbf24"
                fontSize="14"
                fontWeight="bold"
              >
                {house}
              </text>

              {sign && (
                <text
                  x={pos.x}
                  y={pos.y + 16}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                >
                  {sign.slice(0, 3)}
                </text>
              )}

              {planets.map((planet, i) => (
                <text
                  key={i}
                  x={pos.x}
                  y={pos.y + 32 + i * 14}
                  textAnchor="middle"
                  fill="#fb923c"
                  fontSize="11"
                >
                  {abbr(planet)}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default VedicChart;
