"use client"; 
// Menandakan bahwa file ini adalah komponen client-side
// sehingga kita bisa memakai useState, useEffect, dll.

import { useEffect, useState } from "react"; 
// useState  : untuk menyimpan data booking
// useEffect : untuk menjalankan fetch API saat halaman dibuka

import { getUser } from "../../../../lib/auth"; 
// Fungsi untuk mengambil data user yang sedang login
// Biasanya berisi: { id, email, ... }

// Mapping ID kamar ke nama kamar agar tampilan lebih rapi
const ROOM_LABEL: Record<number, string> = {
  1: "Deluxe Room",
  2: "Suite VIP",
};

export default function BookingHistory() {
  // Ambil user yang sedang login
  const user = getUser();

  // State untuk menyimpan data booking dari API
  const [data, setData] = useState<any[]>([]);

  // State untuk menandai apakah data masih loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kalau user belum ada atau email belum tersedia, hentikan dulu
    if (!user?.email) return;

    // Panggil API bookingL/list dengan parameter email
    // Jadi backend hanya mengembalikan booking milik email ini saja
    fetch(`http://localhost:3000/api/bookingL/list?email=${user.email}`)
      .then((r) => r.json()) // Ubah response menjadi JSON
      .then((res) => {
        console.log("Data booking dari API:", res); // Debug di console
        setData(res);       // Simpan data booking ke state
        setLoading(false);  // Matikan status loading
      })
      .catch((err) => {
        console.error("Gagal mengambil data booking:", err);
        setLoading(false);
      });
  }, [user?.email]); 
  // useEffect akan dijalankan ulang jika email user berubah

  return (
    <div style={pageStyle}>
      {/* Judul halaman */}
      <h2 style={titleStyle}>Riwayat Booking</h2>

      {/* Jika masih loading */}
      {loading && <p style={infoText}>Memuat data booking...</p>}

      {/* Jika sudah tidak loading dan data kosong */}
      {!loading && data.length === 0 && (
        <p style={infoText}>Belum ada riwayat booking</p>
      )}

      {/* List kartu booking */}
      <div style={listStyle}>
        {data.map((b) => {
          // Hitung lama menginap (dalam malam)
          const nights =
            (new Date(b.checkOut).getTime() -
              new Date(b.checkIn).getTime()) /
            (1000 * 60 * 60 * 24);

          return (
            <div key={b.id} style={cardStyle}>
              {/* Header kartu */}
              <div style={cardHeader}>
                <h3 style={roomStyle}>
                  {/* Ambil nama kamar dari mapping */}
                  {ROOM_LABEL[b.roomId] ?? "Room"}
                </h3>
                <span style={statusBadge}>Booked</span>
              </div>

              {/* Menampilkan nama pemesan */}
              <div style={row}>
                <span>Nama</span>
                <span>{b.name}</span>
              </div>

              {/* Menampilkan email pemesan */}
              <div style={row}>
                <span>Email</span>
                <span>{b.email}</span>
              </div>

              {/* Menampilkan tanggal check-in */}
              <div style={row}>
                <span>Check In</span>
                <span>{formatDate(b.checkIn)}</span>
              </div>

              {/* Menampilkan tanggal check-out */}
              <div style={row}>
                <span>Check Out</span>
                <span>{formatDate(b.checkOut)}</span>
              </div>

              {/* Menampilkan durasi menginap */}
              <div style={row}>
                <span>Durasi</span>
                <span>{nights} malam</span>
              </div>

              {/* Menampilkan tanggal booking dibuat*/}
              <div style={createdAt}>
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

// Fungsi untuk memformat tanggal menjadi format Indonesia
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",      // Tinggi halaman penuh
  padding: "60px 20px",    // Padding halaman
  color: "white",         // Warna teks
};

const titleStyle = {
  textAlign: "center" as const,
  color: "gold",
  marginBottom: 40,
};

const infoText = {
  textAlign: "center" as const,
  color: "#ccc",
};

const listStyle = {
  maxWidth: 700,
  margin: "0 auto",
  display: "grid",
  gap: 20,
};

const cardStyle = {
  padding: 22,
  borderRadius: 16,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,215,0,0.35)",
  boxShadow: "0 0 25px rgba(255,215,0,0.2)",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
};

const roomStyle = {
  color: "gold",
  fontSize: 18,
};

const statusBadge = {
  background: "rgba(0,0,0,0.5)",
  padding: "4px 10px",
  borderRadius: 20,
  fontSize: 12,
  color: "#7CFC00",
  border: "1px solid rgba(124,252,0,0.5)",
};

const row = {
  display: "flex",
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
