"use client";

import { GenerateResponse } from "@/lib/types";

interface Props {
  result: GenerateResponse;
}

export default function ResultsCard({ result }: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Suggested Response</h3>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {result.response}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Strategies</h3>
        <ul className="space-y-2">
          {result.strategies.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="text-accent font-bold mt-0.5">&#x2022;</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Follow-Up Plan</h3>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {result.followUp}
        </p>
      </div>
    </div>
  );
}
