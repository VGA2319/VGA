"use client";

import { useRouter } from "next/navigation";
import { getUser } from "../../../lib/auth";

export default function BookingListPage() {
  const router = useRouter();
  const user = getUser();

  const rooms = [
    {
      id: "deluxe",
      name: "Deluxe Room",
      price: "850.000",
      desc: "Kamar elegan dengan fasilitas premium, cocok untuk bisnis maupun liburan.",
      image: "/deluxe-1.jpeg",
      facilities: [
        "King Size Bed",
        "Free Wi-Fi",
        "Smart TV",
        "Breakfast Included",
      ],
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

  function chooseRoom(roomId: string) {
    if (!user) {
      router.push(`/auth/login?room=${roomId}`);
    } else {
      router.push(`/buyer/booking/form?room=${roomId}`);
    }
  }

  return (
    <>
      <div className="page">
        <h1 className="title">Pilih Tipe Kamar</h1>
        <p className="subtitle">
          Nikmati pengalaman menginap terbaik bersama kami
        </p>

        <div className="grid">
          {rooms.map((room) => (
            <div key={room.id} className="card">
              <img src={room.image} className="image" />

              <div className="content">
                <h3 className="room-title">{room.name}</h3>
                <p className="desc">{room.desc}</p>

                <ul className="facility">
                  {room.facilities.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                  ))}
                </ul>

                <p className="price">
                  <span>Rp {room.price}</span> / malam
                </p>

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

      {/* ================= CSS ================= */}
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
