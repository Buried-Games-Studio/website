"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Gamepad2 } from "lucide-react";

interface GameImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackClassName?: string;
  gameTitle?: string;
}

export function GameImage({
  src,
  alt,
  className,
  fallbackClassName,
  gameTitle,
  fill,
  ...props
}: GameImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    !src || src === "" ? "error" : "loading"
  );

  if (status === "error") {
    return (
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden",
          fill ? "absolute inset-0" : "relative",
          "bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/10",
          fallbackClassName || className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="flex flex-col items-center gap-3 text-foreground/40">
          <Gamepad2 className="h-10 w-10" />
          {gameTitle && (
            <span className="text-sm font-medium tracking-wider uppercase">
              {gameTitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  // When using fill, don't wrap in extra div - just render Image directly
  if (fill) {
    return (
      <>
        {status === "loading" && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/5" />
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "transition-opacity duration-500",
            status === "loading" ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          {...props}
        />
      </>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", fallbackClassName || className)}>
      {status === "loading" && (
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/5" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          status === "loading" ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        {...props}
      />
    </div>
  );
}
