"use client";

import { SavedNote } from "@/lib/types";
import { deleteNote } from "@/lib/storage";

interface Props {
  notes: SavedNote[];
  onDelete: (id: string) => void;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="text-sm space-y-1">
      {items.map((s, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-accent">&#x2022;</span>
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-mid uppercase mb-1">
      {children}
    </p>
  );
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
      {notes.map((note) => {
        const r = note.generatedResponse;
        return (
          <div
            key={note.id}
            className="rounded-xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold">{note.pupilId}</h3>
                <p className="text-xs text-gray-mid">
                  {note.date} &middot; {note.concern}
                </p>
              </div>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>

            {note.note && (
              <div className="mb-3 rounded-lg bg-gray-light p-3">
                <SectionLabel>Teacher Note</SectionLabel>
                <p className="text-sm whitespace-pre-wrap">{note.note}</p>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <SectionLabel>Interpretation</SectionLabel>
                <p className="text-sm whitespace-pre-wrap">{r.interpretation}</p>
              </div>

              {r.strategies.length > 0 && (
                <div>
                  <SectionLabel>Strategies</SectionLabel>
                  <BulletList items={r.strategies} />
                </div>
              )}

              {r.scripts.length > 0 && (
                <div>
                  <SectionLabel>Example Scripts</SectionLabel>
                  <BulletList items={r.scripts} />
                </div>
              )}

              {r.nextSteps.length > 0 && (
                <div>
                  <SectionLabel>Next Steps</SectionLabel>
                  <BulletList items={r.nextSteps} />
                </div>
              )}

              <div>
                <SectionLabel>When to Escalate</SectionLabel>
                <p className="text-sm whitespace-pre-wrap">{r.escalation}</p>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs text-amber-800">{r.disclaimer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
