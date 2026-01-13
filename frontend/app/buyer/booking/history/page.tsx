"use client";

import { useEffect, useState } from "react";
import { getUser } from "../../../../lib/auth";

export default function BookingHistory() {
  const user = getUser();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/bookingL/list")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2>Riwayat Booking</h2>

      {data
        .filter((b) => b.userId === user.id)
        .map((b) => (
          <div key={b.id}>
            {b.roomId} | {b.checkIn}
          </div>
        ))}
    </div>
  );
}
