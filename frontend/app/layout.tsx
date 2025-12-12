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
        {/* HEADER */}
        <header
          style={{
            background: "#000",
            borderBottom: "1px solid rgba(255,215,0,0.3)",
            padding: "20px 0",
          }}
