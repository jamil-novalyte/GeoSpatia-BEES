"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CheckoutButton } from "./checkout-button";

const HIDDEN_PREFIXES = ["/request", "/contact", "/privacy"];

function MobileOrderBarInner() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);

  if (HIDDEN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return null;
  }

  const candidateSite = searchParams?.get("site")?.trim() || undefined;
  const onPricing = pathname === "/pricing";
  const orderOnThisPage = pathname === "/" || pathname === "/pricing" || pathname === "/product";

  return (
    <>
      <div className="h-[4.75rem] md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 backdrop-blur-md md:hidden">
        {error && (
          <p className="border-b border-rose/30 bg-rose/10 px-4 py-1.5 text-[11px] leading-snug text-rose">
            {error}
          </p>
        )}
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-2.5 min-[375px]:px-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald">
              California BESS
            </p>
            <p className="truncate text-sm font-semibold text-ink">From $1,500 / site</p>
          </div>
          {onPricing ? (
            <CheckoutButton
              packageId="single-screen"
              candidateSite={candidateSite}
              source="mobile_bar"
              onError={setError}
              className="h-11 shrink-0 gap-1.5 bg-emerald px-4 text-emerald-foreground hover:bg-emerald-soft"
            >
              Pay $1,500
              <ArrowRight className="size-3.5" />
            </CheckoutButton>
          ) : (
            <Link
              href={orderOnThisPage ? "#order" : "/pricing#order"}
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md bg-emerald px-4 text-sm font-medium text-emerald-foreground shadow-sm hover:bg-emerald-soft"
            >
              Order a screen
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export function MobileOrderBar() {
  return (
    <React.Suspense fallback={null}>
      <MobileOrderBarInner />
    </React.Suspense>
  );
}
