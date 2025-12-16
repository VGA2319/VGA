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

        .about-image img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.6);
        }
      `}</style>
    </>
  )
}