import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const quotes = [
  { text: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.", author: "Nelson Mandela" },
  { text: "Akar pendidikan memang pahit, tapi buahnya manis.", author: "Aristoteles" },
  { text: "Belajar tanpa berpikir adalah sia-sia, berpikir tanpa belajar adalah berbahaya.", author: "Konfusius" },
  { text: "Setiap anak adalah seniman. Masalahnya adalah bagaimana tetap menjadi seniman saat kita dewasa.", author: "Pablo Picasso" },
  { text: "Pendidikan bukan persiapan untuk hidup; pendidikan adalah hidup itu sendiri.", author: "John Dewey" },
  { text: "Anak-anak harus diajarkan cara berpikir, bukan apa yang harus dipikirkan.", author: "Margaret Mead" },
  { text: "Bermain adalah cara kerja anak-anak.", author: "Jean Piaget" },
];

const books = [
  { title: "Aku Bisa!", author: "Watty Piper", tag: "Klasik" },
  { title: "Cerita Rakyat Nusantara", author: "Tim Redaksi", tag: "Lokal" },
  { title: "Buku Besar Hewan", author: "DK Publishing", tag: "Edukasi" },
  { title: "Dongeng Sebelum Tidur", author: "Berbagai Penulis", tag: "Anak" },
  { title: "Mengenal Angka & Huruf", author: "Tim Penulis", tag: "Belajar" },
  { title: "Petualangan Si Kancil", author: "Anonim", tag: "Fabel" },
];

const facts = [
  { num: "7", text: "Rata-rata anak usia TK membutuhkan 7 jam tidur malam untuk tumbuh optimal." },
  { num: "3x", text: "Anak belajar 3x lebih cepat melalui bermain dibanding cara belajar formal." },
  { num: "80%", text: "Perkembangan otak anak terjadi 80% sebelum usia 5 tahun." },
  { num: "6", text: "Anak usia 3-6 tahun bisa belajar hingga 6 bahasa sekaligus dengan mudah." },
  { num: "5 mnt", text: "Membaca buku 5 menit per hari meningkatkan kosakata anak hingga 2x lipat dalam setahun." },
];

function getRandom(arr, excludeIdx) {
  let idx;
  do { idx = Math.floor(Math.random() * arr.length); } while (idx === excludeIdx && arr.length > 1);
  return { item: arr[idx], idx };
}

export default function Home() {
  const [quote, setQuote] = useState({ item: quotes[0], idx: 0 });
  const [fact, setFact] = useState({ item: facts[0], idx: 0 });
  const [shownBooks, setShownBooks] = useState([]);

  useEffect(() => {
    setQuote(getRandom(quotes, -1));
    setFact(getRandom(facts, -1));
    setShownBooks([...books].sort(() => Math.random() - 0.5).slice(0, 4));
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <div className="heroBadge">🏫 TK Negeri Pembina Siau Timur</div>
        <h1>Selamat Datang di<br />Website Resmi Kami</h1>
        <p>
          Kelurahan Tarorane, Kec. Siau Timur,<br />
          Kab. Kepulauan Siau Tagulandang Biaro, Sulawesi Utara
        </p>
        <div className="btnGroup">
          <Link to="/murid" className="btn">👶 Data Murid</Link>
          <Link to="/guru" className="btn">👩‍🏫 Data Guru</Link>
          <Link to="/galeri" className="btnOutline">🖼️ Galeri</Link>
          <Link to="/pengumuman" className="btnOutline">📢 Pengumuman</Link>
        </div>
      </div>

      {/* INFO SEKOLAH */}
      <div className="section">
        <div className="sectionLabel">Informasi sekolah</div>
        <div className="sectionTitle">Profil TK Negeri Pembina Siau Timur</div>
        <div className="infoGrid">
          <div className="infoCard">
            <div className="infoIcon">📍</div>
            <div>
              <div className="infoLabel">Alamat</div>
              <div className="infoValue">Kelurahan Tarorane, Kec. Siau Timur, Kab. Sitaro, Sulawesi Utara</div>
            </div>
          </div>
          <div className="infoCard">
            <div className="infoIcon">📞</div>
            <div>
              <div className="infoLabel">Telepon</div>
              <div className="infoValue">(0432) 310331</div>
            </div>
          </div>
          <div className="infoCard">
            <div className="infoIcon">🏛️</div>
            <div>
              <div className="infoLabel">Status sekolah</div>
              <div className="infoValue">Negeri — Kementerian Pendidikan dan Kebudayaan</div>
            </div>
          </div>
          <div className="infoCard">
            <div className="infoIcon">📘</div>
            <div>
              <div className="infoLabel">Jenjang</div>
              <div className="infoValue">Taman Kanak-Kanak (TK)</div>
            </div>
          </div>
          <div className="infoCard">
            <div className="infoIcon">📱</div>
            <div>
              <div className="infoLabel">Media sosial</div>
              <div className="infoValue">Facebook: TKn Pembina SiTim</div>
            </div>
          </div>
          <div className="infoCard">
            <div className="infoIcon">🌏</div>
            <div>
              <div className="infoLabel">Provinsi</div>
              <div className="infoValue">Sulawesi Utara, Indonesia</div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* KUTIPAN */}
      <div className="section">
        <div className="sectionLabel">Kutipan hari ini</div>
        <div className="sectionTitle">Motivasi pendidikan</div>
        <div className="quoteBox">
          <div className="quoteIcon">❝</div>
          <p className="quoteText">{quote.item.text}</p>
          <p className="quoteAuthor">— {quote.item.author}</p>
          <button className="refreshBtn" onClick={() => setQuote(getRandom(quotes, quote.idx))}>
            🔄 Kutipan lain
          </button>
        </div>
      </div>

      <div className="divider" />

      {/* BUKU */}
      <div className="section">
        <div className="sectionLabel">Rekomendasi bacaan</div>
        <div className="sectionTitle">Buku anak pilihan</div>
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
        <button className="refreshBtn" style={{ marginTop: 14 }}
          onClick={() => setShownBooks([...books].sort(() => Math.random() - 0.5).slice(0, 4))}>
          🔄 Tampilkan buku lain
        </button>
      </div>

      <div className="divider" />

      {/* FAKTA */}
      <div className="section">
        <div className="sectionLabel">Fakta edukasi</div>
        <div className="sectionTitle">Tahukah kamu?</div>
        <div className="factBox">
          <div className="factNum">{fact.item.num}</div>
          <div className="factContent">
            <p className="factText">{fact.item.text}</p>
            <button className="refreshBtn" onClick={() => setFact(getRandom(facts, fact.idx))}>
              🔄 Fakta lain
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="footerInfo">
        <p>© 2025 TK Negeri Pembina Siau Timur · Kelurahan Tarorane, Sulawesi Utara · (0432) 310331</p>
      </div>

    </div>
  );
}