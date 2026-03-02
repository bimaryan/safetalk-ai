import React from "react";
import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  Shield,
  TriangleAlert,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: MessageSquare, label: "AI Chat", path: "/" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0055A5] text-white h-screen fixed left-0 top-0 border-r border-blue-800 shadow-xl z-50">
      <div className="p-6 border-b border-blue-600/30">
        <div className="flex items-center gap-4">
          <Shield className="w-12 h-12 text-[#0055A5] bg-white p-2 rounded-xl shadow-sm" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wide text-white">
              SafeTalkAI
            </span>
            <span className="text-xs text-blue-100 opacity-90">
              Mode Anonim
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive
                  ? "bg-white text-[#0055A5] shadow-lg"
                  : "text-blue-100 hover:bg-blue-600 hover:text-white"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-blue-500/30">
          <p className="px-4 text-xs font-bold text-blue-200 uppercase mb-2 tracking-wider">
            Zona Bahaya
          </p>
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-bold ${
                isActive
                  ? "bg-red-600 text-white shadow-lg ring-2 ring-red-400"
                  : "bg-red-500/20 text-red-200 hover:bg-red-600 hover:text-white"
              }`
            }
          >
            <TriangleAlert size={20} />
            <span>Emergency / SOS</span>
          </NavLink>
        </div>
      </nav>

      <div className="p-4 border-t border-blue-600/30 mt-auto">
        <div className="bg-blue-800/50 rounded-lg p-3 text-sm text-blue-100">
          <p className="text-xs opacity-70">Logged in as</p>
          <p className="text-white font-bold tracking-wide">User Joki</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
