"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ConcernSelector from "@/components/ConcernSelector";
import ObservationCheckboxGroup from "@/components/ObservationCheckboxGroup";
import TeacherNotesInput from "@/components/TeacherNotesInput";
import ContextFields from "@/components/ContextFields";
import GenerateButton from "@/components/GenerateButton";
import ResultsCard from "@/components/ResultsCard";
import SaveNoteForm from "@/components/SaveNoteForm";
import { GenerateRequest, GenerateResponse } from "@/lib/types";

export default function NewResponsePage() {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [concern, setConcern] = useState("");
  const [observations, setObservations] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [setting, setSetting] = useState("");
  const [frequency, setFrequency] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("classsupport_isLoggedIn");
    if (isLoggedIn !== "true") {
      router.replace("/login");
    }
  }, [router]);

  const handleGenerate = async () => {
    if (!concern) {
      setValidationError("Please select a concern before generating.");
      return;
    }
    setValidationError("");
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const body: GenerateRequest = {
        concern,
        observations,
        teacherNotes: notes,
        ageGroup,
        setting,
        frequency,
      };
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate response");
      }
      const data: GenerateResponse = await res.json();
      setResult(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to generate response.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold">New Support Response</h1>
        <p className="text-gray-mid text-sm mt-1">
          Describe the situation and get tailored strategies.
        </p>
      </div>

      {/* Section A – Concern */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <ConcernSelector selected={concern} onSelect={(id) => { setConcern(id); setValidationError(""); }} />
      </div>

      {/* Section B – Observations */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm space-y-4">
        <ObservationCheckboxGroup
          selected={observations}
          onChange={setObservations}
        />
        <TeacherNotesInput value={notes} onChange={setNotes} />
      </div>

      {/* Section C – Pupil Context */}
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <ContextFields
          ageGroup={ageGroup}
          setting={setting}
          frequency={frequency}
          onAgeGroupChange={setAgeGroup}
          onSettingChange={setSetting}
          onFrequencyChange={setFrequency}
        />
      </div>

      {/* Section D – Generate */}
      <GenerateButton
        onClick={handleGenerate}
        loading={loading}
        disabled={false}
        validationError={validationError}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div ref={resultsRef} className="space-y-6">
          <div className="border-t border-border pt-6">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <ResultsCard result={result} />
          </div>
          <SaveNoteForm
            result={result}
            concern={concern}
            onSaved={() => {}}
          />
        </div>
      )}
    </div>
  );
}
