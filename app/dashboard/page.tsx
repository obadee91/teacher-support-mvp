"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSavedNotes } from "@/lib/storage";

export default function DashboardPage() {
  const [teacherName, setTeacherName] = useState("");
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    setTeacherName(localStorage.getItem("classsupport_teacher") || "Teacher");
    setNoteCount(getSavedNotes().length);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hello, {teacherName}</h1>
        <p className="text-gray-mid mt-1">What can we help with today?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/new-response"
          className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="font-semibold text-lg mb-1">New Response</h2>
          <p className="text-sm text-gray-mid">
            Get AI-powered support for a classroom concern.
          </p>
        </Link>

        <Link
          href="/saved-notes"
          className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="font-semibold text-lg mb-1">Saved Notes</h2>
          <p className="text-sm text-gray-mid">
            {noteCount === 0
              ? "No saved notes yet."
              : `You have ${noteCount} saved note${noteCount === 1 ? "" : "s"}.`}
          </p>
        </Link>
      </div>
    </div>
  );
}
