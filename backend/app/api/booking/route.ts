import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* =======================
   CORS
======================= */
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  try {
    const { userId, roomId, name, email, checkIn, checkOut } = await req.json();

    if (!userId || !roomId || !name || !email || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "Data booking tidak lengkap" },
        { status: 400 }
      );
    }