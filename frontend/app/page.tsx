// app/page.tsx – Halaman utama (Landing Page)

import Link from "next/link"; // Navigasi antar halaman tanpa reload

export default function Home() {
  return (
    <main
      style={{
        padding: "80px 20px", // Spasi halaman
        textAlign: "center", // Posisi teks tengah
        animation: "fadeIn 0.8s ease", // Animasi masuk
      }}
    >
      <div
        style={{
          maxWidth: 800, // Lebar maksimal konten
          margin: "0 auto", // Posisi tengah
          padding: "32px 28px", // Padding box
          borderRadius: 20, // Sudut membulat
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.35))", // Background gelap
          border: "1px solid rgba(255,215,0,0.35)", // Border emas
          backdropFilter: "blur(6px)", // Efek blur
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)", // Bayangan
        }}
      >
        <h1
          style={{
            fontSize: 46, // Ukuran judul
            color: "gold", // Warna emas
            marginBottom: 14, // Jarak bawah
            letterSpacing: 1.5, // Spasi huruf
            textTransform: "uppercase", // Huruf kapital
          }}
        >
          VGA International Hotel
        </h1>

        <p
          style={{
            fontSize: 18, // Ukuran teks
            color: "#eee", // Warna teks
            maxWidth: 650, // Lebar maksimal
            margin: "0 auto", // Posisi tengah
            lineHeight: 1.7, // Jarak baris
          }}
        >
          Temukan pengalaman menginap terbaik dengan kemewahan kelas dunia.
          Pilih hotel favorit Anda dan lakukan booking hanya dalam hitungan
          detik.
        </p>
      </div>

      <div
        style={{
          marginTop: 40, // Jarak dari hero
          display: "flex", // Layout flex
          justifyContent: "center", // Posisi tengah
          gap: 20, // Jarak antar tombol
          flexWrap: "wrap", // Responsif
        }}
      >
        <Link href="/auth/login" className="btn-gold">
          Home
        </Link>

        <Link href="/auth/login" className="btn-white">
          Login
        </Link>

        <Link href="/auth/register" className="btn-white">
          Register
        </Link>

        <Link
          href="/auth/login"
          className="btn-gold"
          style={{ background: "#111" }} // Warna gelap
        >
          Katalog Hotel
        </Link>
      </div>

      <div
        style={{
          marginTop: 70, // Jarak section
          display: "flex", // Layout flex
          justifyContent: "center", // Tengah
          gap: 30, // Jarak kartu
          flexWrap: "wrap", // Responsif
        }}
      >
        {[
          { title: "Kemewahan", text: "Hotel premium dengan kenyamanan kelas dunia." },
          { title: "Pelayanan", text: "Tim profesional siap melayani Anda 24/7." },
          { title: "Booking Cepat", text: "Proses pemesanan mudah dan aman." },
        ].map((item, i) => (
          <div
            key={i} // Key list
            style={{
              width: 260, // Lebar kartu
              padding: "22px 18px", // Padding
              borderRadius: 16, // Sudut
              background: "rgba(0,0,0,0.65)", // Background gelap
              border: "1px solid rgba(255,215,0,0.3)", // Border emas
              backdropFilter: "blur(6px)", // Blur
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)", // Shadow
            }}
          >
            <h3
              style={{
                color: "gold", // Warna judul
                marginBottom: 10, // Jarak bawah
                fontSize: 20, // Ukuran
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#ddd", // Warna teks
                lineHeight: 1.6, // Jarak baris
                fontSize: 15, // Ukuran teks
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
