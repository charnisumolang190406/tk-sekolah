import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminGuru() {
  const [nama, setNama] = useState("");
  const [mapel, setMapel] = useState("");
  const [data, setData] = useState([]);

  // LOAD DATA
  const load = async () => {
    try {
      const res = await api.get("/guru");
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Gagal mengambil data guru");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // TAMBAH GURU
  const tambah = async (e) => {
    e.preventDefault();

    try {
      await api.post("/guru", {
        nama,
        mapel,
      });

      setNama("");
      setMapel("");

      load();

      alert("Guru berhasil ditambahkan");
    } catch (err) {
      console.log(err);
      alert("Gagal menambahkan guru");
    }
  };

  // HAPUS GURU
  const hapus = async (id) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus guru ini?"
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/guru/${id}`);

      load();

      alert("Guru berhasil dihapus");
    } catch (err) {
      console.log(err);
      alert("Gagal menghapus guru");
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Admin Guru
        </h1>

        <p style={styles.subtitle}>
          Kelola data guru dan mata pelajaran
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={tambah} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Nama guru"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <input
          style={styles.input}
          placeholder="Mata pelajaran"
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
          required
        />

        <button style={styles.button}>
          Tambah Guru
        </button>
      </form>

      {/* LIST */}
      <div style={styles.grid}>
        {data.map((g) => (
          <div key={g.id} style={styles.card}>
            <h3 style={styles.cardTitle}>
              {g.nama}
            </h3>

            <p style={styles.cardText}>
              Mata Pelajaran: {g.mapel}
            </p>

            <button
              onClick={() => hapus(g.id)}
              style={styles.deleteBtn}
            >
              Hapus
            </button>
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
    marginBottom: "22px",
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

  form: {
    background: "white",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "24px",

    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "12px",
  },

  input: {
    padding: "11px 13px",
    borderRadius: "10px",
    border: "1px solid #dcdcdc",
    fontSize: "13px",
    outline: "none",
    fontFamily: "Poppins, sans-serif",

    background: "#ffffff",
    color: "#1a1a1a",

    transition: "0.2s",
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.04)",
  },

  button: {
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "11px 16px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
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
    marginBottom: "14px",
    lineHeight: "1.5",
  },

  deleteBtn: {
    width: "100%",
    background: "#ffebee",
    color: "#c62828",
    border: "none",
    borderRadius: "9px",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};