import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.token);

    alert("Login berhasil!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Login Admin</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
}