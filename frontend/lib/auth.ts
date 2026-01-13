// lib/auth.ts
export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
  return !!getUser();
}

export function logout() {
  localStorage.removeItem("user");
}
