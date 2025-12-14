import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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

    return NextResponse.json({
      meta_data: {
        success: true,
        message: "Tampil data user",
        status: 200,
      },
      users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
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
        { status: 400 }
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
        { status: 409 }
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
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
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
            return NextResponse.json({
                success: false,
                message: "ID diperlukan"
            }, { status: 400 });
        }

        const hash = bcrypt.hashSync(user.password, 10);

        const update = await prisma.tb_user.update({
            where: { id: Number(user.id) },
            data: {
                email: user.email,
                password: hash
            }
        });

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data berhasil diperbarui",
                status: 200
            },
            user: update
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "User tidak ditemukan"
        }, { status: 404 });
    }
}

// ========================================
// DELETE (Hapus user)
// ========================================
export async function DELETE(request: NextRequest) {
    try {
        const { id }: { id: number } = await request.json();

        await prisma.tb_user.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data berhasil dihapus",
                status: 200
            }
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "User tidak ditemukan"
        }, { status: 404 });
    }
}
