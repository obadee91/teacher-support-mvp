"use client";

import { useEffect, useState } from "react";
import SavedNotesList from "@/components/SavedNotesList";
import { getSavedNotes } from "@/lib/storage";
import { SavedNote } from "@/lib/types";

export default function SavedNotesPage() {
  const [notes, setNotes] = useState<SavedNote[]>([]);

  useEffect(() => {
    setNotes(getSavedNotes());
  }, []);

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
