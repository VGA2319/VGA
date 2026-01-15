"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser } from "../../../../lib/auth";

const ROOM_DATA: Record<string, { name: string; price: number }> = {
  deluxe: { name: "Deluxe Room", price: 850000 },
  suite: { name: "Suite VIP", price: 1500000 },
};

export default function BookingForm() {
  const params = useSearchParams();
  const roomId = params.get("room") ?? "deluxe";
  const room = ROOM_DATA[roomId];

  const user = getUser();
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setError("Tanggal check-out harus setelah check-in");
    } else {
      setError("");
    }
  }, [checkIn, checkOut]);

  async function submit() {
    if (!user || !checkIn || !checkOut || error) return;

    await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        roomId,
        name: user.name ?? "Guest",
        email: user.email,
        checkIn,
        checkOut,
      }),
    });

    alert("Booking berhasil");
    router.push("/buyer/booking/history");
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Form Booking</h2>

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

        <div style={fieldStyle}>
          <label style={labelStyle}>Check In</label>
          <input
            type="date"
            style={inputStyle}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Check Out</label>
          <input
            type="date"
            style={inputStyle}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        {!user && (
          <p style={loginWarn}>
            Silakan login terlebih dahulu untuk melakukan booking
          </p>
        )}

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

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

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

const titleStyle = {
  textAlign: "center" as const,
  color: "gold",
  marginBottom: 20,
};

const infoBox = {
  background: "rgba(0, 0, 0, 0.35)",
  padding: 14,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.15)",
  marginBottom: 20,
  fontSize: 14,
};

const fieldStyle = {
  marginBottom: 18,
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 13,
  color: "#ddd",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(0,0,0,0.45)",
  color: "white",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px 0",
  background:
    "linear-gradient(135deg, gold, #ffd700, #f5c542)",
  color: "black",
  border: "none",
  borderRadius: 10,
  fontWeight: "bold",
  fontSize: 15,
  transition: "all 0.3s ease",
};

const errorStyle = {
  color: "#ff6b6b",
  fontSize: 13,
  marginBottom: 10,
};

const loginWarn = {
  color: "#f5c542",
  fontSize: 13,
  marginBottom: 12,
  textAlign: "center" as const,
};
