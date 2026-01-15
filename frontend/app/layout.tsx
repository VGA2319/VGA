// app/layout.tsx
// =======================
// ROOT LAYOUT APLIKASI
// =======================

// Import file CSS global yang digunakan di seluruh aplikasi
import "./globals.css";

// Import Link dari Next.js (disiapkan untuk navigasi jika dibutuhkan)
import Link from "next/link";

// Import tipe ReactNode untuk mendefinisikan children
import { ReactNode } from "react";

// =======================
// METADATA WEBSITE
// =======================
// Metadata ini digunakan oleh Next.js untuk SEO dan judul browser
export const metadata = {
  title: "VGA International Hotel Booking",
  description: "Aplikasi booking hotel sederhana",
};

// =======================
// KOMPONEN ROOT LAYOUT
// =======================
// Layout utama yang membungkus seluruh halaman aplikasi
export default function RootLayout({
  children,
}: {
  children: ReactNode; // children adalah isi halaman yang berubah-ubah
}) {
  return (
    // =======================
    // STRUKTUR DASAR HTML
    // =======================
    <html lang="id">
      <body>
        {/* =======================
            HEADER / NAVBAR ATAS
            ======================= */}
        {/* Header ini akan muncul di semua halaman */}
        <header
          style={{
            background: "#000", // Background hitam
            borderBottom: "1px solid rgba(255,215,0,0.3)", // Garis bawah warna emas
            padding: "20px 0", // Jarak atas dan bawah
          }}
        >
          {/* Container header agar konten rata tengah */}
          <div
            style={{
              maxWidth: 1100, // Lebar maksimal header
              margin: "0 auto", // Posisi di tengah
              display: "flex", // Layout horizontal
              alignItems: "center", // Rata tengah vertikal
              gap: 16, // Jarak antar elemen
              padding: "0 16px", // Padding kiri dan kanan
            }}
          >
            {/* =======================
                LOGO HOTEL
                ======================= */}
            <img
              src="/LOGO_HOTEL.png"
              alt="VGA Logo"
              style={{
                width: 48, // Lebar logo
                height: 48, // Tinggi logo
                objectFit: "cover", // Gambar proporsional
                borderRadius: 10, // Sudut membulat
                border: "2px solid gold", // Border emas
              }}
            />

            {/* =======================
                JUDUL APLIKASI
                ======================= */}
            <h1
              style={{
                margin: 0, // Hilangkan margin default
                color: "gold", // Warna teks emas
                fontSize: 22, // Ukuran font
                whiteSpace: "nowrap", // Teks tidak turun baris
              }}
            >
              VGA INTERNATIONAL HOTEL BOOKING
            </h1>
          </div>
        </header>

        {/* =======================
            KONTEN UTAMA HALAMAN
            ======================= */}
        {/* Bagian ini akan diisi oleh page.tsx atau halaman lainnya */}
        <main
          style={{
            maxWidth: 1100, // Lebar maksimal konten
            margin: "40px auto", // Jarak atas-bawah dan posisi tengah
            padding: "0 16px", // Padding kiri-kanan
            minHeight: "60vh", // Tinggi minimum konten
          }}
        >
          {children}
        </main>

        {/* =======================
            FOOTER WEBSITE
            ======================= */}
        {/* Footer yang tampil di bagian bawah semua halaman */}
        <footer
          style={{
            textAlign: "center", // Teks di tengah
            color: "gold", // Warna teks emas
            marginTop: 60, // Jarak dari konten utama
            padding: 30, // Ruang dalam footer
            borderTop: "1px solid rgba(255,215,0,0.3)", // Garis atas emas
          }}
        >
          © VGA INTERNATIONAL HOTEL
        </footer>
      </body>
    </html>
  );
}
