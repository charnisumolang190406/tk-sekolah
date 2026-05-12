import { useEffect, useState } from "react";
import api from "../services/api";
import "./admin.css";

export default function AdminPengumuman() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/pengumuman");
    setData(res.data);
  };

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
    }
  };

  const editData = (p) => {
    setJudul(p.judul);
    setIsi(p.isi);
    setEditId(p.id);
  };

  const hapus = async (id) => {
    const konfirmasi = window.confirm(
      "Yakin ingin menghapus pengumuman?"
    );

    if (!konfirmasi) return;

    await api.delete(`/pengumuman/${id}`);

    load();
  };

  return (
    <div className="admin">
      <h2>📢 Pengumuman</h2>

      <form className="form" onSubmit={submit}>
        <input
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />

        <textarea
          placeholder="Isi pengumuman"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
        />

        <button>
          {editId
            ? "Update Pengumuman"
            : "+ Tambah Pengumuman"}
        </button>
      </form>

      <div className="list">
        {data.map((p) => (
          <div key={p.id} className="card">
            <b>{p.judul}</b>

            <p>{p.isi}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <button onClick={() => editData(p)}>
                ✏ Edit
              </button>

              <button onClick={() => hapus(p.id)}>
                🗑 Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}