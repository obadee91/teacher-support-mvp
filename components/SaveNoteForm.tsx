"use client";

import { useState, useEffect } from "react";
import { GenerateResponse, SavedNote } from "@/lib/types";
import { saveNote } from "@/lib/storage";

interface Props {
  result: GenerateResponse;
  concern: string;
  observations: string[];
  teacherNotes: string;
  onSaved: () => void;
}

export default function SaveNoteForm({
  result,
  concern,
  observations,
  teacherNotes,
  onSaved,
}: Props) {
  const [pupilId, setPupilId] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSave = () => {
    if (!pupilId.trim()) {
      setError("Please enter a pupil identifier.");
      return;
    }
    setError("");

    const saved: SavedNote = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      concern,
      observations,
      teacherNotes,
      generatedResponse: result,
      pupilId: pupilId.trim(),
      note: note.trim(),
    };
    saveNote(saved);
    setToast(true);
    setPupilId("");
    setNote("");
    onSaved();
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-lg">Save This Note</h3>

        <div>
          <label htmlFor="pupilId" className="block text-sm font-medium mb-1">
            Pupil Initials or Reference
          </label>
          <input
            id="pupilId"
            type="text"
            value={pupilId}
            onChange={(e) => { setPupilId(e.target.value); setError(""); }}
            placeholder="e.g. J.S."
            className="w-full px-4 py-3 rounded-lg border border-border text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label htmlFor="saveNote" className="block text-sm font-medium mb-1">
            Your notes
          </label>
          <textarea
            id="saveNote"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add any additional context or follow-up actions..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-border text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-lg bg-accent text-white font-medium text-lg hover:bg-accent-hover transition-colors"
        >
          Save Note
        </button>
      </div>

      {/* Success toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg bg-accent text-white font-medium shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Note saved successfully
        </div>
      )}
    </>
  );
}
