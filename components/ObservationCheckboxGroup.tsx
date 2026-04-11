"use client";

const observations = [
  "Easily distracted",
  "Refuses instructions",
  "Seems withdrawn",
  "Disrupts class",
  "Avoids tasks",
  "Anxious before activities",
  "Struggles with transitions",
  "Difficulty interacting with peers",
];

interface Props {
  selected: string[];
  onChange: (observations: string[]) => void;
}

export default function ObservationCheckboxGroup({
  selected,
  onChange,
}: Props) {
  const toggle = (obs: string) => {
    if (selected.includes(obs)) {
      onChange(selected.filter((s) => s !== obs));
    } else {
      onChange([...selected, obs]);
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold mb-1">Observations</h2>
      <p className="text-sm text-gray-mid mb-3">
        Select all that apply.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {observations.map((obs) => (
          <label
            key={obs}
            className={`flex items-center gap-3 min-h-[48px] p-3 rounded-lg border cursor-pointer transition-all active:scale-[0.98] focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-1 ${
              selected.includes(obs)
                ? "border-accent bg-green-50"
                : "border-border hover:border-gray-mid"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(obs)}
              onChange={() => toggle(obs)}
              className="w-5 h-5 rounded accent-accent shrink-0 focus:outline-none"
            />
            <span className="text-sm">{obs}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
