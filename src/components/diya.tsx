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
    viewBox="0 0 100 150"
    className="absolute -top-24 left-1/2 h-32 w-20 -translate-x-1/2 diya-flame"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0, 20)">
        <path
            d="M50 0 C-10 80, 20 120, 50 130 C80 120, 110 80, 50 0 Z"
            fill="#FF9800"
        />
        <path
            d="M50 20 C15 85, 30 115, 50 122 C70 115, 85 85, 50 20 Z"
            fill="#FFEB3B"
        />
        <path
            d="M50 40 C30 90, 40 110, 50 114 C60 110, 70 90, 50 40 Z"
            fill="#E91E63"
        />
        <path
            d="M50 50 C40 90, 45 105, 50 109 C55 105, 60 90, 50 50 Z"
            fill="#FFF59D"
        />
    </g>
  </svg>
);

const DiyaBase = () => (
    <svg viewBox="0 0 200 100" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="5" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.2" />
          </filter>
      </defs>

      {/* Main Bowl */}
      <path 
        d="M 10 50 C 10 110, 190 110, 190 50 C 170 30, 30 30, 10 50 Z"
        fill="#6D4C41"
        filter="url(#shadow)"
      />

      {/* Oil surface */}
      <ellipse cx="100" cy="50" rx="85" ry="18" fill="#FFC107" />

      {/* Decorative Rim */}
      <path 
        d="M 15 50 C 15 58, 185 58, 185 50 C 175 42, 25 42, 15 50 Z"
        fill="#5D4037"
      />
      
      {/* Dotted pattern on rim */}
      <defs>
        <path id="rimPath" d="M 25 50 Q 100 58, 175 50" fill="none" />
      </defs>
      <text fill="#FFB74D" fontSize="5" className="font-mono">
        <textPath href="#rimPath" startOffset="0%">
            <tspan dy="-1">◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆.◆</tspan>
        </textPath>
      </text>

      {/* Center Decoration */}
      <g transform="translate(100 68) scale(0.7)">
        <circle cx="0" cy="0" r="12" fill="none" stroke="#FF9800" strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#FF9800" />
        <circle cx="0" cy="0" r="4" fill="none" stroke="#6D4C41" strokeWidth="2" />
         {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={Math.cos(i * Math.PI / 4) * 17} cy={Math.sin(i * Math.PI / 4) * 17} r="2.5" fill="#FF9800" />
        ))}
      </g>
      
      {/* Side Decorations */}
      <g transform="translate(55 68) scale(0.6)">
        <circle cx="0" cy="0" r="10" fill="#FF9800" />
         {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d="M 0 -10 L -3 -15 L 3 -15 Z" fill="#FF9800" transform={`rotate(${i * 45})`} />
        ))}
        <circle cx="0" cy="0" r="5" fill="#6D4C41" />
      </g>

      <g transform="translate(145 68) scale(0.6)">
        <circle cx="0" cy="0" r="10" fill="#FF9800" />
         {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d="M 0 -10 L -3 -15 L 3 -15 Z" fill="#FF9800" transform={`rotate(${i * 45})`} />
        ))}
        <circle cx="0" cy="0" r="5" fill="#6D4C41" />
      </g>

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

  const href = isClickable ? `/submissions/${diya.html_path}` : undefined;

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
                'group relative aspect-square transition-transform duration-300 ease-in-out',
                isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-help',
                isNew && 'animate-in fade-in scale-125'
              )}
            >
              <Card className="flex h-full w-full flex-col items-center justify-end overflow-visible bg-card/50 p-2 backdrop-blur-sm transition-all duration-300 group-hover:bg-card">
                <div className={cn('relative w-4/5 diya-glow', !isClickable && 'opacity-60')}>
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
