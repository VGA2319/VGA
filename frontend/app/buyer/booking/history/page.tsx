"use client";

import { useEffect, useState } from "react";
import { getUser } from "../../../../lib/auth";

const ROOM_LABEL: Record<number | string, string> = {
  1: "Deluxe Room",
  2: "Suite VIP",
  deluxe: "Deluxe Room",
  suite: "Suite VIP",
};

export default function BookingHistory() {
  const user = getUser();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/booking/list")
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  const userBookings = data.filter((b) => b.userId === user?.id);

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>Riwayat Booking</h2>

      {loading && <p style={infoText}>Memuat data booking...</p>}

      {!loading && userBookings.length === 0 && (
        <p style={infoText}>Belum ada riwayat booking</p>
      )}

      <div style={listStyle}>
        {userBookings.map((b) => {
          const nights =
            (new Date(b.checkOut).getTime() -
              new Date(b.checkIn).getTime()) /
            (1000 * 60 * 60 * 24);

          return (
            <div key={b.id} style={cardStyle}>
              <div style={cardHeader}>
                <h3 style={roomStyle}>
                  {ROOM_LABEL[b.roomId] ?? "Room"}
                </h3>
                <span style={statusBadge}>Booked</span>
              </div>

              <div style={row}>
                <span>Check In</span>
                <span>{formatDate(b.checkIn)}</span>
              </div>

              <div style={row}>
                <span>Check Out</span>
                <span>{formatDate(b.checkOut)}</span>
              </div>

              <div style={row}>
                <span>Durasi</span>
                <span>{nights} malam</span>
              </div>

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

/* ================= HELPERS ================= */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* ================= STYLES (GLASS UI) ================= */

const pageStyle = {
  minHeight: "100vh",
  padding: "60px 20px",
  color: "white",
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
