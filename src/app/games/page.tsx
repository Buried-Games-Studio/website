import { Metadata } from "next";
import { GamesListingContent } from "@/components/pages/games-listing-content";

export const metadata: Metadata = {
  title: 'Our Games',
  description: 'Browse all games by Buried Games Studio. From action-packed arcade games to trivia challenges and digital card games, explore our full portfolio.',
  alternates: { canonical: '/games' },
};

export default function GamesPage() {
  return <GamesListingContent />;
}
