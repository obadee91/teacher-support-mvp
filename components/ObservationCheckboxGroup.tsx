"use client";

const observationsByType: Record<string, string[]> = {
  behavior: [
    "Disrupts class frequently",
    "Difficulty following instructions",
    "Aggressive toward peers",
    "Refuses to participate",
  ],
  academic: [
    "Falling behind on assignments",
    "Struggles with reading comprehension",
    "Difficulty with math concepts",
    "Poor test performance",
  ],
  social: [
    "Withdrawn from peers",
    "Frequent emotional outbursts",
    "Difficulty making friends",
    "Signs of anxiety or stress",
  ],
  attendance: [
    "Frequent absences",
    "Chronic tardiness",
    "Leaves class early",
    "Missing after lunch/breaks",
  ],
  parent: [
    "Unresponsive to contact",
    "Difficult conversations",
    "Language barrier",
    "Disagreement on approach",
  ],
  motivation: [
    "Won't start tasks",
    "Gives up easily",
    "Seems bored or disengaged",
    "Only engages with certain subjects",
  ],
};

interface Props {
  concernId: string;
  selected: string[];
  onChange: (observations: string[]) => void;
}

export default function ObservationCheckboxGroup({
  concernId,
  selected,
  onChange,
}: Props) {
  const options = observationsByType[concernId] || [];

  const toggle = (obs: string) => {
    if (selected.includes(obs)) {
      onChange(selected.filter((s) => s !== obs));
    } else {
      onChange([...selected, obs]);
    }
  };

  if (!concernId) return null;

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        What have you observed?
      </label>
      <div className="space-y-2">
        {options.map((obs) => (
          <label
            key={obs}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              selected.includes(obs)
                ? "border-accent bg-green-50"
                : "border-border hover:border-gray-mid"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(obs)}
              onChange={() => toggle(obs)}
              className="w-5 h-5 rounded accent-accent"
            />
            <span className="text-sm">{obs}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
