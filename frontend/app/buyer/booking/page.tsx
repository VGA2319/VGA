"use client";

import { useRouter } from "next/navigation";
import { getUser } from "../../../lib/auth";

export default function BookingListPage() {
  const router = useRouter();
  const user = getUser();

  const rooms = [
    { id: "standard", name: "Standard Room", price: "500.000 / malam", desc: "Kamar nyaman." },
    { id: "deluxe", name: "Deluxe Room", price: "850.000 / malam", desc: "Lebih luas & premium." },
    { id: "suite", name: "Suite VIP", price: "1.500.000 / malam", desc: "Mewah & eksklusif." },
  ];

  function chooseRoom(roomId: string) {
    if (!user) {
      router.push(`/auth/login?room=${roomId}`);
    } else {
      router.push(`/buyer/booking/form?room=${roomId}`);
    }
  }

  return (
    <div>
      <h2>Pilih Tipe Kamar</h2>

      {rooms.map((r) => (
        <div key={r.id}>
          <h3>{r.name}</h3>
          <p>{r.desc}</p>
          <p>{r.price}</p>

          <button onClick={() => chooseRoom(r.id)}>
            Pilih Kamar
          </button>
        </div>
      ))}
    </div>
  );
}
