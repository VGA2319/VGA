"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
    // State untuk menyimpan status login user
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLogin(!!user);
  }, []);

  function handleLogout() {
    const confirmLogout = window.confirm("Yakin ingin logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("user");
    router.push("/auth/login");
  }

  return (
    <>
      <style>{`
        .home-btn {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        .btn-gold {
          background: gold;
          color: black;
          padding: 14px 36px;
          border-radius: 40px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn-outline {
          background: transparent;
          color: gold;
          padding: 14px 36px;
          border-radius: 40px;
          font-weight: 600;
          border: 1px solid gold;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn-danger {
          background: #b91c1c;
          color: white;
          padding: 14px 36px;
          border-radius: 40px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-gold:hover,
        .btn-outline:hover,
        .btn-danger:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* ================= ABOUT ================= */}
      <section style={{ padding: "80px 20px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 50,
            alignItems: "center",
          }}
        >
          <Image
            src="/interior_hotel.png"
            alt="Hotel"
            width={600}
            height={400}
            style={{ borderRadius: 20 }}
          />

          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              padding: 30,
              borderRadius: 20,
            }}
          >
            <h2 style={{ color: "gold" }}>VGA International Hotel</h2>
            <p style={{ color: "#fff" }}>
              Hotel berkelas internasional dengan kemewahan dan pelayanan terbaik.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BUTTON ================= */}
      <section>
        <div className="home-btn">
          <Link href="/buyer/hotel" className="btn-outline">
            Katalog Hotel
          </Link>

          <Link href="/buyer/booking" className="btn-gold">
            Booking Kamar
          </Link>

          {isLogin && (
            <button onClick={handleLogout} className="btn-danger">
              Logout
            </button>
          )}
        </div>
      </section>
    </>
  );
}
