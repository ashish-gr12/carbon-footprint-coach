import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut, getCurrentUser } from "../services/authService";
import {
  getLatestEmission,
  getEmissionHistory,
} from "../services/emissionService";

function Dashboard() {
  const navigate = useNavigate();
  const [latestEmission, setLatestEmission] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const loadDashboard = async () => {
  const user = await getCurrentUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: latest } =
        await getLatestEmission(user.id);

      const { data: historyData } =
        await getEmissionHistory(user.id);

      setLatestEmission(latest);
      setHistory(historyData || []);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const getBiggestContributor = () => {
  if (!latestEmission) return "--";

  const emissions = {
    Transport: latestEmission.transport,
    Flights: latestEmission.flights,
    Electricity: latestEmission.electricity,
    Fuel: latestEmission.fuel,
    LPG: latestEmission.gas,
    Food: latestEmission.food,
    Shopping: latestEmission.shopping,
    Electronics: latestEmission.electronics,
    Travel: latestEmission.travel,
  };

  return Object.keys(emissions).reduce(
    (a, b) =>
      emissions[a] > emissions[b]
        ? a
        : b
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-green-400">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-200 via-emerald-100 to-teal-200 p-6">
    <div className="max-w-7xl mx-auto">

    <div className="flex justify-between items-center mb-10">

   <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border-l-8 border-green-600">

      <h1 className="text-5xl font-extrabold text-emerald-700">
        🌍 Eco Progress Dashboard
      </h1>

      <p className="text-slate-300 mt-2 text-lg">
        Track your sustainability journey
      </p>

    </div>

      <button
        onClick={handleLogout}
        className="
          bg-red-500
          text-white
          px-5
          py-3
          rounded-xl
          shadow-lg
          hover:bg-red-600
        "
      >
        Logout
      </button>

    </div>

    {/* Top Cards */}

    <div className="grid md:grid-cols-4 gap-6 mb-8">

      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border-l-8 border-green-600">

        <h2 className="text-gray-500">
          Latest Footprint
        </h2>

        <p className="text-4xl font-bold text-green-600 mt-3">
          {latestEmission?.total?.toFixed(2) || "--"}
        </p>

        <p className="text-gray-300">
          kg CO₂
        </p>

      </div>

      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border-l-8 border-blue-600">

        <h2 className="text-gray-300">
          Total Calculations
        </h2>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          {history.length}
        </p>

      </div>

      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border-l-8 border-yellow-600">

        <h2 className="text-gray-300">
          Biggest Contributor
        </h2>

        <p className="text-3xl font-bold text-yellow-600 mt-3">
          {getBiggestContributor()}
        </p>

      </div>

      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 border-l-8 border-purple-600">

        <h2 className="text-gray-300">
          Vehicle Type
        </h2>

        <p className="text-3xl font-bold text-purple-600 mt-3 capitalize">
          {latestEmission?.vehicle_type || "--"}
        </p>

      </div>

    </div>

    {/* Latest Breakdown */}

   <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Latest Emission Breakdown
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="text-gray-200">
          🚗 Transport:
          <strong>
            {" "}
            {latestEmission?.transport?.toFixed(2) || 0}
          </strong>
        </div>

        <div className="text-gray-200">
          ✈️ Flights:
          <strong>
            {" "}
            {latestEmission?.flights?.toFixed(2) || 0}
          </strong>
        </div>

        <div className="text-gray-200">
          ⚡ Electricity:
          <strong>
            {" "}
            {latestEmission?.electricity?.toFixed(2) || 0}
          </strong>
        </div>

        <div className="text-gray-200">
          ⛽ Fuel:
          <strong>
            {" "}
            {latestEmission?.fuel?.toFixed(2) || 0}
          </strong>
        </div>

        <div className="text-gray-200">
          🔥 LPG:
          <strong>
            {" "}
            {latestEmission?.gas?.toFixed(2) || 0}
          </strong>
        </div>

        <div className="text-gray-200">
          🍔 Food:
          <strong>
            {" "}
            {latestEmission?.food?.toFixed(2) || 0}
          </strong>
        </div>

      </div>

    </div>

    {/* Recent History */}

    <div className="bg-slate-800 rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Recent Calculations
      </h2>

      {history.slice(0, 5).map((item) => (
        <div
          key={item.id}
          className="
            flex
            justify-between
            border-b
            border-slate-700
            py-4
          "
        >
         <span className="text-gray-300">
            {new Date(
              item.created_at
            ).toLocaleDateString()}
          </span>

          <span className="font-bold text-green-600">
            {item.total.toFixed(2)} kg CO₂
          </span>
        </div>
      ))}

    </div>

  </div>

</div>
  );
}

export default Dashboard;