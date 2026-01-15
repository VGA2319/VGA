// app/hotel/page.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";

export default function HotelKatalog() {
  const deluxeRef = useRef<HTMLDivElement>(null);
  const suiteRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", color: "white" }}>

      {/* HEADER */}
      <h1 style={{ color: "gold", marginBottom: 8 }}>
        VGA INTERNATIONAL HOTEL
      </h1>
      <p style={{ color: "#ccc", marginBottom: 30 }}>
        Luxury & Comfort in Every Stay
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {/* ================= DELUXE ROOM ================= */}
        <div
          className="card-shape"
          style={{
            backgroundColor: "#111",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid gold",
          }}
        >
          {/* SLIDER */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => scrollLeft(deluxeRef)}
              style={arrowStyle("left")}
            >
              ‹
            </button>

            <div
              ref={deluxeRef}
              style={sliderStyle}
            >
              <img src="/deluxe-1.jpeg" style={imgStyle} />
              <img src="/deluxe-2.png" style={imgStyle} />
              <img src="/deluxe-3.jpeg" style={imgStyle} />
              <img src="/deluxe-4.png" style={imgStyle} />
            </div>

            <button
              onClick={() => scrollRight(deluxeRef)}
              style={arrowStyle("right")}
            >
              ›
            </button>
          </div>

          {/* KONTEN */}
          <div style={{ padding: 18 }}>
            <h3 style={{ color: "gold", marginBottom: 8 }}>Deluxe Room</h3>
            <p style={descStyle}>
              Kamar elegan dengan pemandangan kota, cocok untuk bisnis maupun
              liburan.
            </p>
            <ul style={listStyle}>
              <li>✔ King Size Bed</li>
              <li>✔ Free Wi-Fi</li>
              <li>✔ Smart TV</li>
              <li>✔ Breakfast Included</li>
              <li>✔ Kolam Renang</li>
            </ul>
            <p style={{ marginBottom: 16 }}>
              <span style={{ color: "gold", fontWeight: "bold" }}>
                Rp 850.000
              </span>{" "}
              / malam
            </p>
            <Link href="/buyer/booking">
              <button style={buttonStyle}>lihat Detail</button>
            </Link>
          </div>
        </div>
        {/* ================= EXECUTIVE SUITE ================= */}
        <div
          className="card-shape"
          style={{
            backgroundColor: "#111",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid gold",
          }}
        >
          {/* SLIDER */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => scrollLeft(suiteRef)}
              style={arrowStyle("left")}
            >
              ‹
            </button>

            <div
              ref={suiteRef}
              style={sliderStyle}
            >
              <img src="/suite-1.png" style={imgStyle} />
              <img src="/suite-2.png" style={imgStyle} />
              <img src="/suite-3.png" style={imgStyle} />
              <img src="/suite-4.png" style={imgStyle} />
            </div>

            <button
              onClick={() => scrollRight(suiteRef)}
              style={arrowStyle("right")}
            >
              ›
            </button>
          </div>

          {/* KONTEN */}
          <div style={{ padding: 18 }}>
            <h3 style={{ color: "gold", marginBottom: 8 }}>
              Executive Suite
            </h3>
            <p style={descStyle}>
              Suite mewah dengan ruang tamu terpisah dan fasilitas premium.
            </p>
            <ul style={listStyle}>
              <li>✔ Living Room</li>
              <li>✔ Bathtub</li>
              <li>✔ Mini Bar</li>
              <li>✔ City View</li>
              <li>✔ Room Gym</li>
            </ul>
            <p style={{ marginBottom: 16 }}>
              <span style={{ color: "gold", fontWeight: "bold" }}>
                Rp 1.500.000
              </span>{" "}
              / malam
            </p>
            <Link href="/buyer/booking">
              <button style={buttonStyle}>lihat Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const sliderStyle = {
  display: "flex",
  overflowX: "hidden",
};

const imgStyle = {
  minWidth: "100%",
  height: 180,
  objectFit: "cover" as const,
};

const arrowStyle = (side: "left" | "right") => ({
  position: "absolute" as const,
  top: "50%",
  [side]: 10,
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "gold",
  border: "1px solid gold",
  borderRadius: "50%",
  width: 32,
  height: 32,
  cursor: "pointer",
  fontSize: 20,
  lineHeight: "28px",
});

const buttonStyle = {
  width: "100%",
  padding: "10px 0",
  backgroundColor: "gold",
  color: "black",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
  cursor: "pointer",
};

const descStyle = {
  color: "#ccc",
  fontSize: 14,
  marginBottom: 12,
};

const listStyle = {
  color: "#bbb",
  fontSize: 13,
  marginBottom: 14,
};