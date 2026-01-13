"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../../../lib/auth";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getUser()) {
      router.replace("/auth/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;
  return <>{children}</>;
}
