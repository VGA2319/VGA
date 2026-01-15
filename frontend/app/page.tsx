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
    // <main> berfungsi sebagai pembungkus seluruh konten halaman utama
    <main
      style={{
        padding: "80px 20px", // Jarak atas-bawah dan kiri-kanan halaman
        textAlign: "center", // Semua teks berada di tengah
        animation: "fadeIn 0.8s ease", // Efek animasi saat halaman muncul
      }}
    >
      {/* =======================
          HERO BOX / BAGIAN UTAMA
          ======================= */}
      {/* Bagian ini menampilkan judul utama dan deskripsi website */}
      <div
        style={{
          maxWidth: 800, // Lebar maksimal box
          margin: "0 auto", // Posisi di tengah halaman
          padding: "32px 28px", // Ruang dalam box
          borderRadius: 20, // Sudut membulat
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))",
          border: "1px solid rgba(255,215,0,0.35)", // Border warna emas
          backdropFilter: "blur(6px)", // Efek blur kaca
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)", // Bayangan
        }}
      >
        {/* =======================
            JUDUL WEBSITE
            ======================= */}
        <h1
          style={{
            fontSize: 46, // Ukuran teks besar
            color: "gold", // Warna emas
            marginBottom: 14, // Jarak bawah judul
            letterSpacing: 1.5, // Jarak antar huruf
            textTransform: "uppercase", // Huruf kapital semua
          }}
        >
          VGA International Hotel
        </h1>

        {/* =======================
            DESKRIPSI WEBSITE
            ======================= */}
        <p
          style={{
            fontSize: 18, // Ukuran teks deskripsi
            color: "#eee", // Warna abu terang
            maxWidth: 650, // Lebar maksimal teks
            margin: "0 auto", // Tengah
            lineHeight: 1.7, // Jarak antar baris
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
      {/* Tombol untuk berpindah ke halaman lain */}
      <div
        style={{
          marginTop: 40, // Jarak dari hero box
          display: "flex", // Layout fleksibel
          justifyContent: "center", // Posisi tombol di tengah
          gap: 20, // Jarak antar tombol
          flexWrap: "wrap", // Responsif ke bawah jika layar kecil
        }}
      >
        {/* Tombol menuju halaman Home */}
        <Link href="/home" className="btn-gold">
          Home
        </Link>

        {/* Tombol menuju halaman Login */}
        <Link href="/auth/login" className="btn-white">
          Login
        </Link>

        {/* Tombol menuju halaman Register */}
        <Link href="/auth/register" className="btn-white">
          Register
        </Link>

        {/* Tombol menuju katalog hotel */}
        <Link
          href="/hotel"
          className="btn-gold"
          style={{ background: "#111" }}
        >
          Katalog Hotel
        </Link>
      </div>

      {/* =======================
          KARTU FITUR / KEUNGGULAN
          ======================= */}
      {/* Menampilkan keunggulan hotel dalam bentuk kartu */}
      <div
        style={{
          marginTop: 70, // Jarak dari tombol
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        {/* Data fitur hotel */}
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
          // =======================
          // KARTU FITUR INDIVIDU
          // =======================
          <div
            key={i}
            style={{
              width: 260, // Lebar kartu
              padding: "22px 18px", // Ruang dalam kartu
              borderRadius: 16, // Sudut membulat
              background: "rgba(0,0,0,0.65)", // Background gelap
              border: "1px solid rgba(255,215,0,0.3)", // Border emas
              backdropFilter: "blur(6px)", // Efek blur
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)", // Bayangan
            }}
          >
            {/* Judul fitur */}
            <h3
              style={{
                color: "gold",
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              {item.title}
            </h3>

            {/* Deskripsi fitur */}
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
