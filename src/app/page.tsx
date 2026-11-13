"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");

  const createNewMeeting = () => {
    const part1 = Math.random().toString(36).substring(2, 5);
    const part2 = Math.random().toString(36).substring(2, 6);
    const part3 = Math.random().toString(36).substring(2, 5);
    const uniqueRoomId = `${part1}-${part2}-${part3}`;

    // যিনি রুম তৈরি করছেন তাকে ব্রাউজারে Host হিসেবে সেভ রাখা হলো
    sessionStorage.setItem(`host_${uniqueRoomId}`, "true");
    router.push(`/room/${uniqueRoomId}`);
  };

  const joinExistingMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    const cleanCode = roomCode.trim().split("/").pop();
    router.push(`/room/${cleanCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <header className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            NexMeet
          </span>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300">
          Open Source • Host Controls
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10 z-10">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              প্রিমিয়াম ভিডিও মিটিং, <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                সম্পূর্ণ আপনার নিয়ন্ত্রণে
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              এক ক্লিকে প্রাইভেট রুম তৈরি করুন। মিটিংয়ের হোস্ট হিসেবে অন্যদের
              মিউট, রিমুভ বা কো-হোস্ট করার পূর্ণ সুবিধা পান।
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <button
              onClick={createNewMeeting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              নতুন প্রাইভেট মিটিং শুরু করুন
            </button>

            <div className="relative flex py-6 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-wider font-medium">
                অথবা কোড দিয়ে জয়েন করুন
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form
              onSubmit={joinExistingMeeting}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="রুম কোড বা লিংক দিন (যেমন: abc-defg-hij)"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 focus:border-blue-500 text-white placeholder-slate-500 outline-none text-sm transition"
              />
              <button
                type="submit"
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium px-6 py-3 rounded-xl text-sm transition cursor-pointer"
              >
                জয়েন
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-slate-500 z-10">
        Powered by LiveKit SFU & Next.js | Made with ❤️ by — SHAWON GAZI
      </footer>
    </div>
  );
}
