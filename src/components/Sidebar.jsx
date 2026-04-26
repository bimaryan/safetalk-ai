import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  MessageSquare,
  ShieldCheck,
  TriangleAlert,
  BookOpen,
  Lock,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("safetalk_token");

        if (!token) return;

        const response = await fetch("https://backend.safetalkai.my.id/api/auth/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.nama_lengkap);
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUserData();
  }, []);

  // 2. Fungsi Logout dengan SweetAlert2 & API Laravel
  const handleLogout = () => {
    Swal.fire({
      title: "Keluar Akun?",
      text: "Sesi Anda akan diakhiri dan data sementara akan dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5", // Warna bg-indigo-600
      cancelButtonColor: "#e11d48", // Warna bg-rose-600
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      shape: "rounded", 
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        // Panggil API Logout untuk hapus token di database
        try {
          const token = localStorage.getItem("safetalk_token");
          if (token) {
            await fetch("https://backend.safetalkai.my.id/api/auth/logout", {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
              }
            });
          }
        } catch (error) {
          console.error("Gagal koneksi ke API Logout:", error);
        }

        // Hapus semua data sesi di local storage
        localStorage.removeItem("safetalk_token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");

        // Reset state nama
        setUserName(null);

        // Kasih notifikasi kecil (toast) kalau berhasil
        Swal.fire({
          title: "Berhasil Keluar!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // Arahkan kembali ke halaman awal
        navigate("/");
      }
    });
  };

  const menuItems = [
    { icon: MessageSquare, label: "AI Chat", path: "/chat" },
    { icon: BookOpen, label: "Panduan", path: "/panduan" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 border-r border-slate-800 shadow-2xl z-50 font-sans">
      {/* HEADER LOGO */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
            <ShieldCheck size={26} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white">
              SafeTalk
            </span>
          </div>
        </div>
      </div>

      {/* MENU NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium text-sm ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* EMERGENCY SECTION */}
        <div className="pt-6 mt-6 border-t border-slate-800">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">
            Zona Bahaya
          </p>
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold text-sm ${
                isActive
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-900/20 ring-2 ring-rose-500/50"
                  : "bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white"
              }`
            }
          >
            <TriangleAlert size={18} />
            <span>Tombol SOS</span>
          </NavLink>
        </div>
      </nav>

      {/* FOOTER USER STATUS */}
      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="bg-slate-800/40 rounded-xl p-3 flex items-center justify-between border border-slate-700/50 hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Ikon berubah tergantung status login */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                userName
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "bg-slate-700 text-emerald-400"
              }`}
            >
              {userName ? <User size={14} /> : <Lock size={14} />}
            </div>

            {/* Teks berubah tergantung status login */}
            <div className="flex flex-col overflow-hidden">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                {userName ? "Warga" : "Status Sesi"}
              </span>
              <span className="text-sm text-slate-200 font-semibold tracking-wide truncate">
                {userName ? userName : "Terlindungi"}
              </span>
            </div>
          </div>

          {/* Tombol Logout - HANYA MUNCUL JIKA USER LOGIN */}
          {userName && (
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-700 rounded-lg transition-all"
              title="Keluar dari akun"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;