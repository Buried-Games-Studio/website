"use client";

import { motion } from "framer-motion";
import {
  Gamepad2,
  Lightbulb,
  Palette,
  Smartphone,
  TestTube,
  Music,
  Coins,
  Users,
  Server,
  Wrench,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Service {
  name: string;
  description: string;
}

interface ServicesShowcaseProps {
  title: string;
  subtitle: string;
  services: Service[];
  language: "en" | "ar";
  unityImage: any;
  unrealImage: any;
}

const serviceIcons: { [key: string]: React.ElementType } = {
  "Full Game Development": Gamepad2,
  "Game Design & Prototyping": Lightbulb,
  "2D & 3D Art/Animation": Palette,
  "Mobile Game Porting": Smartphone,
  "QA & Testing": TestTube,
  "Audio Design & Music": Music,
  "Game Monetization Strategy": Coins,
  "Live Ops & Community Management": Users,
  "Backend & Network Development": Server,
  "Technical Art & Pipeline Development": Wrench,
  // Arabic
  "تطوير الألعاب بالكامل": Gamepad2,
  "تصميم الألعاب والنماذج الأولية": Lightbulb,
  "فن ورسوم متحركة ثنائية وثلاثية الأبعاد": Palette,
  "نقل الألعاب إلى الجوال": Smartphone,
  "ضمان الجودة والاختبار": TestTube,
  "تصميم الصوت والموسيقى": Music,
  "استراتيجية تحقيق الدخل من الألعاب": Coins,
  "العمليات الحية وإدارة المجتمع": Users,
  "تطوير الواجهة الخلفية والشبكات": Server,
  "الفن التقني وتطوير خطوط الإنتاج": Wrench,
};

const ServiceCard = ({
  service,
  index,
  featured = false,
  language,
}: {
  service: Service;
  index: number;
  featured?: boolean;
  language: "en" | "ar";
}) => {
  const Icon = serviceIcons[service.name] || Sparkles;
  const isRTL = language === "ar";

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/30 p-8 md:p-12"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Floating particles effect */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000 delay-100" />

        {/* Number badge */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <span className="text-8xl md:text-9xl font-headline font-bold text-white/5 group-hover:text-primary/10 transition-colors duration-500">
            01
          </span>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500">
            <Icon className="w-10 h-10" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
              {service.name}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg group-hover:text-white/80 transition-colors duration-300">
              {service.description}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-primary font-medium group/link"
            >
              <span>{language === "en" ? "Learn More" : "اعرف المزيد"}</span>
              <ArrowRight className={cn(
                "w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-2",
                isRTL && "rotate-180 group-hover/link:-translate-x-2"
              )} />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-card/50 border border-white/5 hover:border-primary/40 p-6 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,0,0,0.1)] hover:-translate-y-1"
    >
      {/* Background number */}
      <span className="absolute -top-4 -right-2 text-7xl font-headline font-bold text-white/[0.03] group-hover:text-primary/[0.08] transition-colors duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary/70 mb-5 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {service.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors duration-300">
          {service.description}
        </p>
      </div>

      {/* Hover line accent */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
};

export const ServicesShowcase = ({
  title,
  subtitle,
  services,
  language,
  unityImage,
  unrealImage,
}: ServicesShowcaseProps) => {
  const isRTL = language === "ar";
  const mainServices = services.slice(0, 4);
  const otherServices = services.slice(4);

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              {language === "en" ? "Our Expertise" : "خبراتنا"}
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground">{subtitle}</p>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <span className="text-sm text-muted-foreground hidden md:block">
            {language === "en" ? "Powered by" : "مدعوم بـ"}
          </span>
          <div className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="group relative">
              <Image
                src={unityImage}
                alt="Unity"
                height={40}
                width={40}
                className="h-10 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Unity
              </span>
            </div>
            <div className="w-px bg-white/10" />
            <div className="group relative">
              <Image
                src={unrealImage}
                alt="Unreal Engine"
                height={40}
                width={40}
                className="h-10 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Unreal
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Services Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Featured Card */}
        <ServiceCard
          service={mainServices[0]}
          index={0}
          featured={true}
          language={language}
        />

        {/* Other main services */}
        <div className="md:col-span-1 grid grid-cols-1 gap-4 md:gap-6">
          {mainServices.slice(1).map((service, index) => (
            <ServiceCard
              key={service.name}
              service={service}
              index={index + 1}
              language={language}
            />
          ))}
        </div>
      </div>

      {/* Additional Services - Scrolling Marquee Effect */}
      {otherServices.length > 0 && (
        <div className="relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isRTL ? "50%" : "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-4"
          >
            {[...otherServices, ...otherServices].map((service, index) => {
              const Icon = serviceIcons[service.name] || Sparkles;
              return (
                <div
                  key={`${service.name}-${index}`}
                  className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default"
                >
                  <Icon className="w-5 h-5 text-primary/70" />
                  <span className="text-sm font-medium text-white/80 whitespace-nowrap">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white font-medium transition-all duration-300 group"
        >
          <span>{language === "en" ? "Explore All Services" : "استكشف جميع الخدمات"}</span>
          <ArrowRight className={cn(
            "w-5 h-5 transition-transform duration-300 group-hover:translate-x-1",
            isRTL && "rotate-180 group-hover:-translate-x-1"
          )} />
        </Link>
      </motion.div>
    </div>
  );
};
