import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/* =======================
   CORS CONFIG (WAJIB)
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* =======================
   OPTIONS (PRE-FLIGHT)
======================= */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

interface UserRequest {
  id?: number;
  email: string;
  password: string;
}

// =======================
// GET – ambil semua user
// =======================
export async function GET() {
  try {
    const users = await prisma.tb_user.findMany();

    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Tampil data user",
          status: 200,
        },
        users,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// POST – register user
// =======================
export async function POST(request: NextRequest) {
  try {
    const body: UserRequest = await request.json();

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

    const check = await prisma.tb_user.findFirst({
      where: { email: body.email },
    });

    if (check) {
      return NextResponse.json(
        {
          meta_data: {
            success: false,
            message: "Email sudah digunakan",
            status: 409,
          },
        },
        { status: 409, headers: corsHeaders }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.tb_user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          success: true,
          message: "Registrasi berhasil",
          status: 201,
        },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// PUT – update user
// =======================
export async function PUT(request: NextRequest) {
  try {
    const user: UserRequest = await request.json();

    if (!user.id) {
      return NextResponse.json(
        { message: "ID diperlukan" },
        { status: 400, headers: corsHeaders }
      );
    }

    const hash = await bcrypt.hash(user.password, 10);

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
      { headers: corsHeaders }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "User tidak ditemukan" },
      { status: 404, headers: corsHeaders }
    );
  }
}

// =======================
// DELETE – hapus user
// =======================
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
      { headers: corsHeaders }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "User tidak ditemukan" },
      { status: 404, headers: corsHeaders }
    );
  }
}
