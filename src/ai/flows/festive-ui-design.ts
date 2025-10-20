'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating festive UI elements for the Diwali Lights Showcase application.
 *
 * It includes functions for adding particle effects, floating sparkles, and soundscapes to enhance the Diwali celebration atmosphere.
 *   - generateFestiveUI: A function that takes no input and returns UI enhancements.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FestiveUIOutputSchema = z.object({
  particleEffects: z.string().describe('Code snippet for adding particle effects to the UI.'),
  floatingSparkles: z.string().describe('Code snippet for adding floating sparkles animation to the UI.'),
  soundscapes: z.string().describe('Code snippet for adding soundscapes and volume control to the UI.'),
});

export type FestiveUIOutput = z.infer<typeof FestiveUIOutputSchema>;

export async function generateFestiveUI(): Promise<FestiveUIOutput> {
  return festiveUIFlow({});
}

const prompt = ai.definePrompt({
  name: 'festiveUIPrompt',
  output: {schema: FestiveUIOutputSchema},
  prompt: `You are a UI/UX expert specializing in creating festive and engaging user interfaces.

  Generate code snippets for a React application to enhance the Diwali celebration atmosphere with:

  1.  Particle effects: Use a library like react-tsparticles to create subtle, Diwali-themed particles (e.g., small diyas or stars) floating in the background.
  2.  Floating sparkles: Implement a CSS animation to create floating sparkles that gently move across the screen.
  3.  Soundscapes: Include a soft, ambient soundscape (e.g., a gentle diya lighting sound) with volume control options.

  Ensure the code snippets are production quality.
  Include comments describing their functionality.
  Pay close attention to make them work with the technologies and design guidelines described in the rest of the project.
  Do not use placeholder values.
  All code snippets must be enclosed within double quotes.
  Do not create actual components, just provide the implementation for these UI enhancements.

  Return all three code snippets for the above UI enhancements.`,
});

const festiveUIFlow = ai.defineFlow(
  {
    name: 'festiveUIFlow',
    outputSchema: FestiveUIOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
