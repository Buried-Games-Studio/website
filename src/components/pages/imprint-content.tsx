"use client";

import { type ReactNode } from "react";
import { type Locale } from "@/lib/i18n";
import { legalEntity, formatAddress } from "@/lib/legal-entity";
import { LegalShell, legalLink } from "@/components/pages/legal-shell";

export function ImprintContent({ locale }: { locale: Locale }) {
  const address = formatAddress(legalEntity.registeredAddress);
  const emailLink = (
    <a href={`mailto:${legalEntity.email}`} className={legalLink}>
      {legalEntity.email}
    </a>
  );

  const t = {
    en: {
      eyebrow: "Legal",
      title: "Legal Notice",
      // Shown only before the entity is on the register — no country is named.
      pending:
        "This website is operated by Buried Games Studio, an independent game development studio led by its founder, Fahed Alahmad. A registered legal entity is currently being established; its full registration details will be published on this page once incorporation is complete.",
      basis: "Information provided under the Estonian Information Society Services Act.",
      labels: {
        legalName: "Legal name",
        legalForm: "Legal form",
        registryCode: "Registry code (registrikood)",
        vat: "VAT number",
        office: "Registered office",
        represented: "Represented by",
        tradeName: "Trade name",
        email: "Email",
        website: "Website",
      },
      noVat: "Not VAT-registered",
    },
    ar: {
      eyebrow: "قانوني",
      title: "بيان قانوني",
      pending:
        "يُشغّل هذا الموقع استوديو بريد جيمز، وهو استوديو مستقل لتطوير الألعاب بقيادة مؤسسه فهد الأحمد. ويجري حاليًا تأسيس كيان قانوني مسجّل، وستُنشَر تفاصيل تسجيله الكاملة على هذه الصفحة فور اكتمال التأسيس.",
      basis: "معلومات مقدَّمة بموجب قانون خدمات مجتمع المعلومات الإستوني.",
      labels: {
        legalName: "الاسم القانوني",
        legalForm: "الشكل القانوني",
        registryCode: "رقم التسجيل (registrikood)",
        vat: "رقم ضريبة القيمة المضافة",
        office: "المقر المسجّل",
        represented: "يمثّلها",
        tradeName: "الاسم التجاري",
        email: "البريد الإلكتروني",
        website: "الموقع الإلكتروني",
      },
      noVat: "غير مسجّلة في ضريبة القيمة المضافة",
    },
  }[locale];

  const rows: { label: string; value: ReactNode }[] = legalEntity.registered
    ? [
        { label: t.labels.legalName, value: legalEntity.legalName },
        { label: t.labels.legalForm, value: legalEntity.entityType[locale] },
        { label: t.labels.registryCode, value: legalEntity.registryCode ?? "—" },
        { label: t.labels.vat, value: legalEntity.vatId ?? t.noVat },
        ...(address ? [{ label: t.labels.office, value: address }] : []),
        { label: t.labels.represented, value: legalEntity.founder },
        { label: t.labels.tradeName, value: legalEntity.tradeName },
        { label: t.labels.email, value: emailLink },
        {
          label: t.labels.website,
          value: (
            <a href="https://buriedgames.com" className={legalLink}>
              buriedgames.com
            </a>
          ),
        },
      ]
    : [];

  return (
    <LegalShell eyebrow={t.eyebrow} title={t.title}>
      {legalEntity.registered ? (
        <div className="space-y-6">
          <dl className="divide-y divide-border rounded-xl border border-border bg-card/40">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4"
              >
                <dt className="text-sm font-medium text-foreground/55">{row.label}</dt>
                <dd className="text-sm text-foreground/85 sm:col-span-2">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-foreground/45">{t.basis}</p>
        </div>
      ) : (
        <div className="space-y-4 text-foreground/75 leading-relaxed">
          <p>{t.pending}</p>
          <p>{emailLink}</p>
        </div>
      )}
    </LegalShell>
  );
}
