"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Defer non-urgent work to browser idle time, falling back to a short timeout
// where requestIdleCallback is unavailable (e.g. Safari). Returns a canceller.
function onIdle(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(cb, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(cb, 200);
  return () => window.clearTimeout(id);
}

// Particles are a purely decorative ambient layer. They are expensive to run
// (canvas rAF loop) and provide no value on small screens or when the user has
// asked for reduced motion, so we skip the engine entirely in those cases.
function particlesAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  return true;
}

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!particlesAllowed()) return;

    let cancelled = false;

    // Defer the engine import + init off the critical path so it never competes
    // with LCP/hydration work; it spins up only once the main thread is idle.
    const cancelIdle = onIdle(() => {
      initParticlesEngine(async (engine) => {
        if (engine) {
          await loadSlim(engine);
        }
      }).then(() => {
        if (!cancelled) setInit(true);
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {};

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false, // IMPORTANT: Disables filling the whole window (fixed/fixed), forces it to fill the PARENT container (absolute)
        zIndex: -1
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true, // Enable hover for interactivity
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 2,
            opacity: 0.8,
            size: 6
          },
        },
      },
      particles: {
        color: {
          value: ["#ff5722", "#ffc107", "#ff9800", "#ffffff"],
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none", // Moves randomly instead of "top" (which can look biased)
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.5, // Slow, ambient floating
          straight: false,
        },
        number: {
          density: {
            enable: true,
            // width: 1920,
            // height: 1080,
          },
          value: 100,
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false
          }
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            sync: false
          }
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute top-0 start-0 w-full h-full -z-10 pointer-events-none" // Explicitly force full width/height
      />
    );
  }

  return null;
}
