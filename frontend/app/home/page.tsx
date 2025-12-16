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

         .feature-card {
          padding: 26px 22px;
          border-radius: 18px;
          background: rgba(0,0,0,0.65);
          border: 1px solid rgba(255,215,0,0.3);
          backdrop-filter: blur(6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

          .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.8);
        }

        .feature-card h3 {
          color: gold;
          font-size: 22px;
          margin-bottom: 10px;
        }

           .feature-card p {
          color: #ddd;
          font-size: 15px;
          line-height: 1.6;
        }

        .home-btn a {
          display: inline-block;
          padding: 14px 32px;
          background: gold;
          color: black;
          border-radius: 40px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

         .home-btn a:hover {
          background: #e6c200;
          transform: translateY(-2px);
        }

           @media (max-width: 768px) {
          .about-container {
            grid-template-columns: 1fr;
          }

          .about-content h2 {
            font-size: 30px;
          }
        }
      `}</style>

      {/* ================= ABOUT ================= */}
      <section className="about">
        <div className="about-container">
          <div className="about-image">
            <Image
              src="/interior_hotel.jpg"
              alt="Interior VGA Hotel"
              width={600}
              height={400}
              style={{ borderRadius: "20px", boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}
            />
          </div>

          <div className="about-content">
            <h2>VGA International Hotel</h2>
            <p>
              VGA International Hotel merupakan hotel berkelas internasional
              yang menghadirkan perpaduan kemewahan, kenyamanan, dan pelayanan
              profesional dalam suasana eksklusif dan elegan.
            </p>
            <p>
              Setiap kamar dirancang dengan desain modern, fasilitas premium,
              serta pencahayaan hangat yang menciptakan pengalaman menginap
              berkesan.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}