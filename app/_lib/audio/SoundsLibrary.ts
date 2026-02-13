'use client';

const soundPaths = {
  start: '/sounds/ui/Common start.ogg',
  cancel: '/sounds/ui/Common cancel.ogg',
  navigate: '/sounds/ui/MusicWheel change.ogg',
};

export const audioCache: Record<string, HTMLAudioElement> = {};

export function playSound(key: keyof typeof soundPaths) {
  if (typeof window === 'undefined') return;

  if (!audioCache[key]) {
    audioCache[key] = new Audio(soundPaths[key]);
    audioCache[key].volume = 0.5;
  }

  const sound = audioCache[key];

  sound.currentTime = 0;
  sound.play().catch((err) => {
    console.warn('El navegador bloqueó el autoplay:', err);
  });
}
