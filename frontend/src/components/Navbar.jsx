import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/logo-tk.png" alt="Logo TK" className="logoImg" />
          <span className="logoText">TK <span>Siau Timur</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktopMenu">
          <Link to="/" className="link">Home</Link>
          {!token ? (
            <>
              <Link to="/murid" className="link">Murid</Link>
              <Link to="/guru" className="link">Guru</Link>
              <Link to="/galeri" className="link">Galeri</Link>
              <Link to="/pengumuman" className="link">Pengumuman</Link>
              <div className="divider" />
              <Link to="/login" className="loginBtn">Login</Link>
            </>
          ) : (
            <>
              <Link to="/admin/dashboard" className="link">
                Dashboard <span className="badge">Admin</span>
              </Link>
              <Link to="/admin/murid" className="link">Murid</Link>
              <Link to="/admin/guru" className="link">Guru</Link>
              <Link to="/admin/galeri" className="link">Galeri</Link>
              <Link to="/admin/pengumuman" className="link">Pengumuman</Link>
              <div className="divider" />
              <div className="avatar">A</div>
              <button onClick={logout} className="logoutBtn">Logout</button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobileMenu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="mLink" onClick={() => setMenuOpen(false)}>Home</Link>
        {!token ? (
          <>
            <Link to="/murid" className="mLink" onClick={() => setMenuOpen(false)}>Murid</Link>
            <Link to="/guru" className="mLink" onClick={() => setMenuOpen(false)}>Guru</Link>
            <Link to="/galeri" className="mLink" onClick={() => setMenuOpen(false)}>Galeri</Link>
            <Link to="/pengumuman" className="mLink" onClick={() => setMenuOpen(false)}>Pengumuman</Link>
            <div className="mDivider" />
            <Link to="/login" className="mLoginBtn" onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/admin/dashboard" className="mLink" onClick={() => setMenuOpen(false)}>
              Dashboard <span className="badge">Admin</span>
            </Link>
            <Link to="/admin/murid" className="mLink" onClick={() => setMenuOpen(false)}>Murid</Link>
            <Link to="/admin/guru" className="mLink" onClick={() => setMenuOpen(false)}>Guru</Link>
            <Link to="/admin/galeri" className="mLink" onClick={() => setMenuOpen(false)}>Galeri</Link>
            <Link to="/admin/pengumuman" className="mLink" onClick={() => setMenuOpen(false)}>Pengumuman</Link>
            <div className="mDivider" />
            <button onClick={logout} className="mLogoutBtn">Logout</button>
          </>
        )}
      </div>
    </>
  );
}