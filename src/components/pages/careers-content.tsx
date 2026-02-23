"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Palette,
  TrendingUp,
  Clock,
  Search,
  MapPin,
  Briefcase,
  Building2,
  Send,
  Linkedin,
  ArrowRight,
  X,
} from "lucide-react";
import { ParallaxProvider } from "react-scroll-parallax";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticlesBackground = dynamic(
  () =>
    import("@/components/particles-background").then(
      (mod) => mod.ParticlesBackground
    ),
  { ssr: false }
);

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Position {
  title: { en: string; ar: string };
  department: { en: string; ar: string };
  location: { en: string; ar: string };
  type: { en: string; ar: string };
}

/* ─────────────────────────────────────────────
   DATA — Add positions here when available
───────────────────────────────────────────── */
const openPositions: Position[] = [
  // Example:
  // {
  //   title: { en: "Senior Unity Developer", ar: "مطور يونيتي أول" },
  //   department: { en: "Engineering", ar: "الهندسة" },
  //   location: { en: "Remote", ar: "عن بعد" },
  //   type: { en: "Full-time", ar: "دوام كامل" },
  // },
];

/* Filter option definitions */
const departments = {
  en: ["All Departments", "Engineering", "Design", "Art", "Production", "QA", "Audio", "Marketing"],
  ar: ["جميع الأقسام", "الهندسة", "التصميم", "الفن", "الإنتاج", "ضمان الجودة", "الصوت", "التسويق"],
};

const locations = {
  en: ["All Locations", "Remote", "On-site", "Hybrid"],
  ar: ["جميع المواقع", "عن بعد", "في الموقع", "هجين"],
};

const jobTypes = {
  en: ["All Types", "Full-time", "Part-time", "Contract", "Internship"],
  ar: ["جميع الأنواع", "دوام كامل", "دوام جزئي", "عقد", "تدريب"],
};

export function CareersContent() {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  /* Filter state */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(departments[language][0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[language][0]);
  const [selectedType, setSelectedType] = useState(jobTypes[language][0]);

  const t_ui = {
    en: {
      hero_label: "Careers",
      hero_title: "Join Our Team",
      hero_subtitle:
        "Be part of an indie studio crafting games that challenge, inspire, and entertain players worldwide.",
      stats_positions: "Open Roles",
      stats_departments: "Departments",
      stats_locations: "Locations",
      perks_label: "Why Buried Games",
      perks_title: "What We Offer",
      positions_label: "Opportunities",
      positions_title: "Open Positions",
      search_placeholder: "Search positions...",
      filter_department: "Department",
      filter_location: "Location",
      filter_type: "Job Type",
      clear_filters: "Clear Filters",
      no_results_title: "No positions match your filters",
      no_results_subtitle: "Try adjusting your search or filters to find what you're looking for.",
      empty_title: "No open positions at this time",
      empty_subtitle:
        "We don't have any vacancies right now, but we're always interested in hearing from talented people. Send us your resume and we'll reach out when something opens up.",
      empty_cta: "Submit Your Resume",
      cta_title: "Stay Connected",
      cta_subtitle:
        "Follow us on LinkedIn to be the first to know when new positions open up.",
      cta_email: "Email Us",
      cta_linkedin: "LinkedIn",
      apply: "Apply",
    },
    ar: {
      hero_label: "الوظائف",
      hero_title: "انضم إلى فريقنا",
      hero_subtitle:
        "كن جزءاً من استوديو مستقل يصنع ألعاباً تتحدى وتلهم وتمتع اللاعبين حول العالم.",
      stats_positions: "وظائف مفتوحة",
      stats_departments: "أقسام",
      stats_locations: "مواقع",
      perks_label: "لماذا بريد جيمز",
      perks_title: "ما نقدمه",
      positions_label: "الفرص",
      positions_title: "الوظائف المفتوحة",
      search_placeholder: "ابحث عن وظيفة...",
      filter_department: "القسم",
      filter_location: "الموقع",
      filter_type: "نوع العمل",
      clear_filters: "مسح الفلاتر",
      no_results_title: "لا توجد وظائف تطابق بحثك",
      no_results_subtitle: "حاول تعديل البحث أو الفلاتر للعثور على ما تبحث عنه.",
      empty_title: "لا توجد وظائف مفتوحة حالياً",
      empty_subtitle:
        "ليس لدينا شواغر حالياً، لكننا مهتمون دائماً بسماع أخبار الموهوبين. أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرصة.",
      empty_cta: "أرسل سيرتك الذاتية",
      cta_title: "ابقَ على تواصل",
      cta_subtitle:
        "تابعنا على لينكد إن لتكون أول من يعلم عند فتح وظائف جديدة.",
      cta_email: "راسلنا",
      cta_linkedin: "لينكد إن",
      apply: "قدّم",
    },
  }[language];

  const perks = {
    en: [
      {
        icon: Globe,
        title: "Remote-First",
        description: "Work from anywhere. We value output over office hours.",
      },
      {
        icon: Palette,
        title: "Creative Ownership",
        description: "Direct impact on the games we ship. Your ideas matter.",
      },
      {
        icon: TrendingUp,
        title: "Career Growth",
        description: "Wear many hats, build real skills, ship real products.",
      },
      {
        icon: Clock,
        title: "Flexible Schedule",
        description: "Async-first workflows. Work when you're at your best.",
      },
    ],
    ar: [
      {
        icon: Globe,
        title: "العمل عن بعد",
        description: "اعمل من أي مكان. نقدّر الإنتاجية لا ساعات المكتب.",
      },
      {
        icon: Palette,
        title: "ملكية إبداعية",
        description: "تأثير مباشر على الألعاب. أفكارك مهمة.",
      },
      {
        icon: TrendingUp,
        title: "نمو مهني",
        description: "أدوار متعددة، مهارات حقيقية، منتجات حقيقية.",
      },
      {
        icon: Clock,
        title: "جدول مرن",
        description: "عمل غير متزامن. اعمل عندما تكون في أفضل حالاتك.",
      },
    ],
  }[language];

  /* Filtered positions */
  const filteredPositions = useMemo(() => {
    return openPositions.filter((pos) => {
      const matchesSearch =
        !searchQuery ||
        pos.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.department[language].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        selectedDepartment === departments[language][0] ||
        pos.department[language] === selectedDepartment;
      const matchesLocation =
        selectedLocation === locations[language][0] ||
        pos.location[language] === selectedLocation;
      const matchesType =
        selectedType === jobTypes[language][0] ||
        pos.type[language] === selectedType;
      return matchesSearch && matchesDept && matchesLocation && matchesType;
    });
  }, [searchQuery, selectedDepartment, selectedLocation, selectedType, language]);

  const hasActiveFilters =
    searchQuery ||
    selectedDepartment !== departments[language][0] ||
    selectedLocation !== locations[language][0] ||
    selectedType !== jobTypes[language][0];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment(departments[language][0]);
    setSelectedLocation(locations[language][0]);
    setSelectedType(jobTypes[language][0]);
  };

  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-background overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="relative h-[50vh] min-h-[420px] flex flex-col items-center justify-center overflow-hidden">
          <ParticlesBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 blur-[120px] rounded-full -z-10" />

          <div className="relative z-20 container text-center space-y-5">
            <div className="animate-fade-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
              <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.3em] text-accent uppercase backdrop-blur-md">
                {t_ui.hero_label}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-wide text-white animate-fade-up [animation-delay:400ms] opacity-0 fill-mode-forwards">
              {t_ui.hero_title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:600ms] opacity-0 fill-mode-forwards">
              {t_ui.hero_subtitle}
            </p>
          </div>

          {/* Bottom edge fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
        </section>

        {/* ══════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════ */}
        <section className="!py-0 border-y border-white/5">
          <div className="container">
            <div className="grid grid-cols-3 divide-x divide-white/5">
              {[
                { value: openPositions.length.toString(), label: t_ui.stats_positions },
                { value: departments[language].length - 1 + "", label: t_ui.stats_departments },
                { value: locations[language].length - 1 + "", label: t_ui.stats_locations },
              ].map((stat, i) => (
                <div key={i} className="py-8 text-center">
                  <div className="text-3xl md:text-4xl font-headline font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PERKS
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">
                {t_ui.perks_label}
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
                {t_ui.perks_title}
              </h2>
              <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="group relative p-7 rounded-2xl bg-card/5 border border-white/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(var(--accent),0.3)]"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <perk.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-accent transition-colors">
                      {perk.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {perk.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            OPEN POSITIONS — SEARCH + FILTERS + LIST
        ══════════════════════════════════════ */}
        <section id="positions" className="py-20 md:py-28 bg-secondary/10 border-y border-white/5 relative">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">
                {t_ui.positions_label}
              </span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mt-3">
                {t_ui.positions_title}
              </h2>
              <div className="h-1 w-16 bg-primary rounded-full mx-auto mt-5" />
            </div>

            {/* Search & Filters */}
            <div className="max-w-4xl mx-auto mb-10">
              {/* Search bar */}
              <div className="relative mb-4">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t_ui.search_placeholder}
                  className={`h-12 bg-card/60 border-white/10 backdrop-blur-sm rounded-xl text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                />
              </div>

              {/* Filter row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Department */}
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="h-11 bg-card/60 border-white/10 backdrop-blur-sm rounded-xl text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
                    {departments[language].map((dept) => (
                      <SelectItem key={dept} value={dept} className="focus:bg-primary/10 focus:text-primary">
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Location */}
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-11 bg-card/60 border-white/10 backdrop-blur-sm rounded-xl text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
                    {locations[language].map((loc) => (
                      <SelectItem key={loc} value={loc} className="focus:bg-primary/10 focus:text-primary">
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Job type */}
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-11 bg-card/60 border-white/10 backdrop-blur-sm rounded-xl text-sm">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground shrink-0" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
                    {jobTypes[language].map((type) => (
                      <SelectItem key={type} value={type} className="focus:bg-primary/10 focus:text-primary">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex justify-end"
                >
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    {t_ui.clear_filters}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Results */}
            <div className="max-w-4xl mx-auto">
              {openPositions.length === 0 ? (
                /* No positions exist at all */
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20 px-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {t_ui.empty_title}
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                    {t_ui.empty_subtitle}
                  </p>
                  <Button
                    asChild
                    className="rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 font-bold px-8 h-11"
                  >
                    <a href="mailto:careers@buriedgames.com">
                      <Send className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                      {t_ui.empty_cta}
                    </a>
                  </Button>
                </motion.div>
              ) : filteredPositions.length === 0 ? (
                /* Positions exist but none match filters */
                <div className="text-center py-16 px-6">
                  <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{t_ui.no_results_title}</h3>
                  <p className="text-muted-foreground text-sm">{t_ui.no_results_subtitle}</p>
                </div>
              ) : (
                /* Position cards */
                <div className="space-y-3">
                  {filteredPositions.map((position, index) => (
                    <motion.a
                      key={index}
                      href={`mailto:careers@buriedgames.com?subject=${encodeURIComponent(position.title[language])}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
                      className="group flex items-center justify-between gap-4 p-5 md:p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-white/10 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_-8px_rgba(var(--primary),0.25)] cursor-pointer"
                    >
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
                          {position.title[language]}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            {position.department[language]}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {position.location[language]}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" />
                            {position.type[language]}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 shrink-0 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <section className="container py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3 text-white">
                {t_ui.cta_title}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t_ui.cta_subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 font-bold px-8 h-11"
                >
                  <a href="mailto:careers@buriedgames.com">
                    <Send className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t_ui.cta_email}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 hover:border-accent/50 hover:bg-accent/10 hover:text-accent transition-all duration-300 px-8 h-11"
                >
                  <Link
                    href="https://linkedin.com/company/buriedgames"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t_ui.cta_linkedin}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
    </ParallaxProvider>
  );
}
