import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminMurid() {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [kelas, setKelas] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  // LOAD DATA
  const load = async () => {
    try {
      const res = await api.get("/murid");
      setData(res.data);
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        nama,
        umur: Number(umur),
        kelas,
      };

      if (editId) {
        await api.put(`/murid/${editId}`, payload);
        alert("Data murid berhasil diupdate");
      } else {
        await api.post("/murid", payload);
        alert("Murid berhasil ditambahkan");
      }

      // RESET
      setNama("");
      setUmur("");
      setKelas("");
      setEditId(null);

      load();
    } catch (err) {
      console.log("Submit error:", err);
      alert("Terjadi error saat simpan data");
    }
  };

  // EDIT
  const editData = (m) => {
    setNama(m.nama);
    setUmur(m.umur);
    setKelas(m.kelas);
    setEditId(m.id);
  };

  // DELETE
  const hapus = async (id) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus murid?"
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/murid/${id}`);

      alert("Murid berhasil dihapus");

      load();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Admin Murid
        </h1>

        <p style={styles.subtitle}>
          Kelola data murid TK Sekolah
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={submit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Nama murid"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Umur"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          required
        />

        <input
          style={styles.input}
          placeholder="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          required
        />

        <button style={styles.button}>
          {editId
            ? "Update Murid"
            : "Tambah Murid"}
        </button>
      </form>

      {/* LIST */}
      <div style={styles.grid}>
        {data.map((m) => (
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

            <div style={styles.action}>
              <button
                style={styles.editBtn}
                onClick={() => editData(m)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => hapus(m.id)}
              >
                Hapus
              </button>
            </div>
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
      "repeat(auto-fit,minmax(180px,1fr))",
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
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
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
    marginBottom: "6px",
    lineHeight: "1.5",
  },

  action: {
    display: "flex",
    gap: "8px",
    marginTop: "14px",
  },

  editBtn: {
    flex: 1,
    background: "#fff8e1",
    color: "#ef6c00",
    border: "none",
    borderRadius: "9px",
    padding: "9px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    background: "#ffebee",
    color: "#c62828",
    border: "none",
    borderRadius: "9px",
    padding: "9px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};