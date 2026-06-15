import { useState } from "react";
import { signIn } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await signIn(
    email,
    password
  );

  if (error) {
    alert(error.message);
    return;
  }

  navigate("/dashboard");
};

  return (
    <div className="flex flex-col gap-4 p-8 max-w-md">
      <h1 className="text-2xl font-bold">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={handleLogin}
        className="bg-green-600 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
}

export default Login;