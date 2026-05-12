import { useState } from "react";
import api from "../services/api";

export default function AdminGaleri() {
  const [judul, setJudul] = useState("");
  const [foto, setFoto] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

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
  };

  return (
    <div>
      <h2>Upload Galeri</h2>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Judul"
          onChange={(e) => setJudul(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFoto(e.target.files[0])}
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}