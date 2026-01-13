"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ambil query ?room=...
  const room = searchParams.get("room");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal login");
      }

      // simpan user login
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ REDIRECT CERDAS
      if (room) {
        // login dari booking
        router.push(`/booking?room=${room}`);
      }
      else {
        // login biasa
        router.push("/home");
      }
    } 
    
    catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    }
    finally {
      setLoading(false);
    }
  }
}