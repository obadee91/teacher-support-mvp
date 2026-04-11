"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SavedNotesList from "@/components/SavedNotesList";
import { getNotes } from "@/lib/storage";
import { SavedNote } from "@/lib/types";

export default function SavedNotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("classsupport_isLoggedIn");
    if (isLoggedIn !== "true") {
      router.replace("/login");
      return;
    }
    setNotes(getNotes());
    setReady(true);
  }, [router]);

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-mid">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 min-h-[44px] text-sm text-gray-mid hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Saved Notes</h1>
        <p className="text-gray-mid text-sm mt-1">
          {notes.length === 0
            ? "Your saved support responses will appear here."
            : `${notes.length} saved note${notes.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-16">
          <div className="rounded-xl border border-border bg-white p-8 shadow-sm inline-block max-w-sm">
            <svg
              className="w-12 h-12 text-gray-mid mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="text-lg font-medium mb-1">No saved notes yet</p>
            <p className="text-sm text-gray-mid mb-5">
              Generate a support response and save it to build your notes library.
            </p>
            <Link
              href="/new-response"
              className="inline-block min-h-[48px] px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Create New Response
            </Link>
          </div>
        </div>
      ) : (
        <SavedNotesList notes={notes} onDelete={handleDelete} />
      )}
    </div>
  );
}
