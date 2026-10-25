"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CalendarCheck2,
  CheckCircle2,
  CreditCard,
  FileText,
  Lock,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "./section";
import type { PricingPackageId } from "@/lib/stripe";
import { CheckoutButton } from "./checkout-button";

interface PricingPackageItem {
  id: PricingPackageId;
  name: string;
  price: string;
  cadence: string;
  badge: string;
  buttonLabel: string;
  description: string;
  items: string[];
  featured?: boolean;
  priceNote?: string;
}

const packages: PricingPackageItem[] = [
  {
    id: "single-screen",
    name: "Single Site Screen",
    price: "$1,500",
    cadence: "per candidate site",
    badge: "Start here",
    buttonLabel: "Pay $1,500",
    featured: true,
    description:
      "For a team evaluating one California BESS parcel, APN, address, or coordinate set before committing deeper diligence spend.",
    items: [
      "9-section preliminary intelligence brief",
      "Source register with public-record trail",
      "Unknowns, conflicts, and deeper-diligence flags",
      "5-business-day delivery after paid kickoff",
      "Written email handoff with next-step questions",
    ],
  },
  {
    id: "triage-pack",
    name: "3-Site Triage Pack",
    price: "$3,750",
    cadence: "three candidate sites",
    badge: "Best for shortlists",
    buttonLabel: "Pay $3,750",
    priceNote: "Three single screens list at $4,500. This pack is $3,750.",
    description:
      "For origination and development teams comparing multiple candidate parcels and deciding where to focus engineering, legal, or interconnection bandwidth.",
    items: [
      "Three individual preliminary site screens",
      "Side-by-side evidence-risk comparison",
      "Jurisdiction, zoning, permitting, and environmental flags",
      "Grid/interconnection context from published sources",
      "Prioritized next-stage diligence questions",
    ],
  },
  {
    id: "pipeline-retainer",
    name: "Pipeline Scout Retainer",
    price: "From $4,000",
    cadence: "per month",
    badge: "Recurring diligence desk",
    buttonLabel: "Start at $4,000/mo",
    description:
      "For teams that need a steady external research desk to organize early evidence across a California BESS candidate pipeline.",
    items: [
      "Up to four screens per month",
      "Ten sourced opportunity leads or project/context records",
      "Monthly written pipeline summary",
      "Reusable source library and decision notes",
      "Priority turnaround on qualified requests",
    ],
  },
];

function CheckoutBanner({ status }: { status: string | null }) {
  if (!status) return null;

  if (status === "success") {
    return (
      <div className="mb-8 rounded-xl border border-emerald/40 bg-emerald/10 p-5 text-ink">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald" />
          <div>
            <p className="text-base font-semibold text-emerald">
              Checkout returned as paid.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep the Stripe receipt from the email address you entered. If the candidate site or APN was not on that checkout, send it to admin@geospatialabs.com so the paid screen can be matched to the right parcel. This is a preliminary research order, not an interconnection or approval determination.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="mb-8 rounded-xl border border-line bg-card/70 p-4 text-ink">
        <div className="flex items-center gap-3">
          <XCircle className="size-5 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Checkout was cancelled. Your card was not charged. You can resume checkout anytime or submit candidate coordinates for scope review first.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

function CandidateSiteBanner({ site }: { site: string }) {
  if (!site) return null;

  return (
    <div className="mb-8 rounded-xl border border-emerald/30 bg-emerald/10 p-4 sm:p-5 text-ink">
      <p className="text-sm font-semibold text-emerald">Candidate carried into checkout</p>
      <p className="mt-1 text-sm leading-relaxed text-ink break-words">{site}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Stripe Checkout will show this note before payment. It is a location label, not a feasibility result.{" "}
        <Link
          href={`/request?location=${encodeURIComponent(site)}`}
          className="font-medium text-ink underline underline-offset-2"
        >
          Request a scope review for this site instead
        </Link>
        .
      </p>
    </div>
  );
}

export function Pricing() {
  return (
    <React.Suspense fallback={<PricingSection candidateSite="" />}>
      <PricingFromQuery />
    </React.Suspense>
  );
}

function PricingFromQuery() {
  const searchParams = useSearchParams();
  const candidateSite = searchParams?.get("site")?.trim() ?? "";
  const checkoutStatus = searchParams?.get("checkout") ?? null;
  return <PricingSection candidateSite={candidateSite} checkoutStatus={checkoutStatus} />;
}

function PricingSection({
  candidateSite,
  checkoutStatus = null,
}: {
  candidateSite: string;
  checkoutStatus?: string | null;
}) {
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  return (
    <Section
      id="pricing"
      className="relative overflow-hidden border-b border-line bg-card/35 py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 text-ink opacity-30" aria-hidden="true">
        <div className="dot-bg absolute inset-0 mask-fade-b" />
      </div>

      <div className="relative">
        <div className="scroll-mt-24">
          <CheckoutBanner status={checkoutStatus} />
          <CandidateSiteBanner site={candidateSite} />
        </div>

        {errorMsg && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Founder-led launch pricing"
              title="Order a preliminary California BESS screen. Pay online, or check scope first."
              intro="Single site $1,500. Three-site pack $3,750. Pipeline desk from $4,000 per month. Card checkout runs on Stripe. If you are unsure the candidate is in coverage, request a written scope check before any charge."
            />
          </div>
          <div className="surface-card lg:col-span-5 p-4 sm:p-5 min-w-0">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-emerald/30 bg-emerald/10 text-emerald">
                <ShieldCheck className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">First five founder-led screens</p>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground break-words">
                  Built manually with source-backed findings, transparent unknowns, and explicit diligence boundaries — no fabricated feasibility scores, capacity guarantees, or required calls.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="order" className="mt-10 grid scroll-mt-24 grid-cols-1 gap-5 lg:grid-cols-3">
          {packages.map((pkg) => {
            return (
              <article
                key={pkg.id}
                id={pkg.id}
                className={[
                  "surface-card group flex h-full scroll-mt-24 flex-col overflow-hidden p-5 sm:p-6 transition-all duration-200 hover:border-emerald/40 hover:shadow-sm min-w-0",
                  pkg.featured ? "border-emerald/50 ring-1 ring-emerald/25" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald/25 bg-emerald/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald">
                    {pkg.badge}
                  </span>
                  <FileText className="size-4 text-muted-foreground group-hover:text-emerald" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-ink break-words">{pkg.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{pkg.cadence}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-words">
                  {pkg.description}
                </p>
                {pkg.priceNote && (
                  <p className="mt-3 text-xs font-medium leading-relaxed text-ink">{pkg.priceNote}</p>
                )}

                <ul className="mt-6 flex-1 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald" />
                      <span className="break-words">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-2.5">
                  <CheckoutButton
                    packageId={pkg.id}
                    candidateSite={candidateSite || undefined}
                    source="pricing_card"
                    onError={setErrorMsg}
                    className="h-11 w-full gap-2 bg-emerald text-sm font-medium text-emerald-foreground shadow-sm hover:bg-emerald-soft"
                  >
                    <CreditCard className="size-4 shrink-0" />
                    {pkg.buttonLabel}
                  </CheckoutButton>

                  <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Lock className="size-3 text-emerald" />
                      Card checkout on Stripe
                    </span>
                    <Link
                      href={`/request?package=${pkg.id}${
                        candidateSite ? `&location=${encodeURIComponent(candidateSite)}` : ""
                      }`}
                      className="underline underline-offset-2 transition-colors hover:text-ink"
                    >
                      Scope review first
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-background/70 p-4 sm:p-6 min-w-0">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <CalendarCheck2 className="mt-0.5 size-5 shrink-0 text-emerald" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">Unsure the site is in coverage?</p>
                <p className="mt-1 max-w-3xl text-xs sm:text-sm leading-relaxed text-muted-foreground break-words">
                  California BESS candidates can be paid for above. If the parcel, technology, or jurisdiction might sit outside that scope, send it for a written check first. That form does not charge a card. Research starts after a paid kickoff.
                </p>
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              className="h-11 w-full shrink-0 cursor-pointer border-line bg-card text-sm hover:bg-muted sm:h-12 sm:w-auto sm:text-base"
            >
              <Link href="/request">Request scope review</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
