import type { Metadata } from "next";
import { RequestFormView } from "@/components/geospatial/request-form-view";

export const metadata: Metadata = {
  title: "Order or Request a California BESS Site Screen",
  description:
    "Pay for a preliminary California BESS site screen online from $1,500, or send the candidate site for a written scope check before any charge.",
};

export default function RequestPage() {
  return <RequestFormView />;
}
