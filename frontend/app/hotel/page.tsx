// app/hotel/page.tsx
"use client";

import { useRef } from "react";

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
              <img src="/images/deluxe-1.jpg" style={imgStyle} />
              <img src="/images/deluxe-2.jpg" style={imgStyle} />
              <img src="/images/deluxe-3.jpg" style={imgStyle} />
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
            </ul>
            <p style={{ marginBottom: 16 }}>
              <span style={{ color: "gold", fontWeight: "bold" }}>
                Rp 850.000
              </span>{" "}
              / malam
            </p>
            <button style={buttonStyle}>Lihat Detail</button>
          </div>
        </div>