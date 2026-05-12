import { useEffect, useState } from "react";
import api from "../services/api";
import "./admin.css";

export default function AdminPengumuman() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/pengumuman");
    setData(res.data);
  };

  const tambah = async (e) => {
    e.preventDefault();

    await api.post("/pengumuman", { judul, isi });

    setJudul("");
    setIsi("");
    load();
  };

  return (
    <div className="admin">

      <h2>📢 Pengumuman</h2>

      <form className="form" onSubmit={tambah}>
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

        <button>+ Tambah Pengumuman</button>
      </form>

      <div className="list">
        {data.map((p) => (
          <div key={p.id} className="card">
            <b>{p.judul}</b>
            <p>{p.isi}</p>
          </div>
        ))}
      </div>

    </div>
  );
}