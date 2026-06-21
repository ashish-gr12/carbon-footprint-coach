import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Calculator from "../pages/Calculator";
import Results from "../pages/Results";
import Recommendations from "../pages/Recommendations";
import Roadmap from "../pages/Roadmap";
import Progress from "../pages/Progress";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
        }
      />

      <Route path="/calculator" element={
        <ProtectedRoute>
          <Calculator />
        </ProtectedRoute>
        }
      />

      <Route path="/results" element={
        <ProtectedRoute>
          <Results />
        </ProtectedRoute>
        }
      />

      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />

      <Route path="/roadmap" element={
        <ProtectedRoute>
          <Roadmap />
        </ProtectedRoute>
        }
      />

      <Route path="/progress" element={
        <ProtectedRoute>
          <Progress />
        </ProtectedRoute>
        }
      />

      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;