import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  try {
    const { name, price } = await req.json();

    if (!name || !price) {
      return NextResponse.json(
        { error: "Nama kamar dan harga wajib diisi" },
        { status: 400 }
      );
    }

    const room = await prisma.room.create({
      data: {
        name,
        price: Number(price),
      },
    });

    return NextResponse.json({ message: "Kamar berhasil ditambahkan", room });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal menambah kamar" },
      { status: 500 }
    );
  }
}