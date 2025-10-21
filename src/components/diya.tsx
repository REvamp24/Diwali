'use client';

import { useState } from 'react';
import { GitMerge, Hourglass } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Diya as DiyaType } from '@/lib/types';
import { Button } from './ui/button';

type DiyaProps = {
  diya: DiyaType;
  isNew: boolean;
};

const DiyaFlame = () => (
  <svg
    viewBox="0 0 100 120"
    className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-12 diya-flame"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
       <radialGradient id="flameGradient" cx="50%" cy="80%" r="50%" fx="50%" fy="80%">
        <stop offset="0%" style={{ stopColor: 'rgba(255, 220, 180, 0.9)', stopOpacity: 1 }} />
        <stop offset="30%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
      </radialGradient>
    </defs>
    <path
      d="M50,0 C20,40 20,80 50,120 C80,80 80,40 50,0 Z"
      fill="url(#flameGradient)"
    />
  </svg>
);

const DiyaBase = () => (
  <svg viewBox="0 0 100 60" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="diyaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: 'hsl(var(--accent) / 0.5)'}} />
        <stop offset="100%" style={{stopColor: 'hsl(var(--accent) / 0.2)'}} />
      </linearGradient>
      <radialGradient id="wickGlow">
        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
      </radialGradient>
    </defs>
     <path d="M5 25 C 5 50, 95 50, 95 25 Q 50 0, 5 25 Z" fill="url(#diyaGradient)" stroke="hsl(var(--accent) / 0.8)" strokeWidth="2.5"/>
    <path d="M15 23 C 15 40, 85 40, 85 23" fill="hsl(var(--primary) / 0.4)" />
    <ellipse cx="50" cy="22" rx="10" ry="4" fill="hsl(var(--primary) / 0.6)" />
    <path d="M47 22 Q 50 18, 53 22" stroke="hsl(30 90% 80%)" strokeWidth="2.5" fill="none" />
    <circle cx="50" cy="22" r="12" fill="url(#wickGlow)" />
  </svg>
);


export function Diya({ diya, isNew }: DiyaProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const isClickable = diya.is_merged;

  const Wrapper = isClickable ? 'a' : 'div';

  const tooltipContent = diya.is_merged
    ? 'PR merged! Click to view submission.'
    : diya.pr_url
    ? 'PR submitted. Waiting for merge.'
    : 'No PR link submitted.';

  const href = isClickable ? `/submissions/${diya.html_path}` : '#';

  const handleClick = (e: React.MouseEvent) => {
    if (!isClickable) {
      e.preventDefault();
      setIsAlertOpen(true);
    }
  };
  
  const PrLink = diya.pr_url ? (
    <Button asChild variant="link" className="p-0 h-auto">
      <a href={diya.pr_url} target="_blank" rel="noopener noreferrer">
        View Pull Request
      </a>
    </Button>
  ) : null;


  return (
    <>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Wrapper
              href={href}
              target={isClickable ? '_blank' : undefined}
              rel={isClickable ? "noopener noreferrer" : undefined}
              onClick={handleClick}
              className={cn(
                'group relative aspect-square transition-transform duration-300 ease-in-out cursor-pointer',
                'hover:scale-105',
                isNew && 'animate-in fade-in scale-125'
              )}
            >
              <Card className="flex h-full w-full flex-col items-center justify-end overflow-visible bg-card/50 backdrop-blur-sm p-2 transition-all duration-300 group-hover:bg-card">
                <div className={cn('relative w-1/2 diya-glow', !isClickable && 'opacity-60')}>
                  <DiyaFlame />
                  <DiyaBase />
                </div>

                <CardContent className="w-full p-0 pt-2 text-center">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {diya.name}
                  </p>
                  {diya.message && (
                    <p className="truncate text-xs text-muted-foreground">{diya.message}</p>
                  )}
                </CardContent>

                <div className="absolute top-1 right-1 rounded-full bg-secondary p-1 text-muted-foreground shadow-md">
                  {diya.is_merged ? (
                    <GitMerge className="h-3 w-3 text-green-400" />
                  ) : (
                    <Hourglass className="h-3 w-3 text-amber-400" />
                  )}
                </div>
              </Card>
            </Wrapper>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>✨ Awaiting the Glow! ✨</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 pt-2">
              <p>
                Your diya is ready and waiting for its moment to shine! It will be fully lit once your Pull Request is merged into the main celebration.
              </p>
              <p>
                May the light of Diwali fill your home with joy, your heart with love, and your life with prosperity.
              </p>
               {PrLink}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
