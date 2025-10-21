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
        <stop offset="40%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
      </radialGradient>
    </defs>
    <path
      d="M50,0 C20,40 20,80 50,120 C80,80 80,40 50,0 Z"
      fill="url(#flameGradient)"
    />
  </svg>
);


const DiyaBase = () => (
    <svg viewBox="0 0 140 70" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oilGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--accent) / 0.8)" />
          <stop offset="50%" stopColor="hsl(var(--accent) / 1)" />
          <stop offset="100%" stopColor="hsl(var(--accent) / 0.8)" />
        </linearGradient>
        <radialGradient id="wickGlow">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Diya Bowl */}
      <path 
        d="M 10 35 C 10 65, 130 65, 130 35 Q 70 5, 10 35 Z" 
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary) / 0.8)"
        strokeWidth="1"
      />
      
      {/* Oil inside */}
      <path 
        d="M 20 35 C 25 50, 115 50, 120 35 Q 70 20, 20 35 Z"
        fill="url(#oilGradient)"
      />
      <path
        d="M 40 38 C 50 45, 90 45, 100 38"
        fill="none"
        stroke="hsl(var(--accent) / 0.5)"
        strokeWidth="2"
      />

      {/* Rim */}
      <path 
        d="M 10 35 C 10 38, 130 38, 130 35 Q 70 32, 10 35 Z"
        fill="hsl(var(--accent) / 0.8)"
      />
       <path 
        d="M 12 35.5 C 12 37, 128 37, 128 35.5"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
      />

      {/* Decorative Pattern */}
      <path 
        d="M 70 37 
           C 60 42, 55 55, 50 60 
           L 90 60 C 85 55, 80 42, 70 37 Z"
        fill="hsl(var(--accent) / 0.9)"
      />
      <path
        d="M 45 45 C 35 55, 30 62, 25 65
           M 95 45 C 105 55, 110 62, 115 65"
        stroke="hsl(var(--accent) / 0.8)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
       <circle cx="70" cy="53" r="2.5" fill="hsl(var(--primary))" />


      {/* Wick */}
      <path d="M68 35 Q 70 30, 72 35" stroke="hsl(30 90% 80%)" strokeWidth="2.5" fill="none" />
      <circle cx="70" cy="35" r="10" fill="url(#wickGlow)" />
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
