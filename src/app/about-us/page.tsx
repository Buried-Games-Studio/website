import { Metadata } from "next";
import { AboutUsContent } from "@/components/pages/about-us-content";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Buried Games Studio, an indie game development studio founded in Kuwait in 2018. Discover our story, mission, core values, and the team behind our games.',
  alternates: { canonical: '/about-us' },
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}
