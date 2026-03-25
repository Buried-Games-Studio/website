"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";

interface Role {
  id: string;
  team: string;
  name: { en: string; ar: string };
  action: { en: string; ar: string };
  image: string;
}

interface GameRolesSectionProps {
  roles: Role[];
  theme: GameTheme;
  language: string;
}

const teamConfig = {
  mafia: {
    label: { en: "Mafia", ar: "المافيا" },
    color: "from-red-950/60 to-red-900/20",
    border: "border-red-800/40",
    activeBorder: "border-red-500/60",
    badge: "bg-red-900/60 text-red-300 border-red-700/50",
    glow: "rgba(220, 38, 38, 0.3)",
    accent: "#dc2626",
  },
  town: {
    label: { en: "Town", ar: "المدينة" },
    color: "from-blue-950/60 to-blue-900/20",
    border: "border-blue-800/40",
    activeBorder: "border-blue-500/60",
    badge: "bg-blue-900/60 text-blue-300 border-blue-700/50",
    glow: "rgba(59, 130, 246, 0.3)",
    accent: "#3b82f6",
  },
  neutral: {
    label: { en: "Neutral", ar: "محايد" },
    color: "from-purple-950/60 to-purple-900/20",
    border: "border-purple-800/40",
    activeBorder: "border-purple-500/60",
    badge: "bg-purple-900/60 text-purple-300 border-purple-700/50",
    glow: "rgba(139, 92, 246, 0.3)",
    accent: "#8b5cf6",
  },
} as const;

type TeamKey = keyof typeof teamConfig;

function RoleCard({ role, language, index }: { role: Role; language: string; index: number }) {
  const team = teamConfig[role.team as TeamKey] || teamConfig.town;
  const isRTL = language === "ar";

  return (
    <motion.div
      variants={staggerChild}
      className={cn(
        "group relative rounded-xl overflow-hidden border backdrop-blur-sm transition-all duration-500",
        "bg-gradient-to-b",
        team.color,
        team.border,
        "hover:scale-[1.03] hover:shadow-lg"
      )}
      style={{
        boxShadow: `0 0 0px ${team.glow}`,
      }}
      whileHover={{
        boxShadow: `0 0 30px ${team.glow}`,
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: team.accent }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-xl" style={{ borderColor: team.accent }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-xl" style={{ borderColor: team.accent }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: team.accent }} />

      {/* Dossier number */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-white/20 tracking-widest">
        _{String(index + 1).padStart(2, "0")}
      </div>

      {/* Role icon */}
      <div className="flex justify-center pt-6 pb-3">
        <div className="relative w-24 h-24 md:w-28 md:h-28 transition-transform duration-500 group-hover:scale-110">
          <Image
            src={role.image}
            alt={role.name[language as "en" | "ar"]}
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            sizes="112px"
          />
        </div>
      </div>

      {/* Info */}
      <div className={cn("px-4 pb-4 text-center", isRTL && "font-arabic")}>
        <h4 className="text-base font-bold text-white mb-1 font-headline">
          {role.name[language as "en" | "ar"]}
        </h4>
        <div className="flex items-center justify-center gap-1.5">
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
              team.badge
            )}
          >
            {role.action[language as "en" | "ar"]}
          </span>
        </div>
      </div>

      {/* Hover shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />
    </motion.div>
  );
}

export function GameRolesSection({ roles, theme, language }: GameRolesSectionProps) {
  const isRTL = language === "ar";
  const teams: TeamKey[] = ["mafia", "town", "neutral"];
  const [activeTeam, setActiveTeam] = useState<TeamKey | "all">("all");

  const filteredRoles = activeTeam === "all" ? roles : roles.filter((r) => r.team === activeTeam);

  const t_ui = {
    en: {
      title: "The Roles",
      subtitle: "Every role has a purpose. Every player has a mission.",
      all: "All Roles",
    },
    ar: {
      title: "الأدوار",
      subtitle: "لكل دور هدف. لكل لاعب مهمة.",
      all: "جميع الأدوار",
    },
  }[language]!;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background noir atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(194,58,58,0.08),transparent_60%)]" />

      <div className="relative container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 mb-4 block">
            [ {isRTL ? "الأسرة" : "THE FAMILY"} ]
          </span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mb-4">
            {t_ui.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t_ui.subtitle}
          </p>
        </motion.div>

        {/* Team filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveTeam("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300",
              activeTeam === "all"
                ? "bg-white/10 border-white/30 text-white"
                : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
            )}
          >
            {t_ui.all}
          </button>
          {teams.map((team) => {
            const config = teamConfig[team];
            return (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300",
                  activeTeam === team
                    ? cn(config.badge)
                    : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
                )}
              >
                {config.label[language as "en" | "ar"]}
              </button>
            );
          })}
        </motion.div>

        {/* Roles grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeam}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          >
            {filteredRoles.map((role, i) => (
              <RoleCard key={role.id} role={role} language={language} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
