import { useLocation, useNavigate } from "react-router-dom";
import ResultsPieChart
from "../components/results/ResultsPieChart";
import ImpactEquivalents
from "../components/results/ImpactEquivalents";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">
            No Data Available
          </h1>

          <button
            onClick={() => navigate("/calculator")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Go To Calculator
          </button>
        </div>
      </div>
    );
  }

  const emissions = {
    Transport: result.transport,
    Flights: result.flights,
    Electricity: result.electricity,
    Fuel: result.fuel,
    Gas: result.gas,
    Food: result.food,
    Shopping: result.shopping,
    Electronics: result.electronics,
    Travel: result.travelSpend,
  };

  const biggest = Object.keys(emissions).reduce(
    (a, b) => (emissions[a] > emissions[b] ? a : b)
  );

  const biggestValue = emissions[biggest];

  let impact = "";
  let impactColor = "";

  if (result.total < 200) {
    impact = "Low Impact 🌱";
    impactColor = "text-green-600";
  } else if (result.total < 500) {
    impact = "Moderate Impact ⚠️";
    impactColor = "text-yellow-600";
  } else {
    impact = "High Impact 🔴";
    impactColor = "text-red-600";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl shadow-xl p-10 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            🌍 Carbon Footprint Results
          </h1>

          <h2 className="text-6xl font-extrabold mb-4">
            {result.total.toFixed(2)}
          </h2>

          <p className="text-2xl">
            kg CO₂ Emissions
          </p>

          <p className={`text-2xl font-bold mt-4 ${impactColor.replace("text-", "text-white")}`}>
            {impact}
          </p>
        </div>

        {/* Emission Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-100 border-l-8 border-blue-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-blue-900">
              🚗 Transportation ({result.vehicleType})
            </h3>

            <p className="text-4xl font-bold text-blue-700 mt-3">
              {result.transport.toFixed(2)}
            </p>

            <p className="text-blue-800">
              kg CO₂
            </p>
          </div>

          <div className="bg-red-100 border-l-8 border-red-600 p-6 rounded-2xl shadow-lg">

            <h3 className="font-bold text-lg text-red-900">
              ✈️ Flights
            </h3>

            <p className="text-4xl font-bold text-red-700 mt-3">
              {result.flights.toFixed(2)}
            </p>

            <p className="text-red-800">
              kg CO₂
            </p>

            <p className="mt-3 text-sm text-red-700">
              Short Flights:
              {result.shortFlights.toFixed(2)}
            </p>

            <p className="text-sm text-red-700">
              Long Flights:
              {result.longFlights.toFixed(2)}
            </p>

          </div>

          <div className="bg-yellow-100 border-l-8 border-yellow-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-yellow-900">
              ⚡ Electricity
            </h3>

            <p className="text-4xl font-bold text-yellow-700 mt-3">
              {result.electricity.toFixed(2)}
            </p>

            <p className="text-yellow-800">
              kg CO₂
            </p>
          </div>

          <div className="bg-purple-100 border-l-8 border-purple-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-purple-900">
              ⛽ Fuel ({result.fuelType})
            </h3>

            <p className="text-4xl font-bold text-purple-700 mt-3">
              {result.fuel.toFixed(2)}
            </p>

            <p className="text-purple-800">
              kg CO₂
            </p>
          </div>

          <div className="bg-emerald-100 border-l-8 border-emerald-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-emerald-900">
              🔥 LPG Cylinders
            </h3>

            <p className="text-4xl font-bold text-emerald-700 mt-3">
              {result.gas.toFixed(2)}
            </p>

            <p className="text-emerald-800">
              kg CO₂
            </p>
          </div>

          <div className="bg-green-100 border-l-8 border-green-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-green-900">
              🍔 Food
            </h3>

            <p className="text-4xl font-bold text-green-700 mt-3">
              {result.food.toFixed(2)}
            </p>

            <p className="text-green-800">
              kg CO₂
            </p>
          </div>

          <div className="bg-pink-100 border-l-8 border-pink-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-pink-900">
              🛍 Shopping
            </h3>

            <p className="text-4xl font-bold text-pink-700 mt-3">
              {result.shopping.toFixed(2)}
            </p>

            <p className="text-pink-800">
              kg CO₂
            </p>
          </div>

          <div className="bg-indigo-100 border-l-8 border-indigo-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-indigo-900">
              💻 Electronics
            </h3>

            <p className="text-4xl font-bold text-indigo-700 mt-3">
              {result.electronics.toFixed(2)}
            </p>

            <p className="text-indigo-800">
              kg CO₂
            </p>
          </div>

          <div className="bg-cyan-100 border-l-8 border-cyan-600 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg text-cyan-900">
              🎫 Travel
            </h3>

            <p className="text-4xl font-bold text-cyan-700 mt-3">
              {result.travelSpend.toFixed(2)}
            </p>

            <p className="text-cyan-800">
              kg CO₂
            </p>
          </div>

        </div>

        {/* Emission Pie Chart */}

        <h2 className="text-3xl font-bold mb-4">
            Emission Distribution
        </h2>

        <div className="mb-8">
          <ResultsPieChart result={result} />
        </div>

        {/*Impact Equivalents */}

        <div className="mt-6 mb-8">
          <ImpactEquivalents result={result} />
        </div>

        {/* Biggest Contributor */}
        <div className="bg-gradient-to-r from-yellow-200 to-orange-200 border border-yellow-400 rounded-2xl p-8 shadow-lg mb-8">

          <h2 className="text-3xl font-bold mb-6 !text-black">
            🏆 Biggest Contributor
          </h2>

          <p className="text-lg">
            Your highest emission source is:
          </p>

          <p className="text-4xl font-bold mt-3">
            {biggest}
          </p>

          <p className="text-2xl font-semibold mt-2">
            {biggestValue.toFixed(2)} kg CO₂
          </p>

          <p className="mt-4 text-lg">
            This category contributes the most to your carbon footprint.
          </p>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">

          <button
            onClick={() => navigate("/calculator")}
            className="bg-green-600 text-white px-8 py-3 rounded-xl shadow hover:bg-green-700"
          >
            🔄 Recalculate
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700"
          >
            📊 Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default Results;