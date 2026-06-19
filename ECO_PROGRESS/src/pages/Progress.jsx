import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getEmissionHistory } from "../services/emissionService";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Progress() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProgress = async () => {
      const user = await getCurrentUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await getEmissionHistory(user.id);

      setHistory(data || []);
      setLoading(false);
    };

    loadProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Progress...
        </h1>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          No emission records found.
        </h1>
      </div>
    );
  }

  const totals = history.map(item => item.total);

  const latest = totals[0];

  const highest = Math.max(...totals);

  const lowest = Math.min(...totals);

  const average =
    totals.reduce((sum, value) => sum + value, 0) /
    totals.length;

  const chartData = [...history]
    .reverse()
    .map((item) => ({
      date: new Date(
        item.created_at
      ).toLocaleDateString(),

      emission: item.total,
  }));

  const previous =
    history.length > 1
      ? history[1].total
      : null;

  let improvement = null;

  if (previous && previous > 0) {
    improvement =
      ((previous - latest) / previous) * 100;
  }

  const co2Saved =
  highest - latest;

  let progressScore = 0;

  if (improvement && improvement > 0)
    progressScore += 40;

  if (latest < average)
    progressScore += 30;

  if (co2Saved > 0)
    progressScore += 30;

  let insight = "";

  if (improvement > 10) {
    insight =
      "Great work! Your emissions are decreasing consistently.";
  }
  else if (improvement > 0) {
    insight =
      "You are improving gradually. Keep following recommendations.";
  }
  else {
    insight =
      "Your emissions increased. Review recommendations to improve.";
  }


  const milestones = [];

  if (history.length >= 1)
    milestones.push("🌱 First Calculation");

  if (history.length >= 5)
    milestones.push("📊 Five Calculations");

  if (history.length >= 10)
    milestones.push("🏆 Ten Calculations");

  if (improvement > 10)
    milestones.push("📉 Reduced Emissions");

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 p-6">
      <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-extrabold text-white mb-8">
          📈 Progress Tracking
        </h1>

        {/* Stats Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-800 shadow-xl p-6 rounded-2xl shadow-lg border-l-8 border-green-600">
           <h2 className="text-gray-300 font-semibold">
              Latest Footprint
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {latest.toFixed(2)}
            </p>

            <p>kg CO₂</p>
          </div>

          <div className="bg-slate-800 shadow-xl p-6 rounded-2xl shadow-lg border-l-8 border-red-600">
            <h2 className="text-gray-300 font-semibold">
              Highest Footprint
            </h2>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {highest.toFixed(2)}
            </p>

            <p>kg CO₂</p>
          </div>

          <div className="bg-slate-800 shadow-xl p-6 rounded-2xl shadow-lg border-l-8 border-blue-600">
            <h2 className="text-gray-300 font-semibold">
              Lowest Footprint
            </h2>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {lowest.toFixed(2)}
            </p>

            <p>kg CO₂</p>
          </div>

          <div className="bg-slate-800 shadow-xl p-6 rounded-2xl shadow-lg border-l-8 border-purple-600">
            <h2 className="text-gray-300 font-semibold">
              Average Footprint
            </h2>

            <p className="text-3xl font-bold text-purple-600 mt-2">
              {average.toFixed(2)}
            </p>

            <p>kg CO₂</p>
          </div>

        </div>

      {/* Emission Trends */}

        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold text-white mb-4">
          📈 Emission Trend
        </h2>

        {improvement !== null ? (
          <>
            <p className="text-gray-300">
              Previous Footprint:
              <strong className="ml-2">
                {previous.toFixed(2)} kg CO₂
              </strong>
            </p>

            <p className="text-gray-300 mt-2">
              Latest Footprint:
              <strong className="ml-2">
                {latest.toFixed(2)} kg CO₂
              </strong>
            </p>

            {improvement > 0 ? (
              <p className="text-green-400 text-2xl font-bold mt-4">
                ↓ {improvement.toFixed(2)}% Improvement
              </p>
            ) : (
              <p className="text-red-400 text-2xl font-bold mt-4">
                ↑ {Math.abs(improvement).toFixed(2)}% Increase
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-400">
            Add at least 2 calculations to see progress trends.
          </p>
        )}

      </div>

      {/* Carbon Saved -  Reduction */}

      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            🌱 Sustainability Progress
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-400">
                Highest
              </p>

              <p className="text-red-400 text-3xl font-bold">
                {highest.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Latest
              </p>

              <p className="text-blue-400 text-3xl font-bold">
                {latest.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                CO₂ Saved
              </p>

              <p className="text-green-400 text-3xl font-bold">
                {co2Saved.toFixed(2)}
              </p>
            </div>

          </div>

        </div>

        {/* Progress Score */}

        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            🎯 Progress Score
          </h2>

          <p className="text-5xl font-bold text-green-400">
            {progressScore}/100
          </p>

        </div>


        {/* Progress Insight */}

        <div className="bg-slate-800 shadow-xl rounded-2xl shadow-lg p-6 mb-10">

         <h2 className="text-2xl font-bold text-white mb-4">
            🌱 Progress Insight
          </h2>

          <p className="text-lg text-gray-300">
            You have completed{" "}
            <strong>{history.length}</strong>{" "}
            carbon footprint calculations.
          </p>

          <p className="mt-2 text-gray-300">
            Best Result:{" "}
            <strong>
              {lowest.toFixed(2)} kg CO₂
            </strong>
          </p>

          <p className="mt-2 text-gray-300">
            Highest Result:{" "}
            <strong>
              {highest.toFixed(2)} kg CO₂
            </strong>
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold text-white mb-4">
          🏅 Milestones
        </h2>

        <div className="space-y-3">

          {milestones.map((item, index) => (

            <div
              key={index}
              className="bg-slate-700 p-4 rounded-xl text-green-400"
            >
              {item}
            </div>

          ))}

        </div>

        </div>

      {/* Emissions Line Chart */}

      <div className="bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        📈 Emission Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="emission"
            stroke="#10b981"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>

        {/* History Table */}

        <div className="bg-slate-800 shadow-xl rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            📜 Emission History
          </h2>

          <div className="space-y-4">

            {history.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  justify-between
                  border-b border-slate-700
                  pb-3
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

    {/* Navigation Buttons */}
    
    <div className="flex flex-wrap justify-center gap-4 mt-10">

      <button
        onClick={() => navigate("/dashboard")}
        className="
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-blue-700
          shadow-lg
        "
      >
        📊 Dashboard
      </button>

      <button
        onClick={() => navigate("/calculator")}
        className="
          bg-green-600
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-green-700
          shadow-lg
        "
      >
        🧮 Calculator
      </button>

      <button
        onClick={() => navigate("/recommendations")}
        className="
          bg-purple-600
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-purple-700
          shadow-lg
        "
      >
        🤖 Recommendations
      </button>

    </div>

    </div>
  );
}

export default Progress;