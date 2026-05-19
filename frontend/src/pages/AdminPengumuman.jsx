import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPengumuman() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  // LOAD DATA
  const load = async () => {
    try {
      const res = await api.get("/pengumuman");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // TAMBAH / UPDATE
  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/pengumuman/${editId}`, {
          judul,
          isi,
        });

        alert("Pengumuman berhasil diupdate");
      } else {
        await api.post("/pengumuman", {
          judul,
          isi,
        });

        alert("Pengumuman berhasil ditambahkan");
      }

      setJudul("");
      setIsi("");
      setEditId(null);

      load();
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan");
    }
  };

  // EDIT
  const editData = (p) => {
    setJudul(p.judul);
    setIsi(p.isi);
    setEditId(p.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // HAPUS
  const hapus = async (id) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus pengumuman?"
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/pengumuman/${id}`);

      load();

      alert("Pengumuman berhasil dihapus");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          📢 Admin Pengumuman
        </h1>

        <p style={styles.subtitle}>
          Kelola informasi dan pengumuman sekolah
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={submit}
        style={styles.form}
      >
        <input
          type="text"
          placeholder="Masukkan judul pengumuman"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
          style={styles.input}
        />

        <textarea
          placeholder="Tulis isi pengumuman..."
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          required
          style={styles.textarea}
        />

        <button style={styles.button}>
          {editId
            ? "✏ Update Pengumuman"
            : "➕ Tambah Pengumuman"}
        </button>
      </form>

      {/* LIST */}
      <div style={styles.grid}>
        {data.map((p) => (
          <div
            key={p.id}
            style={styles.card}
          >
            <div style={styles.badge}>
              Pengumuman
            </div>

            <h3 style={styles.cardTitle}>
              {p.judul}
            </h3>

            <p style={styles.cardText}>
              {p.isi}
            </p>

            <div style={styles.actions}>
              <button
                onClick={() => editData(p)}
                style={styles.editBtn}
              >
                ✏ Edit
              </button>

              <button
                onClick={() => hapus(p.id)}
                style={styles.deleteBtn}
              >
                🗑 Hapus
              </button>
            </div>
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
    fontFamily: "Poppins, sans-serif",
  },

  header: {
    marginBottom: "25px",
  },

  title: {
    color: "#2e7d32",
    fontSize: "32px",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#5f7161",
    fontSize: "15px",
  },

  form: {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)",
    marginBottom: "30px",

    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "14px",
    border: "1px solid #d7e7d7",
    borderRadius: "12px",
    outline: "none",
    fontSize: "14px",
    background: "#fafefa",
  },

  textarea: {
    padding: "14px",
    border: "1px solid #d7e7d7",
    borderRadius: "12px",
    outline: "none",
    fontSize: "14px",
    background: "#fafefa",
    minHeight: "120px",
    resize: "none",
  },

  button: {
    background:
      "linear-gradient(135deg, #43a047, #66bb6a)",

    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "22px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)",
    transition: "0.3s",
  },

  badge: {
    display: "inline-block",
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "6px 12px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "15px",
  },

  cardTitle: {
    color: "#1f2937",
    marginBottom: "12px",
    fontSize: "20px",
  },

  cardText: {
    color: "#555",
    lineHeight: "1.7",
    fontSize: "14px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  editBtn: {
    flex: 1,
    border: "none",
    padding: "11px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    background: "#e8f5e9",
    color: "#2e7d32",
  },

  deleteBtn: {
    flex: 1,
    border: "none",
    padding: "11px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    background: "#ffebee",
    color: "#d32f2f",
  },
};