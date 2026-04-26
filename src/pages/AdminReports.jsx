import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi fetch yang mendukung pencarian
  const fetchReports = async (page = 1, search = "") => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("safetalk_token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Tambahkan parameter search ke URL
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/reports?page=${page}&search=${search}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        setReports(result.data.data);
        setPagination({
          current_page: result.data.current_page,
          last_page: result.data.last_page,
          total: result.data.total,
        });
      }
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger pencarian saat tekan Enter
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchReports(1, searchQuery);
    }
  };

  useEffect(() => {
    fetchReports(1);
  }, []);

  const getCategoryBadge = (category) => {
    if (["K1", "K3"].includes(category)) {
      return "bg-rose-100 text-rose-700 border-rose-200";
    } else if (["K2", "K4"].includes(category)) {
      return "bg-amber-100 text-amber-700 border-amber-200";
    } else {
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
  };

  const getCleanMessage = (report) => {
    const lastMsg =
      report.messages && report.messages.length > 0 ? report.messages[0] : null;
    if (!lastMsg || !lastMsg.message) return "...";
    let rawText = lastMsg.message;
    return rawText.includes("|--REPLY--|")
      ? rawText.split("|--REPLY--|")[1]
      : rawText;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            Data Laporan Masuk
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Total {pagination.total} laporan ditemukan.
          </p>
        </div>

        {/* INPUT PENCARIAN (Filter Tabel) */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyPress}
            placeholder="Cari ID / Nama... (Enter)"
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 bg-white text-sm transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-bold">
                <th className="p-4 pl-6">ID Kasus</th>
                <th className="p-4">Pengirim</th>
                <th className="p-4">Pesan Terakhir</th>
                <th className="p-4">Kategori Risiko</th>
                <th className="p-4">Waktu</th>
                <th className="p-4 pr-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center animate-pulse">
                    Memuat data...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    Tidak ada hasil ditemukan.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-blue-50/50 transition-colors group"
                  >
                    <td className="p-4 pl-6 font-mono text-sm">
                      #{report.case_id || report.id}
                    </td>
                    <td className="p-4 font-bold text-sm">
                      {report.user ? report.user.nama_lengkap : "Anonymous"}
                    </td>
                    <td className="p-4 text-sm italic truncate max-w-xs">
                      "{getCleanMessage(report)}"
                    </td>
                    <td className="p-4">
                      <span
                        className={`border text-[10px] font-bold px-3 py-1 rounded-full ${getCategoryBadge(report.latest_category)}`}
                      >
                        {report.latest_category || "Umum"}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(report.updated_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => navigate(`/admin/reports/${report.id}`)}
                        className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 rounded-xl transition-all"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!isLoading && reports.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Halaman {pagination.current_page} dari {pagination.last_page}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  fetchReports(pagination.current_page - 1, searchQuery)
                }
                disabled={pagination.current_page === 1}
                className="p-2 bg-white border rounded-xl disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  fetchReports(pagination.current_page + 1, searchQuery)
                }
                disabled={pagination.current_page === pagination.last_page}
                className="p-2 bg-white border rounded-xl disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
