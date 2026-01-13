"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { getUser } from "../../../../lib/auth";

export default function BookingForm() {
  const params = useSearchParams();
  const roomId = params.get("room");
  const user = getUser();
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  async function submit() {
    await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        roomId,
        checkIn,
        checkOut,
      }),
    });

    alert("Booking berhasil");
    router.push("/buyer/booking/history");
  }

  return (
    <div>
      <h2>Form Booking</h2>
      <input type="date" onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" onChange={(e) => setCheckOut(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
