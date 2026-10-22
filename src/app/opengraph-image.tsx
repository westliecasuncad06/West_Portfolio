import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}: ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const clips = ["Intro", "About", "Work", "Skills", "Path", "Certificates", "Contact"];
const widths = [10, 10, 34, 14, 9, 11, 12];

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0b0a0f", padding: 72, color: "#f1f1f3" }}>
        <div style={{ fontSize: 26, color: "#8f8e9b" }}>{profile.role}</div>
        <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -3, lineHeight: 1, marginTop: 24 }}>{profile.name}</div>
        <div style={{ fontSize: 48, fontWeight: 600, marginTop: 28, color: "#f1f1f3" }}>{profile.tagline}</div>
        <div style={{ display: "flex", marginTop: "auto", position: "relative", height: 52 }}>
          {clips.map((c, i) => (
            <div
              key={c}
              style={{
                width: `${widths[i]}%`,
                height: 44,
                marginTop: 8,
                marginRight: 4,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
                fontSize: 18,
                borderRadius: 4,
                border: `1px solid ${i === 2 ? "#5ba030" : "#24232c"}`,
                background: i === 2 ? "#24232c" : "#17161c",
                color: i === 2 ? "#f1f1f3" : "#8f8e9b",
              }}
            >
              {c}
            </div>
          ))}
          <div style={{ position: "absolute", left: "31%", top: 0, width: 4, height: 60, background: "#5ba030" }} />
        </div>
      </div>
    ),
    size,
  );
}
