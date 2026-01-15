// app/hotel/page.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";

/**
 * Halaman katalog hotel
 * Menampilkan daftar kamar + slider gambar
 */
export default function HotelKatalog() {
  // ================= REF SLIDER =================
  // Ref untuk slider Deluxe Room
  const deluxeRef = useRef<HTMLDivElement>(null);

  // Ref untuk slider Executive Suite
  const suiteRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll slider ke kiri
   */
  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  /**
   * Scroll slider ke kanan
   */
  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}
      <header style={styles.header}>
        <h1 style={styles.title}>VGA INTERNATIONAL HOTEL</h1>
        <p style={styles.subtitle}>Luxury & Comfort in Every Stay</p>
      </header>

      {/* ================= GRID KAMAR ================= */}
      <div style={styles.grid}>
        {/* ================= DELUXE ROOM ================= */}
        <div style={styles.card}>
          {/* Slider Gambar */}
          <div style={styles.sliderWrapper}>
            <button
              onClick={() => scrollLeft(deluxeRef)}
              style={{ ...styles.arrow, left: 10 }}
            >
              ‹
            </button>

            <div ref={deluxeRef} style={styles.slider}>
              <img src="/deluxe-1.jpeg" style={styles.image} />
              <img src="/deluxe-2.png" style={styles.image} />
              <img src="/deluxe-3.jpeg" style={styles.image} />
              <img src="/deluxe-4.png" style={styles.image} />
            </div>

            <button
              onClick={() => scrollRight(deluxeRef)}
              style={{ ...styles.arrow, right: 10 }}
            >
              ›
            </button>
          </div>

          {/* Konten */}
          <div style={styles.cardBody}>
            <h3 style={styles.roomTitle}>Deluxe Room</h3>
            <p style={styles.desc}>
              Kamar elegan dengan pemandangan kota, cocok untuk bisnis maupun
              liburan.
            </p>

            <ul style={styles.list}>
              <li>✔ King Size Bed</li>
              <li>✔ Free Wi-Fi</li>
              <li>✔ Smart TV</li>
              <li>✔ Breakfast Included</li>
              <li>✔ Kolam Renang</li>
            </ul>

            <p style={styles.price}>
              <span style={styles.priceValue}>Rp 850.000</span> / malam
            </p>

            {/* Arahkan ke halaman booking */}
            <Link href="/buyer/booking">
              <button style={styles.button}>Lihat Detail</button>
            </Link>
          </div>
        </div>

        {/* ================= EXECUTIVE SUITE ================= */}
        <div style={styles.card}>
          {/* Slider Gambar */}
          <div style={styles.sliderWrapper}>
            <button
              onClick={() => scrollLeft(suiteRef)}
              style={{ ...styles.arrow, left: 10 }}
            >
              ‹
            </button>

            <div ref={suiteRef} style={styles.slider}>
              <img src="/suite-1.png" style={styles.image} />
              <img src="/suite-2.png" style={styles.image} />
              <img src="/suite-3.png" style={styles.image} />
              <img src="/suite-4.png" style={styles.image} />
            </div>

            <button
              onClick={() => scrollRight(suiteRef)}
              style={{ ...styles.arrow, right: 10 }}
            >
              ›
            </button>
          </div>

          {/* Konten */}
          <div style={styles.cardBody}>
            <h3 style={styles.roomTitle}>Executive Suite</h3>
            <p style={styles.desc}>
              Suite mewah dengan ruang tamu terpisah dan fasilitas premium.
            </p>

            <ul style={styles.list}>
              <li>✔ Living Room</li>
              <li>✔ Bathtub</li>
              <li>✔ Mini Bar</li>
              <li>✔ City View</li>
              <li>✔ Room Gym</li>
            </ul>

            <p style={styles.price}>
              <span style={styles.priceValue}>Rp 1.500.000</span> / malam
            </p>

            {/* Arahkan ke halaman booking */}
            <Link href="/buyer/booking">
              <button style={styles.button}>Lihat Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= CSS TERPUSAT ================= */
/* Semua style disatukan biar rapi & gampang edit */

const styles = {
  /* Page utama */
  page: {
    maxWidth: 1100,
    margin: "40px auto",
    padding: "0 16px",
    color: "white",
  },

  /* Header */
  header: {
    marginBottom: 30,
  },
  title: {
    color: "gold",
    marginBottom: 6,
  },
  subtitle: {
    color: "#ccc",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
  },

  /* Card glassmorphism */
  card: {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(255,215,0,0.6)",
    background: "rgba(255,255,255,0.08)", // transparan
    backdropFilter: "blur(12px)", // blur glass
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  /* Slider */
  sliderWrapper: {
    position: "relative" as const,
  },
  slider: {
    display: "flex",
    overflow: "hidden",
  },
  image: {
    minWidth: "100%",
    height: 180,
    objectFit: "cover" as const,
  },

  /* Panah slider */
  arrow: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "gold",
    border: "1px solid gold",
    borderRadius: "50%",
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: 20,
  },

  /* Konten card */
  cardBody: {
    padding: 18,
  },
  roomTitle: {
    color: "gold",
    marginBottom: 8,
  },
  desc: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 12,
  },
  list: {
    color: "#eee",
    fontSize: 13,
    marginBottom: 14,
  },

  /* Harga */
  price: {
    marginBottom: 16,
  },
  priceValue: {
    color: "gold",
    fontWeight: "bold",
  },

  /* Tombol */
  button: {
    width: "100%",
    padding: "10px 0",
    background: "gold",
    color: "black",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
