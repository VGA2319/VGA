// app/booking/page.tsx
import Link from "next/link";

export default function BookingListPage() {
  const rooms = [
    {
      id: "standard",
      name: "Standard Room",
      price: "500.000 / malam",
      desc: "Kamar nyaman dengan fasilitas dasar.",
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      price: "850.000 / malam",
      desc: "Kamar lebih luas dengan fasilitas premium.",
    },
    {
      id: "suite",
      name: "Suite VIP",
      price: "1.500.000 / malam",
      desc: "Kamar mewah dengan ruang tamu & pelayanan eksklusif.",
    },
  ];
  return(
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2 style={{ color: "gold", textAlign: "center", marginBottom: 20 }}>
        Pilih Tipe Kamar
      </h2>
      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room.id}
            className="card-shape"
            style={{ padding: 20, borderRadius: 12 }}
          >
            <h3 style={{ color: "gold" }}>{room.name}</h3>
            <p style={{ color: "#ccc" }}>{room.desc}</p>
            <p style={{ color: "white", fontWeight: 600 }}>{room.price}</p>

            
      </div>
    </div>
  );
}