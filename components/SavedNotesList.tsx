"use client";

import { SavedNote } from "@/lib/types";
import { deleteNote } from "@/lib/storage";

interface Props {
  notes: SavedNote[];
  onDelete: (id: string) => void;
}

export default function SavedNotesList({ notes, onDelete }: Props) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-mid">
        <p className="text-lg font-medium">No saved notes yet</p>
        <p className="text-sm mt-1">
          Generate a response and save it to see it here.
        </p>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    deleteNote(id);
    onDelete(id);
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-xl border border-border bg-white p-5 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold">{note.studentName}</h3>
              <p className="text-xs text-gray-mid">
                {new Date(note.createdAt).toLocaleDateString()} &middot;{" "}
                {note.concern}
              </p>
            </div>
            <button
              onClick={() => handleDelete(note.id)}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
          <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap">
            {note.response}
          </p>
          {note.strategies.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-mid uppercase mb-1">
                Strategies
              </p>
              <ul className="text-sm space-y-1">
                {note.strategies.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">&#x2022;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-gray-mid uppercase mb-1">
              Follow-Up
            </p>
            <p className="text-sm whitespace-pre-wrap">{note.followUp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
