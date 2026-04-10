"use client";

const concerns = [
  { id: "behaviour", label: "Behaviour" },
  { id: "anxiety", label: "Anxiety" },
  { id: "attention", label: "Attention / Focus" },
  { id: "emotional-regulation", label: "Emotional Regulation" },
  { id: "social-interaction", label: "Social Interaction" },
  { id: "learning-engagement", label: "Learning Engagement" },
  { id: "other", label: "Other" },
];

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export default function ConcernSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-base font-semibold mb-1">Type of concern</h2>
      <p className="text-sm text-gray-mid mb-3">
        Select the area you need support with.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {concerns.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={`p-4 rounded-lg border text-sm font-medium text-center transition-colors ${
              selected === c.id
                ? "border-accent bg-green-50 text-accent ring-2 ring-accent"
                : "border-border hover:border-gray-mid"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
