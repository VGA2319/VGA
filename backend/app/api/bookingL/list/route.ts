import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* =======================
   CORS CONFIG
======================= */

// Header CORS supaya frontend (port 3001) boleh akses API ini
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* =======================
   HANDLE OPTIONS (WAJIB)
======================= */

// Untuk preflight request dari browser
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/* =======================
   HANDLE GET BOOKING LIST
======================= */

export async function GET(req: NextRequest) {
  try {
    // Ambil email dari query param
    // Contoh: /api/bookingL/list?email=111@ff.com
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    // Validasi: email wajib ada
    if (!email) {
      return NextResponse.json(
        { error: "Email wajib dikirim" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Ambil data booking berdasarkan email
    const bookings = await prisma.booking.findMany({
      where: {
        email: email, // filter berdasarkan email pengirim booking
      },
      include: {
        room: true, // ambil relasi room
        user: true, // ambil relasi user
      },
      orderBy: {
        createdAt: "desc", // booking terbaru di atas
      },
    });

    // Kirim response sukses + CORS header
    return NextResponse.json(bookings, { headers: corsHeaders });
  } catch (error: any) {
    console.error("ERROR GET BOOKING LIST:", error);

    return NextResponse.json(
      {
        error: "Gagal mengambil data booking",
        detail: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
