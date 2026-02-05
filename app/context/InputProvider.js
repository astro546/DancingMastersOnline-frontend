'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  use,
} from 'react';
import { InputManager } from '../_lib/input/InputManager';

/* Lo que esta en los picoparentesis significa que el contexto puede ser de tipo InputManager o null */
const InputContext = createContext();

export function InputProvider({ children }) {
  const managerRef = useRef(null);
  const [inputState, setInputState] = useState([]);

  if (!managerRef.current) {
    managerRef.current = new InputManager();
  }

  useEffect(() => {
    let rafId;

    const loop = () => {
      const actions = managerRef.current.update();
      setInputState(actions);
      rafId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(rafId);
  }, []);

  //const text = 'prueba';
  return (
    <InputContext.Provider value={inputState}>{children}</InputContext.Provider>
  );
}

export function useInputContext() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('useInputContext must be used within an InputProvider');
  }
  return context;
}
