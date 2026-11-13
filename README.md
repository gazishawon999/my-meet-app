# 🎥 NexMeet — Open-Source Private Video Conferencing Platform

**NexMeet** হলো একটি modern, fast এবং সম্পূর্ণ open-source real-time video conferencing web application। এটি **Next.js (App Router)**, **LiveKit SFU (WebRTC)** এবং **Tailwind CSS** দিয়ে তৈরি করা হয়েছে। কোনো প্রকার login বা account খোলা ছাড়াই যে কেউ এক ক্লিকে private meeting room create করতে এবং নিজের nickname দিয়ে সরাসরি join করতে পারবেন।

---

## ✨ Key Features (প্রধান ফিচারসমূহ)

- **🔓 Zero-Auth Access (লগইন ছাড়াই জয়েন):** কোনো sign-up বা account ঝামেলা ছাড়াই সরাসরি browser থেকে meeting create এবং join করার সুবিধা।
- **🔗 Dynamic Private Rooms:** প্রতিটি নতুন meeting-এর জন্য automatically একটি unique room code এবং shareable invite link তৈরি হয়।
- **👤 Custom Nickname & Live Avatar:** Lobby-তে প্রবেশের সময় নিজের পছন্দমতো nickname সেট করা এবং নামের প্রথম অক্ষর দিয়ে dynamic avatar preview।
- **🛡️ Advanced Host & Co-Host Controls:**
  - যিনি meeting create করবেন তিনি automatically **Host** হিসেবে যুক্ত হবেন।
  - **Mute Individual:** নির্দিষ্ট কোনো participant-এর microphone mute করার সুবিধা।
  - **Mute All:** এক ক্লিকে meeting-এর সবাইকে (Host বাদে) একসাথে mute করা।
  - **Make Co-Host:** meeting পরিচালনা করার জন্য অন্য কাউকে **Co-Host** role প্রদান করা।
  - **Remove (Kick):** অপ্রয়োজনীয় বা অনাকাঙ্ক্ষিত কাউকে meeting থেকে বের করে দেওয়া।
- **📹 Full Video Conferencing Experience:** HD video call, crystal-clear audio, screen sharing এবং real-time in-meeting chat।
- **🎨 Modern Glassmorphism UI:** Tailwind CSS দিয়ে তৈরি dark-gradient এবং mobile-friendly responsive interface।
- **👥 High Capacity (100+ Participants):** LiveKit-এর SFU architecture ব্যবহারের ফলে একটি meeting-এ অনায়াসেই ১০০+ মানুষ যুক্ত হতে পারে।

---

## 🛠️ Tech Stack (ব্যবহৃত প্রযুক্তিসমূহ)

- **Frontend Framework:** [Next.js](https://nextjs.org) (React + TypeScript)
- **Real-Time Media Engine:** [LiveKit](https://livekit.io) (WebRTC SFU)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Security:** JWT (JSON Web Token) ভিত্তিক secure room access

---

## 📂 Project Structure

```text
my-meet-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── route.ts       # Host controls API (Mute, Mute All, Kick, Co-Host)
│   │   │   └── token/
│   │   │       └── route.ts       # JWT Token generator & Role assignment
│   │   ├── room/
│   │   │   └── [roomName]/
│   │   │       └── page.tsx       # Dynamic Lobby, Video Room & Host Control UI
│   │   ├── icon.png               # Custom Favicon / App Logo
│   │   ├── layout.tsx             # Root Layout & Metadata
│   │   └── page.tsx               # Landing Page & Private Room Generator
├── .env.local                     # Environment Variables (API Keys)
└── package.json
```

---

## 🚀 Getting Started (লোকাল কম্পিউটারে রান করার নিয়ম)

### ১. Repository ক্লোন ও Package ইনস্টল করুন

```bash
git clone https://github.com
cd nexmeet
npm install
```

### ২. Environment Variables সেট করুন

Project-এর root folder-এ `.env.local` নামে একটি ফাইল তৈরি করুন এবং আপনার LiveKit server-এর তথ্য বসান:

```env
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

### ৩. Development Server চালু করুন

```bash
npm run dev
```

এবার browser-এ গিয়ে `http://localhost:3000` ওপেন করুন।

---

## 🌐 Deployment (Vercel-এ লাইভ করার নিয়ম)

এই project-টি **Vercel**-এ সম্পূর্ণ ফ্রি-তে deploy করার জন্য প্রস্তুত:

1. কোডটি **GitHub**-এ push করুন।
2. [Vercel](https://vercel.com)-এ গিয়ে repository-টি import করুন।
3. **Environment Variables** সেকশনে `.env.local`-এর তিনটি variable যোগ করুন এবং **Deploy** বাটনে ক্লিক করুন।

---

## 📄 License

এই project-টি open-source এবং educational ও personal ব্যবহারের জন্য উন্মুক্ত।
