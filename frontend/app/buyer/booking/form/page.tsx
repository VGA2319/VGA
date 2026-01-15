"use client";
// Wajib pakai "use client" karena kita menggunakan useState, useEffect, dan router

/* ================= IMPORT ================= */

// Hook Next.js untuk membaca query param (?room=deluxe / ?room=suite)
import { useSearchParams, useRouter } from "next/navigation";

// Hook React untuk state dan lifecycle
import { useState, useEffect } from "react";

// Ambil data user login dari sistem auth kamu
import { getUser } from "@/lib/auth";

/* ================= DATA KAMAR ================= */

// Mapping kamar UI ke ID database
// deluxe → id 2
// suite  → id 3
const ROOM_DATA: Record<
  string,
  { id: number; name: string; price: number }
> = {
  deluxe: { id: 2, name: "Deluxe Room", price: 850000 },
  suite: { id: 3, name: "Suite VIP", price: 1500000 },
};

/* ================= COMPONENT ================= */

export default function BookingForm() {
  /* ---------- QUERY PARAM ---------- */

  // Ambil query param dari URL
  // Contoh URL: /booking/form?room=deluxe
  const params = useSearchParams();

  // Ambil nilai room dari query param, default "deluxe"
  const roomKey = params.get("room") ?? "deluxe";

  // Ambil detail kamar berdasarkan roomKey
  const room = ROOM_DATA[roomKey];

  /* ---------- AUTH & ROUTER ---------- */

  // Ambil data user yang sedang login
  const user = getUser();

  // Router untuk redirect halaman
  const router = useRouter();

  /* ---------- STATE ---------- */

  // State untuk nama pemesan (bisa diisi manual)
  const [name, setName] = useState(user?.name ?? "");

  // State untuk email (opsional, bisa otomatis dari user)
  const [email, setEmail] = useState(user?.email ?? "");

  // State untuk tanggal check-in
  const [checkIn, setCheckIn] = useState("");

  // State untuk tanggal check-out
  const [checkOut, setCheckOut] = useState("");

  // State untuk pesan error validasi
  const [error, setError] = useState("");

  // State untuk loading saat submit
  const [loading, setLoading] = useState(false);

  /* ---------- VALIDASI TANGGAL ---------- */

  // Setiap kali checkIn atau checkOut berubah, lakukan validasi
  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setError("Tanggal check-out harus setelah check-in");
    } else {
      setError("");
    }
  }, [checkIn, checkOut]);

  /* ---------- SUBMIT FORM ---------- */

  async function submit() {
    // Stop proses kalau:
    // - user belum login
    // - kamar tidak ditemukan
    // - nama belum diisi
    // - tanggal belum diisi
    // - masih ada error validasi
    if (!user || !room || !name || !checkIn || !checkOut || error) return;

    try {
      // Aktifkan loading supaya tombol tidak bisa diklik berulang
      setLoading(true);

      // Kirim data booking ke API backend
      const res = await fetch("http://localhost:3000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // Body dikirim dalam format JSON
        body: JSON.stringify({
          userId: user.id,     // dari auth
          roomId: room.id,    // dari mapping ROOM_DATA
          name: name,         // dari input form (wajib)
          email: email,       // dari input / user
          checkIn: checkIn,
          checkOut: checkOut,
        }),
      });

      // Ambil response JSON dari API
      const data = await res.json();
      console.log("Response API:", data);

      // Kalau API gagal
      if (!res.ok) {
        alert("Gagal booking: " + data.error);
        return;
      }

      // Kalau sukses
      alert("Booking berhasil disimpan!");
      router.push("/buyer/booking/history");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Server tidak dapat dihubungi");
    } finally {
      // Matikan loading setelah proses selesai
      setLoading(false);
    }
  }

  /* ---------- VALIDASI KAMAR ---------- */

  // Kalau query param salah (misalnya ?room=abc)
  if (!room) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: 40 }}>
        Kamar tidak ditemukan
      </div>
    );
  }

  /* ================= RENDER UI ================= */

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Form Booking Kamar</h2>

        {/* Info Kamar yang dipilih */}
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

        {/* Input Nama Pemesan */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Nama Pemesan</label>
          <input
            type="text"
            style={inputStyle}
            value={name}
            placeholder="Masukkan nama Anda"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Input Email (opsional) */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            style={inputStyle}
            value={email}
            placeholder="Masukkan email (opsional)"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Input Check In */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Check In</label>
          <input
            type="date"
            style={inputStyle}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        {/* Input Check Out */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Check Out</label>
          <input
            type="date"
            style={inputStyle}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {/* Tampilkan pesan error validasi */}
        {error && <p style={errorStyle}>{error}</p>}

        {/* Peringatan jika user belum login */}
        {!user && (
          <p style={loginWarn}>
            Silakan login terlebih dahulu untuk melakukan booking
          </p>
        )}

        {/* Tombol submit booking */}
        <button
          style={{
            ...buttonStyle,
            opacity: !user || error || loading ? 0.5 : 1,
            cursor: !user || error || loading ? "not-allowed" : "pointer",
          }}
          disabled={!user || !!error || loading}
          onClick={submit}
        >
          {loading ? "Menyimpan..." : "Konfirmasi Booking"}
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

// Wrapper halaman
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

// Card utama
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
  marginBottom: 14,
};

// Label
const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 13,
  color: "#ddd",
};

// Input
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
};

// Error text
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
