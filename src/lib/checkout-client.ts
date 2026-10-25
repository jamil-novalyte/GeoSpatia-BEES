"use client";

import { trackEvent } from "@/lib/analytics";

export type CheckoutPackageId =
  | "single-screen"
  | "triage-pack"
  | "pipeline-retainer";

const PACKAGE_IDS: readonly CheckoutPackageId[] = [
  "single-screen",
  "triage-pack",
  "pipeline-retainer",
];

let checkoutInFlight = false;

export function isCheckoutPackageId(value: string | null | undefined): value is CheckoutPackageId {
  return !!value && (PACKAGE_IDS as readonly string[]).includes(value);
}

/**
 * Open Stripe Checkout for an existing package. Card data stays on Stripe.
 * Returns an error message when the session cannot be created; on success the
 * browser navigates away.
 */
export async function startCheckout(input: {
  packageId: CheckoutPackageId;
  candidateSite?: string;
  source: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (checkoutInFlight) {
    return { ok: false, error: "Checkout is already opening." };
  }

  checkoutInFlight = true;
  trackEvent("checkout_started", {
    package_id: input.packageId,
    source: input.source.slice(0, 80),
  });

  const candidateSite = input.candidateSite?.replace(/\s+/g, " ").trim().slice(0, 500);

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId: input.packageId,
        ...(candidateSite ? { candidateSite } : {}),
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      url?: string;
      error?: string;
    };

    if (!res.ok || !data.ok || !data.url) {
      checkoutInFlight = false;
      return {
        ok: false,
        error:
          data.error ||
          "Unable to start checkout right now. Email admin@geospatialabs.com or request a scope review.",
      };
    }

    window.location.href = data.url;
    return { ok: true };
  } catch {
    checkoutInFlight = false;
    return {
      ok: false,
      error: "A network error occurred while opening checkout. Please try again.",
    };
  }
}
