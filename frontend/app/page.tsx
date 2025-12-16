// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: "80px 20px",
        textAlign: "center",
        animation: "fadeIn 0.8s ease",
      }}
    >
      {/* ================= HERO BOX ================= */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "32px 28px",
          borderRadius: 20,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))",
          border: "1px solid rgba(255,215,0,0.35)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* HERO TITLE */}
        <h1
          style={{
            fontSize: 46,
            color: "gold",
            marginBottom: 14,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          VGA International Hotel
        </h1>
      </div>
    </main>
  );
}