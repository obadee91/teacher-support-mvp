"use client";

import { useState } from "react";
import { GenerateResponse, SavedNote } from "@/lib/types";
import { saveNote } from "@/lib/storage";

interface Props {
  result: GenerateResponse;
  concern: string;
  onSaved: () => void;
}

export default function SaveNoteForm({ result, concern, onSaved }: Props) {
  const [studentName, setStudentName] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const note: SavedNote = {
      id: Date.now().toString(),
      studentName: studentName || "Unnamed Student",
      concern,
      interpretation: result.interpretation,
      strategies: result.strategies,
      scripts: result.scripts,
      nextSteps: result.nextSteps,
      escalation: result.escalation,
      disclaimer: result.disclaimer,
      createdAt: new Date().toISOString(),
    };
    saveNote(note);
    setSaved(true);
    onSaved();
  };

  if (saved) {
    return (
      <div className="rounded-xl border border-accent bg-green-50 p-4 text-center">
        <p className="text-accent font-medium">Note saved successfully!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm space-y-3">
      <h3 className="font-semibold text-lg">Save This Note</h3>
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student name (optional)"
        className="w-full px-4 py-3 rounded-lg border border-border text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        onClick={handleSave}
        className="w-full py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
      >
        Save Note
      </button>
    </div>
  );
}
