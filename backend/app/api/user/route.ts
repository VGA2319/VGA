import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

// Tipe data untuk request body
interface UserRequest {
    id?: number;
    email: string;
    password: string;
}

// ========================================
// GET (Tampilkan semua user)
// ========================================
export async function GET() {
    try {
        const data = await prisma.user.findMany();

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Tampil data user",
                status: 200
            },
            users: data
        });
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan server"
        }, { status: 500 });
    }
}

// ========================================
// POST (Tambah user baru)
// ========================================
export async function POST(request: NextRequest) {
    try {
        const user: UserRequest = await request.json();

        // Cek apakah email sudah digunakan
        const check = await prisma.user.findFirst({
            where: { email: user.email }
        });

        if (check) {
            return NextResponse.json({
                meta_data: {
                    success: false,
                    message: "Email sudah digunakan!",
                    status: 409
                }
            }, { status: 409 });
        }

        // Hash password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);

        // Simpan data
        await prisma.user.create({
            data: {
                email: user.email,
                password: hash
            }
        });

        return NextResponse.json({
            meta_data: {
                success: true,
                message: "Data berhasil disimpan",
                status: 201
            }
        }, { status: 201 });

    } catch (e) {
        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan server"
        }, { status: 500 });
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

        const update = await prisma.user.update({
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

        await prisma.user.delete({
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
        return NextResponse.json({
            success: false,
            message: "User tidak ditemukan"
        }, { status: 404 });
    }
}