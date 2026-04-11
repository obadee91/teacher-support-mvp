"use client";

import { GenerateResponse } from "@/lib/types";

interface Props {
  result: GenerateResponse;
}

export default function ResultsCard({ result }: Props) {
  return (
    <div className="space-y-4">
      {/* 1 — Possible Interpretation */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
        <h3 className="font-semibold text-lg mb-2">Possible Interpretation</h3>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {result.interpretation}
        </p>
        <p className="text-xs text-blue-400 italic mt-3">
          This is one possible interpretation — not a diagnosis.
        </p>
      </div>

      {/* 2 — Practical Strategies */}
      <div className="rounded-xl border border-border bg-white p-4 sm:p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-3">Practical Strategies</h3>
        <div className="space-y-2">
          {result.strategies.map((strategy, i) => (
            <div
              key={i}
              className="flex gap-3 items-start p-3 rounded-lg border border-border bg-gray-light"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{strategy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 — Suggested Teacher Scripts */}
      <div className="rounded-xl border border-border bg-white p-4 sm:p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-3">Suggested Teacher Scripts</h3>
        <div className="space-y-3">
          {result.scripts.map((script, i) => (
            <div key={i} className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-accent" />
              <div className="rounded-lg bg-gray-light border border-border p-3 sm:p-4">
                <svg
                  className="w-4 h-4 text-gray-mid mb-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm leading-relaxed italic">{script}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 — Immediate Next Steps */}
      <div className="rounded-xl border border-border bg-white p-4 sm:p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-3">Immediate Next Steps</h3>
        <div className="space-y-2">
          {result.nextSteps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <svg
                className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5 — When to Monitor or Escalate */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
        <div className="flex gap-2 items-center mb-2">
          <svg
            className="w-5 h-5 text-amber-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          <h3 className="font-semibold text-lg">When to Monitor or Escalate</h3>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-amber-900">
          {result.escalation}
        </p>
      </div>

      {/* 6 — Disclaimer */}
      <div className="px-1">
        <p className="text-xs text-gray-mid italic leading-relaxed">
          {result.disclaimer}
        </p>
      </div>
    </div>
  );
}
