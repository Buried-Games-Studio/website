import { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/pages/privacy-policy-content";

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Buried Games Studio. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
