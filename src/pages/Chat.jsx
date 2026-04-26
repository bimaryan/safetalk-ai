import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  AlertCircle,
  ShieldCheck,
  LogOut,
  User,
  ShieldAlert,
} from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Halo! Saya **SafeTalk AI**. Ada yang bisa saya bantu?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      instruction: null,
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null); // Ref untuk auto-resize textarea

  const fetchHistory = async () => {
    let token = localStorage.getItem("safetalk_token");
    let sessionId = localStorage.getItem("safetalk_session");
    let headers = { Accept: "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    else if (sessionId) headers["X-Session-ID"] = sessionId;
    else return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat/history", {
        headers,
      });
      const data = await res.json();

      if (data.status === "success") {
        setIsLocked(data.is_locked || false);

        if (data.data.length > 0) {
          setMessages([
            {
              role: "ai",
              text: "Halo! Saya **SafeTalk AI**. Ada yang bisa saya bantu?",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            ...data.data,
          ]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Fungsi untuk auto-resize textarea
  const handleInputResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150, // Max height 150px
      )}px`;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const text = inputText;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { role: "user", text: text, time: currentTime },
    ]);

    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto"; // Reset height
    setIsLoading(true);

    let token = localStorage.getItem("safetalk_token");
    let sessionId = localStorage.getItem("safetalk_session");
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    else headers["X-Session-ID"] = sessionId;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/send", {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: text,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        if (result.session_id && !token) {
          localStorage.setItem("safetalk_session", result.session_id);
        }
        setIsLocked(result.is_locked || false);
        fetchHistory();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Mencegah pembuatan baris baru jika hanya menekan Enter
      handleSend();
    }
    // Jika Shift + Enter ditekan, biarkan default behavior (buat baris baru)
  };

  const formatText = (text) => {
    if (!text) return "";
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="fixed inset-0 bottom-[80px] md:bottom-0 md:left-64 flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden z-10">
      <header className="flex-none w-full px-4 md:px-6 py-4 border-b border-slate-200 bg-white shadow-sm flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">SafeTalk AI</h2>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isLocked ? "bg-rose-500" : "bg-emerald-500"
                }`}
              ></span>
              <p
                className={`text-[9px] font-bold uppercase tracking-widest ${
                  isLocked ? "text-rose-500" : "text-slate-500"
                }`}
              >
                {isLocked ? "Terhubung dengan Admin" : "Sistem Aktif"}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="p-2 text-slate-400 hover:text-slate-700 transition-all"
        >
          <LogOut size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
        {messages.map((msg, index) => {
          const isFromAdmin = msg.role === "admin";
          const isFromAI = msg.role === "ai";
          const isAlignedRight = msg.role === "user";

          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                isAlignedRight ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                  isFromAdmin
                    ? "bg-rose-600 text-white shadow-md"
                    : isFromAI
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-slate-100 border"
                }`}
              >
                {isFromAdmin ? (
                  <ShieldAlert size={16} />
                ) : isFromAI ? (
                  "AI"
                ) : (
                  <User size={16} className="text-slate-400" />
                )}
              </div>

              <div
                className={`flex flex-col ${
                  isAlignedRight ? "items-end" : "items-start"
                } max-w-[85%]`}
              >
                <div
                  className={`p-4 rounded-2xl shadow-sm text-sm border hover:opacity-90 transition-opacity ${
                    isFromAdmin
                      ? "bg-rose-50 border-rose-200 text-rose-900 rounded-tl-none"
                      : isFromAI
                        ? "bg-white border-slate-100 text-slate-700 rounded-tl-none"
                        : "bg-indigo-600 border-indigo-600 text-white rounded-tr-none"
                  }`}
                >
                  {isFromAdmin && (
                    <div className="font-black text-rose-700 text-[10px] mb-2 border-b border-rose-200 pb-1 flex items-center gap-1 uppercase tracking-widest">
                      <ShieldAlert size={12} /> PESAN ADMIN
                    </div>
                  )}

                  {formatText(msg.text)}

                  {isFromAI && msg.instruction && (
                    <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-xl flex gap-3 items-start text-xs font-bold text-orange-800">
                      <AlertCircle
                        size={16}
                        className="text-orange-600 shrink-0"
                      />{" "}
                      {msg.instruction}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 font-bold mt-1 px-1 italic uppercase">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 bg-indigo-600 text-white shadow-md">
              {isLocked ? <ShieldAlert size={16} /> : "AI"}
            </div>
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="p-4 py-5 rounded-2xl shadow-sm border bg-white border-slate-100 rounded-tl-none flex items-center gap-1.5">
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white border-t border-slate-200 z-30">
        <div className="max-w-4xl mx-auto space-y-3">
          {isLocked && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 py-1.5 rounded-xl text-center text-[10px] font-black uppercase">
              Admin sedang memantau percakapan ini
            </div>
          )}

          <div className="relative flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                handleInputResize();
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                isLocked
                  ? "Ketik pesan untuk Admin... (Shift + Enter untuk baris baru)"
                  : "Ceritakan situasi Anda... (Shift + Enter untuk baris baru)"
              }
              disabled={isLoading}
              className="flex-1 bg-slate-50 border rounded-2xl px-5 py-3 outline-none text-sm transition-all focus:border-indigo-500 focus:bg-white focus:shadow-md disabled:bg-slate-100 disabled:cursor-not-allowed resize-none overflow-y-auto min-h-[48px]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="bg-indigo-600 text-white p-3 rounded-2xl shadow-md shrink-0 hover:bg-indigo-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed h-[48px] flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
