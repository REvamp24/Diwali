'use client';

import type { Diya as DiyaType } from '@/lib/types';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Diya } from '@/components/diya';
import { useAudio } from '@/context/audio-context';

type DiyaGridProps = {
  initialDiyas: DiyaType[];
};

export function DiyaGrid({ initialDiyas }: DiyaGridProps) {
  const [diyas, setDiyas] = useState(initialDiyas);
  const { playDiyaSound } = useAudio();
  const [newDiyaId, setNewDiyaId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('realtime-diyas')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'diyas' },
        (payload) => {
          const newDiya = payload.new as DiyaType;
          setDiyas((prevDiyas) => {
            if (prevDiyas.some((d) => d.id === newDiya.id)) {
              return prevDiyas;
            }
            return [newDiya, ...prevDiyas];
          });
          playDiyaSound();
          setNewDiyaId(newDiya.id);

          const body = document.body;
          body.classList.add('page-glow-animation');
          setTimeout(() => {
            body.classList.remove('page-glow-animation');
          }, 1500);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'diyas' },
        (payload) => {
          const updatedDiya = payload.new as DiyaType;
          setDiyas((prevDiyas) =>
            prevDiyas.map((diya) =>
              diya.id === updatedDiya.id ? updatedDiya : diya
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [playDiyaSound]);

  useEffect(() => {
    if (newDiyaId) {
      const timer = setTimeout(() => setNewDiyaId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [newDiyaId]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {diyas.map((diya) => (
        <Diya key={diya.id} diya={diya} isNew={diya.id === newDiyaId} />
      ))}
    </div>
  );
}
