'use client';

const uiSounds: Record<string, HTMLAudioElement> = {
  start: new Audio('/sounds/ui/Common start.ogg'),
  cancel: new Audio('/sounds/ui/Common cancel.ogg'),
  navigate: new Audio('/sounds/ui/MusicWheel change.ogg'),
};

export function playSound(sound: HTMLAudioElement) {
  sound.currentTime = 0;
  sound.play();
}

export { uiSounds };
