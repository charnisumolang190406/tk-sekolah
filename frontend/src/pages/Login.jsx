import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Username atau password salah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">

      {/* KIRI — branding */}
      <div className="loginLeft">
        <img src="/logo-tk.png" alt="Logo TK" className="loginLogo" />
        <h1>TK Negeri Pembina<br />Siau Timur</h1>
        <p>Sistem Informasi Sekolah Digital</p>
        <div className="loginLeftInfo">
          <div className="loginLeftItem">📍 Kelurahan Tarorane, Kec. Siau Timur</div>
          <div className="loginLeftItem">📞 (0432) 310331</div>
          <div className="loginLeftItem">🌿 Sulawesi Utara, Indonesia</div>
        </div>
      </div>

      {/* KANAN — form */}
      <div className="loginRight">
        <div className="loginBox">
          <div className="loginHeader">
            <div className="loginIcon">🔐</div>
            <h2>Login Admin</h2>
            <p>Masuk ke panel administrasi sekolah</p>
          </div>

          {error && (
            <div className="loginError">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="loginForm">
            <div className="formGroup">
              <label>Username</label>
              <div className="inputWrapper">
                <span className="inputIcon">👤</span>
                <input
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <label>Password</label>
              <div className="inputWrapper">
                <span className="inputIcon">🔑</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="togglePass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="loginBtn" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="loginFooter">
            © 2025 TK Negeri Pembina Siau Timur
          </p>
        </div>
      </div>

    </div>
  );
}