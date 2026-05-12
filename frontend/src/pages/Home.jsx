import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <h1>🏫 TK Negeri Pembina Siau Timur</h1>
        <p>
          Selamat datang di sistem informasi sekolah berbasis digital
        </p>

        <div className="btn-group">
          <Link to="/murid" className="btn">👶 Data Murid</Link>
          <Link to="/guru" className="btn">👩‍🏫 Data Guru</Link>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="info">

        <div className="card">
          <h3>📊 Sistem Terintegrasi</h3>
          <p>Data murid & guru dikelola secara digital melalui API.</p>
        </div>

        <div className="card">
          <h3>🔐 Aman</h3>
          <p>Login admin menggunakan JWT Authentication.</p>
        </div>

        <div className="card">
          <h3>🌿 Modern & Ramah Anak</h3>
          <p>UI hijau cerah, sederhana, dan mudah digunakan.</p>
        </div>

      </div>

    </div>
  );
}