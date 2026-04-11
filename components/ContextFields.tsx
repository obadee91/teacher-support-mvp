"use client";

interface Props {
  ageGroup: string;
  setting: string;
  frequency: string;
  onAgeGroupChange: (v: string) => void;
  onSettingChange: (v: string) => void;
  onFrequencyChange: (v: string) => void;
}

const selectClass =
  "w-full min-h-[44px] px-4 py-3 rounded-lg border border-border text-base text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow appearance-none";

export default function ContextFields({
  ageGroup,
  setting,
  frequency,
  onAgeGroupChange,
  onSettingChange,
  onFrequencyChange,
}: Props) {
  return (
    <div>
      <h2 className="text-base font-semibold mb-1">Pupil context</h2>
      <p className="text-sm text-gray-mid mb-3">Optional — helps tailor the response.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label htmlFor="ageGroup" className="block text-sm font-medium mb-1">
            Age Group
          </label>
          <select
            id="ageGroup"
            value={ageGroup}
            onChange={(e) => onAgeGroupChange(e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="Early Years">Early Years</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
          </select>
        </div>
        <div>
          <label htmlFor="setting" className="block text-sm font-medium mb-1">
            Setting
          </label>
          <select
            id="setting"
            value={setting}
            onChange={(e) => onSettingChange(e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="Classroom">Classroom</option>
            <option value="Playground">Playground</option>
            <option value="Group Activity">Group Activity</option>
            <option value="One-to-One">One-to-One</option>
          </select>
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium mb-1">
            Frequency
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => onFrequencyChange(e.target.value)}
            className={selectClass}
          >
            <option value="">Select...</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Often">Often</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
      </div>
    </div>
  );
}
