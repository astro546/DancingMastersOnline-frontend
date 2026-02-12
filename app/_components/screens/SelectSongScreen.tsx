import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound } from '../../_lib/audio/SoundsLibrary';
import { useGameContext } from '../../context/GameProvider';
import { useSongPreview } from '@/app/_lib/audio/songsPlayer';

import type { Direction } from '@/app/_lib/input/types';

function SelectSongScreen() {
  const {
    songs,
    setSelectedChart,
    setSelectedSong,
    setGameState,
    style,
    mode,
  } = useGameContext();
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

  useEffect(() => {
    setGameState('select_music');
  }, []);

  const currentSong = songs[currentOptions[0]];
  const router = useRouter();
  useEffect(() => {
    console.log(songs);
    const songId = currentSong.id;
    const currentChart = currentSong.charts[currentOptions[1]];
    const difficulty = currentChart.difficulty;

    if (action === 'start') {
      playSound('start');
      setSelectedSong(songId);
      setSelectedChart(currentChart);
      setGameState('playing');
      router.push(`/play/${mode}/${songId}/${style}/${difficulty}`);
    }

    clearAction();
  }, [action]);

  useSongPreview(currentSong);

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
