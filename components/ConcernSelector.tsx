"use client";

import { ConcernOption } from "@/lib/types";

const concerns: ConcernOption[] = [
  { id: "behavior", label: "Behavior & Discipline", category: "Classroom" },
  { id: "academic", label: "Academic Struggles", category: "Learning" },
  { id: "social", label: "Social-Emotional", category: "Wellbeing" },
  { id: "attendance", label: "Attendance Issues", category: "Engagement" },
  { id: "parent", label: "Parent Communication", category: "Communication" },
  { id: "motivation", label: "Low Motivation", category: "Engagement" },
];

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export default function ConcernSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        What type of concern?
      </label>
      <div className="grid grid-cols-2 gap-2">
        {concerns.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={`p-3 rounded-lg border text-left text-sm font-medium transition-colors ${
              selected === c.id
                ? "border-accent bg-green-50 text-accent"
                : "border-border hover:border-gray-mid"
            }`}
          >
            <span className="block">{c.label}</span>
            <span className="text-xs text-gray-mid">{c.category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
