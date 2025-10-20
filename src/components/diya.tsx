'use client';

import { GitMerge, Hourglass } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Diya as DiyaType } from '@/lib/types';

type DiyaProps = {
  diya: DiyaType;
  isNew: boolean;
};

const DiyaFlame = () => (
  <svg
    viewBox="0 0 100 120"
    className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-10 diya-flame"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="flameGradient" cx="50%" cy="80%" r="50%" fx="50%" fy="80%">
        <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.8)', stopOpacity: 1 }} />
        <stop offset="40%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.5 }} />
      </radialGradient>
    </defs>
    <path
      d="M50,0 C20,40 20,80 50,120 C80,80 80,40 50,0 Z"
      fill="url(#flameGradient)"
    />
  </svg>
);

const DiyaBase = () => (
  <svg viewBox="0 0 100 50" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 20 C 5 40, 95 40, 95 20 Q 50 0, 5 20 Z"
      fill="hsl(var(--accent) / 0.2)"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
    />
    <path
      d="M10 18 C 10 30, 90 30, 90 18"
      fill="hsl(var(--primary) / 0.3)"
    />
  </svg>
);

export function Diya({ diya, isNew }: DiyaProps) {
  const isClickable = diya.is_merged;
  const Wrapper = isClickable ? 'a' : 'div';

  const tooltipContent = diya.is_merged
    ? 'PR merged! Click to view submission.'
    : diya.pr_url
    ? 'PR submitted. Waiting for merge.'
    : 'No PR link submitted.';

  const href = isClickable 
    ? `/submissions/${diya.html_path}` 
    : diya.pr_url || '#';

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Wrapper
            href={href}
            target={isClickable || diya.pr_url ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={cn(
              'group relative aspect-square transition-transform duration-300 ease-in-out',
               isClickable && 'hover:scale-105',
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
  );
}
