"use client";

import * as React from "react";
import Link from "next/link";
import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { TopographicParcelBg } from "./topographic-bg";
import { CheckoutButton } from "./checkout-button";

export function FinalCta() {
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null);

  return (
    <Section
      id="final-cta"
      className="relative overflow-hidden bg-background py-20 md:py-24"
    >
      <div className="absolute inset-0 text-ink overflow-hidden pointer-events-none" aria-hidden="true">
        <TopographicParcelBg variant="soft" />
      </div>

      <div className="surface-card relative mx-auto w-full max-w-4xl overflow-hidden px-5 py-10 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute top-0 right-0 sm:-top-10 sm:-right-10 size-44 rounded-full bg-emerald/8 blur-2xl max-w-full" aria-hidden="true" />

        <div className="relative">
          <span className="eyebrow inline-flex items-center gap-2 text-emerald">
            <span className="h-px w-5 bg-emerald/50" />
            Paid kickoff · California BESS
          </span>
          <h2 className="mt-3 display-md text-ink text-balance break-words">
            Order the screen. Send the site. Get the public record organized.
          </h2>
          <p className="mt-4 max-w-2xl text-[0.9375rem] sm:text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            The entry brief is $1,500 for one California BESS candidate, delivered
            in 5 business days after payment. Checkout collects the site or APN
            and runs on Stripe. If coverage is uncertain, ask for a written scope
            check first — that form does not charge a card. Findings stay
            preliminary: no interconnection guarantee and no approval prediction.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CheckoutButton
              packageId="single-screen"
              source="final_cta"
              onError={setCheckoutError}
              className="h-11 w-full gap-2 bg-emerald text-sm text-emerald-foreground shadow-sm hover:bg-emerald-soft sm:h-12 sm:w-auto sm:text-base"
            >
              Order site screen — $1,500
              <ArrowRight className="size-4 shrink-0" />
            </CheckoutButton>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto gap-2 border-line bg-card hover:bg-muted cursor-pointer text-sm sm:text-base h-11 sm:h-12"
            >
              <Link href="/pricing#order">
                Compare packages
              </Link>
            </Button>
          </div>

          {checkoutError && (
            <p className="mt-3 text-sm text-rose" role="alert">
              {checkoutError}
            </p>
          )}

          <p className="mt-6 text-sm text-muted-foreground">
            <Link href="/sample-report" className="inline-flex items-center gap-1.5 font-medium text-ink underline-offset-4 hover:underline">
              <FileText className="size-3.5 text-emerald" />
              See what a brief covers
            </Link>
            <span className="mx-2 text-line">·</span>
            <Link href="/request" className="font-medium underline-offset-4 hover:text-ink hover:underline">
              Request scope review
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
