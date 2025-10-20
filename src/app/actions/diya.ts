'use server';

import { createClient } from '@/lib/supabase/server';
import { DiyaSchema } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function addDiya(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = DiyaSchema.safeParse(values);

  if (!parsed.success) {
    return { error: 'Invalid data. ' + parsed.error.errors.map(e => e.message).join(' ') };
  }

  const data = parsed.data;

  const supabase = createClient();

  // Check for unique html_path
  const { data: existing, error: fetchError } = await supabase
    .from('diyas')
    .select('html_path')
    .eq('html_path', data.html_path)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error checking for existing diya:', fetchError);
    return { error: 'Could not verify submission. Please try again.' };
  }
  if (existing) {
    return { error: 'This HTML path has already been submitted.' };
  }

  // Insert new diya
  const { error: insertError } = await supabase.from('diyas').insert({
    name: data.name,
    message: data.message,
    html_path: data.html_path,
    pr_url: data.pr_url || null,
  });

  if (insertError) {
    console.error('Error inserting diya:', insertError);
    return { error: 'Failed to light your diya. Please try again.' };
  }

  revalidatePath('/');
  return { success: true, name: data.name };
}


export async function checkAndUpdateDiyaStatus(diyaId: string, prUrl: string) {
    if (!prUrl) return;
  
    const prUrlParts = prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
    if (!prUrlParts) {
      console.error(`Invalid PR URL format: ${prUrl}`);
      return;
    }
  
    const [, owner, repo, pull_number] = prUrlParts;
  
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: {
          revalidate: 600, // Cache for 10 minutes
        },
      });
  
      if (!response.ok) {
        console.error(`GitHub API error for ${prUrl}: ${response.status} ${response.statusText}`);
        return;
      }
  
      const prData = await response.json();
  
      if (prData.merged) {
        const supabase = createClient();
        const { error } = await supabase
          .from('diyas')
          .update({ is_merged: true })
          .eq('id', diyaId);
  
        if (error) {
          console.error(`Failed to update diya ${diyaId} status:`, error);
        } else {
            revalidatePath('/');
        }
      }
    } catch (error) {
      console.error(`Error checking PR status for ${prUrl}:`, error);
    }
  }