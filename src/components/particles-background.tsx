"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      if (engine) {
        await loadSlim(engine);
      }
    }).then(() => {
      setInit(true);
    });
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
        className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none" // Explicitly force full width/height
      />
    );
  }

  return null;
}