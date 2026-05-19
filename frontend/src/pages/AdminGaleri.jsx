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
          🖼 Admin Galeri
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
          ⬆ Upload Foto
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
    marginBottom: "35px",

    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d7e7d7",
    outline: "none",
    fontSize: "14px",
    background: "#fafefa",
  },

  uploadBox: {
    border: "2px dashed #c8e6c9",
    borderRadius: "14px",
    padding: "20px",
    background: "#fafefa",
  },

  fileInput: {
    width: "100%",
    cursor: "pointer",
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
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "22px",
  },

  card: {
    background: "white",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)",
    transition: "0.3s",
  },

  imageWrapper: {
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    transition: "0.4s",
  },

  cardContent: {
    padding: "18px",
  },

  cardTitle: {
    color: "#1f2937",
    fontSize: "18px",
    marginBottom: "15px",
  },

  deleteBtn: {
    width: "100%",
    background: "#ffebee",
    color: "#d32f2f",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
};