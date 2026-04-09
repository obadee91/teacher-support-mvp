"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("classsupport_isLoggedIn");
    if (isLoggedIn === "true") {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-gray-mid">Loading...</div>
    </div>
  );
}
