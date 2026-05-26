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

        {/* GRID */}
        <div style={styles.grid}>
          {murid.map((m) => (
            <div
              key={m.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
            >
              {/* AVATAR */}
              <div style={styles.avatar}>
                {m.nama.charAt(0)}
              </div>

              {/* NAMA */}
              <h3 style={styles.cardTitle}>
                👶 {m.nama}
              </h3>

              {/* INFO */}
              <div style={styles.infoBox}>
                <p style={styles.cardText}>
                  <span style={styles.label}>
                    🎂 Umur
                  </span>

                  {m.umur} Tahun
                </p>

                <p style={styles.cardText}>
                  <span style={styles.label}>
                    🏫 Kelas
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

  /* CONTENT */
  content: {
    padding: "28px 22px",
  },

  sectionHeader: {
    marginBottom: "18px",
  },

  sectionLabel: {
    fontSize: "11px",
    color: "#43a047",
    fontWeight: "600",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },

  sectionTitle: {
    fontSize: "19px",
    color: "#1a1a1a",
    fontWeight: "600",
  },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "14px",
  },

  /* CARD */
  card: {
    background:
      "linear-gradient(180deg,#ffffff,#f9fff9)",

    borderRadius: "18px",
    padding: "18px",

    border: "1px solid #e8f5e9",

    boxShadow:
      "0 4px 14px rgba(0,0,0,0.05)",

    transition: "0.25s ease",
  },

  /* AVATAR */
  avatar: {
    width: "48px",
    height: "48px",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#43a047,#66bb6a)",

    color: "white",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: "17px",
    fontWeight: "600",

    marginBottom: "14px",
  },

  /* TITLE */
  cardTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "12px",
  },

  /* INFO */
  infoBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  cardText: {
    fontSize: "12px",
    color: "#555",
    lineHeight: "1.6",

    display: "flex",
    justifyContent: "space-between",

    borderBottom:
      "1px solid rgba(0,0,0,0.05)",

    paddingBottom: "5px",
  },

  label: {
    color: "#2e7d32",
    fontWeight: "600",
  },
};