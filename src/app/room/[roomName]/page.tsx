"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  LiveKitRoom,
  VideoConference,
  useParticipants,
  useLocalParticipant,
} from "@livekit/components-react";
import "@livekit/components-styles";

function HostControlPanel({ roomName }: { roomName: string }) {
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const [isOpen, setIsOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState<string | null>(null);
  const [mutingAll, setMutingAll] = useState(false);

  let myRole = "participant";
  try {
    if (localParticipant.metadata) {
      myRole = JSON.parse(localParticipant.metadata).role || "participant";
    }
  } catch {}

  if (myRole !== "host" && myRole !== "cohost") return null;

  async function runAction(
    targetIdentity: string,
    action: "mute" | "remove" | "make-cohost",
  ) {
    setLoadingUser(targetIdentity);
    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: roomName, targetIdentity, action }),
      });
    } finally {
      setLoadingUser(null);
    }
  }

  async function handleMuteAll() {
    setMutingAll(true);
    try {
      await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room: roomName,
          action: "mute-all",
          requesterIdentity: localParticipant.identity,
        }),
      });
    } finally {
      setMutingAll(false);
    }
  }

  return (
    <div className="absolute top-3 right-3 z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5 border border-indigo-400/30 cursor-pointer"
      >
        <span>🛡️ Host Controls ({participants.length})</span>
      </button>

      {isOpen && (
        <div className="mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-4 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
            <h3 className="text-sm font-bold text-slate-200">
              অংশগ্রহণকারী ({participants.length})
            </h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* নতুন Mute All বাটন */}
          {participants.length > 1 ? (
            <button
              type="button"
              disabled={mutingAll}
              onClick={handleMuteAll}
              className="w-full mb-3 bg-amber-600/20 hover:bg-amber-600/35 border border-amber-500/30 text-amber-300 text-xs font-semibold py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>🔇</span>
              <span>
                {mutingAll
                  ? "সবাইকে মিউট করা হচ্ছে..."
                  : "সবাইকে একসাথে মিউট করুন (Mute All)"}
              </span>
            </button>
          ) : null}

          <div className="max-h-64 overflow-y-auto flex flex-col gap-2.5">
            {participants.map((p) => {
              let pRole = "participant";
              try {
                if (p.metadata)
                  pRole = JSON.parse(p.metadata).role || "participant";
              } catch {}

              const isMe = p.identity === localParticipant.identity;
              const isBusy = loadingUser === p.identity;

              return (
                <div
                  key={p.sid}
                  className="bg-white/5 border border-white/5 p-2.5 rounded-xl flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate">
                      {p.identity} {isMe ? "(আপনি)" : ""}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 uppercase">
                      {pRole}
                    </span>
                  </div>

                  {!isMe && pRole !== "host" ? (
                    <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => runAction(p.identity, "mute")}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-[11px] py-1 rounded text-slate-300 cursor-pointer"
                      >
                        🔇 Mute
                      </button>

                      {myRole === "host" && pRole !== "cohost" ? (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => runAction(p.identity, "make-cohost")}
                          className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-[11px] py-1 rounded cursor-pointer"
                        >
                          ⭐ Co-Host
                        </button>
                      ) : null}

                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => runAction(p.identity, "remove")}
                        className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 text-[11px] py-1 rounded cursor-pointer"
                      >
                        🚫 Remove
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomName = params.roomName as string;

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(`host_${roomName}`) === "true") {
      setIsHost(true);
    }
  }, [roomName]);

  async function joinMeeting(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch(
        `/api/token?room=${roomName}&username=${encodeURIComponent(name)}&isHost=${isHost}`,
      );
      const data = await resp.json();
      setToken(data.token);
    } finally {
      setLoading(false);
    }
  }

  function copyInviteLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-7 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ← হোমপেজ
            </button>
            <div className="flex items-center gap-2">
              {isHost ? (
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                  👑 Host
                </span>
              ) : null}
              <span className="text-xs font-mono bg-blue-500/10 text-blue-300 px-2.5 py-0.5 rounded">
                {roomName}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold mb-3 border-2 border-white/20">
              {name.trim() ? name.trim().charAt(0).toUpperCase() : "?"}
            </div>
            <h2 className="text-xl font-bold">মিটিংয়ে জয়েন করুন</h2>
            <p className="text-xs text-slate-400 mt-1">
              নিচে আপনার নিকনেম লিখে প্রবেশ করুন
            </p>
          </div>

          <form onSubmit={joinMeeting} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="আপনার নিকনেম লিখুন..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 focus:border-blue-500 text-white outline-none text-sm"
              required
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl shadow-lg cursor-pointer"
            >
              {loading ? "কানেক্ট হচ্ছে..." : "এখনই জয়েন করুন →"}
            </button>
          </form>

          <button
            type="button"
            onClick={copyInviteLink}
            className="w-full mt-5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium py-2.5 rounded-xl cursor-pointer"
          >
            {copied ? "✓ ইনভাইট লিংক কপি হয়েছে!" : "🔗 ইনভাইট লিংক কপি করুন"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-slate-950 overflow-hidden">
      <div className="absolute top-3 left-3 z-50 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-xs font-mono text-slate-300 hidden sm:inline">
          {roomName}
        </span>
        <button
          type="button"
          onClick={copyInviteLink}
          className="text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer ml-1"
        >
          {copied ? "✓ কপি হয়েছে" : "🔗 শেয়ার"}
        </button>
      </div>

      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        data-lk-theme="default"
        style={{ height: "100%" }}
        onDisconnected={() => {
          setToken("");
          router.push("/");
        }}
      >
        <HostControlPanel roomName={roomName} />
        <VideoConference />
        <HostControlPanel roomName={roomName} />
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}
