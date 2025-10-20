'use client';

import { useAudio } from '@/context/audio-context';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const VolumeControl = () => {
  const { volume, setVolume, isMuted, setIsMuted } = useAudio();

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (isMuted && value[0] > 0) {
      setIsMuted(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="end">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleMuteToggle} className="h-8 w-8">
                {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
            </Button>
            <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.05}
                className="w-full"
            />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VolumeControl;
