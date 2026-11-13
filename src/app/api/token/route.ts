import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");
  const username = req.nextUrl.searchParams.get("username");
  const isHost = req.nextUrl.searchParams.get("isHost") === "true";

  if (!room || !username) {
    return NextResponse.json(
      { error: "Room and username required" },
      { status: 400 },
    );
  }

  // ইউজারের রোল মেটাডেটা হিসেবে টোকেনে যুক্ত করা হচ্ছে
  const role = isHost ? "host" : "participant";

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: username,
      metadata: JSON.stringify({ role }),
    },
  );

  at.addGrant({
    roomJoin: true,
    room: room,
    canPublish: true,
    canSubscribe: true,
    roomAdmin: isHost, // হোস্টকে অ্যাডমিন পারমিশন দেওয়া হলো
  });

  return NextResponse.json({ token: await at.toJwt() });
}
