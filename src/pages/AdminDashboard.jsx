import React from "react";
import { Shield, LogOut, BarChart2, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-8 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            <p className="text-blue-100">SafeTalk AI Monitoring</p>
          </div>
        </div>
        <button className="bg-blue-500/50 p-3 rounded-full hover:bg-blue-500 transition">
          <LogOut className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* 3 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-4xl font-bold text-green-500 mb-2">156</h3>
          <p className="text-gray-500 text-sm font-medium">Total Kasus</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-4xl font-bold text-red-500 mb-2">23</h3>
          <p className="text-gray-500 text-sm font-medium">Risiko Tinggi</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-4xl font-bold text-blue-500 mb-2">12</h3>
          <p className="text-gray-500 text-sm font-medium">Kasus Baru</p>
        </div>
      </div>

      {/* Distribution Chart Card */}
      <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm text-gray-800">
        <div className="flex items-center gap-3 mb-8">
          <BarChart2 className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-bold">Distribusi Tingkat Risiko</h3>
        </div>

        <div className="space-y-6">
          {/* Risiko Tinggi */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Risiko Tinggi</span>
              <span className="font-bold text-red-600">14.7%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
              <div
                className="bg-red-500 h-3 rounded-full"
                style={{ width: "14.7%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400">23 Kasus</p>
          </div>

          {/* Risiko Sedang */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Risiko Sedang</span>
              <span className="font-bold text-orange-500">28.8%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
              <div
                className="bg-orange-500 h-3 rounded-full"
                style={{ width: "28.8%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400">45 Kasus</p>
          </div>

          {/* Risiko Rendah */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Risiko Rendah</span>
              <span className="font-bold text-green-500">56.4%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: "56.4%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400">88 Kasus</p>
          </div>
        </div>
      </div>

      {/* Recent Consultations List */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-white">
          <Clock className="w-5 h-5" />
          <h3 className="text-lg font-bold">Riwayat Konsultasi Terbaru</h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between border border-gray-100 p-4 rounded-2xl hover:shadow-md transition">
            {/* Left Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-mono">
                  ST-2026-01-14-001
                </span>
                <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  Baru
                </span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg">
                Anonymous User
              </h4>
              <p className="text-gray-500 text-sm">
                Kata berisiko terdeteksi: kekerasan fisik
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <Clock className="w-3 h-3" />
                <span>2026-01-14 12:30</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end justify-between mt-4 md:mt-0 space-y-8">
              <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-4 py-1.5 rounded-full">
                Risiko Tinggi
              </span>

              {/* PERBAIKAN DI SINI: Menambahkan properti onClick */}
              <button
                onClick={() => navigate("/admin/detail/ST-2026-01-14-001")}
                className="flex items-center text-blue-500 text-sm font-semibold hover:text-blue-700 transition"
              >
                Detail <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
