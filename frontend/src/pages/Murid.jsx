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
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Data Murid
        </h1>

        <p style={styles.subtitle}>
          Daftar murid TK Sekolah
        </p>
      </div>

      {/* LIST */}
      <div style={styles.grid}>
        {murid.map((m) => (
          <div key={m.id} style={styles.card}>
            <h3 style={styles.cardTitle}>
              {m.nama}
            </h3>

            <p style={styles.cardText}>
              Umur: {m.umur} Tahun
            </p>

            <p style={styles.cardText}>
              Kelas: {m.kelas}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const styles = {
  page: {
    padding: "24px",
    background: "#f4fff4",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
  },

  header: {
    marginBottom: "24px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "4px",
  },

  subtitle: {
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px,1fr))",
    gap: "14px",
  },

  card: {
    background: "white",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "14px",
    padding: "18px",
    transition: "0.2s",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.04)",
  },

  cardTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "10px",
  },

  cardText: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "6px",
    lineHeight: "1.5",
  },
};