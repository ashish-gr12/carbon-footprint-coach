function ImpactEquivalents({ result }) {

  const vehicleFactors = {
    car: 0.171,
    bike: 0.080,
    scooter: 0.070,
    bus: 0.089,
    metro: 0.035,
    train: 0.041,
  };

  const fuelFactors = {
    petrol: 2.31,
    diesel: 2.68,
  };

  const transportKm =
    result.transport > 0
      ? (
          result.transport /
          vehicleFactors[
            result.vehicleType
          ]
        ).toFixed(0)
      : null;

  const shortFlights =
    result.shortFlights > 0
      ? (
          result.shortFlights / 250
        ).toFixed(1)
      : null;

  const longFlights =
    result.longFlights > 0
      ? (
          result.longFlights / 1100
        ).toFixed(1)
      : null;

  const fuelLitres =
    result.fuel > 0
      ? (
          result.fuel /
          fuelFactors[
            result.fuelType
          ]
        ).toFixed(1)
      : null;

  const homeDays =
    result.electricity > 0
      ? (
          result.electricity / 4
        ).toFixed(0)
      : null;

  const cylinders =
    result.gas > 0
      ? (
          result.gas / 42
        ).toFixed(1)
      : null;

  const burgers =
    result.food > 0
      ? (
          result.food / 5
        ).toFixed(0)
      : null;

  const tshirts =
    result.shopping > 0
      ? (
          result.shopping / 7
        ).toFixed(0)
      : null;

  const laptops =
    result.electronics > 0
      ? (
          result.electronics / 200
        ).toFixed(1)
      : null;

  const travelDays =
    result.travelSpend > 0
      ? (
          result.travelSpend / 50
        ).toFixed(1)
      : null;

      const transportText =
        result.vehicleType === "car" ||
        result.vehicleType === "bike" ||
        result.vehicleType === "scooter"
            ? `${result.fuelType} ${result.vehicleType}`
            : result.vehicleType;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-3xl font-bold mb-6 !text-black">
      🌍 Impact Equivalents
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-slate-800">

        {transportKm && (
          <div className="bg-blue-50 p-4 rounded-xl">
            🚗 Equivalent to travelling
            <strong> {transportKm} km </strong>
                 by {transportText}
          </div>
        )}

        {shortFlights && (
          <div className="bg-red-50 p-4 rounded-xl">
            ✈️ Equivalent to
            <strong> {shortFlights} </strong>
            domestic flights
          </div>
        )}

        {longFlights && (
          <div className="bg-orange-50 p-4 rounded-xl">
            🌍 Equivalent to
            <strong> {longFlights} </strong>
            international flights
          </div>
        )}

        {fuelLitres && (
          <div className="bg-purple-50 p-4 rounded-xl">
            ⛽ Equivalent to burning
            <strong> {fuelLitres} litres </strong>
            of {result.fuelType}
          </div>
        )}

        {homeDays && (
          <div className="bg-yellow-50 p-4 rounded-xl">
            ⚡ Equivalent to powering a home
            for <strong>{homeDays} days</strong>
          </div>
        )}

        {cylinders && (
          <div className="bg-emerald-50 p-4 rounded-xl">
            🔥 Equivalent to using
            <strong> {cylinders} LPG cylinders</strong>
          </div>
        )}

        {burgers && (
          <div className="bg-green-50 p-4 rounded-xl">
            🍔 Equivalent to producing
            <strong> {burgers} burgers</strong>
          </div>
        )}

        {tshirts && (
          <div className="bg-pink-50 p-4 rounded-xl">
            🛍 Equivalent to producing
            <strong> {tshirts} t-shirts</strong>
          </div>
        )}

        {laptops && (
          <div className="bg-indigo-50 p-4 rounded-xl">
            💻 Equivalent to manufacturing
            <strong> {laptops} laptops</strong>
          </div>
        )}

        {travelDays && (
          <div className="bg-cyan-50 p-4 rounded-xl">
            🎫 Equivalent to
            <strong> {travelDays} travel days</strong>
          </div>
        )}

      </div>

    </div>
  );
}

export default ImpactEquivalents;