"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSavedNotes } from "@/lib/storage";

export default function DashboardPage() {
  const router = useRouter();
  const [noteCount, setNoteCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("classsupport_isLoggedIn");
    if (isLoggedIn !== "true") {
      router.replace("/login");
      return;
    }
    setNoteCount(getSavedNotes().length);
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-mid">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-mid mt-2 max-w-lg">
          Generate practical classroom strategies based on pupil behaviour,
          attention, or anxiety concerns.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/new-response"
          className="flex-1 py-4 rounded-lg bg-accent text-white font-semibold text-lg text-center hover:bg-accent-hover transition-colors"
        >
          Create New Support Response
        </Link>
        <Link
          href="/saved-notes"
          className="flex-1 py-4 rounded-lg border-2 border-accent text-accent font-semibold text-lg text-center hover:bg-green-50 transition-colors"
        >
          View Saved Notes
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white p-5 shadow-sm inline-block">
        <p className="text-sm text-gray-mid">Notes saved</p>
        <p className="text-3xl font-bold mt-1">{noteCount}</p>
      </div>
    </div>
  );
}
