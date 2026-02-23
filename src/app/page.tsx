import { Metadata } from "next";
import { HomeContent } from "@/components/pages/home-content";

export const metadata: Metadata = {
  title: 'Buried Games Studio | Crafting Worlds, One Game at a Time',
  description: 'Buried Games Studio is an indie game development studio crafting immersive games and interactive experiences. Explore our portfolio of games including Nabsh, Power of Bombs, KoutQ8, and Luna Fantasy.',
  alternates: { canonical: 'https://buriedgames.com' },
};

export default function Home() {
  return <HomeContent />;
}
