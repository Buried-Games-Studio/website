
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
    const { name, email, inquiryType, message } = validatedFields.data;

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
