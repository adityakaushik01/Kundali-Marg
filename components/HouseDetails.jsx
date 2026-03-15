const HouseDetails = ({ getPlanetsInHouse, getSignInHouse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(12)].map((_, i) => {
        const house = i + 1;
        const planets = getPlanetsInHouse(house);
        const sign = getSignInHouse(house);

        return (
          <div
            key={house}
            className="p-5 rounded-xl border border-white/20 bg-white/5"
          >
            <div className="flex justify-between mb-3">
              <span className="text-amber-400 font-bold">House {house}</span>
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Sign</span>
                <span>{sign || "—"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Planets</span>
                <span>{planets.length ? planets.join(", ") : "Empty"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HouseDetails;
