import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  Smartphone,
  Monitor,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi loading proses pendaftaran
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* --- SISI KIRI: Branding (Hidden on Mobile) --- */}
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
            Mulai Perjalanan Aman Anda.
          </h2>
          <p className="text-blue-100 leading-relaxed opacity-90">
            Bergabunglah dengan ribuan pengguna yang mempercayakan privasi
            mereka kepada kecerdasan buatan kami yang aman dan terenkripsi.
          </p>
        </div>
      </div>

      {/* --- SISI KANAN: Form Register --- */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto bg-white">

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12">
          <div className="w-full mx-auto">
            {/* Title Section */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                Daftar Akun
              </h1>
              <p className="text-slate-500 font-medium">
                Lengkapi data di bawah untuk memulai sesi anonim.
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap Field */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">
                  Nama Lengkap
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#3B82F6]">
                    <User
                      size={18}
                      className="text-slate-400 group-focus-within:text-[#3B82F6]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap"
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#3B82F6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              {/* Email / Username Field */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">
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
                    placeholder="nama@email.com"
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#3B82F6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">
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
                    placeholder="Buat password baru"
                    className="block w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#3B82F6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password Field */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">
                  Konfirmasi Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      size={18}
                      className="text-slate-400 group-focus-within:text-[#3B82F6]"
                    />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Ulangi password"
                    className="block w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#3B82F6] outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 px-1 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-[#3B82F6] focus:ring-[#3B82F6]"
                />
                <label
                  htmlFor="terms"
                  className="text-xs font-bold text-slate-500 leading-relaxed cursor-pointer hover:text-slate-700"
                >
                  Saya menyetujui{" "}
                  <span className="text-[#3B82F6]">Syarat & Ketentuan</span>{" "}
                  serta{" "}
                  <span className="text-[#3B82F6]">Kebijakan Privasi</span>{" "}
                  SafeTalkAI.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3B82F6] hover:bg-blue-700 disabled:bg-slate-300 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-3 text-lg mt-4"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Daftar Sekarang
                  </>
                )}
              </button>
            </form>

            {/* Footer Navigation */}
            <div className="mt-8 text-center">
              <p className="text-slate-500 font-bold">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-[#3B82F6] hover:text-blue-800 transition-colors underline decoration-2 underline-offset-4"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
