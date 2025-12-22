// app/hotel/page.tsx
export default function HotelKatalog() {
  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", color: "white" }}>
      
      {/* HEADER */}
      <h1 style={{ color: "gold", marginBottom: 8 }}>
        VGA INTERNATIONAL HOTEL
      </h1>
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Luxury & Comfort in Every Stay
      </p>
      {/* GRID KATALOG */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
         {/* CARD KAMAR */}
        <div
          className="card-shape"
          style={{
            backgroundColor: "#111",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid gold",
          }}
        >
            {/* GAMBAR */}
          <img
            src="/images/deluxe-room.jpg" // ganti gambar
            alt="Deluxe Room"
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
            }}
          />




