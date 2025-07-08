"use server";

import { z } from "zod";
import * as brevo from '@getbrevo/brevo';
import { summarizeYoutubeDevlog } from "@/ai/flows/summarize-youtube-devlog";
import type { SummarizeYoutubeDevlogInput } from "@/ai/flows/summarize-youtube-devlog";

// Contact Form
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  inquiryType: z.enum(
      ["general", "collaboration", "publishing", "support", "press"], 
      { message: "Please select a valid inquiry type." }
  ),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    inquiryType?: string[];
    message?: string[];
    _form?: string[];
  };
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
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
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = `New Contact Form Submission - ${inquiryType}`;
    sendSmtpEmail.htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;
    sendSmtpEmail.sender = { name: "Buried Games Contact Form", email: process.env.BREVO_SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: process.env.BREVO_RECEIVER_EMAIL, name: "Buried Games Studio" }];
    sendSmtpEmail.replyTo = { email: email, name: name };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    
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

// Summarizer
const summarizerSchema = z.object({
  videoDescription: z.string().min(50, { message: "Description must be at least 50 characters." }),
  gameName: z.string().min(2, { message: "Game name must be at least 2 characters." }),
});

type SummarizerState = {
    summary: string | null;
    errors?: {
        videoDescription?: string[];
        gameName?: string[];
        _form?: string[];
    } | null;
}

export async function getSummary(prevState: SummarizerState, formData: FormData): Promise<SummarizerState> {
    const validatedFields = summarizerSchema.safeParse({
        videoDescription: formData.get('videoDescription'),
        gameName: formData.get('gameName'),
    });
    
    if (!validatedFields.success) {
        return {
            summary: null,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    
    try {
        const input: SummarizeYoutubeDevlogInput = validatedFields.data;
        const result = await summarizeYoutubeDevlog(input);
        return { summary: result.summary, errors: null };
    } catch (error) {
        console.error("Error summarizing devlog:", error);
        return { summary: null, errors: { _form: ['An unexpected error occurred. Please try again.'] } };
    }
}
