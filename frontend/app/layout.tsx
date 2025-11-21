import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Simple Hotel - Booking",
  description: "Aplikasi booking hotel sederhana",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header style={{ background: "#0ea5b7", padding: 16 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
            {/* contoh: path file upload (akan di-convert sesuai kebutuhan) */}
            <img
              src="/mnt/data/729e4674-eb46-42c0-9eaa-007db2d70c56.png"
              alt="logo"
              style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }}
            />
            <h1 style={{ margin: 0, color: "white", fontSize: 20 }}>Simple Hotel</h1>

            <nav style={{ marginLeft: "auto" }}>
              <a href="/" style={{ color: "white", marginRight: 12 }}>Home</a>
              <a href="/hotel" style={{ color: "white", marginRight: 12 }}>Katalog</a>
              <a href="/booking" style={{ color: "white", marginRight: 12 }}>Booking</a>
              <a href="/auth/login" style={{ color: "white" }}>Login</a>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: 1000, margin: "24px auto", padding: "0 16px" }}>{children}</main>

        <footer style={{ textAlign: "center", color: "#666", marginTop: 40, padding: 20 }}>
          © Simple Hotel
        </footer>
      </body>
    </html>
  );
}
