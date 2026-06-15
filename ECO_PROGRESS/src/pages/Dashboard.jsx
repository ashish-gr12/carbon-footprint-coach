import { useNavigate } from "react-router-dom";
import { signOut } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Eco Progress Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Eco Score
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            --
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Total Emissions
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            --
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Leaderboard Rank
          </h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">
            --
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;