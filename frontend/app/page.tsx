// frontend/app/page.tsx

export default function Home() {
  return (
    <main
      style={{
        padding: "60px 20px",
        textAlign: "center",
        animation: "fadeIn 0.8s ease",
      }}
    >
      {/* HERO TITLE */}
      <h1 style={{ fontSize: 40, color: "gold", marginBottom: 12 }}>
        VGA International Hotel
      </h1>

      <p
        style={{
          fontSize: 18,
          color: "#ddd",
          maxWidth: 650,
          margin: "0 auto",
        }}
      >
        Temukan pengalaman menginap terbaik dengan kemewahan kelas dunia.  
        Pilih hotel favorit Anda dan lakukan booking hanya dalam hitungan detik.
      </p>

      {/* BUTTON GROUP */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <a href="/auth/login" className="btn-gold">
          Login
        </a>

        <a href="/auth/register" className="btn-white">
          Register
        </a>

        <a href="/hotel" className="btn-gold" style={{ background: "#111" }}>
          Katalog Hotel
        </a>
      </div>

      {/* FEATURE CARDS */}
      <div
        style={{
          marginTop: 60,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        <div className="card-shape" style={{ width: 260 }}>
          <h3 style={{ color: "gold", marginBottom: 8 }}>Kemewahan</h3>
          <p style={{ color: "#ccc" }}>
            Hotel premium dengan kenyamanan kelas dunia.
          </p>
        </div>

        <div className="card-shape" style={{ width: 260 }}>
          <h3 style={{ color: "gold", marginBottom: 8 }}>Pelayanan</h3>
          <p style={{ color: "#ccc" }}>
            Tim profesional siap melayani Anda 24/7.
          </p>
        </div>

        <div className="card-shape" style={{ width: 260 }}>
          <h3 style={{ color: "gold", marginBottom: 8 }}>Booking Cepat</h3>
          <p style={{ color: "#ccc" }}>
            Proses pemesanan mudah dan aman.
          </p>
        </div>
      </div>
    </main>
  );
}
