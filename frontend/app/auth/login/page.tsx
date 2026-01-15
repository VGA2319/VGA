// auth/login/page.tsx
// =======================
// HALAMAN LOGIN USER
// =======================

// Menandakan bahwa file ini adalah Client Component
"use client";

// =======================
// IMPORT DEPENDENCY
// =======================

// useState digunakan untuk menyimpan state input & loading
import { useState } from "react";

// useRouter untuk navigasi halaman
// useSearchParams untuk membaca query parameter (?room=...)
import { useRouter, useSearchParams } from "next/navigation";

// =======================
// KOMPONEN LOGIN PAGE
// =======================
export default function LoginPage() {
  // =======================
  // INISIALISASI ROUTER
  // =======================
  const router = useRouter();

  // =======================
  // AMBIL QUERY PARAMETER
  // =======================
  const searchParams = useSearchParams();

  // Ambil nilai query ?room=...
  const room = searchParams.get("room");

  // =======================
  // STATE FORM LOGIN
  // =======================

  // State untuk input email
  const [email, setEmail] = useState("");

  // State untuk input password
  const [password, setPassword] = useState("");

  // State untuk menandai proses login sedang berlangsung
  const [loading, setLoading] = useState(false);

  // =======================
  // FUNGSI SUBMIT LOGIN
  // =======================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true); // Aktifkan status loading

    try {
      // =======================
      // REQUEST LOGIN KE API
      // =======================
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST", // Metode POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Kirim data login
      });

      // Ambil response JSON
      const data = await res.json();

      // Jika response error
      if (!res.ok) {
        throw new Error(data.message || "Gagal login");
      }

      // =======================
      // SIMPAN DATA USER
      // =======================
      // Menyimpan data user ke localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // =======================
      // REDIRECT CERDAS
      // =======================
      // Jika login berasal dari halaman booking
      if (room) {
        router.push(`/buyer/booking/form?room=${room}`);
      } else {
        // Jika login biasa
        router.push("/buyer/home");
      }
    } 
    
    // =======================
    // PENANGANAN ERROR
    // =======================
    catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    }

    // =======================
    // AKHIR PROSES LOGIN
    // =======================
    finally {
      setLoading(false); // Matikan status loading
    }
  }

  // =======================
  // TAMPILAN UI LOGIN
  // =======================
  return (
    <div style={{ maxWidth: 480, margin: "40px auto" }}>
      {/* Judul halaman */}
      <h2>Login</h2>

      {/* =======================
          INFO JIKA DARI BOOKING
          ======================= */}
      {/* Pesan khusus jika user login sebelum booking */}
      {room && (
        <p style={{ color: "gold", marginBottom: 12 }}>
          Silakan login untuk memesan kamar
        </p>
      )}

      {/* =======================
          FORM LOGIN
          ======================= */}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        {/* Input Email */}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state email
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        {/* Input Password */}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state password
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        {/* =======================
            TOMBOL & LINK
            ======================= */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading} // Nonaktif saat loading
            style={{
              padding: "8px 14px",
              background: "#0ea5b7",
              color: "white",
              border: "none",
              borderRadius: 6,
            }}
          >
            {loading ? "Memproses..." : "Login"}
          </button>

          {/* Link ke halaman register */}
          <a href="/auth/register" style={{ marginLeft: 8 }}>
            Daftar
          </a>
        </div>
      </form>
    </div>
  );
}
