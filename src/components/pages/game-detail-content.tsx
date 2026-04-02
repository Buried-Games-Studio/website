"use client";

import { useLanguage } from "@/contexts/language-context";
import { getGameData } from "@/lib/content";
import { getGameTheme } from "@/lib/themes/game-themes";
import { GameThemeProvider } from "@/components/providers/game-theme-provider";
import { GameHeroSection } from "@/components/games/game-hero-section";
import { GameAboutSection } from "@/components/games/game-about-section";
import { GameFeaturesSection } from "@/components/games/game-features-section";
import { GameGallerySection } from "@/components/games/game-gallery-section";
import { GameCTASection } from "@/components/games/game-cta-section";
import { GameCategoriesSection } from "@/components/games/game-categories-section";
import { GameStoryComicSection } from "@/components/games/game-story-comic-section";
import { GameCharactersSection } from "@/components/games/game-characters-section";
import { GameDesignJourneySection } from "@/components/games/game-design-journey-section";
import { GameRolesSection } from "@/components/games/game-roles-section";
import { assets } from "@/lib/assets";

// Image maps using cloud URLs
const gameLogoMap: Record<string, string | undefined> = {
  "power-of-bombs": assets.powerOfBombsLogo,
  koutq8: assets.koutq8Logo,
  nabsh: assets.nabshLogo,
  arrab: assets.arrabHatLogo,
};

const heroImageMap: Record<string, string> = {
  "POPBackground.jpg": assets.popBackground,
};

const galleryImageMap: Record<string, string> = {
  "nabsh_logo.png": assets.nabshLogo,
  "POPOverview.jpg": assets.popOverview,
  "KoutQ8Image_1.png": assets.koutq8Image1,
  "KoutQ8Image_2.png": assets.koutq8Image2,
  "KoutQ8Image_3.png": assets.koutq8Image3,
};

const storeImageMap: Record<string, string> = {
  "downloadAppStoreImage.png": assets.downloadAppStore,
};

export function GameDetailContent({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const game = getGameData(slug);

  if (!game) return null;

  const theme = getGameTheme(game.id);
  const gameLogo =
    gameLogoMap[game.id] ?? (game.logoUrl ? game.logoUrl : undefined);
  const heroSrc = heroImageMap[game.heroImage] || game.heroImage;

  const aboutImage =
    gameLogo
      ? gameLogo
      : game.gallery && game.gallery[0]
        ? galleryImageMap[game.gallery[0].url] || game.gallery[0].url
        : heroSrc;

  return (
    <GameThemeProvider gameId={game.id}>
        <main className="min-h-screen bg-background overflow-x-hidden">
          <GameHeroSection
            game={game}
            theme={theme}
            language={language}
            gameLogo={gameLogo}
            heroSrc={heroSrc}
          />
          <GameAboutSection
            game={game}
            theme={theme}
            language={language}
            aboutImage={aboutImage}
          />
          <GameFeaturesSection
            game={game}
            theme={theme}
            language={language}
          />

          {/* Arrab-specific: Roles Showcase */}
          {game.roles && game.roles.length > 0 && (
            <GameRolesSection
              roles={game.roles}
              theme={theme}
              language={language}
            />
          )}

          {/* GBTL-specific: Story Comic */}
          {game.comicSlides && game.comicSlides.length > 0 && (
            <GameStoryComicSection
              slides={game.comicSlides}
              theme={theme}
              language={language}
            />
          )}

          {/* GBTL-specific: Characters */}
          {game.characters && game.characters.length > 0 && game.characters[0]?.sprite && (
            <GameCharactersSection
              characters={game.characters}
              theme={theme}
              language={language}
            />
          )}

          {/* GBTL-specific: Design Journey + Trailer */}
          {game.designAssets && game.designAssets.length > 0 && (
            <GameDesignJourneySection
              assets={game.designAssets}
              trailerUrl={game.trailerUrl}
              theme={theme}
              language={language}
            />
          )}

          {/* Categories carousel (Nabsh) */}
          {game.categories && game.categories.length > 0 && (
            <GameCategoriesSection
              categories={game.categories}
              theme={theme}
              language={language}
            />
          )}

          {/* Standard gallery (other games) */}
          {(!game.categories || game.categories.length === 0) &&
           (!game.comicSlides || game.comicSlides.length === 0) && (
            <GameGallerySection
              game={game}
              theme={theme}
              language={language}
              galleryImageMap={galleryImageMap}
            />
          )}

          <GameCTASection
            game={game}
            theme={theme}
            language={language}
            gameLogo={gameLogo}
            storeImageMap={storeImageMap}
          />
        </main>
    </GameThemeProvider>
  );
}
