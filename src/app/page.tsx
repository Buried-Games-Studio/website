import { Metadata } from "next";
import { HomeContent } from "@/components/pages/home-content";
import { faqSchemaEn } from "@/lib/schemas/faq-schema";

export const metadata: Metadata = {
  title: 'Buried Games Studio | Indie Game Development Studio from Kuwait',
  description: 'Buried Games Studio — indie game development studio from Kuwait crafting multiplayer games, trivia apps, and interactive experiences. Play Nabsh, Power of Bombs, KoutQ8, and more.',
  alternates: { canonical: 'https://buriedgames.com' },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaEn) }}
      />
      <HomeContent />
    </>
  );
}
