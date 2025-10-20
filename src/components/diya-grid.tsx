'use client';

import type { Diya as DiyaType } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Diya } from '@/components/diya';
import { useAudio } from '@/context/audio-context';
import { tsParticles } from '@tsparticles/engine';

type DiyaGridProps = {
  initialDiyas: DiyaType[];
};

const MAX_DIYAS_FOR_BRIGHTNESS = 50;

export function DiyaGrid({ initialDiyas }: DiyaGridProps) {
  const [diyas, setDiyas] = useState(initialDiyas);
  const { playDiyaSound } = useAudio();
  const [newDiyaId, setNewDiyaId] = useState<string | null>(null);

  const triggerFireworks = useCallback(() => {
    tsParticles.load('fireworks', {
      preset: 'fireworks',
      emitters: [
        {
          life: {
            count: 1,
            duration: 0.1,
            delay: 0.1
          },
          position: {
            x: 50,
            y: 100
          },
          particles: {
            move: {
              direction: 'top'
            }
          }
        },
      ]
    });
  }, []);

  const updateBrightness = useCallback((count: number) => {
    const intensity = Math.min(count / MAX_DIYAS_FOR_BRIGHTNESS, 1);
    const lightness = 24 + (30 * intensity); // from 24% up to 54%
    document.documentElement.style.setProperty('--background-lightness', `${lightness}%`);
  }, []);

  useEffect(() => {
    updateBrightness(diyas.length);
  }, [diyas.length, updateBrightness]);


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
            const newDiyas = [newDiya, ...prevDiyas];
            updateBrightness(newDiyas.length);
            return newDiyas;
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
          const oldDiya = payload.old as DiyaType;

           if(updatedDiya.is_merged && !oldDiya.is_merged) {
            triggerFireworks();
          }

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
  }, [playDiyaSound, updateBrightness, triggerFireworks]);

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
