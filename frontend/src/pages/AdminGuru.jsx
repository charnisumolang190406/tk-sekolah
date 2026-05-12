import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminGuru() {
  const [nama, setNama] = useState("");
  const [mapel, setMapel] = useState("");
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await api.get("/guru");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const tambah = async (e) => {
    e.preventDefault();

    await api.post("/guru", {
      nama,
      mapel,
    });

    setNama("");
    setMapel("");
    load();
  };

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>👩‍🏫 Admin Guru</h1>

      {/* FORM */}
      <form onSubmit={tambah} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Nama guru"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Mata pelajaran"
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
        />

        <button style={styles.button}>+ Tambah Guru</button>
      </form>

      {/* LIST */}
      <div style={styles.grid}>
        {data.map((g) => (
          <div key={g.id} style={styles.card}>
            <h3>👩‍🏫 {g.nama}</h3>
            <p>📚 {g.mapel}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ================= STYLES ================= */
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

  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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