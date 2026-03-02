import React from "react";
import { NavLink } from "react-router-dom";
import { MessageSquare, Phone, LogIn } from "lucide-react";

const BottomNav = () => {
  const baseClass =
    "flex flex-col items-center justify-center gap-1 px-10 py-2 rounded-2xl transition-all duration-300";

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex justify-between items-center z-50 shadow-[0_-5px_10px_rgba(0,0,0,0.02)] rounded-t-3xl">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseClass} ${
            isActive
              ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
              : "text-gray-400 hover:text-gray-600"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <MessageSquare size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[11px] font-bold">Chat</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/emergency"
        className={({ isActive }) =>
          `${baseClass} ${
            isActive
              ? "bg-red-50 text-red-600 ring-1 ring-red-100"
              : "text-gray-400 hover:text-red-400"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Phone size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[11px] font-bold">Darurat</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          `${baseClass} ${
            isActive
              ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
              : "text-gray-400 hover:text-gray-600"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <LogIn size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[11px] font-bold">Login</span>
          </>
        )}
      </NavLink>
    </div>
  );
};

export default BottomNav;
