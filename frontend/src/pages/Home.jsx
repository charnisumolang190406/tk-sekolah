import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./home.css";

export default function Home() {
  const [quote, setQuote] = useState({ item: quotes[0], idx: 0 });
  const [fact, setFact] = useState({ item: facts[0], idx: 0 });
  const [shownBooks, setShownBooks] = useState([]);

  const [murid, setMurid] = useState([]);
  const [guru, setGuru] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [pengumuman, setPengumuman] = useState([]);

  useEffect(() => {
    setQuote(getRandom(quotes, -1));
    setFact(getRandom(facts, -1));
    setShownBooks([...books].sort(() => Math.random() - 0.5).slice(0, 4));

    api.get("/murid").then((res) => setMurid(res.data));
    api.get("/guru").then((res) => setGuru(res.data));
    api.get("/galeri").then((res) => setGaleri(res.data));
    api.get("/pengumuman").then((res) => setPengumuman(res.data));
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <div
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(46,125,50,0.75),
              rgba(46,125,50,0.75)
            ),
            url("https://res.cloudinary.com/dgigafrhp/image/upload/v1779162487/tk-sekolah-galeri/o48cwpratmbanhdpno7w.jpg")
          `
        }}
      >
        <div className="heroBadge">
          🏫 TK Negeri Pembina Siau Timur
        </div>

        <h1>
          Selamat Datang di
          <br />
          Website Resmi Kami
        </h1>

        <p>
          Mewujudkan generasi yang cerdas,
          kreatif, mandiri, dan berkarakter.
        </p>

        <div className="btnGroup">
          <Link to="/murid" className="btn">
            👶 Data Murid
          </Link>

          <Link to="/guru" className="btn">
            👩‍🏫 Data Guru
          </Link>

          <Link to="/galeri" className="btnOutline">
            🖼️ Galeri
          </Link>

          <Link to="/pengumuman" className="btnOutline">
            📢 Pengumuman
          </Link>
        </div>
      </div>

      {/* STATISTIK */}
      <div className="statsSection">

        <div className="statCard">
          <h2>{murid.length}</h2>
          <p>Murid</p>
        </div>

        <div className="statCard">
          <h2>{guru.length}</h2>
          <p>Guru</p>
        </div>

        <div className="statCard">
          <h2>{galeri.length}</h2>
          <p>Galeri</p>
        </div>

        <div className="statCard">
          <h2>{pengumuman.length}</h2>
          <p>Pengumuman</p>
        </div>

      </div>

      {/* INFO SEKOLAH */}
      <div className="section">
        <div className="sectionLabel">
          Informasi sekolah
        </div>

        <div className="sectionTitle">
          Profil TK Negeri Pembina Siau Timur
        </div>

        <div className="infoGrid">

          <div className="infoCard">
            <div className="infoIcon">📍</div>
            <div>
              <div className="infoLabel">Alamat</div>
              <div className="infoValue">
                Kelurahan Tarorane, Kec. Siau Timur,
                Kab. Sitaro, Sulawesi Utara
              </div>
            </div>
          </div>

          <div className="infoCard">
            <div className="infoIcon">📞</div>
            <div>
              <div className="infoLabel">Telepon</div>
              <div className="infoValue">
                (0432) 310331
              </div>
            </div>
          </div>

          <div className="infoCard">
            <div className="infoIcon">🏛️</div>
            <div>
              <div className="infoLabel">Status</div>
              <div className="infoValue">
                Sekolah Negeri
              </div>
            </div>
          </div>

          <div className="infoCard">
            <div className="infoIcon">📘</div>
            <div>
              <div className="infoLabel">Jenjang</div>
              <div className="infoValue">
                Taman Kanak-Kanak (TK)
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="divider" />

      {/* KEUNGGULAN */}
      <div className="section">

        <div className="sectionLabel">
          Mengapa Memilih Kami
        </div>

        <div className="sectionTitle">
          Keunggulan Sekolah
        </div>

        <div className="advantageGrid">

          <div className="advantageCard">
            🎨 Pembelajaran Kreatif
          </div>

          <div className="advantageCard">
            👩‍🏫 Guru Berpengalaman
          </div>

          <div className="advantageCard">
            🌱 Pendidikan Karakter
          </div>

          <div className="advantageCard">
            🧸 Lingkungan Ramah Anak
          </div>

        </div>
      </div>

      <div className="divider" />

      {/* KUTIPAN */}
      <div className="section">
        <div className="sectionLabel">
          Kutipan hari ini
        </div>

        <div className="sectionTitle">
          Motivasi pendidikan
        </div>

        <div className="quoteBox">
          <div className="quoteIcon">❝</div>

          <p className="quoteText">
            {quote.item.text}
          </p>

          <p className="quoteAuthor">
            — {quote.item.author}
          </p>

          <button
            className="refreshBtn"
            onClick={() =>
              setQuote(getRandom(quotes, quote.idx))
            }
          >
            🔄 Kutipan lain
          </button>
        </div>
      </div>

      <div className="divider" />

      {/* BUKU */}
      <div className="section">
        <div className="sectionLabel">
          Rekomendasi bacaan
        </div>

        <div className="sectionTitle">
          Buku anak pilihan
        </div>

        <div className="booksGrid">
          {shownBooks.map((b, i) => (
            <div className="bookCard" key={i}>
              <div className="bookEmoji">📚</div>
              <div className="bookTitle">{b.title}</div>
              <div className="bookAuthor">{b.author}</div>
              <div className="bookTag">{b.tag}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* FAKTA */}
      <div className="section">

        <div className="sectionLabel">
          Fakta edukasi
        </div>

        <div className="sectionTitle">
          Tahukah kamu?
        </div>

        <div className="factBox">

          <div className="factNum">
            {fact.item.num}
          </div>

          <div className="factContent">

            <p className="factText">
              {fact.item.text}
            </p>

            <button
              className="refreshBtn"
              onClick={() =>
                setFact(getRandom(facts, fact.idx))
              }
            >
              🔄 Fakta lain
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="footerInfo">
        <p>
          © 2025 TK Negeri Pembina Siau Timur
        </p>

        <p>
          Website Informasi dan Promosi Sekolah
        </p>
      </div>

    </div>
  );
}