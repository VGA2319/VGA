"use client"; // Menandakan komponen ini berjalan di client-side (boleh pakai hook)

import Link from "next/link"; // Navigasi antar halaman tanpa reload
import Image from "next/image"; // Optimasi gambar bawaan Next.js
import { useRouter } from "next/navigation"; // Router untuk redirect halaman
import { useEffect, useState } from "react"; // Hook React

export default function HomePage() {
  const router = useRouter(); // Inisialisasi router
  const [isLogin, setIsLogin] = useState(false); // State untuk cek user login atau tidak

  useEffect(() => {
    // Ambil data user dari localStorage saat halaman dibuka
    const user = localStorage.getItem("user");
    setIsLogin(!!user); // Jika ada user → true, jika tidak → false
  }, []); // Dijalankan sekali saat komponen mount

  function handleLogout() {
    // Konfirmasi logout ke user
    const confirmLogout = window.confirm("Yakin ingin logout?");
    if (!confirmLogout) return; // Jika batal → stop

    localStorage.removeItem("user"); // Hapus data login
    router.push("/auth/login"); // Redirect ke halaman login
  }

  return (
    <>
      {/* ================= CSS GLOBAL HALAMAN ================= */}
      <style>{`
        .home-btn {
          display: flex; /* Flex layout */
          justify-content: center; /* Tengah horizontal */
          gap: 16px; /* Jarak antar tombol */
          flex-wrap: wrap; /* Responsif */
          margin-top: 40px;
        }

        .btn-gold {
          background: gold; /* Warna emas */
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
          background: #b91c1c; /* Warna merah */
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
          transform: translateY(-2px); /* Efek hover naik */
        }
      `}</style>

      {/* ================= SECTION ABOUT ================= */}
      <section style={{ padding: "80px 20px" }}> {/* Padding section */}
        <div
          style={{
            maxWidth: 1100, // Lebar maksimal konten
            margin: "0 auto", // Tengah halaman
            display: "grid", // Grid layout
            gridTemplateColumns: "1fr 1fr", // Dua kolom
            gap: 50, // Jarak antar kolom
            alignItems: "center", // Vertikal tengah
          }}
        >
          {/* Gambar hotel */}
          <Image
            src="/interior_hotel.png" // Path gambar
            alt="Hotel"
            width={600}
            height={400}
            style={{ borderRadius: 20 }} // Sudut membulat
          />

          {/* Box deskripsi hotel */}
          <div
            style={{
              background: "rgba(0,0,0,0.6)", // Background gelap transparan
              padding: 30,
              borderRadius: 20,
            }}
          >
            <h2 style={{ color: "gold" }}>VGA International Hotel</h2> {/* Judul */}
            <p style={{ color: "#fff" }}>
              Hotel berkelas internasional dengan kemewahan dan pelayanan terbaik.
            </p> {/* Deskripsi */}
          </div>
        </div>
      </section>

      {/* ================= SECTION BUTTON ================= */}
      <section>
        <div className="home-btn">
          {/* Tombol menuju katalog hotel */}
          <Link href="/buyer/hotel" className="btn-outline">
            Katalog Hotel
          </Link>

          {/* Tombol menuju halaman booking */}
          <Link href="/buyer/booking" className="btn-gold">
            Booking Kamar
          </Link>

          {/* Tombol logout hanya muncul jika user login */}
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
