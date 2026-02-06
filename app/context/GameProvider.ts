import { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [style, setStyle] = useState('single');
  const [mode, setMode] = useState('standard');

  return (
    <GameContext.Provider value={{ songs, selectedSong, selectedChart, gameState, score, style, mode }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext(){
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
}
