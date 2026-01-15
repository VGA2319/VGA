// Import NextRequest dan NextResponse dari Next.js
// NextResponse digunakan untuk mengirim response ke client
import { NextRequest, NextResponse } from "next/server";

// Import prisma client untuk melakukan operasi database
import { prisma } from "@/lib/prisma";

// Konfigurasi CORS agar API bisa diakses dari frontend (localhost:3001)
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",        // origin yang diizinkan
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",          // metode HTTP yang boleh digunakan
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // header yang boleh dikirim
};

// =======================
// HANDLE POST ROOM
// =======================
// Fungsi ini digunakan untuk menambahkan data kamar baru ke database
export async function POST(req: Request) {
  try {
    // Mengambil data JSON dari body request yang dikirim frontend
    const { name, price } = await req.json();

    // Validasi: nama kamar dan harga wajib diisi
    // Jika salah satu kosong, kirim response error
    if (!name || !price) {
      return NextResponse.json(
        { error: "Nama kamar dan harga wajib diisi" },
        { status: 400 } // 400 = bad request
      );
    }

    // Menyimpan data kamar baru ke database menggunakan Prisma
    const room = await prisma.room.create({
      data: {
        name,                 // nama kamar
        price: Number(price)  // harga kamar dikonversi ke Number
      },
    });

    // Mengirim response sukses beserta data kamar yang baru ditambahkan
    return NextResponse.json({ message: "Kamar berhasil ditambahkan", room });
  } catch (err) {
    // Jika terjadi error saat proses simpan ke database
    return NextResponse.json(
      { error: "Gagal menambah kamar" },
      { status: 500 } // 500 = internal server error
    );
  }
}

// =======================
// HANDLE GET ROOM
// =======================
// Fungsi ini digunakan untuk mengambil semua data kamar dari database
export async function GET() {
  // Mengambil seluruh data kamar dari tabel room
  const rooms = await prisma.room.findMany();

  // Mengirim data kamar ke frontend dalam bentuk JSON
  return NextResponse.json(rooms);
}
