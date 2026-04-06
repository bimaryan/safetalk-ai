import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  User,
  Clock,
  AlertTriangle,
  MessageSquare,
  Check, // Import icon Check
} from "lucide-react";

const AdminCaseDetail = () => {
  const navigate = useNavigate();
  // State untuk mengatur tampilan apakah sudah ditinjau
  const [isReviewed, setIsReviewed] = useState(false);

  // Efek untuk kembali ke halaman admin otomatis setelah 3 detik
  useEffect(() => {
    if (isReviewed) {
      const timer = setTimeout(() => {
        navigate("/admin");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isReviewed, navigate]);

  // TAMPILAN JIKA SUDAH DITINJAU (SUCCESS SCREEN)
  if (isReviewed) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[70vh] bg-green-50 rounded-3xl p-8">
        <div className="bg-green-500 p-4 rounded-full shadow-lg mb-6">
          <Check className="w-16 h-16 text-white stroke-[3]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Berhasil Ditinjau
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Kasus ST-2026-01-14-001 telah ditandai sebagai <br /> ditinjau
        </p>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"></div>
          <div
            className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  // TAMPILAN DEFAULT (DETAIL KASUS)
  return (
    <>
      {/* Header & Back Button */}
      <header className="mb-8 text-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-100 hover:text-white transition mb-4"
        >
          <ChevronLeft className="w-5 h-5" /> Kembali
        </button>
        <h2 className="text-3xl font-bold">Detail Kasus</h2>
        <p className="text-blue-100 font-mono text-sm">ST-2026-01-14-001</p>
      </header>

      <div className="space-y-6">
        {/* Card Info Utama */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-3 rounded-full text-slate-500">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Anonymous User
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                  <Clock className="w-4 h-4" />
                  <span>2026-01-14 12:30</span>
                </div>
              </div>
            </div>
            <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-red-200">
              Risiko Tinggi
            </span>
          </div>

          {/* Skor Risiko */}
          <div className="space-y-3">
            <p className="text-gray-500 text-sm font-semibold">Skor Risiko</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <span className="font-bold text-gray-700">85%</span>
            </div>
          </div>
        </div>

        {/* Card Kata Kunci Berisiko */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-6 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <h4 className="font-bold text-amber-900 mb-3">
              Kata Kunci Berisiko Terdeteksi
            </h4>
            <div className="flex flex-wrap gap-2">
              {["dipukul", "takut", "kekerasan"].map((word) => (
                <span
                  key={word}
                  className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium border border-amber-200"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Riwayat Percakapan (Chat Bubble) */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4 text-gray-800">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <h4 className="font-bold">Riwayat Percakapan</h4>
          </div>

          <div className="space-y-6">
            {/* User Bubble */}
            <div className="flex flex-col items-end">
              <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-tr-none max-w-lg shadow-sm">
                <p>Saya sering dipukul oleh pasangan saya</p>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 mr-1">12:25</span>
            </div>

            {/* AI Bubble */}
            <div className="flex flex-col items-start">
              <div className="bg-gray-50 text-gray-700 p-4 rounded-2xl rounded-tl-none max-w-lg border border-gray-100 shadow-sm">
                <p>
                  Saya memahami situasi Anda sangat sulit. Keselamatan Anda
                  adalah prioritas utama.
                </p>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 ml-1">12:26</span>
            </div>
          </div>
        </div>

        {/* BUTTON TANDAI SEBAGAI DITINJAU */}
        <button
          onClick={() => setIsReviewed(true)}
          className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition shadow-lg mt-4"
        >
          Tandai sebagai Ditinjau
        </button>
      </div>
    </>
  );
};

export default AdminCaseDetail;
