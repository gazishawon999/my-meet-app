# 🎥 NexMeet — Open-Source Private Video Conferencing Platform

NexMeet is a modern, fast, and fully open-source real-time video conferencing web application built with Next.js, LiveKit, and Tailwind CSS. Without requiring any account registration or login, users can instantly create a private meeting room and join using a custom nickname.

## 🌐 Live Demo

🚀 **Try NexMeet Online**

👉 🚀 **Try NexMeet Live:**  
👉 (NexMeet Online):[https://my-meet-app-nu.vercel.app]

Create a private room, share the invitation link, and start video conferencing instantly without any signup.

---

## ✨ Key Features

### 🔓 Zero-Auth Access

- No sign-up or account creation required.
- Create and join meetings directly from the browser.

### 🔗 Dynamic Private Rooms

- Automatically generates unique room codes.
- Shareable invite links for instant collaboration.

### 👤 Custom Nickname & Live Avatar

- Join meetings with a personalized nickname.
- Dynamic avatar preview generated from user initials.

### 🛡️ Advanced Host & Co-Host Controls

- Meeting creator automatically becomes Host.
- Mute specific participants.
- Mute all participants except Host.
- Promote participants to Co-Host.
- Remove unwanted users from meetings.

### 📹 Full Video Conferencing Experience

- HD video conferencing.
- Crystal-clear audio communication.
- Screen sharing support.
- Real-time chat messaging.

### 🎨 Modern Glassmorphism UI

- Beautiful dark-gradient design.
- Fully responsive across desktop, tablet, and mobile devices.

### 👥 High Capacity Meetings

- Powered by LiveKit SFU architecture.
- Supports 100+ participants efficiently.

---

## 🔥 Why NexMeet?

- No registration required
- Instant room creation
- Secure JWT-based access
- Host & Co-Host management
- HD video & audio communication
- Real-time chat support
- Screen sharing functionality
- Mobile-friendly responsive design
- Open-source and customizable

---

## 📸 Screenshots

### Landing Page

> Add screenshot here

### Meeting Room

> Add screenshot here

### Host Controls

> Add screenshot here

---

## 🛠️ Tech Stack

| Technology           | Purpose                    |
| -------------------- | -------------------------- |
| Next.js (App Router) | Frontend Framework         |
| React                | UI Library                 |
| TypeScript           | Type Safety                |
| LiveKit              | Real-Time Communication    |
| WebRTC               | Audio & Video Streaming    |
| Tailwind CSS         | Styling                    |
| JWT                  | Secure Room Authentication |
| Vercel               | Deployment                 |

---

## 📂 Project Structure

```text
nexmeet/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── route.ts
│   │   │   └── token/
│   │   │       └── route.ts
│   │   ├── room/
│   │   │   └── [roomName]/
│   │   │       └── page.tsx
│   │   ├── icon.png
│   │   ├── layout.tsx
│   │   └── page.tsx
│
├── .env.local
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nexmeet.git

cd nexmeet

npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

in your browser.

---

## 🌐 Deployment

This project is production-ready for deployment on Vercel.

### Deploy Steps

1. Push your project to GitHub.
2. Import the repository into Vercel.
3. Add all environment variables.
4. Click Deploy.

### Production Stack

- Frontend: Vercel
- Media Server: LiveKit Cloud
- Authentication: JWT
- Framework: Next.js

### Live Application

👉 YOUR_LIVE_LINK : https://my-meet-app-nu.vercel.app

---

## 🔒 Security

- JWT-based token generation
- Secure LiveKit room access
- Role-based host permissions
- Server-side token validation
- Protected moderation APIs

---

## 🚀 Future Improvements

- Waiting Room System
- Meeting Password Protection
- Meeting Recording
- Virtual Backgrounds
- Participant Reactions
- Meeting Scheduling
- Chat File Sharing
- AI Meeting Assistant
- Meeting History

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## ⭐ Support

If you like this project, consider giving it a star on GitHub.

---

## 📄 License

This project is open-source and available for educational and personal use.

---

## 👨‍💻 Author

SHAWON GAZI\
A CSE Student From Eastern University, Bangladesh

Developed with ❤️ using Next.js, LiveKit, TypeScript, and Tailwind CSS.

**NexMeet — Fast, Secure & Open-Source Video Conferencing Platform**
