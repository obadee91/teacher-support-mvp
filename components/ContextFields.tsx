"use client";

interface Props {
  studentName: string;
  gradeLevel: string;
  subject: string;
  onStudentNameChange: (v: string) => void;
  onGradeLevelChange: (v: string) => void;
  onSubjectChange: (v: string) => void;
}

export default function ContextFields({
  studentName,
  gradeLevel,
  subject,
  onStudentNameChange,
  onGradeLevelChange,
  onSubjectChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label htmlFor="student" className="block text-sm font-medium mb-1">
          Student Name
        </label>
        <input
          id="student"
          type="text"
          value={studentName}
          onChange={(e) => onStudentNameChange(e.target.value)}
          placeholder="Optional"
          className="w-full px-4 py-3 rounded-lg border border-border text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label htmlFor="grade" className="block text-sm font-medium mb-1">
          Grade Level
        </label>
        <input
          id="grade"
          type="text"
          value={gradeLevel}
          onChange={(e) => onGradeLevelChange(e.target.value)}
          placeholder="e.g. 3rd Grade"
          className="w-full px-4 py-3 rounded-lg border border-border text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="e.g. Math"
          className="w-full px-4 py-3 rounded-lg border border-border text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
    </div>
  );
}
