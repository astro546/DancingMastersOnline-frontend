import { useMenuNavigation } from '@/app/_lib/ui/useMenuNavigation';

import type { Direction } from '@/app/_lib/input/types';

function SelectDifficultList({ charts }: { charts: any[] }) {
  const difficultyOrder = ['Beginner', 'Easy', 'Medium', 'Hard', 'Challenge'];

  const { currentOptions } = useMenuNavigation(
    (direction: Direction, current: number) => {
      //Los indices validos son todos aquellos indices de elementos que tienen isValid como true
      const validIndices = difficultList
        .map((item, index) => (item.isValid ? index : -1))
        .filter((index) => index !== -1);

      //Si no hay indices validos, se retorna la dificultad actual
      if (validIndices.length === 0) return current;

      // Buscamos el indice real
      const currentPosInValid = validIndices.indexOf(current);

      // Si por alguna razón (al cambiar de canción) el cursor quedó en un índice inválido (ej. Easy),
      // lo forzamos a saltar a la primera dificultad válida.
      if (currentPosInValid === -1) return validIndices[0];

      const maxValid = validIndices.length;

      if (direction === 'up') {
        // Nos movemos hacia atrás en la lista de índices válidos
        const nextPos = (currentPosInValid - 1 + maxValid) % maxValid;
        return validIndices[nextPos]; // Devolvemos el índice visual real (0-4)
      }

      if (direction === 'down') {
        // Nos movemos hacia adelante en la lista de índices válidos
        const nextPos = (currentPosInValid + 1) % maxValid;
        return validIndices[nextPos]; // Devolvemos el índice visual real (0-4)
      }

      return current;
    },
    charts,
    'vertical',
    'selectDifficulty',
  );

  /**
   * DifficultList: La lista de dificultades que se mostrara en la pantalla
   * Se itera difficultyOrder buscando si cada una de las dificultados esta en los charts
   * Si si, se pone como valido y se pone su nivel,
   * si no, se pone como invbalido y se pone 0 como su nivel
   * */
  const difficultList = difficultyOrder.map((difficultyName) => {
    const foundChart = charts.find(
      (chart) => chart.difficulty === difficultyName,
    );
    return {
      difficulty: difficultyName,
      level: foundChart ? foundChart.level : 0,
      isValid: !!foundChart, // Bandera súper útil para saber si se puede seleccionar
    };
  });

  return (
    <ul>
      {difficultList.map((difficultyPair, index) => (
        <li
          key={index}
          style={{
            fontWeight: currentOptions[1] === Number(index) ? 'bold' : 'normal',
          }}
        >
          {difficultyPair.difficulty} : {difficultyPair.level}
        </li>
      ))}
    </ul>
  );
}

export default SelectDifficultList;
