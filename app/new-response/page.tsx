"use client";

import { useState } from "react";
import ConcernSelector from "@/components/ConcernSelector";
import ObservationCheckboxGroup from "@/components/ObservationCheckboxGroup";
import TeacherNotesInput from "@/components/TeacherNotesInput";
import ContextFields from "@/components/ContextFields";
import GenerateButton from "@/components/GenerateButton";
import ResultsCard from "@/components/ResultsCard";
import SaveNoteForm from "@/components/SaveNoteForm";
import { generateSupportResponse } from "@/lib/openai";
import { GenerateResponse } from "@/lib/types";

export default function NewResponsePage() {
  const [concern, setConcern] = useState("");
  const [observations, setObservations] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [studentName, setStudentName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await generateSupportResponse({
        concern,
        observations,
        teacherNotes: notes,
        studentName,
        gradeLevel,
        subject,
      });
      setResult(response);
    } catch {
      setError("Failed to generate response. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Response</h1>
        <p className="text-gray-mid text-sm mt-1">
          Describe the situation and get tailored support.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-white p-5 shadow-sm space-y-5">
        <ConcernSelector selected={concern} onSelect={setConcern} />
        <ObservationCheckboxGroup
          concernId={concern}
          selected={observations}
          onChange={setObservations}
        />
        <ContextFields
          studentName={studentName}
          gradeLevel={gradeLevel}
          subject={subject}
          onStudentNameChange={setStudentName}
          onGradeLevelChange={setGradeLevel}
          onSubjectChange={setSubject}
        />
        <TeacherNotesInput value={notes} onChange={setNotes} />
        <GenerateButton
          onClick={handleGenerate}
          loading={loading}
          disabled={!concern}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <>
          <ResultsCard result={result} />
          <SaveNoteForm
            result={result}
            concern={concern}
            onSaved={() => {}}
          />
        </>
      )}
    </div>
  );
}
