"use client";

import { type ReactNode } from "react";
import { type Locale } from "@/lib/i18n";
import { legalEntity, controllerName, formatAddress } from "@/lib/legal-entity";
import {
  LegalShell,
  LegalSections,
  legalLink,
  type LegalSection,
} from "@/components/pages/legal-shell";

// Fixed effective date — a policy's date reflects when it was last revised, not
// when the page is loaded. Update this whenever the substance below changes.
const EFFECTIVE_DATE: Record<Locale, string> = {
  en: "18 July 2026",
  ar: "١٨ يوليو ٢٠٢٦",
};

function openConsent() {
  window.dispatchEvent(new Event("bg:open-consent"));
}

export function PrivacyPolicyContent({ locale }: { locale: Locale }) {
  const address = formatAddress(legalEntity.registeredAddress);
  const authority = legalEntity.supervisoryAuthority;

  const authorityLink = (
    <a href={authority.website} target="_blank" rel="noopener noreferrer" className={legalLink}>
      {authority.name[locale]}
    </a>
  );

  // Supervisory authority is gated: before the OÜ is registered, a visitor's own
  // local data protection authority is the accurate route — Estonia isn't named.
  const complaintClause: Record<Locale, ReactNode> = {
    en: legalEntity.registered ? (
      <>You also have the right to lodge a complaint with {authorityLink} ({authority.website.replace("https://", "")}) or with the data protection authority in your country of residence.</>
    ) : (
      <>You also have the right to lodge a complaint with the data protection authority in your country of residence.</>
    ),
    ar: legalEntity.registered ? (
      <>كما يحق لك تقديم شكوى إلى {authorityLink} أو إلى هيئة حماية البيانات في بلد إقامتك.</>
    ) : (
      <>كما يحق لك تقديم شكوى إلى هيئة حماية البيانات في بلد إقامتك.</>
    ),
  };
  const emailLink = (
    <a href={`mailto:${legalEntity.email}`} className={legalLink}>
      {legalEntity.email}
    </a>
  );
  const cookieButton = (label: string) => (
    <button type="button" onClick={openConsent} className={legalLink}>
      {label}
    </button>
  );

  // Who-we-are: neutral before incorporation, full entity details after.
  const registeredEn = legalEntity.registered ? (
    <>
      {" "}
      We are <strong className="text-foreground font-semibold">{legalEntity.legalName}</strong>,{" "}
      {legalEntity.entityType.en}
      {legalEntity.registryCode ? `, registry code ${legalEntity.registryCode}` : ""}
      {address ? `, with its registered office at ${address}` : ""}.
    </>
  ) : null;
  const registeredAr = legalEntity.registered ? (
    <>
      {" "}
      نحن <strong className="text-foreground font-semibold">{legalEntity.legalName}</strong>،{" "}
      {legalEntity.entityType.ar}
      {legalEntity.registryCode ? `، رقم التسجيل ${legalEntity.registryCode}` : ""}
      {address ? `، ومقرها المسجّل في ${address}` : ""}.
    </>
  ) : null;

  const content: Record<Locale, { title: string; sections: LegalSection[] }> = {
    en: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "1. Who we are",
          blocks: [
            <>
              {controllerName("en")} (&ldquo;Buried Games&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
              operates the website at buriedgames.com and is the controller of the personal data
              described below.{registeredEn} You can reach us about privacy at any time at {emailLink}.
            </>,
            "This policy explains what personal data we collect when you visit the site or contact us, why we process it, who we share it with, and the rights you have under the EU General Data Protection Regulation (GDPR).",
          ],
        },
        {
          heading: "2. The data we collect",
          blocks: [
            "We keep data collection to a minimum. Specifically:",
            {
              list: [
                <>
                  <strong className="text-foreground font-semibold">Information you give us.</strong> When
                  you submit the contact form we receive your name, email address, the reason for your
                  inquiry, and your message.
                </>,
                <>
                  <strong className="text-foreground font-semibold">Analytics data.</strong> With your
                  consent, we use Google Analytics to understand how the site is used — pages viewed,
                  approximate location (country/city level), device and browser type, and on-site
                  interactions.
                </>,
                <>
                  <strong className="text-foreground font-semibold">Referral (first-touch) data.</strong>{" "}
                  We record the source that first brought you to the site (for example a search engine, an
                  AI assistant, or a social network) in your browser&rsquo;s local storage, so we understand
                  where inquiries originate.
                </>,
                <>
                  <strong className="text-foreground font-semibold">Technical logs.</strong> Our hosting and
                  content-delivery providers automatically process your IP address and standard request
                  metadata to deliver the site and keep it secure.
                </>,
              ],
            },
            "We do not collect special categories of data, and we do not run advertising or profiling.",
          ],
        },
        {
          heading: "3. Why we use it, and our legal bases",
          blocks: [
            {
              list: [
                <>
                  <strong className="text-foreground font-semibold">To respond to your inquiry</strong> and
                  take steps at your request before any engagement — Article 6(1)(b) (steps prior to a
                  contract) and, where applicable, 6(1)(a) (consent).
                </>,
                <>
                  <strong className="text-foreground font-semibold">To measure and improve the site</strong>{" "}
                  through analytics — Article 6(1)(a) (your consent, which you may withdraw at any time).
                </>,
                <>
                  <strong className="text-foreground font-semibold">To keep the site secure and reliable</strong>{" "}
                  and prevent abuse — Article 6(1)(f) (our legitimate interests).
                </>,
              ],
            },
          ],
        },
        {
          heading: "4. Service providers we work with",
          blocks: [
            "We share personal data only with the processors that help us run the site, under agreements that require them to protect it. We never sell your data. These are:",
            {
              list: [
                <>
                  <strong className="text-foreground font-semibold">Brevo</strong> — delivers the contact and
                  confirmation emails.
                </>,
                <>
                  <strong className="text-foreground font-semibold">Google Analytics</strong> — website
                  analytics (only after you consent).
                </>,
                <>
                  <strong className="text-foreground font-semibold">Cloudflare</strong> — content delivery,
                  DNS, and security.
                </>,
                <>
                  <strong className="text-foreground font-semibold">Google Firebase App Hosting</strong> —
                  hosts the website.
                </>,
              ],
            },
          ],
        },
        {
          heading: "5. International transfers",
          blocks: [
            "Some of these providers process data outside the European Economic Area (for example, in the United States). Where that happens, the transfer is protected by an EU adequacy decision, the EU Standard Contractual Clauses, or the EU–US Data Privacy Framework, as applicable.",
          ],
        },
        {
          heading: "6. Cookies and consent",
          blocks: [
            <>
              We do not set analytics or marketing cookies until you agree. On your first visit a banner lets
              you accept or decline; only strictly necessary storage is used before you choose. You can change
              your decision at any time — {cookieButton("manage your cookie preferences")}.
            </>,
          ],
        },
        {
          heading: "7. How long we keep it",
          blocks: [
            "We keep inquiry emails for as long as needed to handle your request and for our ordinary business records, then delete them. Analytics data is retained according to our analytics provider's default retention period. You can ask us to erase your data sooner (see your rights below).",
          ],
        },
        {
          heading: "8. Your rights",
          blocks: [
            "Under the GDPR you have the right to access your data; to have it corrected or erased; to restrict or object to its processing; to data portability; and to withdraw consent at any time without affecting prior processing.",
            <>To exercise any of these, email us at {emailLink}. {complaintClause.en}</>,
          ],
        },
        {
          heading: "9. Children",
          blocks: [
            "The site is intended for a general, professional audience and is not directed at children under 16. We do not knowingly collect their personal data.",
          ],
        },
        {
          heading: "10. Changes to this policy",
          blocks: [
            "We may update this policy from time to time. When we do, we revise the effective date shown at the top of this page. Material changes will be made clear on the site.",
          ],
        },
        {
          heading: "11. Contact us",
          blocks: [<>Questions about this policy or your data? Email {emailLink}.</>],
        },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      sections: [
        {
          heading: "١. من نحن",
          blocks: [
            <>
              {controllerName("ar")} (&laquo;بريد جيمز&raquo;، &laquo;نحن&raquo;) تُشغّل الموقع على
              buriedgames.com وهي المتحكّم في البيانات الشخصية الموضّحة أدناه.{registeredAr} يمكنك التواصل
              معنا بشأن الخصوصية في أي وقت عبر {emailLink}.
            </>,
            "توضّح هذه السياسة البيانات الشخصية التي نجمعها عند زيارتك للموقع أو تواصلك معنا، وسبب معالجتها، ومع من نشاركها، والحقوق التي تكفلها لك اللائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR).",
          ],
        },
        {
          heading: "٢. البيانات التي نجمعها",
          blocks: [
            "نُبقي جمع البيانات في حدّه الأدنى، وتحديدًا:",
            {
              list: [
                <>
                  <strong className="text-foreground font-semibold">بيانات تقدّمها بنفسك.</strong> عند إرسال
                  نموذج التواصل نستلم اسمك وبريدك الإلكتروني وسبب استفسارك ونصّ رسالتك.
                </>,
                <>
                  <strong className="text-foreground font-semibold">بيانات التحليلات.</strong> بموافقتك،
                  نستخدم Google Analytics لفهم كيفية استخدام الموقع — الصفحات المُشاهَدة، والموقع التقريبي
                  (على مستوى الدولة/المدينة)، ونوع الجهاز والمتصفّح، والتفاعلات داخل الموقع.
                </>,
                <>
                  <strong className="text-foreground font-semibold">بيانات مصدر الزيارة الأولى.</strong> نسجّل
                  المصدر الذي جاء بك إلى الموقع لأول مرة (مثل محرك بحث أو مساعد ذكاء اصطناعي أو شبكة اجتماعية)
                  في التخزين المحلي لمتصفّحك، لنفهم من أين تأتي الاستفسارات.
                </>,
                <>
                  <strong className="text-foreground font-semibold">السجلات التقنية.</strong> يقوم مزوّدو
                  الاستضافة وشبكة توصيل المحتوى لدينا تلقائيًا بمعالجة عنوان IP الخاص بك وبيانات الطلب المعتادة
                  لتقديم الموقع والحفاظ على أمانه.
                </>,
              ],
            },
            "لا نجمع أي فئات خاصة من البيانات، ولا نقوم بأي إعلانات أو تصنيف سلوكي.",
          ],
        },
        {
          heading: "٣. لماذا نستخدمها، وأسسنا القانونية",
          blocks: [
            {
              list: [
                <>
                  <strong className="text-foreground font-semibold">للردّ على استفسارك</strong> واتخاذ خطوات
                  بناءً على طلبك قبل أي تعاقد — المادة 6(1)(b) والمادة 6(1)(a) (الموافقة) عند الاقتضاء.
                </>,
                <>
                  <strong className="text-foreground font-semibold">لقياس الموقع وتحسينه</strong> عبر
                  التحليلات — المادة 6(1)(a) (موافقتك، ويمكنك سحبها في أي وقت).
                </>,
                <>
                  <strong className="text-foreground font-semibold">للحفاظ على أمان الموقع وموثوقيته</strong>{" "}
                  ومنع إساءة الاستخدام — المادة 6(1)(f) (مصالحنا المشروعة).
                </>,
              ],
            },
          ],
        },
        {
          heading: "٤. مزوّدو الخدمة الذين نتعامل معهم",
          blocks: [
            "نشارك البيانات الشخصية فقط مع الجهات المعالِجة التي تساعدنا في تشغيل الموقع، بموجب اتفاقيات تُلزمها بحمايتها. لا نبيع بياناتك أبدًا. وهم:",
            {
              list: [
                <>
                  <strong className="text-foreground font-semibold">Brevo</strong> — إرسال رسائل التواصل
                  والتأكيد.
                </>,
                <>
                  <strong className="text-foreground font-semibold">Google Analytics</strong> — تحليلات
                  الموقع (بعد موافقتك فقط).
                </>,
                <>
                  <strong className="text-foreground font-semibold">Cloudflare</strong> — توصيل المحتوى ونظام
                  أسماء النطاقات والأمان.
                </>,
                <>
                  <strong className="text-foreground font-semibold">Google Firebase App Hosting</strong> —
                  استضافة الموقع.
                </>,
              ],
            },
          ],
        },
        {
          heading: "٥. عمليات النقل الدولية",
          blocks: [
            "يعالج بعض هؤلاء المزوّدين البيانات خارج المنطقة الاقتصادية الأوروبية (مثل الولايات المتحدة). وعند حدوث ذلك، يكون النقل محميًا بقرار كفاية أوروبي، أو البنود التعاقدية القياسية للاتحاد الأوروبي، أو إطار خصوصية البيانات بين الاتحاد الأوروبي والولايات المتحدة، حسب الاقتضاء.",
          ],
        },
        {
          heading: "٦. ملفات تعريف الارتباط والموافقة",
          blocks: [
            <>
              لا نضع أي ملفات تعريف ارتباط للتحليلات أو التسويق قبل موافقتك. في زيارتك الأولى يتيح لك شريط
              اختيار القبول أو الرفض؛ ولا يُستخدم سوى التخزين الضروري تمامًا قبل اختيارك. يمكنك تغيير قرارك في
              أي وقت — {cookieButton("إدارة تفضيلات ملفات تعريف الارتباط")}.
            </>,
          ],
        },
        {
          heading: "٧. مدة الاحتفاظ بالبيانات",
          blocks: [
            "نحتفظ برسائل الاستفسار طوال المدة اللازمة لمعالجة طلبك وضمن سجلاتنا المعتادة، ثم نحذفها. وتُحفَظ بيانات التحليلات وفقًا لمدة الاحتفاظ الافتراضية لدى مزوّد التحليلات. ويمكنك أن تطلب حذف بياناتك في وقت أبكر (انظر حقوقك أدناه).",
          ],
        },
        {
          heading: "٨. حقوقك",
          blocks: [
            "بموجب اللائحة العامة لحماية البيانات، يحق لك الوصول إلى بياناتك؛ وتصحيحها أو حذفها؛ وتقييد معالجتها أو الاعتراض عليها؛ ونقل البيانات؛ وسحب موافقتك في أي وقت دون التأثير على المعالجة السابقة.",
            <>لممارسة أيٍّ من هذه الحقوق، راسلنا على {emailLink}. {complaintClause.ar}</>,
          ],
        },
        {
          heading: "٩. الأطفال",
          blocks: [
            "الموقع موجّه لجمهور عام ومهني وليس موجّهًا للأطفال دون سن السادسة عشرة، ولا نجمع بياناتهم الشخصية عن عِلم.",
          ],
        },
        {
          heading: "١٠. التغييرات على هذه السياسة",
          blocks: [
            "قد نُحدّث هذه السياسة من حين لآخر. وعند ذلك نُعدّل تاريخ السريان الموضّح أعلى هذه الصفحة، وستكون التغييرات الجوهرية واضحة على الموقع.",
          ],
        },
        {
          heading: "١١. تواصل معنا",
          blocks: [<>أسئلة حول هذه السياسة أو بياناتك؟ راسلنا على {emailLink}.</>],
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
