import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// USER
import Home from "./pages/Home";
import Login from "./pages/Login";
import Murid from "./pages/Murid";
import Guru from "./pages/Guru";
import Galeri from "./pages/Galeri";
import Pengumuman from "./pages/Pengumuman";

// ADMIN
import Dashboard from "./pages/Dashboard";
import AdminMurid from "./pages/AdminMurid";
import AdminGuru from "./pages/AdminGuru";
import AdminGaleri from "./pages/AdminGaleri";
import AdminPengumuman from "./pages/AdminPengumuman";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/murid" element={<Murid />} />
        <Route path="/guru" element={<Guru />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/pengumuman" element={<Pengumuman />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/murid" element={<AdminMurid />} />
        <Route path="/admin/guru" element={<AdminGuru />} />
        <Route path="/admin/galeri" element={<AdminGaleri />} />
        <Route path="/admin/pengumuman" element={<AdminPengumuman />} />
      </Routes>
    </BrowserRouter>
  );
}