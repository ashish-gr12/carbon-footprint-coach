import { Routes, Route } from "react-router-dom";

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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/calculator" element={<Calculator />} />

      <Route path="/results" element={<Results />} />

      <Route
        path="/recommendations"
        element={<Recommendations />}
      />

      <Route path="/roadmap" element={<Roadmap />} />

      <Route path="/progress" element={<Progress />} />

      <Route
        path="/leaderboard"
        element={<Leaderboard />}
      />
    </Routes>
  );
}

export default AppRoutes;