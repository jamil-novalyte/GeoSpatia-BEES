"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { startCheckout, type CheckoutPackageId } from "@/lib/checkout-client";

export function CheckoutButton({
  packageId,
  candidateSite,
  source,
  children,
  className,
  disabled,
  onError,
}: {
  packageId: CheckoutPackageId;
  candidateSite?: string;
  source: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onError?: (message: string) => void;
}) {
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      type="button"
      disabled={disabled || loading}
      onClick={async () => {
        setLoading(true);
        const result = await startCheckout({ packageId, candidateSite, source });
        if (!result.ok) {
          onError?.(result.error);
          setLoading(false);
        }
      }}
      className={cn("cursor-pointer", className)}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin shrink-0" />
          Opening checkout...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
