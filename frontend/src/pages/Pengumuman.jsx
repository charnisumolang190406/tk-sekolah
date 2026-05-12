import { useEffect, useState } from "react";
import api from "../services/api";

export default function Pengumuman() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/pengumuman").then((res) => setData(res.data));
  }, []);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>📢 Pengumuman Sekolah</h1>

      <div style={styles.grid}>
        {data.map((item) => (
          <div key={item.id} style={styles.card}>
            <h3>📌 {item.judul}</h3>
            <p>{item.isi}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ================= STYLE ================= */
const styles = {
  page: {
    padding: "30px",
    background: "#f4fff4",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    color: "#2e7d32",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
};