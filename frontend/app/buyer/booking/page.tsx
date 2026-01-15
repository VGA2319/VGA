"use client";

/* =======================
   IMPORT DEPENDENCY
======================= */

// Hook navigasi Next.js (untuk pindah halaman tanpa reload)
import { useRouter } from "next/navigation";

// Function custom untuk mengambil user yang sedang login
import { getUser } from "../../../lib/auth";

/* =======================
   KOMPONEN UTAMA
======================= */

export default function BookingListPage() {

  // Inisialisasi router (digunakan untuk redirect halaman)
  const router = useRouter();

  // Ambil data user yang sedang login
  // Jika belum login → null / undefined
  const user = getUser();

  /* =======================
     DATA KAMAR
  ======================= */
  // Array data kamar yang akan ditampilkan di halaman booking
  const rooms = [
    {
      id: "deluxe", // ID kamar (dipakai untuk routing)
      name: "Deluxe Room", // Nama kamar
      price: "850.000", // Harga per malam
      desc: "Kamar elegan dengan fasilitas premium, cocok untuk bisnis maupun liburan.", // Deskripsi kamar
      image: "/deluxe-1.jpeg", // Gambar kamar
      facilities: [
        "King Size Bed",
        "Free Wi-Fi",
        "Smart TV",
        "Breakfast Included",
      ], // Daftar fasilitas
    },
    {
      id: "suite",
      name: "Suite VIP",
      price: "1.500.000",
      desc: "Suite mewah dengan ruang tamu terpisah dan kenyamanan eksklusif.",
      image: "/suite-1.png",
      facilities: [
        "Living Room",
        "Bathtub",
        "Mini Bar",
        "City View",
      ],
    },
  ];

  /* =======================
     FUNCTION PILIH KAMAR
  ======================= */
  // Function ini dijalankan saat tombol "Pesan Sekarang" diklik
  function chooseRoom(roomId: string) {

    // Jika user BELUM login
    if (!user) {
      // Arahkan ke halaman login
      router.push(`/auth/login?room=${roomId}`);
    } 
    
    // Jika user SUDAH login
    else {
      // Arahkan ke form booking
      router.push(`/buyer/booking/form?room=${roomId}`);
    }
  }

  /* =======================
     RENDER UI
  ======================= */
  return (
    <>
      {/* =======================
          CONTAINER HALAMAN
      ======================= */}
      <div className="page">

        {/* Judul halaman */}
        <h1 className="title">Pilih Tipe Kamar</h1>

        {/* Subjudul */}
        <p className="subtitle">
          Nikmati pengalaman menginap terbaik bersama kami
        </p>

        {/* Grid daftar kamar */}
        <div className="grid">
          {rooms.map((room) => (
            <div key={room.id} className="card">

              {/* Gambar kamar */}
              <img src={room.image} className="image" />

              {/* Konten kamar */}
              <div className="content">

                {/* Nama kamar */}
                <h3 className="room-title">{room.name}</h3>

                {/* Deskripsi kamar */}
                <p className="desc">{room.desc}</p>

                {/* List fasilitas */}
                <ul className="facility">
                  {room.facilities.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                  ))}
                </ul>

                {/* Harga kamar */}
                <p className="price">
                  <span>Rp {room.price}</span> / malam
                </p>

                {/* Tombol booking */}
                <button
                  className="button"
                  onClick={() => chooseRoom(room.id)}
                >
                  Pesan Sekarang
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =======================
          CSS (STYLE JSX)
          NOTE: HARUS PAKE BACKTICK !!!
      ======================= */}
      <style jsx>{`
        .page {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 16px;
          color: white;
        }

        .title {
          color: gold;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #ccc;
          margin-bottom: 30px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .card {
          background: #111;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid gold;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .content {
          padding: 18px;
        }

        .room-title {
          color: gold;
          margin-bottom: 8px;
        }

        .desc {
          color: #ccc;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .facility {
          color: #bbb;
          font-size: 13px;
          margin-bottom: 14px;
          padding-left: 16px;
        }

        .price {
          margin-bottom: 16px;
        }

        .price span {
          color: gold;
          font-weight: bold;
        }

        .button {
          width: 100%;
          padding: 10px 0;
          background: gold;
          color: black;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .button:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
}
