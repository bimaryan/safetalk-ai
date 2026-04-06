import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, PhoneCall, MessageSquare, User } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  // State untuk mengatur tampilan: 'splash', 'onboarding', atau 'selection'
  const [currentView, setCurrentView] = useState("splash");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-hide Splash Screen setelah 2.5 detik
  useEffect(() => {
    if (currentView === "splash") {
      const timer = setTimeout(() => {
        setCurrentView("onboarding");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // Data untuk Onboarding
  const onboardingData = [
    {
      icon: <Lock className="w-12 h-12 text-white" />,
      title: "Anonim & Aman",
      desc: "Konsultasi sepenuhnya anonim dan terenkripsi. Privasi Anda adalah prioritas kami.",
    },
    {
      icon: <Shield className="w-12 h-12 text-white" />,
      title: "Deteksi Kata Kunci Risiko",
      desc: "AI mendeteksi kata kunci berbahaya (kekerasan, ancaman) untuk memberikan bantuan yang tepat.",
    },
    {
      icon: <PhoneCall className="w-12 h-12 text-white" />,
      title: "Hubungan Langsung ke Layanan",
      desc: "Koneksi langsung ke layanan dukungan resmi dan hotline darurat 24/7.",
    },
  ];

  const handleNextSlide = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentView("selection");
    }
  };

  const handleAnonimClick = () => {
    // Set status di local storage bahwa dia adalah anonim
    localStorage.setItem("userRole", "anonim");
    navigate("/chat");
  };

  // 1. SPLASH SCREEN
  if (currentView === "splash") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
        <div className="bg-white p-4 rounded-3xl shadow-lg mb-6">
          <Shield className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold mb-2">SafeTalk AI</h1>
        <p className="text-lg font-medium mb-1">Anda Tidak Sendiri</p>
        <p className="text-sm text-blue-100 mb-8">
          Konsultasi Aman dan Anonim Berbasis AI
        </p>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  // 2. ONBOARDING SCREEN
  if (currentView === "onboarding") {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen bg-blue-50 p-6">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md text-center">
          <div className="bg-blue-500 p-8 rounded-full shadow-lg mb-8">
            {onboardingData[currentSlide].icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {onboardingData[currentSlide].title}
          </h2>
          <p className="text-gray-600 px-4">
            {onboardingData[currentSlide].desc}
          </p>
        </div>

        <div className="w-full max-w-md pb-8">
          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {onboardingData.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-6 bg-blue-500" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition shadow-md"
          >
            {currentSlide === onboardingData.length - 1
              ? "Mulai"
              : "Selanjutnya"}
          </button>
        </div>
      </div>
    );
  }

  // 3. SELECTION SCREEN
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-50 p-6 pt-12">
      <div className="bg-blue-500 p-4 rounded-2xl shadow-md mb-6">
        <Shield className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-1">SafeTalk AI</h1>
      <p className="text-gray-500 mb-10">Silakan Pilih Akses</p>

      <div className="w-full max-w-2xl space-y-4">
        {/* Card Konsultasi Anonim */}
        <button
          onClick={handleAnonimClick}
          className="w-full bg-blue-500 text-left p-6 rounded-2xl shadow-sm hover:bg-blue-600 transition flex items-start space-x-4 group"
        >
          <div className="bg-white/20 p-3 rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Konsultasi Anonim
            </h3>
            <p className="text-blue-100 text-sm font-medium mb-1">
              Tanpa Login
            </p>
            <p className="text-blue-100/80 text-sm">
              Mulai konsultasi langsung tanpa perlu login. Data tidak akan
              disimpan dan anonim.
            </p>
          </div>
        </button>

        {/* Card Masuk sebagai Pengguna */}
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-white border border-gray-100 text-left p-6 rounded-2xl shadow-sm hover:shadow-md transition flex items-start space-x-4"
        >
          <div className="bg-blue-50 p-3 rounded-xl">
            <User className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Masuk sebagai Pengguna
            </h3>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Simpan riwayat konsultasi
            </p>
            <p className="text-gray-400 text-sm">
              Login untuk menyimpan riwayat percakapan dan melacak perkembangan
              konsultasi sebelumnya.
            </p>
          </div>
        </button>
      </div>

      <div className="mt-auto pt-8 pb-4 w-full max-w-2xl text-center">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-100 p-3 rounded-lg mb-4">
          <Lock className="w-4 h-4 text-orange-400" />
          <span>
            Semua data Anda terenkripsi dan dijaga kerahasiaannya. Kami tidak
            membagikan informasi pribadi Anda kepada pihak ketiga tanpa izin.
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Demo Admin: Username "admin", Password "123"
        </p>
      </div>
    </div>
  );
};

export default Home;
