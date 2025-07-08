"use server";

import { z } from "zod";
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

  // Simulate sending an email
  console.log("New contact form submission:", validatedFields.data);

  return { message: "Your message has been sent successfully!", success: true };
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
