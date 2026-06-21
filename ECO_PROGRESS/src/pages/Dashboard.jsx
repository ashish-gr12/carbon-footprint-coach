import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut, getCurrentUser } from "../services/authService";
import {
  getLatestEmission,
  getEmissionHistory,
} from "../services/emissionService";
import {
  getUserGoal,
  updateUserGoal,
} from "../services/goalService";
import {
  getProfile,
  getAllProfiles,
} from "../services/profileService";


function Dashboard() {
  const navigate = useNavigate();
  const [latestEmission, setLatestEmission] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState(300);
  const [newGoal, setNewGoal] = useState("");
  const [profile, setProfile] =
  useState(null);
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

      const { data: goalData } =
        await getUserGoal(user.id);

      const { data: profileData } =
        await getProfile(user.id);

        setProfile(profileData);

      setLatestEmission(latest);
      setHistory(historyData || []);

      if (goalData?.goal) {
        setGoal(goalData.goal);
      }

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

  let level = "";

  if (!latestEmission) {
    level = "🚀 Not Started";
  }
  else if (sustainabilityScore >= 80) {
    level = "🌍 Planet Guardian";
  }
  else if (sustainabilityScore >= 60) {
    level = "🌱 Green Warrior";
  }
  else if (sustainabilityScore >= 40) {
    level = "🌿 Eco Explorer";
  }
  else {
    level = "♻️ Aware Citizen";
  }

  const achievements = [];

  if (history.length >= 1) {
    achievements.push("🌱 First Calculation");
  }

  if (history.length >= 5) {
    achievements.push("📊 5 Calculations Completed");
  }

  if (history.length >= 10) {
    achievements.push("🏆 10 Calculations Completed");
  }

  if (
    latestEmission &&
    sustainabilityScore >= 80
  ) {
    achievements.push("🌍 Planet Guardian");
  }

  if (
    latestEmission &&
    latestEmission.total < 200
  ) {
    achievements.push("♻️ Low Carbon Hero");
  }

  let nextMilestone = "";

  if (!latestEmission) {
    nextMilestone = "Complete Your First Calculation";
  }
  
  else if(sustainabilityScore < 40) {
    nextMilestone =
      "Reach Eco Explorer";
  }
  else if (sustainabilityScore < 60) {
    nextMilestone =
      "Reach Green Warrior";
  }
  else if (sustainabilityScore < 80) {
    nextMilestone =
      "Reach Planet Guardian";
  }
  else {
    nextMilestone =
      "Maximum Level Reached";
  }

  const recentActivity =
  history.slice(0, 5);

  const currentEmission =
    latestEmission?.total || 0;

  const goalProgress =
    !latestEmission
      ? 0
      : currentEmission <= goal
      ? 100
      : Math.max(
          0,
          100 -
            ((currentEmission - goal) /
              currentEmission) *
              100
      );

    const handleSaveGoal = async () => {
    const user = await getCurrentUser();

    if (
      !user ||
      !newGoal ||
      Number(newGoal) <= 0
    ) {
      return;
    }

    await updateUserGoal(
      user.id,
      Number(newGoal)
    );

    setGoal(Number(newGoal));
    setNewGoal("");
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

      <h1 className="text-5xl font-extrabold text-green-400">
              {profile?.username
        ? `Welcome, ${profile.username} 👋`
        : "🌍 Eco Progress Dashboard"}
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

        <h2 className="text-gray-300">
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

    {/* Sustainability Level */}

    <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold text-white mb-4">
        ⭐ Sustainability Level
      </h2>

      <p className="text-4xl font-bold text-green-400">
        {level}
      </p>

      <p className="text-gray-300 mt-3">
        Sustainability Score:
        <span className="text-yellow-400 font-bold ml-2">
          {sustainabilityScore}/100
        </span>
      </p>

    </div>

    {/* Eco Achievements */}

    <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        🏆 Eco Achievements
      </h2>

      <div className="space-y-3">

        {achievements.length > 0 ? (
          achievements.map(
            (achievement, index) => (
              <div
                key={index}
                className="
                  bg-slate-700
                  rounded-xl
                  p-4
                  text-green-400
                  font-semibold
                "
              >
                ✅ {achievement}
              </div>
            )
          )
        ) : (
          <p className="text-gray-400">
            No achievements unlocked yet.
          </p>
        )}

      </div>

    </div>

    {/* Sustainability Goal */}

    <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold text-white mb-4">
        🎯 Sustainability Goal
      </h2>

      <p className="text-gray-300">
        Goal:
        <span className="text-green-400 font-bold ml-2">
          Below {goal} kg CO₂
        </span>
      </p>

      <p className="text-gray-300 mt-3">
        Current:
        <span className="text-yellow-400 font-bold ml-2">
          {currentEmission.toFixed(2)} kg CO₂
        </span>
      </p>

      <div className="w-full bg-slate-700 rounded-full h-4 mt-4">

        <div
          className="bg-green-500 h-4 rounded-full"
          style={{
            width: `${goalProgress}%`,
          }}
        />

      </div>

      <p className="mt-4 font-bold text-lg">

        {currentEmission <= goal ? (
          <span className="text-green-400">
            ✅ On Track
          </span>
        ) : (
          <span className="text-red-400">
            ⚠️ Above Goal
          </span>
        )}

      </p>

      {/*Change Goal Inside Goal Card*/}

      <div className="mt-6 flex gap-3">

      <input
        type="number"
        value={newGoal}
        onChange={(e) =>
          setNewGoal(e.target.value)
        }
        placeholder="Enter goal"
        className="
          bg-slate-700
          text-white
          px-4
          py-2
          rounded-xl
        "
      />

      <button
        onClick={handleSaveGoal}
        className="
          bg-green-600
          text-white
          px-4
          py-2
          rounded-xl
        "
      >
        Save Goal
      </button>

    </div>

    </div>    
    

    {/* Sustainability Roadmap */}

    <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-2xl font-bold text-white mb-4">
        🛣 Sustainability Roadmap
      </h2>

      <p className="text-green-400 text-xl">
        {nextMilestone}
      </p>

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

    {recentActivity.length > 0 ? (
      recentActivity.map((item) => (
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
        {new Date(item.created_at).toLocaleDateString()}
      </span>

      <span className="font-bold text-green-600">
        🌱 {item.total.toFixed(2)} kg CO₂
      </span>
    </div>
        ))
      ) : (
        <p className="text-gray-400">
          No activity yet.
        </p>
      )}

    </div>

    {/* Quick Navigation */}

    <div className="bg-slate-800 rounded-3xl shadow-xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        🚀 Quick Actions
      </h2>

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() =>
            navigate("/calculator")
          }
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          🧮 Calculator
        </button>

        <button
          onClick={() =>
            navigate("/recommendations")
          }
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          🤖 Recommendations
        </button>

        <button
          onClick={() =>
            navigate("/progress")
          }
          className="
            bg-purple-600
            hover:bg-purple-700
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          📈 Progress
        </button>

        <button
        onClick={() =>
          navigate("/roadmap")
        }
        className="
          bg-orange-600
          hover:bg-orange-700
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        🛣 Roadmap
      </button>


      <button
        onClick={() =>
          navigate("/profile")
        }
        className="
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        👤 Profile
      </button>

      </div>

    </div>

  </div>

</div>
  );
}

export default Dashboard;