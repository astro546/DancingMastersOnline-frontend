import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound } from '../../_lib/audio/SoundsLibrary';
import ModeOption from '../options/ModeOption';
import MenuList from '../MenuList';
import { useGameContext } from '../../context/GameProvider';

import type { Direction } from '@/app/_lib/input/types';
import type { MenuOption } from '../../_lib/ui/types';
import type { Mode } from '@/app/_lib/game/types';

function SelectModeScreen() {
  const { setMode, setGameState, gameState } = useGameContext();

  const modeOptions: MenuOption[] = [
    {
      id: 'tutorial',
      label: 'Tutorial',
      img: '',
      href: '/',
    },
    {
      id: 'standard',
      label: 'Standard Mode',
      img: '',
      href: '/game/select_music/standard_mode',
    },
    {
      id: 'course',
      label: 'Course Mode',
      img: '',
      href: '/',
    },
    {
      id: 'endless',
      label: 'Endless Mode',
      img: '',
      href: '/',
    },
    {
      id: 'battle',
      label: 'Battle Mode',
      img: '',
      href: '/',
    },
  ];

  const { currentOptions, action, clearAction } = useMenuNavigation(
    (direction: Direction, current: number) => {
      if (direction === 'left') {
        return (current - 1 + 5) % 5;
      }

      if (direction === 'right') {
        return (current + 1) % 5;
      }

      return current;
    },
    modeOptions,
    'horizontal',
  );

  const router = useRouter();
  useEffect(() => {
    if (action === 'start') {
      const selectedMode = modeOptions[currentOptions[0]];
      playSound('start');
      setMode(selectedMode.id as Mode);
      setGameState('select_music');
      clearAction();
      router.push(selectedMode.href);
      //console.log('Selected mode:', selectedMode.id);
      //console.log('Current game state:', gameState);
    }
  }, [action]);

  return (
    <MenuList
      options={modeOptions}
      currentIndex={currentOptions[0]}
      styles=''
      renderOption={(option, isActive) => (
        <ModeOption key={option.id} href={option.href} isActive={isActive}>
          {option.label}
        </ModeOption>
      )}
    ></MenuList>
  );
}

export default SelectModeScreen;
