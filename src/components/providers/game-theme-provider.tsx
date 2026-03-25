"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type GameTheme, getGameTheme, getGameThemeStyles } from "@/lib/themes/game-themes";

const GameThemeContext = createContext<GameTheme | null>(null);

export function useGameTheme(): GameTheme | null {
  return useContext(GameThemeContext);
}

export function GameThemeProvider({
  gameId,
  children,
}: {
  gameId: string;
  children: ReactNode;
}) {
  const theme = getGameTheme(gameId);
  const styles = getGameThemeStyles(theme);

  return (
    <GameThemeContext.Provider value={theme}>
      <div style={styles} className="contents">
        {children}
      </div>
    </GameThemeContext.Provider>
  );
}
