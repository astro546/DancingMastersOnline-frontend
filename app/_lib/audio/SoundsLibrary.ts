'use client';

export const soundPaths = {
  start: '/sounds/ui/Common start.ogg',
  cancel: '/sounds/ui/Common cancel.ogg',
  navigate: '/sounds/ui/ScreenTitleMenu change.ogg',
  selectMusic: '/sounds/ui/MusicWheel change.mp3',
  selectDifficulty: '/sounds/ui/ScreenSelectMusic difficulty harder.ogg',
} as const;

export type SoundKey = keyof typeof soundPaths;
