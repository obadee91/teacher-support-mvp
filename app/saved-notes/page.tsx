"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SavedNotesList from "@/components/SavedNotesList";
import { getNotes } from "@/lib/storage";
import { SavedNote } from "@/lib/types";

export default function SavedNotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<SavedNote[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("classsupport_isLoggedIn");
    if (isLoggedIn !== "true") {
      router.replace("/login");
      return;
    }
    setNotes(getNotes());
  }, [router]);

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Notes</h1>
        <p className="text-gray-mid text-sm mt-1">
          Your previously saved support responses.
        </p>
      </div>
      <SavedNotesList notes={notes} onDelete={handleDelete} />
    </div>
  );
}
