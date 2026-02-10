'use client';
import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound, uiSounds } from '../../_lib/audio/SoundsLibrary';
import { useGameContext } from '../../context/GameProvider';
import { fetchSongs } from '@/app/_lib/api/songsApi';

import type { Direction } from '@/app/_lib/input/types';

async function SelectSongScreen() {
  const {
    songs,
    setSongs,
    setSelectedChart,
    setSelectedSong,
    setGameState,
    style,
    mode,
  } = useGameContext();
  const songsData = await fetchSongs(style);
  setSongs(songsData);
  const numSongs = songs.length;

  const { currentOptions, action, clearAction } = useMenuNavigation(
    (direction: Direction, current: number) => {
      const currentSong = songs[current];
      const chartsCount = currentSong.charts.length;

      if (direction === 'left') {
        return (current - 1 + numSongs) % numSongs;
      }

      if (direction === 'right') {
        return (current + 1) % numSongs;
      }

      if (direction === 'up') {
        return (current - 1 + chartsCount) % chartsCount;
      }

      if (direction === 'down') {
        return (current + 1) % chartsCount;
      }

      return current;
    },
    songs,
    'bidirectional',
  );

  const router = useRouter();
  useEffect(() => {
    const songId = songs[currentOptions[0]].id;
    const chart = songs[currentOptions[0]].charts[currentOptions[1]];
    const difficulty = chart.difficulty;

    if (action === 'start') {
      playSound(uiSounds.start);
      setSelectedSong(songId);
      setSelectedChart(songs[currentOptions[0]].charts[currentOptions[1]]);
      setGameState('playing');
      router.push(`/play/${mode}/${songId}/${style}/${difficulty}`);
    }

    clearAction();
  }, [action]);

  return (
    <div>
      <h1>Select Song</h1>
      {songs.map((song, index) => (
        <div
          key={song.id}
          style={{
            fontWeight: currentOptions[0] === index ? 'bold' : 'normal',
          }}
        >
          {song.title}
        </div>
      ))}
    </div>
  );
}

export default SelectSongScreen;
