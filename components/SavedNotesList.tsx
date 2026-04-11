"use client";

import { useState } from "react";
import { SavedNote } from "@/lib/types";
import { deleteNote } from "@/lib/storage";
import ResultsCard from "@/components/ResultsCard";

interface Props {
  notes: SavedNote[];
  onDelete: (id: string) => void;
}

const concernColors: Record<string, string> = {
  behaviour: "bg-red-100 text-red-700",
  anxiety: "bg-purple-100 text-purple-700",
  attention: "bg-orange-100 text-orange-700",
  "emotional-regulation": "bg-pink-100 text-pink-700",
  "social-interaction": "bg-blue-100 text-blue-700",
  "learning-engagement": "bg-teal-100 text-teal-700",
  other: "bg-gray-100 text-gray-700",
};

function ConcernBadge({ concern }: { concern: string }) {
  const color = concernColors[concern] || concernColors.other;
  const label = concern
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}

export default function SavedNotesList({ notes, onDelete }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (notes.length === 0) return null;

  const handleDelete = (id: string) => {
    deleteNote(id);
    onDelete(id);
    setConfirmDeleteId(null);
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => {
        const isExpanded = expandedId === note.id;
        const isConfirming = confirmDeleteId === note.id;
        const preview =
          note.note || note.generatedResponse.strategies[0] || "";

        return (
          <div
            key={note.id}
            className="rounded-xl border border-border bg-white shadow-sm overflow-hidden"
          >
            {/* Collapsed card header */}
            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-lg">{note.pupilId}</h3>
                    <ConcernBadge concern={note.concern} />
                  </div>
                  <p className="text-sm text-gray-mid">{note.date}</p>
                  {!isExpanded && preview && (
                    <p className="text-sm text-gray-mid mt-2 line-clamp-2">
                      {preview}
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : note.id)}
                  className="min-h-[44px] px-4 flex items-center rounded-lg border border-accent text-accent text-sm font-medium hover:bg-green-50 active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {isExpanded ? "Collapse" : "View Full"}
                </button>

                {!isConfirming ? (
                  <button
                    onClick={() => setConfirmDeleteId(note.id)}
                    className="min-h-[44px] px-4 flex items-center rounded-lg border border-border text-red-500 text-sm font-medium hover:bg-red-50 hover:border-red-200 active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                  >
                    Delete
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-red-600">Are you sure?</span>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="min-h-[44px] px-4 flex items-center rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="min-h-[44px] px-4 flex items-center rounded-lg border border-border text-sm font-medium hover:bg-gray-light active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Expanded detail view */}
            {isExpanded && (
              <div className="border-t border-border bg-gray-light p-4 sm:p-5 space-y-4 animate-fade-in">
                {note.note && (
                  <div className="rounded-lg bg-white border border-border p-4">
                    <p className="text-xs font-semibold text-gray-mid uppercase mb-1">
                      Teacher Note
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{note.note}</p>
                  </div>
                )}

                {note.observations.length > 0 && (
                  <div className="rounded-lg bg-white border border-border p-4">
                    <p className="text-xs font-semibold text-gray-mid uppercase mb-2">
                      Observations
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {note.observations.map((obs) => (
                        <span
                          key={obs}
                          className="inline-block px-2.5 py-1 rounded-md bg-gray-light border border-border text-xs"
                        >
                          {obs}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <ResultsCard result={note.generatedResponse} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
