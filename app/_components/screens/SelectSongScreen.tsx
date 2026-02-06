import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound, uiSounds } from '../../_lib/audio/SoundsLibrary';
import { prisma } from '@/lib/prisma';
import type { Direction } from '@/app/_lib/input/types';

async function SelectSongScreen() {
  const songs = await prisma.song.findMany({
    includes: {
      charts: true,
    },
  });
  const numSongs = songs.length;

  const { currentOption, action, clearAction } = useMenuNavigation(
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
  );

  const router = useRouter();
  useEffect(() => {
    const songId = songs[currentOption].id;
    const style = songs[currentOption].charts[currentOption].style;
    const difficulty = songs[currentOption].charts[currentOption].difficulty;
    if (action === 'start') {
      playSound(uiSounds.start);
      router.push(`/play/${songId}/${style}/${difficulty}`);
    }

    clearAction();
  }, [action]);

  return <div>SelectSongScreen</div>;
}

export default SelectSongScreen;
