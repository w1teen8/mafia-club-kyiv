import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "MAFIA CLUB KYIV — Психологічна гра Мафія у Києві";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#070707",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(200,168,107,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(123,17,19,0.25), transparent 45%)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 128,
            borderRadius: 8,
            border: "2px solid rgba(200,168,107,0.6)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
            color: "#c8a86b",
            fontSize: 56,
          }}
        >
          ♠
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 68,
            letterSpacing: 4,
            fontWeight: 600,
          }}
        >
          MAFIA CLUB KYIV
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            color: "#b0b0b0",
            fontSize: 28,
            letterSpacing: 2,
          }}
        >
          Психологічна гра, де кожне рішення змінює історію
        </div>
      </div>
    ),
    { ...size },
  );
}
