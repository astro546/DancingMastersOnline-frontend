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
type Axis = 'horizontal' | 'vertical' | 'bidirectional';

export function useMenuNavigation(
  onMove: OnMoveFn,
  options: any,
  axis: Axis = 'horizontal',
) {
  const MOVE_DELAY: number = 150;
  const lastMoveRef = useRef<number>(0);
  const prevOptionsRef = useRef<number[] | null>(null);
  const [currentOptions, setCurrentOptions] = useState<number[]>([0, 0]);
  const [action, setAction] = useState<MenuAction>(null);
  const inputState = useInputContext();

  function moveCurrentOption(direction: Direction, now: number) {
    if (now - lastMoveRef.current > MOVE_DELAY) {
      setCurrentOptions((prev) => {
        const isVertical =
          axis === 'vertical' ||
          (axis === 'bidirectional' &&
            (direction === 'up' || direction === 'down'));

        const isHorizontal =
          axis === 'horizontal' ||
          (axis === 'bidirectional' &&
            (direction === 'left' || direction === 'right'));

        const axisIndex = isVertical ? 1 : isHorizontal ? 0 : -1;
        const next = onMove(direction, prev[axisIndex]);
        const newAxises = [...prev];
        newAxises[axisIndex] = next;
        return newAxises;
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
    if (prevOptionsRef.current === null) {
      prevOptionsRef.current = currentOptions;
      return;
    }

    if (
      prevOptionsRef.current[0] !== currentOptions[0] ||
      prevOptionsRef.current[1] !== currentOptions[1]
    ) {
      playSound(uiSounds.navigate);
      prevOptionsRef.current = currentOptions;
      return;
    }
  }, [currentOptions]);

  function clearAction() {
    setAction(null);
  }

  return { currentOptions, action, clearAction };
}
