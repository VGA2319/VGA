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

        .about-content h2 {
          color: gold;
          font-size: 36px;
          margin-bottom: 18px;
          letter-spacing: 1px;
        }

          .about-content p {
          color: #ddd;
          line-height: 1.8;
          margin-bottom: 14px;
          font-size: 16px;
        }

          .home {
          padding: 60px 20px 100px;
        }

          .home-content {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

         .feature-box {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }
      `}</style>
    </>
  )
}