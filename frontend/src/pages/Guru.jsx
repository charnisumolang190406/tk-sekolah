import { useEffect, useState } from "react";
import api from "../services/api";

export default function Guru() {
  const [guru, setGuru] = useState([]);

  useEffect(() => {
    api.get("/guru").then((res) => {
      setGuru(res.data);
    });
  }, []);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>👩‍🏫 Data Guru</h1>

      <div style={styles.grid}>
        {guru.map((g) => (
          <div key={g.id} style={styles.card}>
            <h3>👩‍🏫 {g.nama}</h3>
            <p>📚 Mapel: {g.mapel}</p>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
};