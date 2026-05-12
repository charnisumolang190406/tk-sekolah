import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const [murid, setMurid] = useState([]);
  const [guru, setGuru] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);

  useEffect(() => {
    api.get("/murid").then((res) => setMurid(res.data));
    api.get("/guru").then((res) => setGuru(res.data));
    api.get("/galeri").then((res) => setGaleri(res.data));
    api.get("/pengumuman").then((res) => setPengumuman(res.data));
  }, []);

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="header">
        <h1>📊 Admin Control Panel</h1>
        <p>TK Negeri Pembina Siau Timur</p>
      </div>

      {/* STATISTIK */}
      <div className="cards">

        <div className="card">
          <h2>👶 Murid</h2>
          <p>{murid.length}</p>
        </div>

        <div className="card">
          <h2>👩‍🏫 Guru</h2>
          <p>{guru.length}</p>
        </div>

        <div className="card">
          <h2>🖼️ Galeri</h2>
          <p>{galeri.length}</p>
        </div>

        <div className="card">
          <h2>📢 Pengumuman</h2>
          <p>{pengumuman.length}</p>
        </div>

      </div>

      {/* MENU ADMIN */}
      <h2 className="subTitle">⚙️ Menu Admin</h2>

      <div className="menu">

        <Link to="/admin/murid" className="menuBtn">👶 Kelola Murid</Link>
        <Link to="/admin/guru" className="menuBtn">👩‍🏫 Kelola Guru</Link>
        <Link to="/admin/galeri" className="menuBtn">🖼️ Kelola Galeri</Link>
        <Link to="/admin/pengumuman" className="menuBtn">📢 Kelola Pengumuman</Link>

      </div>

    </div>
  );
}