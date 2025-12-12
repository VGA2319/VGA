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

      
    </main>
  );
}
