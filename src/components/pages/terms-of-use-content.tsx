"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { legalEntity, controllerName } from "@/lib/legal-entity";
import {
  LegalShell,
  LegalSections,
  legalLink,
  type LegalSection,
} from "@/components/pages/legal-shell";

// Fixed effective date — reflects the last substantive revision, not page load.
const EFFECTIVE_DATE: Record<Locale, string> = {
  en: "18 July 2026",
  ar: "١٨ يوليو ٢٠٢٦",
};

export function TermsOfUseContent({ locale }: { locale: Locale }) {
  const emailLink = (
    <a href={`mailto:${legalEntity.email}`} className={legalLink}>
      {legalEntity.email}
    </a>
  );
  const privacyLink = (
    <Link href={localePath(locale, "/privacy-policy")} className={legalLink}>
      {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
    </Link>
  );

  // Governing law is gated: no jurisdiction is named until the OÜ is registered,
  // so nothing is asserted prematurely while the entity is being established.
  const governingLaw: Record<Locale, ReactNode> = {
    en: legalEntity.registered ? (
      <>
        These Terms are governed by {legalEntity.governingLaw.en}, without regard to its
        conflict-of-law rules, and the courts of {legalEntity.jurisdiction.en} shall have jurisdiction.
        Nothing in these Terms removes any mandatory legal protections available to you in your country
        of residence.
      </>
    ) : (
      <>
        These Terms are governed by generally applicable law, and nothing in them removes any mandatory
        legal protections available to you in your country of residence. Once our company registration
        is finalised, a specific governing law and competent courts will apply and this section will be
        updated.
      </>
    ),
    ar: legalEntity.registered ? (
      <>
        تخضع هذه الشروط لـ{legalEntity.governingLaw.ar} دون اعتبار لقواعد تنازع القوانين، وتختصّ محاكم{" "}
        {legalEntity.jurisdiction.ar} بالنظر فيها. ولا يُلغي أيٌّ من هذه الشروط أي حماية قانونية إلزامية
        متاحة لك في بلد إقامتك.
      </>
    ) : (
      <>
        تخضع هذه الشروط للقانون المعمول به عمومًا، ولا يُلغي أيٌّ منها أي حماية قانونية إلزامية متاحة لك في
        بلد إقامتك. وعند اكتمال تسجيل شركتنا، سيُطبَّق قانون حاكم ومحاكم مختصّة محدّدة وسيُحدَّث هذا البند.
      </>
    ),
  };

  const content: Record<Locale, { title: string; sections: LegalSection[] }> = {
    en: {
      title: "Terms of Use",
      sections: [
        {
          heading: "1. Acceptance of these terms",
          blocks: [
            <>
              These Terms of Use govern your access to and use of the website at buriedgames.com (the
              &ldquo;Site&rdquo;), operated by {controllerName("en")} (&ldquo;Buried Games&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the Site you agree to these Terms. If you do
              not agree, please do not use the Site.
            </>,
          ],
        },
        {
          heading: "2. Use of the Site",
          blocks: [
            "You may use the Site for lawful, personal or business-evaluation purposes. You agree not to misuse it — including by attempting to gain unauthorised access, disrupting its operation, scraping it at a scale that burdens our infrastructure, or using it to infringe anyone's rights or to break the law.",
          ],
        },
        {
          heading: "3. Intellectual property",
          blocks: [
            "The Site and its content — including text, graphics, logos, UI, game names, artwork, and video — are owned by Buried Games or its licensors and are protected by intellectual-property laws. The names of our games and the Buried Games brand are our trademarks. You may not copy, reproduce, or create derivative works from our content without our prior written permission, except for ordinary personal viewing and sharing of public links.",
          ],
        },
        {
          heading: "4. Your submissions",
          blocks: [
            "When you contact us through the Site, you grant us permission to use the information you provide to respond to and evaluate your inquiry. Please do not send confidential or sensitive information through the contact form; any project engagement is covered by a separate written agreement.",
          ],
        },
        {
          heading: "5. Third-party links",
          blocks: [
            "The Site may link to third-party websites and platforms (for example app stores or social networks). We do not control them and are not responsible for their content or practices. Visiting them is at your own risk and subject to their terms.",
          ],
        },
        {
          heading: "6. Disclaimers",
          blocks: [
            'The Site is provided "as is" and "as available", without warranties of any kind, whether express or implied, to the fullest extent permitted by law. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components, and information on the Site is provided for general purposes and may change without notice.',
          ],
        },
        {
          heading: "7. Limitation of liability",
          blocks: [
            "To the fullest extent permitted by law, Buried Games will not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.",
          ],
        },
        {
          heading: "8. Privacy",
          blocks: [<>Your use of the Site is also governed by our {privacyLink}, which explains how we handle personal data.</>],
        },
        {
          heading: "9. Changes to the Site and these terms",
          blocks: [
            "We may modify the Site or these Terms at any time. When we revise these Terms we update the effective date at the top of this page; continued use of the Site after a change means you accept the updated Terms.",
          ],
        },
        {
          heading: "10. Governing law",
          blocks: [governingLaw.en],
        },
        {
          heading: "11. Contact",
          blocks: [<>Questions about these Terms? Email {emailLink}.</>],
        },
      ],
    },
    ar: {
      title: "شروط الاستخدام",
      sections: [
        {
          heading: "١. قبول هذه الشروط",
          blocks: [
            <>
              تحكم شروط الاستخدام هذه وصولك إلى الموقع على buriedgames.com (&laquo;الموقع&raquo;)
              واستخدامك له، والذي تُشغّله {controllerName("ar")} (&laquo;بريد جيمز&raquo;، &laquo;نحن&raquo;).
              باستخدامك للموقع فإنك توافق على هذه الشروط. وإن لم توافق عليها، فيُرجى عدم استخدام الموقع.
            </>,
          ],
        },
        {
          heading: "٢. استخدام الموقع",
          blocks: [
            "يمكنك استخدام الموقع لأغراض مشروعة، شخصية أو لتقييم الأعمال. وتوافق على عدم إساءة استخدامه — بما في ذلك محاولة الوصول غير المصرّح به، أو تعطيل تشغيله، أو استخلاص بياناته بحجم يُثقل بنيتنا التحتية، أو استخدامه للتعدّي على حقوق الغير أو مخالفة القانون.",
          ],
        },
        {
          heading: "٣. الملكية الفكرية",
          blocks: [
            "الموقع ومحتواه — بما في ذلك النصوص والرسومات والشعارات وواجهة الاستخدام وأسماء الألعاب والأعمال الفنية ومقاطع الفيديو — مملوكة لبريد جيمز أو للمرخّصين لها، ومحميّة بقوانين الملكية الفكرية. وأسماء ألعابنا وعلامة بريد جيمز هي علاماتنا التجارية. ولا يجوز لك نسخ محتوانا أو إعادة إنتاجه أو اشتقاق أعمال منه دون إذن كتابي مسبق منّا، باستثناء المشاهدة الشخصية المعتادة ومشاركة الروابط العامة.",
          ],
        },
        {
          heading: "٤. ما ترسله إلينا",
          blocks: [
            "عند تواصلك معنا عبر الموقع، فإنك تمنحنا الإذن باستخدام المعلومات التي تقدّمها للردّ على استفسارك وتقييمه. يُرجى عدم إرسال معلومات سرّية أو حسّاسة عبر نموذج التواصل؛ وأي تعاقد على مشروع يخضع لاتفاقية مكتوبة منفصلة.",
          ],
        },
        {
          heading: "٥. روابط الأطراف الثالثة",
          blocks: [
            "قد يتضمّن الموقع روابط لمواقع ومنصّات تابعة لأطراف ثالثة (مثل متاجر التطبيقات أو الشبكات الاجتماعية). نحن لا نتحكّم بها ولسنا مسؤولين عن محتواها أو ممارساتها، وزيارتها على مسؤوليتك الخاصة وتخضع لشروطها.",
          ],
        },
        {
          heading: "٦. إخلاء المسؤولية",
          blocks: [
            'يُقدَّم الموقع "كما هو" و"حسب توفّره"، دون أي ضمانات من أي نوع، صريحة أو ضمنية، إلى أقصى حدّ يسمح به القانون. ولا نضمن أن يكون الموقع متواصلًا أو خاليًا من الأخطاء أو من المكوّنات الضارّة، والمعلومات الواردة فيه لأغراض عامة وقد تتغيّر دون إشعار.',
          ],
        },
        {
          heading: "٧. حدود المسؤولية",
          blocks: [
            "إلى أقصى حدّ يسمح به القانون، لن تكون بريد جيمز مسؤولة عن أي أضرار غير مباشرة أو عرضية أو تبعية تنشأ عن استخدامك للموقع أو عدم قدرتك على استخدامه. ولا يستثني أيٌّ من هذه الشروط أو يحدّ من أي مسؤولية لا يمكن استثناؤها أو تحديدها بموجب القانون المعمول به.",
          ],
        },
        {
          heading: "٨. الخصوصية",
          blocks: [<>يخضع استخدامك للموقع أيضًا لـ{privacyLink} الخاصة بنا، التي توضّح كيفية تعاملنا مع البيانات الشخصية.</>],
        },
        {
          heading: "٩. التغييرات على الموقع وهذه الشروط",
          blocks: [
            "قد نُعدّل الموقع أو هذه الشروط في أي وقت. وعند مراجعتنا لهذه الشروط نُحدّث تاريخ السريان أعلى هذه الصفحة؛ ويعني استمرارك في استخدام الموقع بعد التغيير قبولك للشروط المُحدَّثة.",
          ],
        },
        {
          heading: "١٠. القانون الحاكم",
          blocks: [governingLaw.ar],
        },
        {
          heading: "١١. التواصل",
          blocks: [<>أسئلة حول هذه الشروط؟ راسلنا على {emailLink}.</>],
        },
      ],
    },
  };

  const t = content[locale];
  const metaLabel = locale === "ar" ? "تاريخ السريان:" : "Effective:";

  return (
    <LegalShell
      eyebrow={locale === "ar" ? "قانوني" : "Legal"}
      title={t.title}
      meta={`${metaLabel} ${EFFECTIVE_DATE[locale]}`}
    >
      <LegalSections sections={t.sections} />
    </LegalShell>
  );
}
