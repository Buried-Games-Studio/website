"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { localePath } from "@/lib/i18n";

interface GameCard3DProps {
    id: string;
    title: string;
    description: string;
    image: string; // URL or path
    slug: string;
    tags?: string[];
}

export const GameCard3D = ({ id, title, description, image, slug, tags }: GameCard3DProps) => {
    const { language } = useLanguage();
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <Link href={localePath(language, `/games/${slug}`)} className="block perspective-1000">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.05 : 1})`,
                    transition: "transform 0.1s ease-out",
                }}
                className={cn(
                    "relative h-[400px] w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl transition-colors group-hover:border-primary/40",
                    "transform-gpu preserve-3d group"
                )}
            >
                {/* Image Background */}
                <div className="absolute inset-0 h-full w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 start-0 w-full p-6 translate-z-20">
                    <div className="mb-2 flex flex-wrap gap-2">
                        {tags?.map((tag) => (
                            <span key={tag} className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] text-foreground/70 backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="mb-2 text-base md:text-lg font-headline font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-foreground/65 line-clamp-2 leading-relaxed">{description}</p>
                </div>

                {/* Hover Glow Effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.15), transparent 70%)`
                    }}
                />
            </div>
        </Link>
    );
};
