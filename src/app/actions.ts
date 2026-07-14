
"use server";

import { z } from "zod";
import * as brevo from '@getbrevo/brevo';

// Contact Form
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  inquiryType: z.enum(
      ["general", "collaboration", "publishing", "support", "press"], 
      { message: "Please select a valid inquiry type." }
  ),
  message: z.string().min(3, { message: "Message must be at least 10 characters." }),
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
      attributionChannel,
      attributionSource,
      attributionLanding,
      attributionFirstSeen,
    } = validatedFields.data;

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
    
    // 1. Send notification email to the studio using template 5
    const notificationEmail = new brevo.SendSmtpEmail();
    notificationEmail.to = [{ email: process.env.BREVO_RECEIVER_EMAIL as string, name: "Buried Games Studio" }];
    notificationEmail.sender = { name: name, email: process.env.BREVO_SENDER_EMAIL as string };
    notificationEmail.templateId = 5;
    notificationEmail.params = {
        name,
        email,
        reason: inquiryType,
        message,
        leadSource,
    };
    
    // 2. Send confirmation email to the user
    const confirmationEmail = new brevo.SendSmtpEmail();
    confirmationEmail.sender = { name: "Buried Games Studio", email: process.env.BREVO_SENDER_EMAIL as string };
    confirmationEmail.to = [{ email, name }];
    confirmationEmail.templateId = language === 'en' ? 3 : 4;
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
