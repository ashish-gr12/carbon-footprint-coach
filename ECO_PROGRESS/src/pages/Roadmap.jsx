import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import {
  getLatestEmission,
  getEmissionHistory,
} from "../services/emissionService";

function Roadmap() {

  const [latestEmission, setLatestEmission] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const loadRoadmap = async () => {

      const user =
        await getCurrentUser();

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

    loadRoadmap();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <h1 className="text-3xl text-green-400 font-bold">
          Loading Roadmap...
        </h1>
      </div>
    );
  }

  let sustainabilityScore = 0;

  if (latestEmission) {

    sustainabilityScore = 100;

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

  }

  let currentLevel = "";
  let nextLevel = "";


  if (!latestEmission) {
  currentLevel = "🚀 Not Started";
  nextLevel = "♻️ Aware Citizen";
  }

  else if (sustainabilityScore >= 80) {
    currentLevel = "🌍 Planet Guardian";
    nextLevel = "🏆 Maximum Level Reached";
  }
  else if (sustainabilityScore >= 60) {
    currentLevel = "🌱 Green Warrior";
    nextLevel = "🌍 Planet Guardian";
  }
  else if (sustainabilityScore >= 40) {
    currentLevel = "🌿 Eco Explorer";
    nextLevel = "🌱 Green Warrior";
  }
  else {
    currentLevel = "♻️ Aware Citizen";
    nextLevel = "🌿 Eco Explorer";
  }

  let roadmapProgress = 0;

  if (sustainabilityScore >= 80) {
    roadmapProgress = 100;
  }
  else if (sustainabilityScore >= 60) {
    roadmapProgress = 75;
  }
  else if (sustainabilityScore >= 40) {
    roadmapProgress = 50;
  }
  else if (sustainabilityScore >= 20) {
    roadmapProgress = 25;
  }
  else {
    roadmapProgress = 0;
  }

      const roadmapChecklist = [

      {
        title: "🌱 First Calculation",
        completed: history.length >= 1,
      },
      {
        title: "📊 Complete 5 Calculations",
        completed: history.length >= 5,
      },
      {
        title: "🏆 Complete 10 Calculations",
        completed: history.length >= 10,
      },
      {
        title: "🌿 Reach Eco Explorer",
        completed:
        latestEmission &&
        sustainabilityScore >= 40,
      },
      {
        title: "🌱 Reach Green Warrior",
        completed:
        latestEmission &&
        sustainabilityScore >= 60,
      },
      {
        title: "🌍 Reach Planet Guardian",
        completed:
        latestEmission &&
        sustainabilityScore >= 80,
      },
      {
        title: "♻️ Keep Emissions Below 200 kg CO₂",
        completed:
          latestEmission &&
          latestEmission.total < 200,
      },
    ];


      const timelineLevels = [

      {
        name: "♻️ Aware Citizen",
        score: 20,
      },
      {
        name: "🌿 Eco Explorer",
        score: 40,
      },
      {
        name: "🌱 Green Warrior",
        score: 60,
      },
      {
        name: "🌍 Planet Guardian",
        score: 80,
      },
    ];

    let streak = 0;

    if (history.length > 0) {

      const dates = history
        .map(item =>
          new Date(item.created_at)
            .toDateString()
        );

      const uniqueDates =
        [...new Set(dates)];

      uniqueDates.sort(
        (a, b) =>
          new Date(b) - new Date(a)
      );

      streak = 1;

      for (
        let i = 1;
        i < uniqueDates.length;
        i++
      ) {

        const current =
          new Date(uniqueDates[i - 1]);

        const previous =
          new Date(uniqueDates[i]);

        const diffDays =
          (current - previous) /
          (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          streak++;
        }
        else {
          break;
        }

      }

    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 p-6">
        <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-green-400 mb-8">
          🛣 Sustainability Roadmap
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-slate-800 rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-white mb-4">
          ⭐ Current Level
        </h2>

        <p className="text-4xl font-bold text-green-400">
          {currentLevel}
        </p>

        <p className="text-gray-300 mt-4">
          Sustainability Score:
          <span className="text-yellow-400 font-bold ml-2">
            {sustainabilityScore}/100
          </span>
        </p>

        </div>

        <div className="bg-slate-800 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            🚀 Next Level
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            {nextLevel}
          </p>

          <p className="text-gray-300 mt-4">
            {nextLevel === "🏆 Maximum Level Reached"
              ? "You have completed the roadmap."
              : "Continue reducing emissions to unlock this level."}
          </p>

        </div>

      </div>

      {/* Roadmap Progress */}

      <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

        <h2 className="text-2xl font-bold text-white mb-4">
          📈 Roadmap Progress
        </h2>

        <p className="text-gray-300 mb-4">
          Progress toward maximum sustainability level
        </p>

        <div className="w-full bg-slate-700 rounded-full h-6">

          <div
            className="bg-green-500 h-6 rounded-full transition-all duration-500"
            style={{
              width: `${roadmapProgress}%`,
            }}
          />

        </div>

        <p className="text-green-400 font-bold text-xl mt-4">
          {roadmapProgress}% Complete
        </p>

      </div>

      {/* Roadmap Checklist */}

      <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          ✅ Roadmap Checklist
        </h2>

        <div className="space-y-4">

          {roadmapChecklist.map(
            (item, index) => (

              <div
                key={index}
                className="
                  flex
                  justify-between
                  items-center
                  bg-slate-700
                  p-4
                  rounded-xl
                "
              >

                <span className="text-white">
                  {item.title}
                </span>

                {item.completed ? (
                  <span className="text-green-400 font-bold">
                    Completed
                  </span>
                ) : (
                  <span className="text-red-400 font-bold">
                    Pending
                  </span>
                )}

              </div>

            )
          )}

        </div>

      </div>

      {/* Roadmap Timeline */}

      <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          🛣 Progress Journey
        </h2>

        <div className="space-y-4">

          {timelineLevels.map((level, index) => (

            <div
              key={index}
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className={`
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                  ${
                    latestEmission &&
                    sustainabilityScore >= level.score
                      ? "bg-green-500 text-white"
                      : "bg-slate-600 text-gray-300"
                  }
                `}
              >
                {
                  latestEmission &&
                  sustainabilityScore >= level.score
                    ? "✓"
                    : index + 1
                }
              </div>

              <div
                className={`
                  flex-1
                  p-4
                  rounded-xl
                  ${
                    latestEmission &&
                    sustainabilityScore >= level.score
                      ? "bg-green-900"
                      : "bg-slate-700"
                  }
                `}
              >

                <h3 className="font-bold text-white">
                  {level.name}
                </h3>

                <p className="text-gray-300">
                  Required Score: {level.score}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/*Current Position Card  */}

      <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold text-white mb-4">
        📍 Current Position
      </h2>

      <p className="text-4xl font-bold text-green-400">
        {currentLevel}
      </p>

      <p className="text-gray-300 mt-3">
        {nextLevel === "🏆 Maximum Level Reached"
          ? "You have reached the highest sustainability level."
          : "Keep reducing emissions to move further along the roadmap."}
      </p>

    </div>

    {/* Sustainability Streak */}

    <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold text-white mb-4">
        🔥 Sustainability Streak
      </h2>

      <p className="text-5xl font-bold text-orange-400">
        {streak} Day{streak !== 1 ? "s" : ""}
      </p>
      

      <p className="text-gray-300 mt-3">
        Consecutive days with
        carbon footprint calculations
      </p>

      <p className="mt-4 text-lg">

      {streak >= 30 ? (
        <span className="text-green-400">
          🏆 Sustainability Master
        </span>
      ) : streak >= 14 ? (
        <span className="text-blue-400">
          🌍 Planet Guardian Streak
        </span>
      ) : streak >= 7 ? (
        <span className="text-yellow-400">
          🌱 Green Warrior Streak
        </span>
      ) : (
        <span className="text-gray-400">
          Keep going to build your streak!
        </span>
      )}

    </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 mt-6"
          >
            📊 Dashboard
          </button>

                    <button
            onClick={() => navigate("/calculator")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 ml-6"
          >
            🧮 Recalculate
          </button>

          <button
            onClick={() => navigate("/progress")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 ml-6"
          >
            📈 Progress
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

export default Roadmap;