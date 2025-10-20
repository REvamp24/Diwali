'use client';
import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

const FestiveBackground = () => {
  const [init, setInit] = useState(false);
  const [sparkles, setSparkles] = useState<
    { left: string; top: string; animationDuration: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 50 }).map(() => ({
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {};

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#FFC107',
        },
        links: {
          color: '#FFC107',
          distance: 150,
          enable: false,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out',
          },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 60,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
          }
        },
        shape: {
          type: 'star',
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 1,
            sync: false
          }
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
        <div className="absolute inset-0 overflow-hidden">
          {sparkles.map((style, index) => (
            <span key={index} className="sparkle" style={style} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default FestiveBackground;
