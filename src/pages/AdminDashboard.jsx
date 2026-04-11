import React from "react";
import { BarChart2, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 3 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
          <h3 className="text-4xl font-black text-green-500 mb-2">156</h3>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            Total Kasus
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
          <h3 className="text-4xl font-black text-red-500 mb-2">23</h3>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            Risiko Tinggi
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
          <h3 className="text-4xl font-black text-blue-500 mb-2">12</h3>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            Kasus Baru
          </p>
        </div>
      </div>

      {/* Distribution Chart Card */}
      <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-gray-50 text-gray-800">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-slate-100 rounded-lg">
            <BarChart2 className="w-5 h-5 text-slate-600" />
          </div>
          <h3 className="text-lg font-bold">Distribusi Tingkat Risiko</h3>
        </div>

        <div className="space-y-6">
          {/* Risiko Tinggi */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Risiko Tinggi</span>
              <span className="font-bold text-red-600">14.7%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-1 overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full"
                style={{ width: "14.7%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">23 Kasus</p>
          </div>

          {/* Risiko Sedang */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Risiko Sedang</span>
              <span className="font-bold text-orange-500">28.8%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-1 overflow-hidden">
              <div
                className="bg-orange-500 h-full rounded-full"
                style={{ width: "28.8%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">45 Kasus</p>
          </div>

          {/* Risiko Rendah */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Risiko Rendah</span>
              <span className="font-bold text-green-500">56.4%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-1 overflow-hidden">
              <div
                className="bg-green-500 h-full rounded-full"
                style={{ width: "56.4%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 font-medium">88 Kasus</p>
          </div>
        </div>
      </div>

      {/* Recent Consultations List */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-white px-2">
          <Clock className="w-5 h-5 opacity-80" />
          <h3 className="text-lg font-bold">Riwayat Konsultasi Terbaru</h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between border border-gray-100 p-4 rounded-2xl hover:shadow-md transition-all group">
            {/* Left Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-mono bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200">
                  ST-2026-01-14-001
                </span>
                <span className="bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  Baru
                </span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                Anonymous User
              </h4>
              <p className="text-gray-500 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block"></span>
                Kata berisiko terdeteksi:{" "}
                <span className="font-semibold text-gray-700">
                  kekerasan fisik
                </span>
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>2026-01-14 12:30</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end justify-between mt-4 md:mt-0 space-y-6">
              <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-4 py-1.5 rounded-full">
                Risiko Tinggi
              </span>

              <button
                onClick={() => navigate("/admin/detail/ST-2026-01-14-001")}
                className="flex items-center text-blue-500 text-sm font-bold hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-xl group-hover:bg-blue-100"
              >
                Detail Kasus <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
