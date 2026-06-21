import { useEffect, useState } from "react";
import { getCurrentUser }
from "../services/authService";
import {
  getLeaderboard,
} from "../services/leaderboardService";

function Leaderboard() {

  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] =
  useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {

    const currentUser =
      await getCurrentUser();

    if (currentUser) {
      setCurrentUserId(
        currentUser.id
      );
    }

    const { data } =
      await getLeaderboard();

    setLeaders(data || []);
    setLoading(false);

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <h1 className="text-3xl text-green-400 font-bold">
          Loading Leaderboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 p-6">

<div className="bg-slate-800 rounded-3xl shadow-xl p-8">

  <h2 className="text-3xl font-bold text-white mb-6">
    🏆 Sustainability Rankings
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full text-left">

      <thead>

        <tr className="border-b border-slate-700">

          <th className="p-4 text-yellow-400">
            Rank
          </th>

          <th className="p-4 text-yellow-400">
            User
          </th>

          <th className="p-4 text-yellow-400">
            Leaderboard Score
          </th>

          <th className="p-4 text-yellow-400">
            Eco Score
          </th>

          <th className="p-4 text-yellow-400">
            Reduction %
          </th>

          <th className="p-4 text-yellow-400">
            Calculations
          </th>

        </tr>

      </thead>

      <tbody>

        {leaders.map((user, index) => (

      <tr
        key={user.user_id}
        className={`
          border-b
          border-slate-700
          hover:bg-slate-700

        ${
          index === 0
            ? "bg-yellow-900"
            : index === 1
            ? "bg-zinc-600"
            : index === 2
            ? "bg-orange-800"
            : ""
        }

          ${
            user.user_id === currentUserId
              ? "border-2 border-green-400"
              : ""
          }
        `}
      >

            <td
              className={`
                p-4
                font-bold
                ${
                  index === 0
                    ? "text-yellow-400 text-2xl"
                    : index === 1
                    ? "text-gray-300 text-2xl"
                    : index === 2
                    ? "text-orange-500 text-2xl"
                    : "text-white"
                }
              `}
            >

              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : index === 2
                ? "🥉"
                : `#${index + 1}`}

            </td>

            <td className="p-4 text-gray-300">

              {user.username}

              {user.user_id === currentUserId && (
                <span
                  className="
                    ml-2
                    bg-green-600
                    px-2
                    py-1
                    rounded-lg
                    text-xs
                    text-white
                  "
                >
                  You
                </span>
              )}

            </td>

            <td className="p-4 text-green-400 font-bold">

              {user.total_score.toFixed(1)}

            </td>

            <td className="p-4 text-blue-400">

              {user.eco_score}

            </td>

            <td className="p-4 text-yellow-400">

              {user.reduction_percentage.toFixed(1)}%

            </td>

            <td className="p-4 text-purple-400 font-semibold">
              {user.total_calculations}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


    </div>
  );
}

export default Leaderboard;