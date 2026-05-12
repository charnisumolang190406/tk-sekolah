import { useEffect, useState } from "react";
import api from "../services/api";
import "./galeri.css";

export default function Galeri() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/galeri");
      setData(res.data);
    } catch (error) {
      console.log("Error galeri:", error);
    }
  };

  return (
    <div className="galeri-container">

      <h1 className="title">🖼️ Galeri Sekolah</h1>

      <div className="grid">
        {data.map((item) => (
          <div key={item.id} className="card">
            <img
              src={`http://localhost:5000/uploads/${item.foto}`}
              alt="galeri"
            />
          </div>
        ))}
      </div>

    </div>
  );
}