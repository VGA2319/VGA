"use client"; // Menandakan ini komponen client-side (boleh pakai hook)

import { useEffect, useState } from "react"; // Hook React untuk state & lifecycle
import { getUser } from "../../../../lib/auth"; // Ambil data user yang login

// Mapping ID kamar ke nama kamar (biar rapi pas ditampilkan)
const ROOM_LABEL: Record<number | string, string> = {
  1: "Deluxe Room",
  2: "Suite VIP",
  deluxe: "Deluxe Room",
  suite: "Suite VIP",
};

export default function BookingHistory() {
  const user = getUser(); // Ambil user yang sedang login
  const [data, setData] = useState<any[]>([]); // State untuk menyimpan data booking
  const [loading, setLoading] = useState(true); // State loading saat fetch API

  useEffect(() => {
    // Ambil data booking dari backend saat halaman dibuka
    fetch("/api/booking/list")
      .then((r) => r.json()) // Convert response ke JSON
      .then((res) => {
        setData(res); // Simpan data booking ke state
        setLoading(false); // Matikan loading
      });
  }, []); // Dijalankan sekali saat komponen mount

  // Filter booking agar hanya milik user yang sedang login
  const userBookings = data.filter((b) => b.userId === user?.id);

  return (
    <div style={pageStyle}> {/* Container utama halaman */}
      <h2 style={titleStyle}>Riwayat Booking</h2> {/* Judul halaman */}

      {loading && <p style={infoText}>Memuat data booking...</p>} {/* Loading state */}

      {!loading && userBookings.length === 0 && (
        <p style={infoText}>Belum ada riwayat booking</p> // Jika belum ada booking
      )}

      <div style={listStyle}> {/* List kartu booking */}
        {userBookings.map((b) => {
          // Hitung durasi menginap (dalam malam)
          const nights =
            (new Date(b.checkOut).getTime() -
              new Date(b.checkIn).getTime()) /
            (1000 * 60 * 60 * 24);

          return (
            <div key={b.id} style={cardStyle}> {/* Card booking */}
              <div style={cardHeader}> {/* Header card */}
                <h3 style={roomStyle}>
                  {ROOM_LABEL[b.roomId] ?? "Room"} {/* Nama kamar */}
                </h3>
                <span style={statusBadge}>Booked</span> {/* Status */}
              </div>

              <div style={row}> {/* Baris check-in */}
                <span>Check In</span>
                <span>{formatDate(b.checkIn)}</span>
              </div>

              <div style={row}> {/* Baris check-out */}
                <span>Check Out</span>
                <span>{formatDate(b.checkOut)}</span>
              </div>

              <div style={row}> {/* Durasi menginap */}
                <span>Durasi</span>
                <span>{nights} malam</span>
              </div>

              <div style={createdAt}> {/* Tanggal booking dibuat */}
                Dibuat: {formatDate(b.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= HELPER FUNCTION ================= */

// Fungsi untuk format tanggal ke bahasa Indonesia
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* ================= STYLES (GLASS UI) ================= */

const pageStyle = {
  minHeight: "100vh", // Tinggi full layar
  padding: "60px 20px", // Padding halaman
  color: "white", // Warna teks
};

const titleStyle = {
  textAlign: "center" as const, // Judul di tengah
  color: "gold", // Warna emas
  marginBottom: 40,
};

const infoText = {
  textAlign: "center" as const, // Teks info di tengah
  color: "#ccc",
};

const listStyle = {
  maxWidth: 700, // Lebar maksimal list
  margin: "0 auto", // Tengah halaman
  display: "grid", // Grid layout
  gap: 20, // Jarak antar card
};

const cardStyle = {
  padding: 22, // Padding card
  borderRadius: 16, // Sudut membulat
  background: "rgba(255,255,255,0.08)", // Background transparan
  backdropFilter: "blur(14px)", // Efek blur
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,215,0,0.35)", // Border emas
  boxShadow: "0 0 25px rgba(255,215,0,0.2)", // Shadow
};

const cardHeader = {
  display: "flex", // Flex layout
  justifyContent: "space-between", // Kiri-kanan
  alignItems: "center",
  marginBottom: 14,
};

const roomStyle = {
  color: "gold", // Warna nama kamar
  fontSize: 18,
};

const statusBadge = {
  background: "rgba(0,0,0,0.5)", // Background badge
  padding: "4px 10px",
  borderRadius: 20,
  fontSize: 12,
  color: "#7CFC00", // Warna hijau
  border: "1px solid rgba(124,252,0,0.5)",
};

const row = {
  display: "flex", // Baris kiri-kanan
  justifyContent: "space-between",
  fontSize: 14,
  marginBottom: 6,
  color: "#ddd",
};

const createdAt = {
  marginTop: 10,
  fontSize: 12,
  color: "#aaa",
  textAlign: "right" as const,
};
