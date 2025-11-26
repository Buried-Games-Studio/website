"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { GameCard3D } from "@/components/ui/game-card-3d"; // Assuming we reuse this or pass children

export const HorizontalScrollCarousel = ({ items }: { items: any[] }) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[200vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 px-12">
                    {items.map((item) => (
                        <div key={item.id} className="w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0">
                            {/* We render the GameCard3D here directly or pass it as a render prop */}
                            <GameCard3D
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                slug={item.slug}
                                tags={item.tags || ["Action", "Indie"]}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
