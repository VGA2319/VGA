import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Utility untuk header CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ========================================
// OPTIONS (Wajib untuk preflight CORS)
// ========================================
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ========================================
// GET (Tampilkan semua user)
// ========================================
export async function GET() {
  try {
    const data = await prisma.tb_user.findMany();

    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Tampil data user",
          status: 200,
        },
        users: data,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ========================================
// POST (Tambah user baru)
// ========================================
export async function POST(request: NextRequest) {
  try {
    const user: UserRequest = await request.json();

    // Cek apakah email sudah digunakan
    const check = await prisma.tb_user.findFirst({
      where: { email: user.email },
    });

    if (check) {
      return NextResponse.json(
        {
          meta_data: {
            success: false,
            message: "Email sudah digunakan!",
            status: 409,
          },
        },
        { status: 409, headers: corsHeaders }
      );
    }

    // Hash password
    const hash = bcrypt.hashSync(user.password, 10);

    // Simpan data
    await prisma.tb_user.create({
      data: {
        email: user.email,
        password: hash,
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Data berhasil disimpan",
          status: 201,
        },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ========================================
// PUT (Update user)
// ========================================
export async function PUT(request: NextRequest) {
  try {
    const user: UserRequest = await request.json();

    if (!user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID diperlukan",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const hash = bcrypt.hashSync(user.password, 10);

    const update = await prisma.tb_user.update({
      where: { id: Number(user.id) },
      data: {
        email: user.email,
        password: hash,
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Data berhasil diperbarui",
          status: 200,
        },
        user: update,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: "User tidak ditemukan",
      },
      { status: 404, headers: corsHeaders }
    );
  }
}

// ========================================
// DELETE (Hapus user)
// ========================================
export async function DELETE(request: NextRequest) {
  try {
    const { id }: { id: number } = await request.json();

    await prisma.tb_user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Data berhasil dihapus",
          status: 200,
        },
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: "User tidak ditemukan",
      },
      { status: 404, headers: corsHeaders }
    );
  }
}

// Tipe data untuk request body
interface UserRequest {
  id?: number;
  email: string;
  password: string;
}
