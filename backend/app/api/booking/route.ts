// Import object NextRequest dan NextResponse dari Next.js
// NextRequest dipakai untuk membaca request dari client (frontend)
// NextResponse dipakai untuk mengirim response ke client
import { NextRequest, NextResponse } from "next/server";

// Import prisma client untuk koneksi dan operasi database
import { prisma } from "@/lib/prisma";

/* =======================
   CORS CONFIG
======================= */
// Konfigurasi CORS agar API bisa diakses dari frontend di port 3001
// Tanpa ini, browser akan memblokir request karena beda origin (CORS error)
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001", // frontend yang diizinkan
  "Access-Control-Allow-Methods": "POST, OPTIONS",        // metode HTTP yang boleh
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // header yang boleh dikirim
};

/* =======================
   HANDLE PREFLIGHT (CORS)
======================= */
// Browser akan otomatis mengirim request OPTIONS sebelum POST
// untuk memastikan server mengizinkan request dari origin tersebut
export async function OPTIONS() {
  // Mengembalikan response kosong dengan header CORS
  return NextResponse.json({}, { headers: corsHeaders });
}

/* =======================
   HANDLE POST BOOKING
======================= */
// Fungsi ini dijalankan saat frontend mengirim request POST ke endpoint booking
export async function POST(req: NextRequest) {
  try {
    // Mengambil data JSON yang dikirim dari frontend
    const body = await req.json();

    // Menampilkan data booking di terminal (untuk debugging)
    console.log("DATA BOOKING DARI FRONTEND:", body);

    // Destructuring data dari body agar mudah digunakan
    const { userId, roomId, name, email, checkIn, checkOut } = body;

    /* =======================
       VALIDASI DATA
    ======================= */

    // Mengecek apakah field wajib sudah diisi
    // Jika ada yang kosong, langsung kirim response error
    if (!userId || !roomId || !name || !checkIn || !checkOut) {
      return NextResponse.json(
        {
          error: "Data booking tidak lengkap",
        },
        { status: 400, headers: corsHeaders } // status 400 = bad request
      );
    }

    // Validasi logika tanggal
    // Check-out harus lebih besar dari check-in
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

    // Menyimpan data booking ke database menggunakan Prisma
    const booking = await prisma.booking.create({
      data: {
        // userId dikonversi ke Number karena biasanya dikirim sebagai string dari form
        userId: Number(userId),     // Foreign key ke tabel user

        // roomId juga dikonversi ke Number
        roomId: Number(roomId),     // Foreign key ke tabel room

        // Nama pemesan kamar
        name: name,

        // Email bersifat opsional, jika tidak ada maka disimpan null
        email: email ?? null,

        // Konversi string tanggal ke tipe Date
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      },
    });

    /* =======================
       RESPONSE SUKSES
    ======================= */

    // Jika berhasil, kirim response sukses beserta data booking yang tersimpan
    return NextResponse.json(
      {
        message: "Booking berhasil disimpan",
        booking,
      },
      { status: 200, headers: corsHeaders } // status 200 = sukses
    );
  } catch (error: any) {
    /* =======================
       HANDLE ERROR
    ======================= */

    // Menampilkan error di terminal untuk debugging
    console.error("ERROR API BOOKING:", error);

    // Mengirim response error ke frontend jika terjadi kegagalan
    return NextResponse.json(
      {
        error: "Gagal menyimpan booking",
        detail: error.message, // detail error dari server
      },
      { status: 500, headers: corsHeaders } // status 500 = server error
    );
  }
}
