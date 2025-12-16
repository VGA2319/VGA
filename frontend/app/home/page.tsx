// app/home/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ================= ABOUT ================= */}
      <section className="about">
        <div className="about-container">
          <div className="about-image">
            {/* ✅ PATH GAMBAR BENAR */}
            <img
              src="/interior_hotel.jpg"
              alt="Interior VGA Hotel"
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
            <p>
              Dengan layanan profesional dan fasilitas lengkap, VGA
              International Hotel menjadi pilihan ideal untuk wisatawan,
              pebisnis, dan acara eksklusif.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURE / HOME ================= */}
      <section className="home">
        <div className="home-content">
          <div className="feature-box">
            <div className="feature-card">
              <h3>Kemewahan Premium</h3>
              <p>
                Interior elegan dengan fasilitas modern bertaraf internasional.
              </p>
            </div>

            <div className="feature-card">
              <h3>Pelayanan Profesional</h3>
              <p>
                Staf ramah dan berpengalaman siap melayani Anda 24/7.
              </p>
            </div>

            <div className="feature-card">
              <h3>Booking Cepat</h3>
              <p>
                Proses pemesanan mudah, aman, dan efisien.
              </p>
            </div>
          </div>

          <div className="home-btn">
            <Link href="/booking">Mulai Booking</Link>
          </div>
        </div>
      </section>
    </>
  );
}
