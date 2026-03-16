import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, hospital, phone, concern } = body;

    // 필수 필드 검증
    if (!name || !hospital || !phone) {
      return NextResponse.json(
        { error: "필수 항목이 누락됐습니다." },
        { status: 400 }
      );
    }

    // Make(Integromat) 웹훅으로 전송 (나중에 MAKE_WEBHOOK_URL 환경변수 설정)
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          hospital,
          phone,
          concern: concern || "(없음)",
          submittedAt: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
