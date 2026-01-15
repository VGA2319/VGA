// lib/auth.ts
// =======================
// HELPER AUTENTIKASI USER
// =======================
// File ini berisi fungsi-fungsi bantu untuk
// mengecek status login user di sisi client

// =======================
// AMBIL DATA USER LOGIN
// =======================
// Mengambil data user dari localStorage
export function getUser() {
  // Jika dijalankan di server (SSR), hentikan proses
  if (typeof window === "undefined") return null;

  // Ambil data user dari localStorage
  const user = localStorage.getItem("user");

  // Jika ada data, parse JSON
  // Jika tidak ada, kembalikan null
  return user ? JSON.parse(user) : null;
}

// =======================
// CEK STATUS LOGIN
// =======================
// Mengecek apakah user sudah login atau belum
export function isLoggedIn() {
  // Jika getUser() bernilai true, berarti user login
  return !!getUser();
}

// =======================
// LOGOUT USER
// =======================
// Menghapus data user dari localStorage
export function logout() {
  localStorage.removeItem("user");
}
