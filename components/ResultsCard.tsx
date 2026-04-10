"use client";

import { GenerateResponse } from "@/lib/types";

interface Props {
  result: GenerateResponse;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm">
          <span className="text-accent font-bold mt-0.5">&#x2022;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ResultsCard({ result }: Props) {
  return (
    <div className="space-y-4">
      <Section title="Interpretation">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {result.interpretation}
        </p>
      </Section>

      <Section title="Strategies">
        <BulletList items={result.strategies} />
      </Section>

      <Section title="Example Scripts">
        <BulletList items={result.scripts} />
      </Section>

      <Section title="Next Steps">
        <BulletList items={result.nextSteps} />
      </Section>

      <Section title="When to Escalate">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {result.escalation}
        </p>
      </Section>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          {result.disclaimer}
        </p>
      </div>
    </div>
  );
}
