import { useRef, useState, useEffect } from 'react';
import { useInputContext } from '../../context/InputProvider';
import { playSound, uiSounds } from '../audio/SoundsLibrary';
import type { Direction } from '../input/types';
import type { MenuAction } from './types';

/* El tipo de funcion que se debe de pasar al hook, debe de cumplir con lo siguiente:
  * Entradas: Direccion del boton que se acciono.
  * Salida: Un numero que indica la siguiente opcion a donde se movera el usuario
  
*/
type OnMoveFn = (direction: Direction, current: number) => number;

/*
 * useMenuNavigation es un hook que maneja la navegacion del menu, asi como el delay entre movimientos
 * Recibe el inputState desde el InputProvider
 * Devuelve la funcion handleInput que recibe un callback onMove
 * onMove se ejecuta cuando hay un movimiento en el inputState
 * onMove recibe la direccion del movimiento: 'up', 'down', 'left', 'right'
 */
/* Sino se sabe el tipo de una variable, se puede obtener con ReturnType */
export function useMenuNavigation(onMove: OnMoveFn, options: any) {
  const MOVE_DELAY: number = 150;
  const lastMoveRef = useRef<number>(0);
  const prevOptionRef = useRef<number | null>(null);
  const [currentOption, setCurrentOption] = useState(0);
  const [action, setAction] = useState<MenuAction>(null);
  const inputState = useInputContext();

  function moveCurrentOption(direction: Direction, now: number) {
    if (now - lastMoveRef.current > MOVE_DELAY) {
      setCurrentOption((prev) => {
        const next = onMove(direction, prev);
        return next;
      });
      lastMoveRef.current = now;
    }
  }

  useEffect(() => {
    const now = Date.now();

    for (const device in inputState) {
      if (inputState[device].includes('up')) {
        moveCurrentOption('up', now);
      }

      if (inputState[device].includes('down')) {
        moveCurrentOption('down', now);
      }

      if (inputState[device].includes('left')) {
        moveCurrentOption('left', now);
      }

      if (inputState[device].includes('right')) {
        moveCurrentOption('right', now);
      }

      if (inputState[device].includes('start')) {
        setAction('start');
      }

      if (inputState[device].includes('exit')) {
        setAction('cancel');
      }
    }
  }, [inputState]);

  useEffect(() => {
    if (prevOptionRef.current === null) {
      prevOptionRef.current = currentOption;
      return;
    }

    if (prevOptionRef.current !== currentOption) {
      playSound(uiSounds.navigate);
      prevOptionRef.current = currentOption;
      return;
    }
  }, [currentOption]);

  function clearAction() {
    setAction(null);
  }

  return { currentOption, action, clearAction };
}
