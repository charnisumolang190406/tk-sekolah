import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminGaleri() {
  const [judul, setJudul] = useState("");
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await api.get("/galeri");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("judul", judul);
      formData.append("foto", foto);

      const token = localStorage.getItem("token");

      await api.post("/galeri", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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

  const hapus = async (id) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus foto?"
    );

    if (!konfirmasi) return;

    try {
      await api.delete(`/galeri/${id}`);

      alert("Foto berhasil dihapus");

      load();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🖼 Upload Galeri</h2>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">
          Upload
        </button>
      </form>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {data.map((g) => (
          <div
            key={g.id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={`https://tk-sekolah-api.onrender.com/uploads/${g.foto}`}
              alt={g.judul}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h4>{g.judul}</h4>

            <button
              onClick={() => hapus(g.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🗑 Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}