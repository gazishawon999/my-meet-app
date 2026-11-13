import { RoomServiceClient } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { room, targetIdentity, action, requesterIdentity } =
      await req.json();

    const livekitHost = process.env.NEXT_PUBLIC_LIVEKIT_URL!.replace(
      "wss://",
      "https://",
    );

    const roomService = new RoomServiceClient(
      livekitHost,
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
    );

    if (action === "remove") {
      await roomService.removeParticipant(room, targetIdentity);
    } else if (action === "mute") {
      const participant = await roomService.getParticipant(
        room,
        targetIdentity,
      );
      const audioTrack = participant.tracks.find((t) => t.type === 0);
      if (audioTrack) {
        await roomService.mutePublishedTrack(
          room,
          targetIdentity,
          audioTrack.sid,
          true,
        );
      }
    } else if (action === "make-cohost") {
      await roomService.updateParticipant(
        room,
        targetIdentity,
        JSON.stringify({ role: "cohost" }),
        {
          canPublish: true,
          canSubscribe: true,
          roomAdmin: true,
        },
      );
    } else if (action === "mute-all") {
      // রুমের সব অংশগ্রহণকারীর তালিকা আনা হচ্ছে
      const participants = await roomService.listParticipants(room);

      for (const p of participants) {
        // যিনি Mute All চাপছেন তাকে মিউট করা হবে না
        if (p.identity === requesterIdentity) continue;

        // মূল Host-কেও মিউট করা হবে না
        let pRole = "participant";
        try {
          if (p.metadata) pRole = JSON.parse(p.metadata).role || "participant";
        } catch {}
        if (pRole === "host") continue;

        // বাকি সবার অডিও ট্র্যাক মিউট করা হচ্ছে
        const audioTrack = p.tracks.find((t) => t.type === 0);
        if (audioTrack && !audioTrack.muted) {
          await roomService.mutePublishedTrack(
            room,
            p.identity,
            audioTrack.sid,
            true,
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin action error:", error);
    return NextResponse.json(
      { error: error.message || "Action failed" },
      { status: 500 },
    );
  }
}
