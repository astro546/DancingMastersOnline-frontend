'use client';
import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound } from '../../_lib/audio/SoundsLibrary';
import { useGameContext } from '../../context/GameProvider';
import { useSongPreview } from '@/app/_lib/audio/songsPlayer';
import Img from 'next/image';
import { API_URL } from '@/app/_lib/constants';

import type { Direction } from '@/app/_lib/input/types';
import BPMDisplayer from '../selectSongComponents/BPMDisplayer';

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
    if (!currentSong) return;

    const songId = currentSong.id;
    const currentChart = currentSong?.charts[currentOptions[1]];
    const difficulty = currentChart?.difficulty || 0;

    if (action === 'start') {
      playSound('start');
      setSelectedSong(songId);
      setSelectedChart(currentChart);
      localStorage.setItem('selectedSong', songId);
      localStorage.setItem('selectedChart', JSON.stringify(currentChart));

      setGameState('playing');
      router.push(`/play/${mode}/${songId}/${style}/${difficulty}`);
    }

    clearAction();
  }, [action]);

  useSongPreview(currentSong);

  if (!currentSong) {
    return (
      <div className='flex h-screen items-center justify-center bg-black text-white'>
        Cargando canciones...
      </div>
    );
  }

  const currentChart = currentSong.charts[currentOptions[1]] || null || 0;

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='col-span-2 row-span-2 row-start-1 col-start-1'>
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
      <div className='col-start-2 row-start-1 flex flex-col items-center'>
        <Img
          src={`${API_URL}/content/${currentSong.folder}/${currentSong.bannerImg}`}
          alt={currentSong.title}
          width={500}
          height={150}
        />

        <ul>
          {currentSong.charts.map((chart: any, index: number) => (
            <li
              key={index}
              style={{
                fontWeight: currentOptions[1] === index ? 'bold' : 'normal',
              }}
            >
              {chart.difficulty}: {chart.level}
            </li>
          ))}
        </ul>
        <ul>
          <li>Radar Stream: {currentChart.radarStream || 0}</li>
          <li>Radar Voltage: {currentChart.radarVoltage || 0}</li>
          <li>Radar Air: {currentChart.radarAir || 0}</li>
          <li>Radar Freeze: {currentChart.radarFreeze || 0}</li>
          <li>Radar Chaos: {currentChart.radarChaos || 0}</li>
        </ul>
        <BPMDisplayer bpms={currentSong.bpms} />
      </div>
    </div>
  );
}

export default SelectSongScreen;
