'use client';
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { ReactNode } from 'react';

import type { Style, Mode } from '../_lib/game/types';

interface GameContextType {
  songs: any[];
  setSongs: Dispatch<SetStateAction<any[]>>;
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

  return (
    <GameContext.Provider
      value={{
        songs,
        setSongs,
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
