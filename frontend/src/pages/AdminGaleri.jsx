import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminGaleri() {
  const [judul, setJudul] = useState("");
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState([]);

  // LOAD DATA
  const load = async () => {
    try {
      const res = await api.get("/galeri");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // UPLOAD FOTO
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!foto) {
        alert("Pilih foto dulu!");
        return;
      }

      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("foto", foto);

      const token = localStorage.getItem("token");

      await api.post("/galeri", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Upload berhasil!");

      setJudul("");
      setFoto(null);

      load();
    } catch (err) {
      console.log(err);
      alert("Upload gagal");
    }
  };

  // HAPUS FOTO
  const hapus = async (id) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus foto?"
    );

    if (!konfirmasi) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/galeri/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Foto berhasil dihapus");

      load();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Admin Galeri
        </h1>

        <p style={styles.subtitle}>
          Kelola foto kegiatan dan dokumentasi sekolah
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleUpload}
        style={styles.form}
      >
        <input
          type="text"
          placeholder="Masukkan judul foto"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          style={styles.input}
          required
        />

        <div style={styles.uploadBox}>
          <input
            type="file"
            onChange={(e) =>
              setFoto(e.target.files[0])
            }
            style={styles.fileInput}
          />
        </div>

        <button type="submit" style={styles.button}>
          Upload Foto
        </button>
      </form>

      {/* GRID */}
      <div style={styles.grid}>
        {data.map((g) => (
          <div
            key={g.id}
            style={styles.card}
          >
            <div style={styles.imageWrapper}>
              <img
                src={g.foto}
                alt={g.judul}
                style={styles.image}
              />
            </div>

            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>
                {g.judul}
              </h3>

              <button
                onClick={() => hapus(g.id)}
                style={styles.deleteBtn}
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

/* ================= STYLES ================= */

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
    color: "#2e7d32",
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  subtitle: {
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "400",
  },

  form: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "30px",

    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  input: {
    padding: "13px",
    borderRadius: "10px",
    border: "1px solid #d7e7d7",
    outline: "none",
    fontSize: "14px",
    background: "#fafefa",
  },

  uploadBox: {
    border: "1.5px dashed #c8e6c9",
    borderRadius: "12px",
    padding: "18px",
    background: "#fafefa",
  },

  fileInput: {
    width: "100%",
    cursor: "pointer",
    fontSize: "13px",
    color: "#555",
  },

  button: {
    background:
      "linear-gradient(135deg, #43a047, #66bb6a)",

    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.05)",
  },

  imageWrapper: {
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },

  cardContent: {
    padding: "16px",
  },

  cardTitle: {
    color: "#1f2937",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
  },

  deleteBtn: {
    width: "100%",
    background: "#ffebee",
    color: "#c62828",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },
};