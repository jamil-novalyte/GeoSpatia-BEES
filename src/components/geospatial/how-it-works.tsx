"use client";

import { Section, SectionHeading } from "./section";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Choose a package and pay",
    detail:
      "Order one site for $1,500, three sites for $3,750, or the monthly desk from $4,000. Card checkout is on Stripe. If coverage is uncertain, request a written scope check first — that form does not charge a card.",
    tag: "Paid kickoff",
  },
  {
    n: "02",
    title: "Name the California BESS site",
    detail:
      "Add the address, APN, parcel, or coordinates at checkout, or include them in the scope form. Tell us the decision the brief should support.",
    tag: "One candidate context",
  },
  {
    n: "03",
    title: "We gather public evidence",
    detail:
      "After paid kickoff, GeoSpatia Labs assembles grid, parcel, permitting, environmental, and project records from identified public sources and labels what those sources do not show.",
    tag: "Identified sources only",
  },
  {
    n: "04",
    title: "Use the brief to focus spend",
    detail:
      "The preliminary brief separates findings, sources, unknowns, conflicts, and next-step questions so engineering, interconnection, legal, and permitting work goes where it is actually warranted.",
    tag: "5 business days",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="border-b border-line bg-muted py-20 md:py-24"
    >
      <SectionHeading
        eyebrow="How it works"
        title="Pay, name the site, then read the public record"
        intro="Research starts after a paid kickoff. The brief stays preliminary: it organizes identified sources and leaves unknowns labeled."
      />

      <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className="relative flex flex-col gap-3 bg-card p-5 sm:p-6 min-w-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium text-emerald">
                {s.n}
              </span>
              <span className="rounded-full border border-line-soft bg-muted/60 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink-soft">
                {s.tag}
              </span>
            </div>
            <h3 className="text-lg font-semibold leading-snug text-ink break-words">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground break-words">
              {s.detail}
            </p>
            {i < steps.length - 1 && (
              <ArrowRight
                className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 rounded-full border border-line bg-card text-emerald lg:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
