// Import NextRequest dan NextResponse dari Next.js
// NextRequest → untuk membaca data request dari frontend
// NextResponse → untuk mengirim response ke frontend
import { NextRequest, NextResponse } from "next/server";

// Import prisma client untuk koneksi dan operasi ke database
import { prisma } from "@/lib/prisma";

// Import bcrypt untuk melakukan hashing dan verifikasi password
import bcrypt from "bcryptjs";

/* =======================
   CORS CONFIG (WAJIB)
======================= */
// Konfigurasi CORS agar API bisa diakses dari frontend (localhost:3001)
// Tanpa ini browser akan memblokir request karena beda origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",        // origin frontend yang diizinkan
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // metode HTTP yang diperbolehkan
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // header yang boleh dikirim
};

/* =======================
   OPTIONS (PRE-FLIGHT)
======================= */
// Handler untuk preflight request (OPTIONS)
// Browser akan memanggil ini sebelum request utama (GET, POST, PUT, DELETE)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,            // menandakan request preflight berhasil
    headers: corsHeaders,   // kirim header CORS
  });
}

// Interface untuk struktur data user dari request
// Digunakan agar tipe data lebih rapi dan terkontrol
interface UserRequest {
  id?: number;    // optional, hanya dipakai untuk update dan delete
  email: string;  // email user
  password: string; // password user
}

// =======================
// GET – ambil semua user
// =======================
// Digunakan untuk menampilkan seluruh data user dari database
export async function GET() {
  try {
    // Mengambil semua data user dari tabel tb_user
    const users = await prisma.tb_user.findMany();

    // Mengirim response sukses beserta data user
    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Tampil data user",
          status: 200,
        },
        users,
      },
      { headers: corsHeaders } // sertakan header CORS
    );
  } catch (error) {
    // Menampilkan error di terminal untuk debugging
    console.error(error);

    // Mengirim response error jika terjadi kesalahan server
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// POST – register user
// =======================
// Digunakan untuk mendaftarkan user baru (registrasi)
export async function POST(request: NextRequest) {
  try {
    // Mengambil data JSON dari body request
    const body: UserRequest = await request.json();

    // Validasi: email dan password wajib diisi
    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          meta_data: {
            success: false,
            message: "Email dan password wajib diisi",
            status: 400,
          },
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Mengecek apakah email sudah terdaftar di database
    const check = await prisma.tb_user.findFirst({
      where: { email: body.email },
    });

    // Jika email sudah ada, registrasi ditolak
    if (check) {
      return NextResponse.json(
        {
          meta_data: {
            success: false,
            message: "Email sudah digunakan",
            status: 409,
          },
        },
        { status: 409, headers: corsHeaders } // 409 = conflict
      );
    }

    // Meng-hash password sebelum disimpan ke database
    // Angka 10 adalah salt rounds untuk keamanan
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Menyimpan user baru ke database
    await prisma.tb_user.create({
      data: {
        email: body.email,
        password: hashedPassword, // simpan password dalam bentuk hash
      },
    });

    // Response jika registrasi berhasil
    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Registrasi berhasil",
          status: 201,
        },
      },
      { status: 201, headers: corsHeaders } // 201 = created
    );
  } catch (error) {
    // Menampilkan error di terminal
    console.error(error);

    // Response jika terjadi error server
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// PUT – update user
// =======================
// Digunakan untuk memperbarui data user (email dan password)
export async function PUT(request: NextRequest) {
  try {
    // Mengambil data user dari body request
    const user: UserRequest = await request.json();

    // Validasi: ID wajib ada untuk update
    if (!user.id) {
      return NextResponse.json(
        { message: "ID diperlukan" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Hash password baru sebelum disimpan
    const hash = await bcrypt.hash(user.password, 10);

    // Update data user di database berdasarkan ID
    const update = await prisma.tb_user.update({
      where: { id: Number(user.id) },
      data: {
        email: user.email,
        password: hash, // simpan password dalam bentuk hash
      },
    });

    // Response jika update berhasil
    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Data berhasil diperbarui",
          status: 200,
        },
        user: update,
      },
      { headers: corsHeaders }
    );
  } catch (e) {
    // Menampilkan error di terminal
    console.error(e);

    // Response jika user tidak ditemukan
    return NextResponse.json(
      { message: "User tidak ditemukan" },
      { status: 404, headers: corsHeaders }
    );
  }
}

// =======================
// DELETE – hapus user
// =======================
// Digunakan untuk menghapus data user dari database
export async function DELETE(request: NextRequest) {
  try {
    // Mengambil ID user dari body request
    const { id }: { id: number } = await request.json();

    // Menghapus user berdasarkan ID
    await prisma.tb_user.delete({
      where: { id: Number(id) },
    });

    // Response jika data berhasil dihapus
    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Data berhasil dihapus",
          status: 200,
        },
      },
      { headers: corsHeaders }
    );
  } catch (e) {
    // Menampilkan error di terminal
    console.error(e);

    // Response jika user tidak ditemukan
    return NextResponse.json(
      { message: "User tidak ditemukan" },
      { status: 404, headers: corsHeaders }
    );
  }
}
