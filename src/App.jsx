import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom"; // Tambahkan Navigate dan Outlet

// Layouts & Pages
import DashboardLayout from "./layouts/DashboardLayout";
import EmergencyLayout from "./layouts/EmergencyLayout";
import AdminLayout from "./layouts/AdminLayout";
import Chat from "./pages/Chat";
import Emergency from "./pages/Emergency";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCaseDetail from "./pages/AdminCaseDetail";
import ProtectedRoute from "./components/ProtectedRoute";

// --- BUAT LOGIKA IF-ELSE UNTUK CHAT GUARD DI SINI ---
const ChatGuard = () => {
  const role = localStorage.getItem("userRole");

  if (role === "user" || role === "anonim") {
    // JIKA dia user biasa ATAU anonim, izinkan masuk ke Dashboard/Chat
    return <DashboardLayout />;
  } else {
    // JIKA TIDAK, tendang kembali ke Home (halaman pilih akses)
    return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- BAGIAN CHAT DIBUNGKUS DENGAN CHATGUARD (IF-ELSE) --- */}
        <Route element={<ChatGuard />}>
          <Route path="/chat" element={<Chat />} />
        </Route>

        {/* Emergency bisa dibiarkan publik atau digabung guard */}
        <Route element={<EmergencyLayout />}>
          <Route path="/emergency" element={<Emergency />} />
        </Route>

        {/* --- GUARD KHUSUS ADMIN --- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/detail/:id" element={<AdminCaseDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
