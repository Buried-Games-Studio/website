
"use server";

import { z } from "zod";
import * as brevo from '@getbrevo/brevo';

/**
 * Careers submissions are routed to careers@ instead of support@, because that
 * address is wired to the studio's hiring pipeline (Cloudflare Email Worker →
 * private R2 bucket → applicant record in HQ). Anything else keeps going to
 * support@ exactly as before.
 */
const CAREERS_RECIPIENT = "careers@buriedgames.com";

/** BG_APPLICATION_RECEIVED — the branded "we got your application" reply. */
const CAREERS_CONFIRMATION_TEMPLATE = 14;

const CV_MAX_BYTES = 5 * 1024 * 1024;
const CV_ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

// Contact Form
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  inquiryType: z.enum(
      ["general", "collaboration", "publishing", "support", "press", "careers"],
      { message: "Please select a valid inquiry type." }
  ),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  // Careers extras. Optional even for a job application — plenty of good
  // candidates arrive with a portfolio link and no PDF, and refusing them
  // would lose the applicant rather than improve the record.
  portfolio: z
    .string()
    .trim()
    .max(500)
    .url({ message: "Please enter a full portfolio URL, including https://" })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .trim()
    .max(500)
    .url({ message: "Please enter a full LinkedIn URL, including https://" })
    .optional()
    .or(z.literal("")),
  // Self-reported source — catches the zero-click AI recommendations that
  // referrer-based attribution can't see (visitor heard of us in ChatGPT/
  // Gemini, then typed the URL). Optional select on the form.
  heardAbout: z
    .enum(["chatgpt", "gemini", "other_ai", "search", "social", "referral", "other"])
    .optional(),
  // First-touch attribution captured client-side (src/lib/attribution.ts).
  // Optional: absent for visitors with storage disabled or pre-rollout visits.
  attributionChannel: z.string().max(20).optional(),
  attributionSource: z.string().max(100).optional(),
  attributionLanding: z.string().max(500).optional(),
  attributionFirstSeen: z.string().max(40).optional(),
});

type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    inquiryType?: string[];
    message?: string[];
    portfolio?: string[];
    linkedin?: string[];
    cv?: string[];
    language?: string[];
    _form?: string[];
  };
  success: boolean;
};

export async function sendContactEmail(formData: FormData, language: string): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    inquiryType: formData.get("inquiryType"),
    message: formData.get("message"),
    portfolio: formData.get("portfolio") || undefined,
    linkedin: formData.get("linkedin") || undefined,
    heardAbout: formData.get("heardAbout") || undefined,
    attributionChannel: formData.get("attributionChannel") ?? undefined,
    attributionSource: formData.get("attributionSource") ?? undefined,
    attributionLanding: formData.get("attributionLanding") ?? undefined,
    attributionFirstSeen: formData.get("attributionFirstSeen") ?? undefined,
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL || !process.env.BREVO_RECEIVER_EMAIL) {
    console.error("Brevo environment variables are not set.");
    return {
        message: "Server configuration error.",
        errors: { _form: ["The email service is not configured. Please contact support directly."] },
        success: false,
    };
  }

  try {
    const {
      name,
      email,
      inquiryType,
      message,
      portfolio,
      linkedin,
      heardAbout,
      attributionChannel,
      attributionSource,
      attributionLanding,
      attributionFirstSeen,
    } = validatedFields.data;

    const isCareers = inquiryType === "careers";

    // CV, careers only. Validated server-side because the accept attribute and
    // the size check on the form are conveniences, not controls.
    let cvAttachment: { content: string; name: string } | undefined;
    if (isCareers) {
      const file = formData.get("cv");
      if (file instanceof File && file.size > 0) {
        if (!CV_ALLOWED_TYPES[file.type]) {
          return {
            message: "Validation failed.",
            errors: { cv: ["Please attach your CV as a PDF or Word document."] },
            success: false,
          };
        }
        if (file.size > CV_MAX_BYTES) {
          return {
            message: "Validation failed.",
            errors: { cv: ["Your CV is larger than 5MB — please attach a smaller file or send a link."] },
            success: false,
          };
        }
        // The file rides the notification email as an attachment, so it flows
        // through the existing careers@ pipeline (Email Worker → R2) rather
        // than needing a second upload path into the studio's storage.
        const bytes = Buffer.from(await file.arrayBuffer());
        const safeName = (file.name || `cv.${CV_ALLOWED_TYPES[file.type]}`)
          .replace(/[\r\n"]/g, "")
          .slice(0, 120);
        cvAttachment = { content: bytes.toString("base64"), name: safeName };
      }
    }

    // Links travel inside the message body: the studio notification is parsed
    // by the hiring pipeline, and a labelled block survives that round-trip
    // without needing new template params.
    const messageWithLinks = isCareers
      ? [message, portfolio ? `Portfolio: ${portfolio}` : "", linkedin ? `LinkedIn: ${linkedin}` : ""]
          .filter(Boolean)
          .join("\n")
      : message;

    // Readable label for the studio notification email (template renders
    // {{ params.heardAbout }} right under Lead Source).
    const heardAboutLabels: Record<string, string> = {
      chatgpt: "ChatGPT",
      gemini: "Google Gemini",
      other_ai: "Another AI assistant",
      search: "Google / web search",
      social: "Social media",
      referral: "A friend or colleague",
      other: "Other",
    };
    const heardAboutLabel = heardAbout ? heardAboutLabels[heardAbout] : "Not answered";

    // One line for the studio notification, e.g.
    // "ChatGPT (ai) · landed on /services/game-development · first seen 2026-07-10"
    const leadSource = attributionSource
      ? `${attributionSource} (${attributionChannel ?? 'unknown'})` +
        (attributionLanding ? ` · landed on ${attributionLanding}` : '') +
        (attributionFirstSeen
          ? ` · first seen ${attributionFirstSeen.slice(0, 10)}`
          : '')
      : 'Unknown (visitor storage unavailable)';

    // const defaultClient = brevo.ApiClient.instance;
    // const apiKey = defaultClient.authentications['apiKey'];
    // apiKey.apiKey = process.env.BREVO_API_KEY as string;

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string);
    
    // 1. Send notification email to the studio using template 5.
    //    A job application goes to careers@ instead: that address is the mouth
    //    of the hiring pipeline, so the submission (and any CV) becomes an
    //    applicant record automatically instead of sitting in a shared inbox.
    const notificationEmail = new brevo.SendSmtpEmail();
    notificationEmail.to = [
      isCareers
        ? { email: CAREERS_RECIPIENT, name: "Buried Games Careers" }
        : { email: process.env.BREVO_RECEIVER_EMAIL as string, name: "Buried Games Studio" },
    ];
    notificationEmail.sender = { name: name, email: process.env.BREVO_SENDER_EMAIL as string };
    notificationEmail.templateId = 5;
    notificationEmail.params = {
        name,
        email,
        reason: inquiryType,
        message: messageWithLinks,
        leadSource,
        heardAbout: heardAboutLabel,
    };
    if (cvAttachment) notificationEmail.attachment = [cvAttachment];

    // 2. Send confirmation email to the user. Applicants get the studio's
    //    hiring acknowledgement rather than the generic "thanks for getting in
    //    touch", and it sends from careers@ so their reply lands back in the
    //    pipeline and appends to their own application thread.
    const confirmationEmail = new brevo.SendSmtpEmail();
    confirmationEmail.sender = isCareers
      ? { name: "Buried Games Careers", email: CAREERS_RECIPIENT }
      : { name: "Buried Games Studio", email: process.env.BREVO_SENDER_EMAIL as string };
    confirmationEmail.to = [{ email, name }];
    confirmationEmail.templateId = isCareers
      ? CAREERS_CONFIRMATION_TEMPLATE
      : language === 'en' ? 3 : 4;
    confirmationEmail.params = { name };

    // Send both emails
    await apiInstance.sendTransacEmail(notificationEmail);
    await apiInstance.sendTransacEmail(confirmationEmail);

    return { message: "Your message has been sent successfully!", success: true };
  } catch (error) {
    console.error("Brevo API Error:", error);
    return {
        message: "Failed to send message.",
        errors: { _form: ["An unexpected error occurred while sending your message. Please try again later."] },
        success: false,
    };
  }
}
