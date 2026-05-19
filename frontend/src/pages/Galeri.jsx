import { useEffect, useState } from "react";
import api from "../services/api";
import "./galeri.css";

export default function Galeri() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/galeri");
      setData(res.data);
    } catch (error) {
      console.log("Error galeri:", error);
    }
  };

  return (
    <div className="galeri-container">

      <div className="header-galeri">
        <h1>📸 Galeri Sekolah</h1>
        <p>
          Dokumentasi kegiatan, acara, dan aktivitas sekolah.
        </p>
      </div>

      <div className="grid">
        {data.map((item) => (
          <div key={item.id} className="card">

            <div className="image-wrapper">
              <img
                src={item.foto}
                alt={item.judul}
              />
            </div>

            <div className="card-content">

              <h3>
                {item.judul || "Kegiatan Sekolah"}
              </h3>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}