import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import { Mail, Lock, Eye, EyeOff, Monitor, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk menangkap input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi proses ke server
    setTimeout(() => {
      setIsLoading(false);

      // Cek apakah yang login adalah Admin Demo
      if (username === "admin" && password === "123") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        navigate("/admin"); // Arahkan ke dashboard admin
      } else {
        // Anggap selain admin adalah user biasa
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "user");
        navigate("/chat"); // Arahkan ke halaman chat
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* --- SISI KIRI: Tetap Sama --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0055A5] relative items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl inline-block mb-6 ring-1 ring-white/20">
            <ShieldCheck className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Privasi Anda, Prioritas Kami.
          </h2>
          <p className="text-blue-100 leading-relaxed opacity-90">
            SafeTalkAI menggunakan enkripsi tingkat militer untuk memastikan
            setiap konsultasi Anda tetap anonim dan aman.
          </p>
        </div>
      </div>

      {/* --- SISI KANAN: Form Login --- */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto bg-white">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20">
          <div className="w-full mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                Selamat Datang!
              </h1>
              <p className="text-slate-500 font-medium">
                Masuk untuk melanjutkan konsultasi aman Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider ml-1">
                  Email / Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#3B82F6]">
                    <Mail
                      size={18}
                      className="text-slate-400 group-focus-within:text-[#3B82F6]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="nama@email.com atau username"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#3B82F6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      size={18}
                      className="text-slate-400 group-focus-within:text-[#3B82F6]"
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-12 pr-12 py-4 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#3B82F6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                  />
                  <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                    Ingat Saya
                  </span>
                </label>
                <Link
                  to="/forgot"
                  className="text-sm font-black text-[#3B82F6] hover:text-blue-800 transition-colors underline-offset-4 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3B82F6] hover:bg-blue-700 disabled:bg-slate-300 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Masuk Sekarang"
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-500 font-bold">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-[#3B82F6] hover:text-blue-800 transition-colors underline decoration-2 underline-offset-4"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
