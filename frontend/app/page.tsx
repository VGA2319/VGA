// app/page.tsx
// =======================
// HALAMAN UTAMA (LANDING PAGE)
// =======================

// Import Link dari Next.js untuk navigasi antar halaman tanpa reload
import Link from "next/link";

// =======================
// KOMPONEN HOME
// =======================
// Komponen utama yang akan ditampilkan saat user membuka "/"
export default function Home() {
  return (
    // =======================
    // CONTAINER UTAMA HALAMAN
    // =======================
    <main
      style={{
        padding: "80px 20px",
        textAlign: "center",
        animation: "fadeIn 0.8s ease",
      }}
    >
      {/* =======================
          HERO BOX / BAGIAN UTAMA
          ======================= */}
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
        {/* Judul website */}
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

        {/* Deskripsi website */}
        <p
          style={{
            fontSize: 18,
            color: "#eee",
            maxWidth: 650,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Temukan pengalaman menginap terbaik dengan kemewahan kelas dunia.
          Pilih hotel favorit Anda dan lakukan booking hanya dalam hitungan
          detik.
        </p>
      </div>

      {/* =======================
          GRUP TOMBOL NAVIGASI
          ======================= */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {/* =======================
            TOMBOL HOME
            ======================= */}
        {/* 
          Tombol Home DIARAHKAN ke halaman login
          Tujuan: user harus login terlebih dahulu
        */}
        <Link href="/auth/login" className="btn-gold">
          Home
        </Link>

        {/* Tombol Login (tetap ke login) */}
        <Link href="/auth/login" className="btn-white">
          Login
        </Link>

        {/* Tombol Register (tetap ke register) */}
        <Link href="/auth/register" className="btn-white">
          Register
        </Link>

        {/* =======================
            TOMBOL KATALOG HOTEL
            ======================= */}
        {/* 
          Tombol Katalog Hotel DIARAHKAN ke halaman login
          Tujuan: mencegah user mengakses katalog tanpa login
        */}
        <Link
          href="/auth/login"
          className="btn-gold"
          style={{ background: "#111" }}
        >
          Katalog Hotel
        </Link>
      </div>

      {/* =======================
          KARTU FITUR / KEUNGGULAN
          ======================= */}
      <div
        style={{
          marginTop: 70,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        {[
          {
            title: "Kemewahan",
            text: "Hotel premium dengan kenyamanan kelas dunia.",
          },
          {
            title: "Pelayanan",
            text: "Tim profesional siap melayani Anda 24/7.",
          },
          {
            title: "Booking Cepat",
            text: "Proses pemesanan mudah dan aman.",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              width: 260,
              padding: "22px 18px",
              borderRadius: 16,
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,215,0,0.3)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <h3
              style={{
                color: "gold",
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#ddd",
                lineHeight: 1.6,
                fontSize: 15,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
