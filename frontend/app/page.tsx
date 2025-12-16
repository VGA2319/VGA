// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: "80px 20px",
        textAlign: "center",
        animation: "fadeIn 0.8s ease",
      }}
    >
      {/* ================= HERO BOX ================= */}
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
        {/* HERO TITLE */}
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

       {/* ================= BUTTON GROUP ================= */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Link href="/home" className="btn-gold">
          Home
        </Link>

        <Link href="/auth/login" className="btn-white">
          Login
        </Link>

        <Link href="/auth/register" className="btn-white">
          Register
        </Link>

        <Link
          href="/hotel"
          className="btn-gold"
          style={{ background: "#111" }}
        >
          Katalog Hotel
        </Link>
      </div>

      {/* ================= FEATURE CARDS ================= */}
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
              background: "rgba(0,0,0,0.65)", // 🔥 LEBIH GELAP
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
          </div>
      </div>
    </main>
  );
}