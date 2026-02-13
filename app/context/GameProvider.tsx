'use client';
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { fetchSongs } from '../_lib/api/songsApi';

import type { Style, Mode, gameState } from '../_lib/game/types';

interface GameContextType {
  songs: any[];
  selectedSong: any | null;
  setSelectedSong: Dispatch<SetStateAction<any | null>>;
  selectedChart: any | null;
  setSelectedChart: Dispatch<SetStateAction<any | null>>;
  gameState: string;
  setGameState: Dispatch<SetStateAction<string>>;
  score: number;
  addScore: (points: number) => void; // Nota: addScore no es un setter estándar
  style: Style;
  setStyle: Dispatch<SetStateAction<Style>>;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<any[]>([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [style, setStyle] = useState<Style>('single');
  const [mode, setMode] = useState<Mode>('standard');
  const [isLoading, setIsLoading] = useState(false);

  const addScore = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  useEffect(() => {
    //console.log('Game state changed:', gameState);
    if (gameState !== 'select_music') return;

    const willGetCachedSongs = () => {
      const cachedSongs = localStorage.getItem('cachedSongs');
      const cachedStyle = localStorage.getItem('cachedStyle');
      const cachedMode = localStorage.getItem('cachedMode');

      const isSameStyle = cachedStyle && cachedStyle === style;
      const isSameMode = cachedMode && cachedMode === mode;

      return (
        cachedSongs &&
        isSameStyle &&
        isSameMode &&
        JSON.parse(cachedSongs).length > 0
      );
    };

    async function loadSongs() {
      //console.log('Loading songs for style:', style);
      setIsLoading(true);

      let songsData = [];
      if (willGetCachedSongs()) {
        const cachedSongs = localStorage.getItem('cachedSongs');
        songsData = cachedSongs ? JSON.parse(cachedSongs) : [];
      } else {
        songsData = await fetchSongs(style);
        localStorage.setItem('cachedSongs', JSON.stringify(songsData));
        localStorage.setItem('cachedStyle', style);
        localStorage.setItem('cachedMode', mode);
      }
      setSelectedSong(null);
      setSongs(songsData);

      setIsLoading(false);
    }

    loadSongs();
  }, [gameState, style, mode]);

  return (
    <GameContext.Provider
      value={{
        songs,
        selectedSong,
        setSelectedSong,
        selectedChart,
        setSelectedChart,
        gameState,
        setGameState,
        score,
        addScore,
        style,
        setStyle,
        mode,
        setMode,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
