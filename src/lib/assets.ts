export const ASSETS_BASE_URL = "https://assets.buriedgames.com";

export function assetUrl(path: string): string {
  return `${ASSETS_BASE_URL}/${path.replace(/^\//, "")}`;
}

// Pre-defined asset paths
export const assets = {
  // Logos
  logo: "https://assets.buriedgames.com/site/images/buriedgames_logo.6d162dd3.png",
  logoWebp: "https://assets.buriedgames.com/site/images/buriedgames_logo.f070631b.webp",
  favicon: "https://assets.buriedgames.com/site/images/Fav-icon.dfde4424.png",

  // Hero
  heroCollage: "https://assets.buriedgames.com/site/images/hero-collage.7d56e447.jpg",

  // Game logos
  nabshLogo: "https://assets.buriedgames.com/site/images/nabsh_logo.8d65b3b2.png",
  powerOfBombsLogo: "https://assets.buriedgames.com/site/images/powerofbombsIconTransparent.5d243419.png",
  powerOfBombsIcon: "https://assets.buriedgames.com/site/images/powerofbombsIcon.084a3de5.jpg",
  koutq8Logo: "https://assets.buriedgames.com/site/images/Koutq8Logo.4ef33671.png",
  lunaFantasyLogo: "https://assets.buriedgames.com/site/images/luna-fantasy_logo.e4fed1cf.png",
  lunaFantasyHero: "https://assets.buriedgames.com/site/images/luna-fantasy-hero.edbed1e7.png",

  // Game screenshots
  popBackground: "https://assets.buriedgames.com/site/images/POPBackground.6a2819f7.jpg",
  popOverview: "https://assets.buriedgames.com/site/images/POPOverview.8ac42f94.jpg",
  koutq8Image1: "https://assets.buriedgames.com/site/images/KoutQ8Image_1.185ef16c.png",
  koutq8Image2: "https://assets.buriedgames.com/site/images/KoutQ8Image_2.bb085378.png",
  koutq8Image3: "https://assets.buriedgames.com/site/images/KoutQ8Image_3.c030b243.png",

  // Store badges
  downloadAppStore: "https://assets.buriedgames.com/site/images/downloadAppStoreImage.2fc0f9d8.png",

  // Engine logos
  unity: "https://assets.buriedgames.com/site/images/UnityImage.e51bcd51.png",
  unrealEngine: "https://assets.buriedgames.com/site/images/UnrealEngineImage.8ee028de.png",
  nextjs: "https://assets.buriedgames.com/site/images/nextjs.0b0554cc.png",

  // About / Team
  aboutSection: "https://assets.buriedgames.com/site/images/AboutUsSection.72d46798.webp",
  // NB: the R2 object key stays `fahed_alahmad.jpeg` — it is a storage path, not
  // a display name, and renaming it without re-uploading would 404 the portrait.
  fahedElahmad: "https://assets.buriedgames.com/site/images/fahed_alahmad.f3ebe0d3.jpeg",
  bokhariHamid: "https://assets.buriedgames.com/site/images/bokhari_hamid.b5b4f6f4.jpeg",

  // Partners
  gavan: "https://assets.buriedgames.com/site/images/gavan.408290ff.png",

  // How it Works
  howitWorksConcept: "https://assets.buriedgames.com/site/images/howitWorks_Concept.46c4fc64.webp",
  howitWorksDesigning: "https://assets.buriedgames.com/site/images/howitWorks_designing.bbb18546.webp",
  howitWorksPrototyping: "https://assets.buriedgames.com/site/images/howitWorks_prototyping.26fe0fce.webp",
  howitWorksTesting: "https://assets.buriedgames.com/site/images/howitWorks_testing.769e2aad.webp",
  howitWorksLaunch: "https://assets.buriedgames.com/site/images/howitWorks_launch.de1eb681.webp",

  // Services
  gdd: "https://assets.buriedgames.com/site/images/gdd.74062e75.webp",
  artAssets: "https://assets.buriedgames.com/site/images/art-assets.4745b529.webp",
  prototyping: "https://assets.buriedgames.com/site/images/prototypin.f81023a2.webp",
  qaTesting: "https://assets.buriedgames.com/site/images/qatesting.230ce2a0.webp",
  publishing: "https://assets.buriedgames.com/site/images/publishing.11619b69.webp",
  artist: "https://assets.buriedgames.com/site/images/artist.b8d68537.webp",

  // Thumbnails
  thumbnail1: "https://assets.buriedgames.com/site/images/thumbnail_1.47fd2fab.webp",
  thumbnail2: "https://assets.buriedgames.com/site/images/thumbnail_2.07fed2f1.webp",
  thumbnail3: "https://assets.buriedgames.com/site/images/thumbnail_3.4747df70.webp",
  thumbnail4: "https://assets.buriedgames.com/site/images/thumbnail_4.bac833c6.webp",
  thumbnail5: "https://assets.buriedgames.com/site/images/thumbnail_5.9ec7aaf5.webp",
  thumbnail6: "https://assets.buriedgames.com/site/images/thumbnail_6.791ca0ab.webp",

  // Arrab
  arrabLogo: "https://assets.buriedgames.com/site/images/games/arrab/logo.53788a85.png",
  arrabHatLogo: "https://assets.buriedgames.com/site/images/games/arrab/hat-logo.d1d2b7d7.png",
  arrabHeroBg: "https://assets.buriedgames.com/site/images/games/arrab/hero-bg.d55d0eea.png",
  arrabHeroRight: "https://assets.buriedgames.com/site/images/games/arrab/hero-right.c3f040bc.png",
  arrabRoleGodfather: "https://assets.buriedgames.com/site/images/games/arrab/roles/godfather.871a696a.png",
  arrabRoleMafiaMember: "https://assets.buriedgames.com/site/images/games/arrab/roles/mafia-member.f0dada97.png",
  arrabRoleBarman: "https://assets.buriedgames.com/site/images/games/arrab/roles/barman.c4c6cbd4.png",
  arrabRoleDoctor: "https://assets.buriedgames.com/site/images/games/arrab/roles/doctor.cd9218c7.png",
  arrabRoleDetective: "https://assets.buriedgames.com/site/images/games/arrab/roles/detective.8f09336d.png",
  arrabRoleBodyguard: "https://assets.buriedgames.com/site/images/games/arrab/roles/bodyguard.eab74ea8.png",
  arrabRoleSniper: "https://assets.buriedgames.com/site/images/games/arrab/roles/sniper.b59a3939.png",
  arrabRoleVillager: "https://assets.buriedgames.com/site/images/games/arrab/roles/villager.26d8ce08.png",
  arrabRoleJester: "https://assets.buriedgames.com/site/images/games/arrab/roles/jester.04cd7459.png",
  arrabRoleSerialKiller: "https://assets.buriedgames.com/site/images/games/arrab/roles/serial-killer.4a3b1f6a.png",
  arrabRoleKamikaze: "https://assets.buriedgames.com/site/images/games/arrab/roles/kamikaze.c75cbf10.png",

  // Background
  bgNoText: "https://assets.buriedgames.com/site/images/buriedgames_bg_no_text.c47771db.webp",
} as const;
