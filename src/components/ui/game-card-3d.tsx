"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GameCard3DProps {
    id: string;
    title: string;
    description: string;
    image: string; // URL or path
    slug: string;
    tags?: string[];
}

export const GameCard3D = ({ id, title, description, image, slug, tags }: GameCard3DProps) => {
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
        <Link href={`/games/${slug}`} className="block perspective-1000">
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
                    "relative h-[400px] w-full overflow-hidden rounded-xl border border-primary/20 bg-card shadow-xl",
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
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-z-20">
                    <div className="mb-2 flex flex-wrap gap-2">
                        {tags?.map((tag) => (
                            <span key={tag} className="rounded-full bg-primary/20 px-2 py-1 text-xs text-primary backdrop-blur-sm border border-primary/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-white group-hover:text-primary transition-colors text-glow">{title}</h3>
                    <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-white transition-colors">{description}</p>
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
