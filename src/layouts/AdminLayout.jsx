import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Calendar,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi untuk handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // Mendapatkan tanggal hari ini secara dinamis
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  return (
    // Background utama menjadi abu-abu cerah
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* OVERLAY: Latar belakang gelap saat sidebar terbuka di HP */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR ADMIN (Biru gelap) */}
      <aside
        className={`absolute inset-y-0 left-0 z-50 flex w-72 flex-col bg-blue-700 p-6 shadow-2xl text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Tombol Close (Mobile) */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">SafeTalk AI</h1>
              <p className="text-xs text-blue-200">Admin Panel</p>
            </div>
          </div>

          {/* Tombol Close (Silang) hanya muncul di Mobile */}
          <button
            className="md:hidden p-2 bg-blue-800/50 rounded-lg hover:bg-blue-800 transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1">
          <button
            onClick={() => {
              setIsSidebarOpen(false);
              navigate("/admin");
            }}
            className="flex items-center gap-3 w-full bg-blue-600 shadow-inner p-4 rounded-2xl font-semibold transition hover:bg-blue-500"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
        </nav>

        {/* Profile & Logout */}
        <div>
          <div className="flex items-center gap-3 bg-blue-800 p-4 rounded-2xl mb-3 shadow-sm">
            <div className="bg-blue-500 p-2 rounded-full">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Admin</p>
              <p className="text-xs text-blue-200">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-transparent border border-blue-500 p-4 rounded-2xl text-sm font-semibold hover:bg-blue-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* --- NAVBAR ATAS (Warna Biru) --- */}
        {/* Diubah menjadi bg-blue-600 dengan text-white */}
        <header className="flex items-center justify-between bg-blue-600 text-white px-6 md:px-8 py-4 shadow-md z-10 shrink-0">
          {/* Bagian Kiri: Tombol Hamburger & Sapaan */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Hamburger Button (Hanya tampil di HP) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 bg-blue-700/50 hover:bg-blue-700 rounded-xl transition shadow-sm border border-blue-500/50"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Teks Sapaan */}
            <div className="flex flex-col justify-center min-w-0">
              {/* Teks menjadi putih */}
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight truncate">
                Selamat Datang, Admin!
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5 text-blue-100">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <p className="text-[11px] md:text-sm font-medium truncate">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Tombol Lonceng/Notifikasi */}
          <div className="flex items-center justify-end flex-shrink-0">
            {/* Tombol lonceng disesuaikan dengan background biru */}
            <button className="relative bg-blue-700/50 hover:bg-blue-700 p-2.5 md:p-3 rounded-xl transition-all shadow-sm border border-blue-500/50">
              <Bell className="w-5 h-5 text-white" />
              {/* Indikator Notifikasi Aktif */}
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-blue-600 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Tempat Konten Halaman (Scrollable Area) */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
