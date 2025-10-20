'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LightDiyaModal } from '@/components/light-diya-modal';
import { Sparkles } from 'lucide-react';
import VolumeControl from './volume-control';

type HeaderProps = {
  diyaCount: number;
};

export function Header({ diyaCount }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col items-center justify-center gap-6 border-b border-white/10 bg-transparent px-4 py-8 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          <div className="text-left">
            <h2 className="text-lg font-semibold text-muted-foreground">Total Diyas Lit</h2>
            <p className="text-4xl font-bold text-accent">{diyaCount}</p>
          </div>
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Diwali Lights Showcase
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              A festive celebration by the Revamp GSoC Cohort
            </p>
          </div>
          <div className="flex justify-end">
            <VolumeControl />
          </div>
        </div>

        <div className="mt-6">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 diya-glow rounded-full px-10 py-6 text-lg font-bold shadow-lg transition-transform hover:scale-105"
            onClick={() => setIsModalOpen(true)}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Light Your Diya
          </Button>
        </div>
      </header>
      <LightDiyaModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
