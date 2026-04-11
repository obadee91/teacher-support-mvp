"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TeacherNotesInput({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="notes" className="block text-sm font-medium mb-1">
        Anything else you&apos;re noticing?
      </label>
      <textarea
        id="notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pupil becomes unsettled during transitions and often avoids independent work."
        rows={3}
        className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-border text-base text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow resize-none"
      />
    </div>
  );
}
