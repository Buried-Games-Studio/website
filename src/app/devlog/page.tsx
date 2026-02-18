import { Metadata } from "next";
import { DevlogContent } from "@/components/pages/devlog-content";

export const metadata: Metadata = {
  title: 'Devlog',
  description: 'Follow the development journey of Buried Games Studio. Watch our latest devlogs, tutorials, and behind-the-scenes content.',
  alternates: { canonical: '/devlog' },
};

export default function DevlogPage() {
  return <DevlogContent />;
}
