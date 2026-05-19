import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

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
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>🎒</div>
          <span className={styles.logoText}>TK <span>Siau Timur</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <Link to="/" className={styles.link}>Home</Link>
          {!token ? (
            <>
              <Link to="/murid" className={styles.link}>Murid</Link>
              <Link to="/guru" className={styles.link}>Guru</Link>
              <Link to="/galeri" className={styles.link}>Galeri</Link>
              <Link to="/pengumuman" className={styles.link}>Pengumuman</Link>
              <div className={styles.divider} />
              <Link to="/login" className={styles.loginBtn}>Login</Link>
            </>
          ) : (
            <>
              <Link to="/admin/dashboard" className={styles.link}>
                Dashboard <span className={styles.badge}>Admin</span>
              </Link>
              <Link to="/admin/murid" className={styles.link}>Murid</Link>
              <Link to="/admin/guru" className={styles.link}>Guru</Link>
              <Link to="/admin/galeri" className={styles.link}>Galeri</Link>
              <Link to="/admin/pengumuman" className={styles.link}>Pengumuman</Link>
              <div className={styles.divider} />
              <div className={styles.avatar}>A</div>
              <button onClick={logout} className={styles.logoutBtn}>Logout</button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <Link to="/" className={styles.mLink} onClick={() => setMenuOpen(false)}>Home</Link>
        {!token ? (
          <>
            <Link to="/murid" className={styles.mLink} onClick={() => setMenuOpen(false)}>Murid</Link>
            <Link to="/guru" className={styles.mLink} onClick={() => setMenuOpen(false)}>Guru</Link>
            <Link to="/galeri" className={styles.mLink} onClick={() => setMenuOpen(false)}>Galeri</Link>
            <Link to="/pengumuman" className={styles.mLink} onClick={() => setMenuOpen(false)}>Pengumuman</Link>
            <div className={styles.mDivider} />
            <Link to="/login" className={styles.mLoginBtn} onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/admin/dashboard" className={styles.mLink} onClick={() => setMenuOpen(false)}>
              Dashboard <span className={styles.badge}>Admin</span>
            </Link>
            <Link to="/admin/murid" className={styles.mLink} onClick={() => setMenuOpen(false)}>Murid</Link>
            <Link to="/admin/guru" className={styles.mLink} onClick={() => setMenuOpen(false)}>Guru</Link>
            <Link to="/admin/galeri" className={styles.mLink} onClick={() => setMenuOpen(false)}>Galeri</Link>
            <Link to="/admin/pengumuman" className={styles.mLink} onClick={() => setMenuOpen(false)}>Pengumuman</Link>
            <div className={styles.mDivider} />
            <button onClick={logout} className={styles.mLogoutBtn}>Logout</button>
          </>
        )}
      </div>
    </>
  );
}