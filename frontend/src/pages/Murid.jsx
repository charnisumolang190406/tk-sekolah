import { useEffect, useState } from "react";
import api from "../services/api";

export default function Murid() {
  const [murid, setMurid] = useState([]);

  useEffect(() => {
    api.get("/murid").then((res) => {
      setMurid(res.data);
    });
  }, []);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>👶 Data Murid TK</h1>

      <div style={styles.grid}>
        {murid.map((m) => (
          <div key={m.id} style={styles.card}>
            <h3>👶 {m.nama}</h3>
            <p>🎂 Umur: {m.umur}</p>
            <p>🏫 Kelas: {m.kelas}</p>
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
