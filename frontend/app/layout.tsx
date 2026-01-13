// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "VGA International Hotel Booking",
  description: "Aplikasi booking hotel sederhana",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {/* ================= HEADER ================= */}
        <header
          style={{
            background: "#000",
            borderBottom: "1px solid rgba(255,215,0,0.3)",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 16px",
            }}
          >
            <img
              src="/LOGO_HOTEL.png"
              alt="VGA Logo"
              style={{
                width: 48,
                height: 48,
                objectFit: "cover",
                borderRadius: 10,
                border: "2px solid gold",
              }}
            />

            <h1
              style={{
                margin: 0,
                color: "gold",
                fontSize: 22,
                whiteSpace: "nowrap",
              }}
            >
              VGA INTERNATIONAL HOTEL BOOKING
            </h1>

          </div>
        </header>

        {/* ================= MAIN CONTENT ================= */}
        <main
          style={{
            maxWidth: 1100,
            margin: "40px auto",
            padding: "0 16px",
            minHeight: "60vh",
          }}
        >
          {children}
        </main>

        {/* ================= FOOTER ================= */}
        <footer
          style={{
            textAlign: "center",
            color: "gold",
            marginTop: 60,
            padding: 30,
            borderTop: "1px solid rgba(255,215,0,0.3)",
          }}
        >
          © VGA INTERNATIONAL HOTEL
        </footer>
      </body>
    </html>
  );
}
