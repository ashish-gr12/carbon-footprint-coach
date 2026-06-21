import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getLatestEmission } from "../services/emissionService";
import { useNavigate } from "react-router-dom";
import {
  getAIRecommendations,
} from "../services/aiService";

function Recommendations() {
  const [latestEmission, setLatestEmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiAdvice, setAiAdvice] =
    useState(null);
  const [aiLoading, setAiLoading] =
    useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadRecommendations = async () => {
      const user = await getCurrentUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } =
        await getLatestEmission(user.id);

setLatestEmission(data);

setLoading(false);

setAiLoading(true);

try {
  const advice =
    await getAIRecommendations(data);

  setAiAdvice(advice);
}
catch (error) {

  console.error(error);

  const quotaExceeded =
    error.message?.includes("quota") ||
    error.message?.includes("429");

  return {
    concern: quotaExceeded
      ? "Gemini API quota exceeded."
      : "AI service temporarily unavailable.",

    recommendations: quotaExceeded
      ? [
          "Free daily quota has been reached.",
          "Try again tomorrow.",
          "Or switch to another API key."
        ]
      : [
          "Please try again later."
        ],

    reduction: "Unavailable"
  };
}

setAiLoading(false);
    };

    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <h1 className="text-3xl font-bold text-green-400">
          Loading Recommendations...
        </h1>
      </div>
    );
  }

  if (!latestEmission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <h1 className="text-3xl font-bold text-white">
          No emission data found.
        </h1>
      </div>
    );
  }

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

  const biggest = Object.keys(emissions).reduce(
    (a, b) =>
      emissions[a] > emissions[b]
        ? a
        : b
  );

  const activeCategories =
  Object.entries(emissions)
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);

  let sustainabilityScore = 100;

  if (latestEmission.total > 800) {
    sustainabilityScore = 20;
  }
  else if (latestEmission.total > 600) {
    sustainabilityScore = 40;
  }
  else if (latestEmission.total > 400) {
    sustainabilityScore = 60;
  }
  else if (latestEmission.total > 200) {
    sustainabilityScore = 80;
  }

  let scoreLabel = "";

  if (sustainabilityScore >= 80) {
    scoreLabel = "Excellent 🌱";
  }
  else if (sustainabilityScore >= 60) {
    scoreLabel = "Good ✅";
  }
  else if (sustainabilityScore >= 40) {
    scoreLabel = "Needs Improvement ⚠️";
  }
  else {
    scoreLabel = "High Impact 🔴";
  }

  let scoreColor = "text-green-400";

  if (sustainabilityScore < 40) {
    scoreColor = "text-red-400";
  }
  else if (sustainabilityScore < 60) {
    scoreColor = "text-yellow-400";
  }
  else if (sustainabilityScore < 80) {
    scoreColor = "text-blue-400";
  }

  const recommendations = {
    Transport: [
      "Use public transport whenever possible",
      "Carpool with friends or colleagues",
      "Walk or cycle for short distances",
      "Consider switching to an electric vehicle",
    ],

    Flights: [
      "Reduce unnecessary flights",
      "Prefer trains for shorter journeys",
      "Combine multiple trips into one journey",
      "Use virtual meetings when possible",
    ],

    Electricity: [
      "Switch to LED bulbs",
      "Turn off appliances when not in use",
      "Use energy-efficient devices",
      "Monitor monthly electricity consumption",
    ],

    Fuel: [
      "Reduce vehicle idling",
      "Maintain proper tire pressure",
      "Drive at consistent speeds",
      "Plan routes efficiently",
    ],

    LPG: [
      "Use energy-efficient cooking methods",
      "Cook with lids to reduce fuel use",
      "Maintain gas appliances regularly",
      "Avoid unnecessary reheating",
    ],

    Food: [
      "Reduce red meat consumption",
      "Increase plant-based meals",
      "Buy local produce",
      "Avoid food waste",
    ],

    Shopping: [
      "Buy only what you need",
      "Choose durable products",
      "Reuse and recycle items",
      "Support sustainable brands",
    ],

    Electronics: [
      "Extend device lifespan",
      "Repair before replacing",
      "Use energy-saving modes",
      "Recycle old electronics responsibly",
    ],

    Travel: [
      "Choose eco-friendly accommodations",
      "Use public transport while travelling",
      "Reduce luxury travel emissions",
      "Plan efficient itineraries",
    ],
  };

  const estimatedReduction =
  (latestEmission.total * 0.2).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-green-400 mb-8">
          🤖 Sustainability Recommendations
        </h1>

        <div className="w-full bg-slate-700 rounded-full h-4 mt-4">

        <div
          className="bg-green-500 h-4 rounded-full"
          style={{
            width: `${sustainabilityScore}%`,
          }}
        />

      </div>

        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            🌍 Sustainability Score
          </h2>

         <p className={`text-6xl font-bold ${scoreColor}`}>
            {sustainabilityScore}
          </p>

          <p className="text-xl text-gray-300 mt-3">
            /100
          </p>

          <p className="text-gray-400 mt-2">
            Sustainability Rating
          </p>

          <p className="text-2xl font-bold text-yellow-400 mt-4">
            {scoreLabel}
          </p>

        </div>


        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            ⚠️ Biggest Contributor
          </h2>

          <p className="text-green-400 mt-3">
            {emissions[biggest].toFixed(2)} kg CO₂
          </p>

          <p className="text-5xl font-bold text-yellow-400">
            {biggest}
          </p>

          <p className="text-gray-300 mt-3">
            This category contributes the most to your carbon footprint.
          </p>

        </div>

        {/* Emission Ranking Card */}

        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          🏆 Emission Ranking
        </h2>

        <div className="space-y-4">

          {activeCategories.map(
            ([category, value], index) => (

              <div
                key={category}
                className="
                  flex
                  justify-between
                  bg-slate-700
                  p-4
                  rounded-xl
                "
              >

                <span className="text-white font-semibold">
                  #{index + 1} {category}
                </span>

                <span className="text-yellow-400 font-bold">
                  {value.toFixed(2)} kg CO₂
                </span>

              </div>

            )
          )}

        </div>

      </div>

       <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">

  <h2 className="text-2xl font-bold text-white mb-6">
    🤖 Personalized Recommendations
  </h2>

  <div className="space-y-6">

    {activeCategories.map(([category, value]) => (

      <div
        key={category}
        className="bg-slate-700 rounded-xl p-5"
      >

        <div className="flex justify-between items-center mb-4">

          <h3 className="text-xl font-bold text-green-400">
            {category}
          </h3>

          <span className="text-yellow-400 font-bold">
            {value.toFixed(2)} kg CO₂
          </span>

        </div>

        <div className="space-y-2">

          {recommendations[category].map((tip, index) => (

            <div
              key={index}
              className="text-gray-200"
            >
              ✅ {tip}
            </div>

          ))}

        </div>

      </div>

    ))}

  </div>

</div>

        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            Potential Impact
          </h2>

          <p className="text-green-400 text-3xl font-bold">
            ~{estimatedReduction} kg CO₂
          </p>

          <p className="text-gray-300 mt-3">
            You could potentially reduce approximately
            {` ${estimatedReduction} kg CO₂ `}
            by following these recommendations.
          </p>

        </div>

        {/* AI Sustainability Coach */}
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">

<h2 className="text-2xl font-bold text-white mb-4">
  🤖 AI Sustainability Coach
</h2>

<p className="text-gray-400 text-sm mb-4">
  Generated using Gemini AI
</p>

{aiAdvice?.concern ===
  "Gemini API quota exceeded." && (

  <div
    className="
      bg-yellow-900
      text-yellow-200
      p-4
      rounded-xl
      mb-4
    "
  >
    ⚠️ Gemini free quota reached.
    Showing rule-based recommendations only.
  </div>

)}

{aiLoading ? (
  <div className="flex items-center gap-3">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>

    <p className="text-gray-300">
      AI is analyzing your emissions...
    </p>
  </div>
) : (
          <div className="bg-slate-700 rounded-xl p-5">

<>
  <div className="mb-6">

    <h3 className="text-yellow-400 text-xl font-bold mb-2">
      ⚠️ Biggest Concern
    </h3>

    <p className="text-gray-200">
      {aiAdvice?.concern}
    </p>

  </div>

  <div className="mb-6">

    <h3 className="text-green-400 text-xl font-bold mb-2">
      ✅ AI Recommendations
    </h3>

{Array.isArray(aiAdvice?.recommendations) &&
  aiAdvice.recommendations.map(
      (tip, index) => (
        <div
          key={index}
          className="text-gray-200 mb-2"
        >
          • {tip}
        </div>
      )
    )}

  </div>

  <div>

    <h3 className="text-blue-400 text-xl font-bold mb-2">
      📉 Potential Reduction
    </h3>

    <p className="text-gray-200">
      {aiAdvice?.reduction}
    </p>

  </div>
</>

          </div>
        )}

      </div>

        {/* Navigation Section */}

        <div className="flex flex-wrap justify-center gap-4">

          <button
            onClick={() => navigate("/calculator")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            🧮 Recalculate
          </button>

          <button
            onClick={() => navigate("/progress")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            📈 Progress
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
          >
            📊 Dashboard
          </button>

          
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 ml-6"
          >
            📈 Leaderboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default Recommendations;