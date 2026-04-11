import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  AlertCircle,
  Trash2,
  ShieldCheck,
  CornerUpLeft,
  Lock,
} from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("safetalk_history");
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: "ai",
            text: "Halo! Saya **SafeTalk AI**. Ada yang bisa saya bantu?",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            instruction: null,
            replyTo: null,
          },
        ];
  });

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("safetalk_history", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    if (window.confirm("Hapus semua riwayat percakapan?")) {
      setMessages([
        {
          role: "ai",
          text: "Riwayat telah dibersihkan.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          instruction: null,
          replyTo: null,
        },
      ]);
      localStorage.removeItem("safetalk_history");
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    const textToSend = inputText;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      { role: "user", text: textToSend, time: currentTime },
    ]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSend }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.bot_reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          instruction: data.arahan_lanjut,
          replyTo: textToSend,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* 1. Kontainer Utama: h-screen (pas layar) dan overflow-hidden (larang scroll luar) */
    <div className="flex flex-col h-screen max-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* 2. HEADER: Cukup bg-white dan z-index, nggak perlu sticky lagi karena parent-nya sudah flex-col h-screen */}
      <header className="flex-none z-30 w-full px-6 py-4 border-b border-slate-200 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-30 shadow-md items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg tracking-tight">
              SafeTalk AI
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                End-to-End Local
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-slate-400 hover:text-red-500 transition-all"
        >
          <Trash2 size={20} />
        </button>
      </header>

      {/* 3. CHAT AREA: flex-1 (ambil semua sisa ruang) dan overflow-y-auto (scroll di sini doang) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                msg.role === "ai"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-slate-200 text-slate-500"
              }`}
            >
              {msg.role === "ai" ? "ST" : "ME"}
            </div>

            <div
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}
            >
              <div
                className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "ai"
                    ? "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                    : "bg-indigo-600 text-white rounded-tr-none"
                }`}
              >
                {msg.role === "ai" && msg.replyTo && (
                  <div className="mb-2 p-2 bg-slate-50 border-l-4 border-indigo-400 rounded text-[10px] text-slate-500 italic">
                    <div className="flex items-center gap-1 font-bold not-italic text-indigo-600 uppercase">
                      <CornerUpLeft size={10} /> Balas:
                    </div>
                    "{msg.replyTo}"
                  </div>
                )}
                {msg.text}
                {msg.instruction && (
                  <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-xl flex gap-3 items-start">
                    <AlertCircle
                      className="text-orange-600 shrink-0 mt-0.5"
                      size={16}
                    />
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-orange-900 uppercase">
                        Tindakan Darurat:
                      </p>
                      <p className="text-xs text-orange-800 font-semibold">
                        {msg.instruction}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-slate-400 font-bold mt-1 px-1 italic uppercase">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-xs text-slate-400 animate-pulse px-12 italic">
            AI sedang mengetik...
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* 4. FOOTER: flex-none (biar ukurannya tetep) dan nggak perlu sticky */}
      <footer className="flex-none w-full sticky p-4 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-30">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ceritakan situasi Anda secara rahasia..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-2xl px-5 py-3 outline-none text-sm"
            />
            <button
              onClick={() => handleSend()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-2xl transition-all shadow-lg shrink-0"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            <Lock size={10} /> Privasi Terjamin • SafeTalk Assistant
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
