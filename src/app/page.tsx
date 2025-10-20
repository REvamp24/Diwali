import { createClient } from '@/lib/supabase/server';
import { DiyaGrid } from '@/components/diya-grid';
import { Header } from '@/components/header';
import FestiveBackground from '@/components/festive-background';
import { checkAndUpdateDiyaStatus } from './actions/diya';
import type { Diya } from '@/lib/types';

export default async function Home() {
  const supabase = createClient();
  const { data: initialDiyas, error } = await supabase
    .from('diyas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching diyas:', error);
  }

  // Fire-and-forget PR status checks for non-merged diyas
  const diyasToCheck = initialDiyas?.filter(d => !d.is_merged && d.pr_url) ?? [];
  diyasToCheck.forEach((diya: Diya) => {
    checkAndUpdateDiyaStatus(diya.id, diya.pr_url as string);
  });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FestiveBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header diyaCount={initialDiyas?.length ?? 0} />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <DiyaGrid initialDiyas={initialDiyas ?? []} />
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          <p>Built for the Revamp GSoC Cohort Diwali Celebration.</p>
        </footer>
      </div>
    </div>
  );
}
