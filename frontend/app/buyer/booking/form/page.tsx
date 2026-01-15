"use client"; 
// Wajib di Next.js App Router karena pakai hooks (useState, useEffect, router)

/* ================= IMPORT ================= */

// Hook Next.js untuk ambil query param & navigasi halaman
import { useSearchParams, useRouter } from "next/navigation";

// Hook React untuk state & lifecycle
import { useState, useEffect } from "react";

// Ambil data user login (custom auth)
import { getUser } from "../../../../lib/auth";

/* ================= DATA KAMAR ================= */

// Data kamar statis berdasarkan ID
// Record<string, {...}> = object dengan key string
const ROOM_DATA: Record<string, { name: string; price: number }> = {
  deluxe: { name: "Deluxe Room", price: 850000 },
  suite: { name: "Suite VIP", price: 1500000 },
};

/* ================= COMPONENT ================= */

export default function BookingForm() {
  /* ---------- QUERY PARAM ---------- */

  // Ambil query param dari URL (?room=deluxe)
  const params = useSearchParams();

  // Ambil ID kamar, default ke "deluxe" kalau null
  const roomId = params.get("room") ?? "deluxe";

  // Ambil detail kamar berdasarkan roomId
  const room = ROOM_DATA[roomId];

  /* ---------- AUTH & ROUTER ---------- */

  // Ambil user yang sedang login
  const user = getUser();

  // Router untuk navigasi halaman
  const router = useRouter();

  /* ---------- STATE ---------- */

  // State tanggal check-in
  const [checkIn, setCheckIn] = useState("");

  // State tanggal check-out
  const [checkOut, setCheckOut] = useState("");

  // State error validasi tanggal
  const [error, setError] = useState("");

  /* ---------- VALIDASI TANGGAL ---------- */

  // useEffect dijalankan setiap checkIn / checkOut berubah
  useEffect(() => {
    // Jika tanggal tidak valid (checkout <= checkin)
    if (checkIn && checkOut && checkOut <= checkIn) {
      setError("Tanggal check-out harus setelah check-in");
    } else {
      setError("");
    }
  }, [checkIn, checkOut]);

  /* ---------- SUBMIT BOOKING ---------- */

  async function submit() {
    // Stop jika:
    // - user belum login
    // - tanggal kosong
    // - masih ada error
    if (!user || !checkIn || !checkOut || error) return;

    // Kirim data booking ke API
    await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // Body dikirim dalam format JSON
      body: JSON.stringify({
        userId: user.id,
        roomId,
        name: user.name ?? "Guest",
        email: user.email,
        checkIn,
        checkOut,
      }),
    });

    // Notifikasi sukses
    alert("Booking berhasil");

    // Redirect ke halaman riwayat booking
    router.push("/buyer/booking/history");
  }

  /* ================= RENDER ================= */

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Form Booking</h2>

        {/* Info kamar */}
        <div style={infoBox}>
          <p>
            <strong>Kamar:</strong>{" "}
            <span style={{ color: "gold" }}>{room.name}</span>
          </p>
          <p>
            <strong>Harga:</strong>{" "}
            <span style={{ color: "gold" }}>
              Rp {room.price.toLocaleString("id-ID")} / malam
            </span>
          </p>
        </div>

        {/* Input Check In */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Check In</label>
          <input
            type="date"
            style={inputStyle}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        {/* Input Check Out */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Check Out</label>
          <input
            type="date"
            style={inputStyle}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {/* Pesan error */}
        {error && <p style={errorStyle}>{error}</p>}

        {/* Warning jika belum login */}
        {!user && (
          <p style={loginWarn}>
            Silakan login terlebih dahulu untuk melakukan booking
          </p>
        )}

        {/* Tombol submit */}
        <button
          style={{
            ...buttonStyle,
            opacity: !user || error ? 0.5 : 1,
            cursor: !user || error ? "not-allowed" : "pointer",
          }}
          disabled={!user || !!error}
          onClick={submit}
        >
          Konfirmasi Booking
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES (GLASSMORPHISM) ================= */

// Wrapper halaman
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

// Card utama (blur transparan)
const cardStyle = {
  width: "100%",
  maxWidth: 420,
  padding: 30,
  borderRadius: 18,

  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",

  border: "1px solid rgba(255, 215, 0, 0.4)",
  boxShadow: "0 0 35px rgba(255, 215, 0, 0.25)",
};

// Judul
const titleStyle = {
  textAlign: "center" as const,
  color: "gold",
  marginBottom: 20,
};

// Box info kamar
const infoBox = {
  background: "rgba(0, 0, 0, 0.35)",
  padding: 14,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.15)",
  marginBottom: 20,
  fontSize: 14,
};

// Wrapper field
const fieldStyle = {
  marginBottom: 18,
};

// Label input
const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 13,
  color: "#ddd",
};

// Input date
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(0,0,0,0.45)",
  color: "white",
  outline: "none",
};

// Tombol submit
const buttonStyle = {
  width: "100%",
  padding: "12px 0",
  background: "linear-gradient(135deg, gold, #ffd700, #f5c542)",
  color: "black",
  border: "none",
  borderRadius: 10,
  fontWeight: "bold",
  fontSize: 15,
  transition: "all 0.3s ease",
};

// Pesan error
const errorStyle = {
  color: "#ff6b6b",
  fontSize: 13,
  marginBottom: 10,
};

// Warning login
const loginWarn = {
  color: "#f5c542",
  fontSize: 13,
  marginBottom: 12,
  textAlign: "center" as const,
};
