// app/hotel/page.tsx
export default function HotelKatalog() {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", color: "white" }}>
      <h1 style={{ color: "gold", marginBottom: 12 }}>
        Katalog Hotel
      </h1>

      <p style={{ color: "#ccc", marginBottom: 20 }}>
        Pilih tipe kamar terbaik sesuai kebutuhan Anda.
      </p>

      <div
        className="card-shape"
        style={{ padding: 20, borderRadius: 12 }}
      >
        <p>
          Halaman katalog hotel akan menampilkan daftar kamar, fasilitas,
          harga, dan detail lainnya.
        </p>
      </div>
    </div>
  );
}
