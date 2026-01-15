// auth/register/page.tsx
// =======================
// HALAMAN REGISTRASI USER
// =======================

// Menandakan bahwa file ini adalah Client Component
"use client";

// =======================
// IMPORT DEPENDENCY
// =======================

// useState digunakan untuk menyimpan nilai input & status loading
import { useState } from "react";

// useRouter digunakan untuk redirect halaman
import { useRouter } from "next/navigation";

// =======================
// KOMPONEN REGISTER PAGE
// =======================
export default function RegisterPage() {
  // =======================
  // INISIALISASI ROUTER
  // =======================
  const router = useRouter();

  // =======================
  // STATE FORM REGISTRASI
  // =======================

  // State untuk input email
  const [email, setEmail] = useState("");

  // State untuk input password
  const [password, setPassword] = useState("");

  // State untuk menandai proses registrasi
  const [loading, setLoading] = useState(false);

  // =======================
  // FUNGSI SUBMIT REGISTRASI
  // =======================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true); // Aktifkan status loading

    try {
      // =======================
      // REQUEST REGISTER KE API
      // =======================
      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST", // Metode POST
        headers: {
          "Content-Type": "application/json",
        },
        // Data user yang dikirim ke backend
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Ambil response dari server
      const data = await res.json();

      // =======================
      // VALIDASI RESPONSE
      // =======================
      if (!res.ok) {
        throw new Error(data?.meta_data?.message || "Gagal register");
      }

      // =======================
      // REGISTER BERHASIL
      // =======================
      alert("Registrasi berhasil. Silakan login.");

      // Redirect ke halaman login
      router.push("/auth/login");
    }

    // =======================
    // PENANGANAN ERROR
    // =======================
    catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    }

    // =======================
    // AKHIR PROSES REGISTER
    // =======================
    finally {
      setLoading(false); // Matikan status loading
    }
  }

  // =======================
  // TAMPILAN UI REGISTER
  // =======================
  return (
    <div style={{ maxWidth: 480, margin: "40px auto" }}>
      {/* Judul halaman */}
      <h2>Register</h2>

      {/* =======================
          FORM REGISTRASI
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
          {/* Tombol Daftar */}
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
            {loading ? "Memproses..." : "Daftar"}
          </button>

          {/* Link menuju halaman login */}
          <a href="/auth/login" style={{ marginLeft: 8 }}>
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
