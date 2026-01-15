// Import PrismaClient dari package prisma
import { PrismaClient } from "@prisma/client";

// Membuat tipe global agar kita bisa menyimpan instance Prisma
// di object global Node.js
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Jika di global sudah ada prisma, pakai yang itu
// Jika belum ada, buat instance PrismaClient baru
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error"], // Menampilkan query dan error di terminal (untuk debugging)
  });

// Kalau bukan production (artinya development mode)
if (process.env.NODE_ENV !== "production") {
  // Simpan instance Prisma ke global supaya:
  // - Saat hot reload terjadi
  // - Prisma tidak membuat koneksi baru lagi
  globalForPrisma.prisma = prisma;
}
