import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
} from "../services/authService";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

function Profile() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  useEffect(() => {

    const loadProfile = async () => {

      const user =
        await getCurrentUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email);

      const { data } =
        await getProfile(user.id);

      if (data) {
        setUsername(
          data.username || ""
        );
      }

      setLoading(false);
    };

    loadProfile();

  }, []);

  const handleSave = async () => {

    const user =
      await getCurrentUser();

    if (!user) return;

    await updateProfile(
      user.id,
      username
    );

    alert(
      "Profile updated successfully!"
    );
  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <h1 className="text-3xl text-green-400 font-bold">
          Loading Profile...
        </h1>
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 p-6">

      <div className="max-w-3xl mx-auto">

        <div className="bg-slate-800 rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-green-400 mb-8">
            👤 Profile
          </h1>

          <div className="mb-6">

            <label className="block text-white mb-2">
              Email
            </label>

            <input
              value={email}
              disabled
              className="
                w-full
                bg-slate-700
                text-gray-300
                p-3
                rounded-xl
              "
            />

          </div>

          <div className="mb-6">

            <label className="block text-white mb-2">
              Username
            </label>

            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Enter username"
              className="
                w-full
                bg-slate-700
                text-white
                p-3
                rounded-xl
              "
            />

          </div>

          <div className="flex gap-4">

            <button
              onClick={handleSave}
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              Save Profile
            </button>

            <button
              onClick={() =>
                navigate("/dashboard")
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
              Dashboard
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;