import { Metadata } from "next";
import { GamesListingContent } from "@/components/pages/games-listing-content";

export const metadata: Metadata = {
  title: 'Our Games — Indie Game Development Portfolio',
  description: 'Explore games by Buried Games Studio: Nabsh trivia, Power of Bombs arcade, KoutQ8 mobile, Arrab social deduction, and more. Indie game development from Kuwait.',
  alternates: { canonical: '/games' },
};

export default function GamesPage() {
  return <GamesListingContent />;
}
