import { Metadata } from "next";
import { TermsOfUseContent } from "@/components/pages/terms-of-use-content";

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Buried Games Studio. Read the terms and conditions governing the use of our website and services.',
  alternates: { canonical: '/terms-of-use' },
};

export default function TermsOfUsePage() {
  return <TermsOfUseContent />;
}
