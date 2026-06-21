import { useEffect,useState  } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function LandingPage() {

  const navigate = useNavigate();

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {

    const checkUser = async () => {

      const user =
        await getCurrentUser();

      if (user) {
        navigate("/dashboard");
        return;
      }

      setChecking(false);

    };

    checkUser();

  }, [navigate]);

  if (checking) {
  return null;
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-950">

      {/* Hero Section */}

        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="flex flex-col items-center text-center">

          <h1 className="text-7xl font-extrabold text-green-400 mb-6">
            🌍 Eco Progress
          </h1>

          <h2 className="text-4xl font-bold text-white mb-6">
            Track Your Carbon Footprint
          </h2>

          <p
            className="
              w-full
              max-w-3xl
              text-center
              text-xl
              text-gray-300
              leading-relaxed
              mx-auto
            "
          >
            Calculate emissions, monitor sustainability
            progress, earn achievements, compete on the
            leaderboard, and build eco-friendly habits
            that help create a greener future.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <button
              onClick={() => navigate("/signup")}
              className="
                bg-green-600
                hover:bg-green-700
                px-8
                py-4
                rounded-xl
                text-white
                font-bold
                text-lg
              "
            >
              🚀 Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="
                bg-slate-700
                hover:bg-slate-600
                px-8
                py-4
                rounded-xl
                text-white
                font-bold
                text-lg
              "
            >
              🔑 Login
            </button>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-4xl font-bold text-center text-white mb-12">
          ✨ Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-green-400 mb-3">
              🧮 Calculator
            </h3>

            <p className="text-gray-300">
              Calculate emissions from transport,
              flights, electricity, fuel and lifestyle.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-blue-400 mb-3">
              📊 Results
            </h3>

            <p className="text-gray-300">
              View detailed carbon footprint results
              with category-wise emission breakdown.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-purple-400 mb-3">
              🤖 Recommendations
            </h3>

            <p className="text-gray-300">
              Receive personalized sustainability
              suggestions to reduce emissions.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-blue-400 mb-3">
              📈 Progress
            </h3>

            <p className="text-gray-300">
              Monitor trends, statistics,
              improvement percentage and history.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">
              🏆 Leaderboard
            </h3>

            <p className="text-gray-300">
              Compare sustainability scores
              and compete with other users.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-orange-400 mb-3">
              🛣 Roadmap
            </h3>

            <p className="text-gray-300">
              Unlock achievements,
              build streaks and reach new levels.
            </p>
          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center text-white mb-12">
          ⚙️ How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-800 p-8 rounded-3xl text-center">
            <h3 className="text-5xl mb-4">1️⃣</h3>

            <h4 className="text-2xl font-bold text-white mb-3">
              Enter Data
            </h4>

            <p className="text-gray-300">
              Add transport, electricity,
              fuel and lifestyle information.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-3xl text-center">
            <h3 className="text-5xl mb-4">2️⃣</h3>

            <h4 className="text-2xl font-bold text-white mb-3">
              Calculate
            </h4>

            <p className="text-gray-300">
              Generate your carbon footprint
              instantly using our calculator.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-3xl text-center">
            <h3 className="text-5xl mb-4">3️⃣</h3>

            <h4 className="text-2xl font-bold text-white mb-3">
              Improve
            </h4>

            <p className="text-gray-300">
              Follow recommendations,
              achieve goals and climb rankings.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <div className="bg-slate-800 rounded-3xl p-12 shadow-xl">

          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Start?
          </h2>

          <p className="text-xl text-gray-300 mb-8">
            Join Eco Progress today and begin
            your sustainability journey.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="
              mt-6
              bg-green-600
              hover:bg-green-700
              px-10
              py-4
              rounded-xl
              text-white
              font-bold
              text-xl
            "
          >
            Create Free Account
          </button>

        </div>

      </section>

      {/* Footer */}

      <footer className="text-center py-8 text-gray-400">
        Eco Progress © 2026 | Built with React, Tailwind CSS & Supabase
      </footer>

    </div>
  );
}

export default LandingPage;