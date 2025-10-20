import { z } from 'zod';

export const DiyaSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
  message: z.string().max(280, { message: 'Message cannot be longer than 280 characters.' }).optional().or(z.literal('')),
  html_path: z.string().regex(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.html$/, { message: 'Format must be your-name/your-file.html' }),
  pr_url: z.string().url({ message: 'Please enter a valid GitHub PR URL.' }).regex(/^https:\/\/github\.com\/.*\/pull\/\d+$/, { message: 'Must be a valid GitHub PR URL.' }).optional().or(z.literal('')),
});

export type DiyaFormValues = z.infer<typeof DiyaSchema>;
