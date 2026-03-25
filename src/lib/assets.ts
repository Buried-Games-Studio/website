export const ASSETS_BASE_URL = "https://assets.buriedgames.com";

export function assetUrl(path: string): string {
  return `${ASSETS_BASE_URL}/${path.replace(/^\//, "")}`;
}

// Pre-defined asset paths
export const assets = {
  // Logos
  logo: `${ASSETS_BASE_URL}/images/buriedgames_logo.png`,
  logoWebp: `${ASSETS_BASE_URL}/images/buriedgames_logo.webp`,
  favicon: `${ASSETS_BASE_URL}/images/Fav-icon.png`,

  // Hero
  heroCollage: `${ASSETS_BASE_URL}/images/hero-collage.jpg`,

  // Game logos
  nabshLogo: `${ASSETS_BASE_URL}/images/nabsh_logo.png`,
  powerOfBombsLogo: `${ASSETS_BASE_URL}/images/powerofbombsIconTransparent.png`,
  powerOfBombsIcon: `${ASSETS_BASE_URL}/images/powerofbombsIcon.jpg`,
  koutq8Logo: `${ASSETS_BASE_URL}/images/Koutq8Logo.png`,
  lunaFantasyLogo: `${ASSETS_BASE_URL}/images/luna-fantasy_logo.png`,
  lunaFantasyHero: `${ASSETS_BASE_URL}/images/luna-fantasy-hero.png`,

  // Game screenshots
  popBackground: `${ASSETS_BASE_URL}/images/POPBackground.jpg`,
  popOverview: `${ASSETS_BASE_URL}/images/POPOverview.jpg`,
  koutq8Image1: `${ASSETS_BASE_URL}/images/KoutQ8Image_1.png`,
  koutq8Image2: `${ASSETS_BASE_URL}/images/KoutQ8Image_2.png`,
  koutq8Image3: `${ASSETS_BASE_URL}/images/KoutQ8Image_3.png`,

  // Store badges
  downloadAppStore: `${ASSETS_BASE_URL}/images/downloadAppStoreImage.png`,

  // Engine logos
  unity: `${ASSETS_BASE_URL}/images/UnityImage.png`,
  unrealEngine: `${ASSETS_BASE_URL}/images/UnrealEngineImage.png`,
  nextjs: `${ASSETS_BASE_URL}/images/nextjs.png`,

  // About / Team
  aboutSection: `${ASSETS_BASE_URL}/images/AboutUsSection.webp`,
  fahedAlahmad: `${ASSETS_BASE_URL}/images/fahed_alahmad.jpeg`,

  // Partners
  gavan: `${ASSETS_BASE_URL}/images/gavan.png`,

  // How it Works
  howitWorksConcept: `${ASSETS_BASE_URL}/images/howitWorks_Concept.webp`,
  howitWorksDesigning: `${ASSETS_BASE_URL}/images/howitWorks_designing.webp`,
  howitWorksPrototyping: `${ASSETS_BASE_URL}/images/howitWorks_prototyping.webp`,
  howitWorksTesting: `${ASSETS_BASE_URL}/images/howitWorks_testing.webp`,
  howitWorksLaunch: `${ASSETS_BASE_URL}/images/howitWorks_launch.webp`,

  // Services
  gdd: `${ASSETS_BASE_URL}/images/gdd.webp`,
  artAssets: `${ASSETS_BASE_URL}/images/art-assets.webp`,
  prototyping: `${ASSETS_BASE_URL}/images/prototypin.webp`,
  qaTesting: `${ASSETS_BASE_URL}/images/qatesting.webp`,
  publishing: `${ASSETS_BASE_URL}/images/publishing.webp`,
  artist: `${ASSETS_BASE_URL}/images/artist.webp`,

  // Thumbnails
  thumbnail1: `${ASSETS_BASE_URL}/images/thumbnail_1.webp`,
  thumbnail2: `${ASSETS_BASE_URL}/images/thumbnail_2.webp`,
  thumbnail3: `${ASSETS_BASE_URL}/images/thumbnail_3.webp`,
  thumbnail4: `${ASSETS_BASE_URL}/images/thumbnail_4.webp`,
  thumbnail5: `${ASSETS_BASE_URL}/images/thumbnail_5.webp`,
  thumbnail6: `${ASSETS_BASE_URL}/images/thumbnail_6.webp`,

  // Arrab
  arrabLogo: `${ASSETS_BASE_URL}/images/games/arrab/logo.png`,
  arrabHatLogo: `${ASSETS_BASE_URL}/images/games/arrab/hat-logo.png`,
  arrabHeroBg: `${ASSETS_BASE_URL}/images/games/arrab/hero-bg.png`,
  arrabHeroRight: `${ASSETS_BASE_URL}/images/games/arrab/hero-right.png`,
  arrabRoleGodfather: `${ASSETS_BASE_URL}/images/games/arrab/roles/godfather.png`,
  arrabRoleMafiaMember: `${ASSETS_BASE_URL}/images/games/arrab/roles/mafia-member.png`,
  arrabRoleBarman: `${ASSETS_BASE_URL}/images/games/arrab/roles/barman.png`,
  arrabRoleDoctor: `${ASSETS_BASE_URL}/images/games/arrab/roles/doctor.png`,
  arrabRoleDetective: `${ASSETS_BASE_URL}/images/games/arrab/roles/detective.png`,
  arrabRoleBodyguard: `${ASSETS_BASE_URL}/images/games/arrab/roles/bodyguard.png`,
  arrabRoleSniper: `${ASSETS_BASE_URL}/images/games/arrab/roles/sniper.png`,
  arrabRoleVillager: `${ASSETS_BASE_URL}/images/games/arrab/roles/villager.png`,
  arrabRoleJester: `${ASSETS_BASE_URL}/images/games/arrab/roles/jester.png`,
  arrabRoleSerialKiller: `${ASSETS_BASE_URL}/images/games/arrab/roles/serial-killer.png`,
  arrabRoleKamikaze: `${ASSETS_BASE_URL}/images/games/arrab/roles/kamikaze.png`,

  // Background
  bgNoText: `${ASSETS_BASE_URL}/images/buriedgames_bg_no_text.webp`,

  // Fonts
  afolkalips: `${ASSETS_BASE_URL}/fonts/afolkalips.woff2`,
} as const;
