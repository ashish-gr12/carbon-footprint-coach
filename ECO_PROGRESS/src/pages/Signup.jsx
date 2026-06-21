import { useState } from "react";
import { signUp } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error } = await signUp(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup Successful");

    navigate("/dashboard");

  };

  return (
    <div className="flex flex-col gap-4 p-8 max-w-md">
      <h1 className="text-2xl font-bold">Create Account</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-green-600 text-white p-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Signup;