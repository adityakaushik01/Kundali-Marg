const BirthDetails = ({ birthData, name, birthDetails }) => {
  return (
    <div className="p-5 rounded-xl border border-white/20 bg-white/5">
      <h3 className="text-xl font-bold text-amber-300 mb-4">
        Birth Information
      </h3>

      <div className="grid md:grid-cols-2 gap-3 text-sm">
        <div>Name: {name}</div>
        <div>Date: {birthDetails?.date}</div>
        <div>Time: {birthDetails?.time}</div>
        <div>Place: {birthDetails?.place}</div>
        <div>Latitude: {birthData?.latitude}</div>
        <div>Longitude: {birthData?.longitude}</div>
      </div>
    </div>
  );
};

export default BirthDetails;
