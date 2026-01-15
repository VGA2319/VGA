import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* =======================
   CORS CONFIG
======================= */
// Supaya endpoint bisa diakses dari frontend
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* =======================
   HANDLE PREFLIGHT (CORS)
======================= */
// Browser akan kirim OPTIONS sebelum POST
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

/* =======================
   HANDLE POST BOOKING
======================= */
export async function POST(req: NextRequest) {
  try {
    // Ambil data JSON dari frontend
    const body = await req.json();

    // Debug supaya kelihatan di terminal
    console.log("DATA BOOKING DARI FRONTEND:", body);

    const { userId, roomId, name, email, checkIn, checkOut } = body;

    /* =======================
       VALIDASI DATA
    ======================= */

    // Field wajib harus ada
    if (!userId || !roomId || !name || !checkIn || !checkOut) {
      return NextResponse.json(
        {
          error: "Data booking tidak lengkap",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validasi tanggal
    if (new Date(checkOut) <= new Date(checkIn)) {
      return NextResponse.json(
        {
          error: "Tanggal check-out harus setelah check-in",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    /* =======================
       SIMPAN KE DATABASE
    ======================= */

    const booking = await prisma.booking.create({
      data: {
        // Pastikan tipe data sesuai schema Prisma
        userId: Number(userId),     // FK ke tabel user
        roomId: Number(roomId),     // FK ke tabel room (2 atau 3)
        name: name,                // dari input form
        email: email ?? null,      // boleh null kalau di schema nullable
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      },
    });

    /* =======================
       RESPONSE SUKSES
    ======================= */
    return NextResponse.json(
      {
        message: "Booking berhasil disimpan",
        booking,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    /* =======================
       HANDLE ERROR
    ======================= */

    console.error("ERROR API BOOKING:", error);

    return NextResponse.json(
      {
        error: "Gagal menyimpan booking",
        detail: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
