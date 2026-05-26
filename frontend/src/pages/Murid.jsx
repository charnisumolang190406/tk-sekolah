```jsx
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
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.badge}>
          TK SEKOLAH
        </div>

        <h1 style={styles.heroTitle}>
          Data Murid
        </h1>

        <p style={styles.heroText}>
          Informasi daftar murid aktif
          pada TK Sekolah.
        </p>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>
            DATA SISWA
          </p>

          <h2 style={styles.sectionTitle}>
            Daftar Murid
          </h2>
        </div>

        <div style={styles.grid}>
          {murid.map((m) => (
            <div
              key={m.id}
              style={styles.card}
            >
              <div style={styles.avatar}>
                {m.nama.charAt(0)}
              </div>

              <h3 style={styles.cardTitle}>
                {m.nama}
              </h3>

              <div style={styles.infoBox}>
                <p style={styles.cardText}>
                  <span style={styles.label}>
                    Umur
                  </span>
                  {m.umur} Tahun
                </p>

                <p style={styles.cardText}>
                  <span style={styles.label}>
                    Kelas
                  </span>
                  {m.kelas}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4fff4",
    fontFamily: "Poppins, sans-serif",
  },

  /* HERO */
  hero: {
    background: "#2e7d32",
    color: "white",
    textAlign: "center",
    padding: "55px 24px 70px",
    borderRadius: "0 0 28px 28px",
  },

  badge: {
    display: "inline-block",
    background:
      "rgba(255,255,255,0.15)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "11px",
    marginBottom: "16px",
    letterSpacing: "0.5px",
  },

  heroTitle: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  heroText: {
    fontSize: "13px",
    opacity: "0.85",
    lineHeight: "1.7",
  },

  /* CONTENT */
  content: {
    padding: "30px 24px",
  },

  sectionHeader: {
    marginBottom: "20px",
  },

  sectionLabel: {
    fontSize: "11px",
    color: "#43a047",
    fontWeight: "600",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },

  sectionTitle: {
    fontSize: "20px",
    color: "#1a1a1a",
    fontWeight: "600",
  },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "16px",
  },

  /* CARD */
  card: {
    background: "white",
    borderRadius: "18px",
    padding: "22px",
    border:
      "1px solid rgba(0,0,0,0.05)",
    boxShadow:
      "0 4px 14px rgba(0,0,0,0.05)",
    transition: "0.2s",
  },

  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#e8f5e9",
    color: "#2e7d32",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  },

  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "14px",
  },

  infoBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  cardText: {
    fontSize: "13px",
    color: "#555",
    lineHeight: "1.6",
    display: "flex",
    justifyContent: "space-between",
    borderBottom:
      "1px solid rgba(0,0,0,0.05)",
    paddingBottom: "6px",
  },

  label: {
    color: "#2e7d32",
    fontWeight: "600",
  },
};
```
