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

  // SUBMIT (CREATE / UPDATE)
  const submit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        nama,
        umur: Number(umur), // penting: harus number
        kelas,
      };

      if (editId) {
        await api.put(`/murid/${editId}`, payload);
        alert("Data murid berhasil diupdate");
      } else {
        await api.post("/murid", payload);
        alert("Murid berhasil ditambahkan");
      }

      // reset form
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
    const konfirmasi = window.confirm("Yakin ingin menghapus murid?");
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
      <h1 style={styles.title}>👶 Admin Murid</h1>

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
          {editId ? "Update Murid" : "+ Tambah Murid"}
        </button>
      </form>

      <div style={styles.grid}>
        {data.map((m) => (
          <div key={m.id} style={styles.card}>
            <h3>👶 {m.nama}</h3>
            <p>🎂 Umur: {m.umur}</p>
            <p>🏫 Kelas: {m.kelas}</p>

            <div style={styles.action}>
              <button style={styles.editBtn} onClick={() => editData(m)}>
                ✏ Edit
              </button>

              <button style={styles.deleteBtn} onClick={() => hapus(m.id)}>
                🗑 Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// STYLE
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
  },

  action: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },

  editBtn: {
    background: "#ff9800",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#e53935",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};