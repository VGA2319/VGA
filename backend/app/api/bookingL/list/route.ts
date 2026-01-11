import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

  // Mengambil semua data booking beserta relasi user dan room dari database
export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      room: true,
      user: true,
    },
  });

  return NextResponse.json(bookings);
}

