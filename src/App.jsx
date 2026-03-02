import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Chat from "./pages/Chat";
import Emergency from "./pages/Emergency";
import EmergencyLayout from "./layouts/EmergencyLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Induk menggunakan Layout */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Halaman Chat */}
          <Route index element={<Chat />} />
        </Route>
        <Route element={<EmergencyLayout />}>
          <Route path="emergency" element={<Emergency />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
