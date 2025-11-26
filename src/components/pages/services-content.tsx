"use client";

import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Gamepad2, Lightbulb, Palette, Smartphone, Bug, Music, DollarSign, Users, Server, Wrench } from "lucide-react";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function ServicesContent() {
    const { language } = useLanguage();
    const t = getTranslation(language);
    const { title, items } = t.services;

    const serviceIcons: { [key: string]: any } = {
        'Full Game Development': Gamepad2,
        'Game Design & Prototyping': Lightbulb,
        '2D & 3D Art/Animation': Palette,
        'Mobile Game Porting': Smartphone,
        'QA & Testing': Bug,
        'Audio Design & Music': Music,
        'Game Monetization Strategy': DollarSign,
        'Live Ops & Community Management': Users,
        'Backend & Network Development': Server,
        'Technical Art & Pipeline Development': Wrench,
        // Arabic mappings
        'تطوير الألعاب بالكامل': Gamepad2,
        'تصميم الألعاب والنماذج الأولية': Lightbulb,
        'فن ورسوم متحركة ثنائية وثلاثية الأبعاد': Palette,
        'نقل الألعاب إلى الجوال': Smartphone,
        'ضمان الجودة والاختبار': Bug,
        'تصميم الصوت والموسيقى': Music,
        'استراتيجية تحقيق الدخل من الألعاب': DollarSign,
        'العمليات الحية وإدارة المجتمع': Users,
        'تطوير الواجهة الخلفية والشبكات': Server,
        'الفن التقني وتطوير خطوط الإنتاج': Wrench,
    };

    return (
        <main className="relative min-h-screen pt-24 pb-16 overflow-hidden">
            <AnimatedBackground />

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.15),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(var(--secondary),0.2),transparent_50%)] pointer-events-none" />

            <div className="container relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-lg">
                        {title}
                    </h1>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                </div>

                <BentoGrid className="max-w-7xl mx-auto">
                    {items.map((service, index) => {
                        const Icon = serviceIcons[service.name] || Gamepad2;
                        return (
                            <BentoGridItem
                                key={index}
                                title={service.name}
                                description={service.description}
                                header={
                                    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-white/5 group-hover/bento:border-primary/20 transition-colors relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
                                        <Icon className="w-16 h-16 text-primary/20 absolute -bottom-4 -right-4 rotate-12 group-hover/bento:scale-110 transition-transform duration-500" />
                                    </div>
                                }
                                icon={<Icon className="h-6 w-6 text-primary" />}
                                className={index === 3 || index === 6 ? "md:col-span-2" : ""}
                            />
                        );
                    })}
                </BentoGrid>

                <div className="mt-20 text-center animate-fade-in-up delay-300">
                    <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent">
                        <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-background/80 backdrop-blur-md border border-primary/20 text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)]">
                            <Link href="/contact-us">
                                {language === 'ar' ? 'ابدأ مشروعك معنا' : 'Start Your Project With Us'}
                                {language === 'ar' ? <ArrowRight className="mr-2 h-5 w-5 rotate-180" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
