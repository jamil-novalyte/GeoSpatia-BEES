import type { Metadata } from "next";
import { Pricing } from "@/components/geospatial/pricing";
import { SamplePreview } from "@/components/geospatial/sample-preview";
import { FinalCta } from "@/components/geospatial/final-cta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Order a California BESS preliminary site screen online. Single site $1,500, 3-site pack $3,750, or a pipeline retainer from $4,000/month. Scope review is available before payment.",
  alternates: {
    canonical: "https://geospatialabs.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <SamplePreview />
      <FinalCta />
    </>
  );
}
