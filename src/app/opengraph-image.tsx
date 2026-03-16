import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "새로운마케팅 - 동물병원 전문 마케팅";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* 배경 블러 원 */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(59,130,246,0.08)",
            filter: "blur(80px)",
          }}
        />

        {/* 뱃지 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: 999,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <span style={{ color: "#93c5fd", fontSize: 16, fontWeight: 600 }}>
            수의사가 직접 운영하는 마케팅 에이전시
          </span>
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            marginBottom: 16,
            letterSpacing: "-1px",
          }}
        >
          새로운마케팅
        </div>

        {/* 서브타이틀 */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#94a3b8",
            marginBottom: 48,
          }}
        >
          동물병원 전문 마케팅
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: 60,
            height: 3,
            background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
            borderRadius: 999,
            marginBottom: 48,
          }}
        />

        {/* 태그라인 */}
        <div
          style={{
            fontSize: 20,
            color: "#64748b",
          }}
        >
          saerounmarketing.com
        </div>
      </div>
    ),
    size
  );
}
