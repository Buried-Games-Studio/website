"use client";

import { useState, useMemo } from "react";
import { type Locale } from "@/lib/i18n";
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
import { m } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

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

export function CareersContent({ locale }: { locale: Locale }) {
  const language = locale;
  const isRTL = language === "ar";

  /* Filter state */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(departments[language][0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[language][0]);
  const [selectedType, setSelectedType] = useState(jobTypes[language][0]);

  const t_ui = {
    en: {
      hero_label: "Careers",
      hero_title: "Join our team",
      hero_subtitle:
        "Be part of an indie studio crafting games that challenge, inspire, and entertain players worldwide.",
      stats_positions: "Open Roles",
      stats_departments: "Departments",
      stats_locations: "Locations",
      perks_label: "Why Buried Games",
      perks_title: "What we offer",
      positions_label: "Opportunities",
      positions_title: "Open positions",
      search_placeholder: "Search positions...",
      filter_department: "Department",
      filter_location: "Location",
      filter_type: "Job Type",
      clear_filters: "Clear filters",
      no_results_title: "No positions match your filters",
      no_results_subtitle: "Try adjusting your search or filters to find what you're looking for.",
      empty_title: "No open positions at this time",
      empty_subtitle:
        "We don't have any vacancies right now, but we're always interested in hearing from talented people. Send us your resume and we'll reach out when something opens up.",
      empty_cta: "Submit your resume",
      cta_title: "Stay connected",
      cta_subtitle:
        "Follow us on LinkedIn to be the first to know when new positions open up.",
      cta_email: "Email us",
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
      <main>

        {/* ══════════════════════════════════════
            HERO band
        ══════════════════════════════════════ */}
        <section className="border-b border-border bg-card/40">
          <div className="container max-w-screen-xl py-14 md:py-20">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-5">
                <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
                {t_ui.hero_label}
              </p>
              <h1 className="font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground">
                {t_ui.hero_title}
              </h1>
              <p className="mt-4 text-base md:text-lg text-foreground/65 max-w-2xl">
                {t_ui.hero_subtitle}
              </p>
            </m.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════ */}
        <section className="border-b border-border">
          <div className="container max-w-screen-xl">
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { value: openPositions.length.toString(), label: t_ui.stats_positions },
                { value: departments[language].length - 1 + "", label: t_ui.stats_departments },
                { value: locations[language].length - 1 + "", label: t_ui.stats_locations },
              ].map((stat, i) => (
                <div key={i} className="py-7 text-center">
                  <div className="text-2xl md:text-3xl font-headline font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm text-foreground/60 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PERKS
        ══════════════════════════════════════ */}
        <section className="container max-w-screen-xl py-14 md:py-20">
          <m.div {...reveal} className="mb-10">
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-4">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t_ui.perks_label}
            </p>
            <h2 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">
              {t_ui.perks_title}
            </h2>
          </m.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((perk, index) => (
              <m.div
                key={index}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.06 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-primary">
                  <perk.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-foreground">
                  {perk.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {perk.description}
                </p>
              </m.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            OPEN POSITIONS — SEARCH + FILTERS + LIST
        ══════════════════════════════════════ */}
        <section id="positions" className="border-y border-border bg-card/40">
          <div className="container max-w-screen-xl py-14 md:py-20">
            {/* Header */}
            <m.div {...reveal} className="mb-10">
              <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-4">
                <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
                {t_ui.positions_label}
              </p>
              <h2 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">
                {t_ui.positions_title}
              </h2>
            </m.div>

            {/* Search & Filters */}
            <div className="max-w-4xl mb-8">
              {/* Search bar */}
              <div className="relative mb-3">
                <Search className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-foreground/40 start-3.5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t_ui.search_placeholder}
                  className="h-12 bg-background border-border rounded-lg text-base placeholder:text-foreground/40 focus-visible:ring-primary/30 focus-visible:border-primary/50 ps-11 pe-4"
                />
              </div>

              {/* Filter row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Department */}
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="h-11 bg-background border-border rounded-lg text-sm focus:ring-primary/30 focus:border-primary/50">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-foreground/40 shrink-0" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {departments[language].map((dept) => (
                      <SelectItem key={dept} value={dept} className="focus:bg-primary/10">
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Location */}
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-11 bg-background border-border rounded-lg text-sm focus:ring-primary/30 focus:border-primary/50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-foreground/40 shrink-0" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {locations[language].map((loc) => (
                      <SelectItem key={loc} value={loc} className="focus:bg-primary/10">
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Job type */}
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-11 bg-background border-border rounded-lg text-sm focus:ring-primary/30 focus:border-primary/50">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-foreground/40 shrink-0" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {jobTypes[language].map((type) => (
                      <SelectItem key={type} value={type} className="focus:bg-primary/10">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <m.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex justify-end"
                >
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    {t_ui.clear_filters}
                  </button>
                </m.div>
              )}
            </div>

            {/* Results */}
            <div className="max-w-4xl">
              {openPositions.length === 0 ? (
                /* No positions exist at all */
                <m.div
                  {...reveal}
                  className="rounded-xl border border-border bg-card text-center py-16 px-6"
                >
                  <div className="w-14 h-14 rounded-lg bg-background border border-border flex items-center justify-center mx-auto mb-5">
                    <Briefcase className="w-6 h-6 text-foreground/50" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                    {t_ui.empty_title}
                  </h3>
                  <p className="text-foreground/65 max-w-md mx-auto mb-7 leading-relaxed">
                    {t_ui.empty_subtitle}
                  </p>
                  <Button
                    asChild
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-7 h-11"
                  >
                    <a href="mailto:careers@buriedgames.com">
                      <Send className="w-4 h-4 me-2" />
                      {t_ui.empty_cta}
                    </a>
                  </Button>
                </m.div>
              ) : filteredPositions.length === 0 ? (
                /* Positions exist but none match filters */
                <div className="text-center py-14 px-6">
                  <Search className="w-9 h-9 text-foreground/30 mx-auto mb-4" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{t_ui.no_results_title}</h3>
                  <p className="text-foreground/65 text-sm">{t_ui.no_results_subtitle}</p>
                </div>
              ) : (
                /* Position cards */
                <div className="space-y-3">
                  {filteredPositions.map((position, index) => (
                    <m.a
                      key={index}
                      href={`mailto:careers@buriedgames.com?subject=${encodeURIComponent(position.title[language])}`}
                      {...reveal}
                      transition={{ ...reveal.transition, delay: index * 0.05 }}
                      className="group flex items-center justify-between gap-4 p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {position.title[language]}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-foreground/60">
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
                      <ArrowRight className={`w-5 h-5 text-foreground/40 group-hover:text-primary transition-all duration-300 shrink-0 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </m.a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════ */}
        <section className="container max-w-screen-xl py-14 md:py-20">
          <m.div {...reveal} className="rounded-xl border border-border bg-card p-8 md:p-12 text-center">
            <div className="max-w-lg mx-auto">
              <h2 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground mb-3">
                {t_ui.cta_title}
              </h2>
              <p className="text-foreground/65 mb-7 leading-relaxed">
                {t_ui.cta_subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold px-7 h-11"
                >
                  <a href="mailto:careers@buriedgames.com">
                    <Send className="w-4 h-4 me-2" />
                    {t_ui.cta_email}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-foreground/20 hover:bg-foreground/5 transition-all duration-300 px-7 h-11"
                >
                  <Link
                    href="https://linkedin.com/company/buriedgames"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 me-2" />
                    {t_ui.cta_linkedin}
                  </Link>
                </Button>
              </div>
            </div>
          </m.div>
        </section>

      </main>
  );
}
