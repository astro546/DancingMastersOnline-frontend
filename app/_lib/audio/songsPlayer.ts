import { API_URL } from '../constants';
import { useEffect, useRef } from 'react';

/**
 * playSample: Reproduce un fragmento de la canción para que el usuario pueda escucharla antes de seleccionarla.
 *
 * Parámetros: song - Objeto que representa la canción, debe contener las propiedades folder, audioFile, sampleStart y sampleLength.
 *
 **/
export function useSongPreview(song: any, isPlaying: boolean = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const FADE_OUT_DURATION = 3;
  const INTERVAL_MS = 50;

  useEffect(() => {
    /* Se limpia el audio anterior */
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    if (!audioRef.current && !isPlaying) return;

    /* Se construye el URL del audio */
    const songFolder = encodeURIComponent(song.folder);
    const audioUrl = `${API_URL}/content/${songFolder}/${song.audioFile}`;
    console.log('Reproduciendo preview:', song);

    /* Se crea el nuevo audio */
    const audio = new Audio(audioUrl);
    const start = song.sampleStart || 0;
    const length = song.sampleLength || 15;
    const endTime = start + length;
    const fadeOutStart = endTime - 3;
    audio.currentTime = start;
    audioRef.current = audio;

    /* Reproducimos la cancion */
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // El audio se está reproduciendo
        })
        .catch((error) => {
          // Si el error es "AbortError", lo ignoramos (es por cambiar rápido de canción)
          if (error.name === 'AbortError') return;

          // Si es "NotSupportedError" o 404, es problema de URL
          console.error('Error reproduciendo preview:', error);
        });
    }

    /* Hacemos un fade out al terminar el sample */
    fadeIntervalRef.current = setInterval(() => {
      if (!audio) return;

      const currentTime = audio.currentTime;

      /* Verificamos si ya se termino el sample para reiniciarlo */
      if (currentTime >= endTime) {
        audio.currentTime = start;
        audio.volume = 1;
        audio.play();

        /* Sino es asi, entonces vemos si ya se va a terminar el sample para hacer el fade out  */
      } else if (currentTime >= fadeOutStart) {
        const timeRemaining = endTime - currentTime;
        let newVolume = timeRemaining / FADE_OUT_DURATION;
        // Limites de seguridad (0 a 1)
        if (newVolume < 0) newVolume = 0;
        if (newVolume > 1) newVolume = 1;
        audio.volume = newVolume;

        /* Si el sample todavia no termina, dejamos el volumen en 1 */
      } else {
        if (audio.volume !== 1) audio.volume = 1;
      }
    }, INTERVAL_MS);

    /* const handleTimeUpdate = () => {
      if (audio.currentTime >= endTime) {
        //audio.pause();
        audio.currentTime = start;
        audio.play();
      }
    };
    audio.addEventListener('timeupdate', handleTimeUpdate); */

    return () => {
      /* audio.removeEventListener('timeupdate', handleTimeUpdate); */
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = '';
    };
  }, [song, isPlaying]);
}

export function playSong(soundName: string) {}
