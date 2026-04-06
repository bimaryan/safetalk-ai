import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Shield, LayoutDashboard, User, LogOut } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate(); // Inisialisasi navigasi

  // Fungsi untuk handle logout
  const handleLogout = () => {
    // Hapus data login dari localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");

    // Arahkan kembali ke halaman login
    navigate("/login");
  };
  return (
    // Ubah background utama menjadi sedikit lebih muda/berbeda (blue-500)
    <div className="flex min-h-screen bg-blue-500 font-sans">
      {/* SIDEBAR ADMIN - Gunakan warna biru yang lebih gelap dan solid (blue-600) */}
      <aside className="w-72 flex flex-col p-6 text-white bg-blue-600 shadow-2xl z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">SafeTalk AI</h1>
            <p className="text-xs text-blue-200">Admin Panel</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1">
          {/* Ubah style button agar lebih mencolok saat aktif */}
          <button className="flex items-center gap-3 w-full bg-blue-500 shadow-inner p-4 rounded-2xl font-semibold transition hover:bg-blue-400">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
        </nav>

        {/* Profile & Logout */}
        <div>
          <div className="flex items-center gap-3 bg-blue-700 p-4 rounded-2xl mb-3 shadow-sm">
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
            className="flex items-center gap-3 w-full bg-transparent border border-blue-400 p-4 rounded-2xl text-sm font-semibold hover:bg-blue-500 transition"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT - Tetap menggunakan Outlet */}
      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
