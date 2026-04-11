import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  User,
  Clock,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

const AdminCaseDetail = () => {
  const navigate = useNavigate();
  const [isReviewed, setIsReviewed] = useState(false);

  useEffect(() => {
    if (isReviewed) {
      const timer = setTimeout(() => {
        navigate("/admin");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isReviewed, navigate]);

  if (isReviewed) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[70vh]">
        <div className="bg-green-100 p-6 rounded-full mb-6 relative">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
          <CheckCircle2 className="w-16 h-16 text-green-500 relative z-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">
          Berhasil Ditinjau
        </h2>
        <p className="text-slate-500 mb-8 text-center font-medium">
          Kasus{" "}
          <span className="font-mono text-slate-700">ST-2026-01-14-001</span>{" "}
          telah ditandai sebagai ditinjau.
        </p>

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

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200"
        >
          <ChevronLeft className="w-5 h-5" /> Kembali
        </button>
        <span className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm border border-red-200 flex items-center gap-2 shadow-sm">
          <ShieldAlert className="w-4 h-4" /> Risiko Tinggi
        </span>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Detail Kasus
        </h2>
        <p className="text-slate-400 font-mono text-sm mt-1">
          ID: ST-2026-01-14-001
        </p>
      </div>

      <div className="space-y-6 flex-1">
        {/* Card Info User */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-blue-600 shadow-inner">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-800">
                Anonymous User
              </h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm mt-1.5 font-medium">
                <Clock className="w-4 h-4" />
                <span>14 Januari 2026 • 12:30 WIB</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                Skor Risiko
              </p>
              <span className="font-black text-red-600 text-lg">85%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-600 h-full rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* --- PERBAIKAN: Card Kata Kunci Tanpa Flex dan Rounded Normal --- */}
        <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-red-100 shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h4 className="font-bold text-red-900 text-lg">
              Kata Kunci Berisiko Terdeteksi
            </h4>
          </div>

          <div className="flex flex-wrap gap-2.5 pl-[3.25rem]">
            {["dipukul", "takut", "kekerasan"].map((word) => (
              <span
                key={word}
                className="bg-white text-red-600 px-4 py-1.5 rounded-full text-sm font-bold border border-red-200 shadow-sm"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Card Chat */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-5">
            <div className="bg-blue-50 p-2 rounded-xl">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-800 text-lg">
              Riwayat Percakapan
            </h4>
          </div>

          <div className="space-y-6">
            {/* User Bubble (Kanan) */}
            <div className="flex items-start gap-4 flex-row-reverse">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                YOU
              </div>
              <div className="flex flex-col items-end">
                <div className="bg-[#0055A5] text-white p-4 rounded-2xl rounded-tr-none shadow-md max-w-[85%] leading-relaxed font-medium">
                  Saya sering dipukul oleh pasangan saya
                </div>
                <span className="text-[10px] text-slate-400 font-bold mt-1.5 mr-1">
                  12:25
                </span>
              </div>
            </div>

            {/* AI Bubble (Kiri) */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white text-sm shadow-md shrink-0">
                AI
              </div>
              <div className="flex flex-col items-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 max-w-[85%] text-slate-700 leading-relaxed font-medium">
                  <p>
                    Saya memahami situasi Anda sangat sulit. Keselamatan Anda
                    adalah prioritas utama.
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold mt-1.5 ml-1">
                  12:26
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setIsReviewed(true)}
          className="w-full bg-blue-600 text-white font-black py-4 md:py-5 rounded-2xl hover:bg-blue-700 active:scale-[0.99] transition-all shadow-lg shadow-blue-600/30 text-lg flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-6 h-6" /> Tandai Kasus sebagai Ditinjau
        </button>
      </div>
    </div>
  );
};

export default AdminCaseDetail;
