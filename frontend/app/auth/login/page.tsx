"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ambil query ?room=...
  const room = searchParams.get("room");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal login");
      }

      // simpan user login
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ REDIRECT CERDAS
      if (room) {
        // login dari booking
        router.push(`/booking?room=${room}`);
      }
      else {
        // login biasa
        router.push("/home");
      }
    } 
    
    catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto" }}>
      <h2>Login</h2>

      {/* info jika dari booking */}
      {room && (
        <p style={{ color: "gold", marginBottom: 12 }}>
          Silakan login untuk memesan kamar
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            type="submit"
            disabled={loading}
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

          <a href="/auth/register" style={{ marginLeft: 8 }}>
            Daftar
          </a>
        </div>
      </form>
    </div>
  );
}