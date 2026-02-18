import { Metadata } from "next";
import { ContactUsContent } from "@/components/pages/contact-us-content";

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Buried Games Studio. Have a question, project idea, or partnership inquiry? We would love to hear from you.',
  alternates: { canonical: '/contact-us' },
};

export default function ContactUsPage() {
  return <ContactUsContent />;
}
