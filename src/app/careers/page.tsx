import { Metadata } from "next";
import { CareersContent } from "@/components/pages/careers-content";

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Buried Games Studio. Explore open positions and become part of an indie game development team crafting multiplayer games, strategy games, and interactive digital experiences.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return <CareersContent />;
}
