// app/home/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <>
    {/* ================= INTERNAL CSS ================= */}
      <style>{`
        .about {
          padding: 80px 20px;
        }
        
        .about-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }
      `}</style>
    </>
  )
}