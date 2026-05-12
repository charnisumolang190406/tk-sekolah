import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        🎒 TK Siau Timur
      </div>

      {/* MENU */}
      <div className="menu">

        <Link to="/" className="link">Home</Link>

        {!token ? (
          <>
            <Link to="/murid" className="link">Murid</Link>
            <Link to="/guru" className="link">Guru</Link>
            <Link to="/galeri" className="link">Galeri</Link>
            <Link to="/pengumuman" className="link">Pengumuman</Link>
            <Link to="/login" className="loginBtn">Login</Link>
          </>
        ) : (
          <>
            <Link to="/admin/dashboard" className="link admin">Dashboard</Link>
            <Link to="/admin/murid" className="link">Murid</Link>
            <Link to="/admin/guru" className="link">Guru</Link>
            <Link to="/admin/galeri" className="link">Galeri</Link>
            <Link to="/admin/pengumuman" className="link">Pengumuman</Link>

            <button onClick={logout} className="logoutBtn">
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}