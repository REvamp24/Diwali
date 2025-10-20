'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface AudioContextType {
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  playDiyaSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We create audio element once on the client-side
    const audio = new Audio('/assets/diya-sound.mp3');
    audio.preload = 'auto';
    audioRef.current = audio;
  }, []);

  const playDiyaSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, [volume, isMuted]);

  const value = {
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    playDiyaSound,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
