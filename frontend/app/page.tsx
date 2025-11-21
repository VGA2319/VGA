// frontend/app/page.tsx

export default function Home() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Selamat Datang di Simple Hotel Booking
      </h1>

      <p style={{ fontSize: "16px", color: "#555", maxWidth: 600, margin: "0 auto" }}>
        Aplikasi pemesanan hotel sederhana. Silakan login atau daftar, lalu cari hotel
        favorit Anda dan lakukan booking dengan mudah.
      </p>

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <a
          href="/auth/login"
          style={{
            padding: "10px 20px",
            background: "#0ea5b7",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Login
        </a>

        <a
          href="/auth/register"
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Register
        </a>

        <a
          href="/hotel"
          style={{
            padding: "10px 20px",
            background: "#444",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Katalog Hotel
        </a>
      </div>
    </main>
  );
}
