// Import prisma client untuk melakukan query ke database
import { prisma } from "@/lib/prisma";

// Import NextRequest dan NextResponse dari Next.js
// NextRequest → untuk membaca request dari client
// NextResponse → untuk mengirim response ke client
import { NextRequest, NextResponse } from "next/server";

/* =======================
   CORS CONFIG
======================= */

// Konfigurasi header CORS agar API bisa diakses dari frontend (localhost:3001)
// Jika tidak diset, browser akan memblokir request karena beda origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001", // frontend yang diizinkan
  "Access-Control-Allow-Methods": "GET, OPTIONS",         // metode HTTP yang diperbolehkan
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // header yang boleh dikirim
};

/* =======================
   HANDLE OPTIONS (WAJIB)
======================= */

// Fungsi ini menangani request OPTIONS (preflight request)
// Browser akan mengirim OPTIONS dulu sebelum GET untuk mengecek izin CORS
export async function OPTIONS() {
  // Mengembalikan response kosong dengan header CORS
  return NextResponse.json({}, { headers: corsHeaders });
}

/* =======================
   HANDLE GET BOOKING LIST
======================= */

// Fungsi ini dipanggil saat frontend mengirim request GET
// Digunakan untuk mengambil daftar booking berdasarkan email
export async function GET(req: NextRequest) {
  try {
    // Mengambil query parameter dari URL
    // Contoh URL: /api/bookingL/list?email=111@ff.com
    const { searchParams } = new URL(req.url);

    // Mengambil nilai email dari query parameter
    const email = searchParams.get("email");

    // Validasi: email wajib dikirim
    // Jika tidak ada email, maka request dianggap tidak valid
    if (!email) {
      return NextResponse.json(
        { error: "Email wajib dikirim" },
        { status: 400, headers: corsHeaders } // status 400 = bad request
      );
    }

    // Mengambil data booking dari database menggunakan Prisma
    // Data difilter berdasarkan email
    const bookings = await prisma.booking.findMany({
      where: {
        email: email, // hanya booking dengan email ini yang diambil
      },
      include: {
        room: true, // ikut ambil data relasi room
        user: true, // ikut ambil data relasi user
      },
      orderBy: {
        createdAt: "desc", // urutkan dari data terbaru ke terlama
      },
    });

    // Mengirim response sukses berupa data booking
    // Disertai header CORS agar bisa diterima frontend
    return NextResponse.json(bookings, { headers: corsHeaders });
  } catch (error: any) {
    // Menampilkan error di terminal untuk debugging
    console.error("ERROR GET BOOKING LIST:", error);

    // Mengirim response error jika terjadi kegagalan
    return NextResponse.json(
      {
        error: "Gagal mengambil data booking",
        detail: error.message, // detail error dari server
      },
      { status: 500, headers: corsHeaders } // status 500 = server error
    );
  }
}
