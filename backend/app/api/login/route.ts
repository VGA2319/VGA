// Import NextRequest dan NextResponse dari Next.js
// NextRequest → untuk membaca data request dari frontend
// NextResponse → untuk mengirim response ke frontend
import { NextRequest, NextResponse } from "next/server";

// Import prisma client untuk akses database
import { prisma } from "@/lib/prisma";

// Import bcrypt untuk membandingkan password plaintext dengan password yang sudah di-hash
import bcrypt from "bcryptjs";

/* =======================
   CORS
======================= */

// Konfigurasi CORS agar API login bisa diakses dari frontend (localhost:3001)
// Tanpa ini, browser akan memblokir request karena beda origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",   // frontend yang diizinkan
  "Access-Control-Allow-Methods": "POST, OPTIONS",          // metode HTTP yang diperbolehkan
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // header yang boleh dikirim
};

// Handler untuk request OPTIONS (preflight request)
// Browser akan mengirim OPTIONS dulu sebelum POST untuk cek izin CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,            // status sukses untuk preflight
    headers: corsHeaders,   // kirim header CORS
  });
}

/* =======================
   POST – LOGIN
======================= */

// Fungsi ini dijalankan saat frontend mengirim request POST untuk login
export async function POST(request: NextRequest) {
  try {
    // Mengambil email dan password dari body JSON yang dikirim frontend
    const { email, password } = await request.json();

    // Validasi: email dan password wajib diisi
    // Jika salah satu kosong, langsung kirim error ke frontend
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi" },
        { status: 400, headers: corsHeaders } // 400 = bad request
      );
    }

    // Mencari user di database berdasarkan email
    const user = await prisma.tb_user.findFirst({
      where: { email },
    });

    // Jika user tidak ditemukan, berarti email belum terdaftar
    if (!user) {
      return NextResponse.json(
        { message: "Email tidak terdaftar" },
        { status: 404, headers: corsHeaders } // 404 = data tidak ditemukan
      );
    }

    // Membandingkan password yang diinput dengan password hash di database
    // bcrypt.compare akan mengembalikan true jika cocok, false jika tidak
    const match = await bcrypt.compare(password, user.password);

    // Jika password tidak cocok
    if (!match) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401, headers: corsHeaders } // 401 = unauthorized
      );
    }

    // Jika email dan password benar, kirim response sukses
    return NextResponse.json(
      {
        success: true, // penanda bahwa login berhasil
        user: {
          id: user.id,       // kirim ID user
          email: user.email // kirim email user
          // Data sensitif seperti password tidak dikirim ke frontend
        },
      },
      { headers: corsHeaders } // sertakan CORS header
    );
  } catch (error) {
    // Menampilkan error di terminal untuk debugging
    console.error(error);

    // Response jika terjadi kesalahan di server
    return NextResponse.json(
      { message: "Server error" },
      { status: 500, headers: corsHeaders } // 500 = internal server error
    );
  }
}
