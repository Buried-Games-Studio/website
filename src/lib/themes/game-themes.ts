export interface GameTheme {
  id: string;
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    glow: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
  };
  layout: "magical-rpg" | "explosive-arcade" | "sleek-competitive" | "pixel-adventure" | "noir-mafia";
  particleColor: string;
}

const gameThemes: Record<string, GameTheme> = {
  "luna-fantasy": {
    id: "luna-fantasy",
    colors: {
      primary: "270 60% 55%",
      primaryForeground: "0 0% 98%",
      secondary: "270 40% 20%",
      accent: "45 100% 60%",
      glow: "rgba(147, 51, 234, 0.5)",
      gradientFrom: "#7c3aed",
      gradientVia: "#a855f7",
      gradientTo: "#d4a017",
    },
    layout: "magical-rpg",
    particleColor: "#d4a017",
  },
  "power-of-bombs": {
    id: "power-of-bombs",
    colors: {
      primary: "20 100% 55%",
      primaryForeground: "0 0% 98%",
      secondary: "0 80% 25%",
      accent: "0 100% 50%",
      glow: "rgba(249, 115, 22, 0.5)",
      gradientFrom: "#ea580c",
      gradientVia: "#f97316",
      gradientTo: "#ef4444",
    },
    layout: "explosive-arcade",
    particleColor: "#f97316",
  },
  koutq8: {
    id: "koutq8",
    colors: {
      primary: "160 70% 45%",
      primaryForeground: "0 0% 98%",
      secondary: "160 50% 15%",
      accent: "45 100% 50%",
      glow: "rgba(20, 184, 166, 0.5)",
      gradientFrom: "#0d9488",
      gradientVia: "#14b8a6",
      gradientTo: "#facc15",
    },
    layout: "sleek-competitive",
    particleColor: "#14b8a6",
  },
  nabsh: {
    id: "nabsh",
    colors: {
      primary: "220 80% 55%",
      primaryForeground: "0 0% 98%",
      secondary: "220 60% 20%",
      accent: "45 100% 50%",
      glow: "rgba(59, 130, 246, 0.5)",
      gradientFrom: "#2563eb",
      gradientVia: "#3b82f6",
      gradientTo: "#facc15",
    },
    layout: "sleek-competitive",
    particleColor: "#3b82f6",
  },
  arrab: {
    id: "arrab",
    colors: {
      primary: "0 55% 50%",
      primaryForeground: "0 0% 98%",
      secondary: "0 40% 15%",
      accent: "40 65% 58%",
      glow: "rgba(194, 58, 58, 0.5)",
      gradientFrom: "#1a0a0a",
      gradientVia: "#c23a3a",
      gradientTo: "#d4a853",
    },
    layout: "noir-mafia",
    particleColor: "#d4a853",
  },
  "gathered-by-the-light": {
    id: "gathered-by-the-light",
    colors: {
      primary: "45 80% 55%",
      primaryForeground: "0 0% 98%",
      secondary: "200 30% 15%",
      accent: "45 100% 60%",
      glow: "rgba(234, 179, 8, 0.5)",
      gradientFrom: "#1a3a2a",
      gradientVia: "#2d5a3d",
      gradientTo: "#eab308",
    },
    layout: "pixel-adventure",
    particleColor: "#eab308",
  },
};

export function getGameTheme(gameId: string): GameTheme {
  return gameThemes[gameId] ?? gameThemes["nabsh"];
}

export function getGameThemeStyles(theme: GameTheme): React.CSSProperties {
  return {
    "--primary": theme.colors.primary,
    "--primary-foreground": theme.colors.primaryForeground,
    "--secondary": theme.colors.secondary,
    "--accent": theme.colors.accent,
    "--ring": theme.colors.primary,
  } as React.CSSProperties;
}
