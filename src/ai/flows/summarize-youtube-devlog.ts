'use server';
/**
 * @fileOverview Summarizes YouTube devlog video descriptions for game updates.
 *
 * - summarizeYoutubeDevlog - A function that summarizes the YouTube devlog video description.
 * - SummarizeYoutubeDevlogInput - The input type for the summarizeYoutubeDevlog function.
 * - SummarizeYoutubeDevlogOutput - The return type for the summarizeYoutubeDevlog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeYoutubeDevlogInputSchema = z.object({
  videoDescription: z
    .string()
    .describe('The description of the YouTube devlog video.'),
  gameName: z.string().describe('The name of the game.'),
});
export type SummarizeYoutubeDevlogInput = z.infer<
  typeof SummarizeYoutubeDevlogInputSchema
>;

const SummarizeYoutubeDevlogOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the YouTube devlog video description.'),
});
export type SummarizeYoutubeDevlogOutput = z.infer<
  typeof SummarizeYoutubeDevlogOutputSchema
>;

export async function summarizeYoutubeDevlog(
  input: SummarizeYoutubeDevlogInput
): Promise<SummarizeYoutubeDevlogOutput> {
  return summarizeYoutubeDevlogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeYoutubeDevlogPrompt',
  input: {schema: SummarizeYoutubeDevlogInputSchema},
  output: {schema: SummarizeYoutubeDevlogOutputSchema},
  prompt: `You are an AI assistant that summarizes YouTube devlog video descriptions for game updates.

  Summarize the following YouTube video description for the game {{{gameName}}} in a concise manner, highlighting the key updates and changes discussed:

  Video Description: {{{videoDescription}}}`,
});

const summarizeYoutubeDevlogFlow = ai.defineFlow(
  {
    name: 'summarizeYoutubeDevlogFlow',
    inputSchema: SummarizeYoutubeDevlogInputSchema,
    outputSchema: SummarizeYoutubeDevlogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
