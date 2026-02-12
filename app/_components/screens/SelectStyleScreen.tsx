import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound } from '../../_lib/audio/SoundsLibrary';
import StyleOption from '../options/StyleOption';
import MenuList from '../MenuList';
import { useGameContext } from '../../context/GameProvider';

import type { Direction } from '@/app/_lib/input/types';
import type { MenuOption } from '@/app/_lib/ui/types';
import type { Style } from '@/app/_lib/game/types';

function SelectStyleScreen() {
  const STYLE_OPTIONS_HREF = '/game/select_mode';
  const { setStyle } = useGameContext();

  const styleOptions: MenuOption[] = [
    {
      id: 'single',
      label: 'Single',
      img: '',
      href: STYLE_OPTIONS_HREF,
    },
    {
      id: 'double',
      label: 'Double',
      img: '',
      href: STYLE_OPTIONS_HREF,
    },
    {
      id: 'versus',
      label: 'Versus',
      img: '',
      href: STYLE_OPTIONS_HREF,
    },
    {
      id: 'solo',
      label: 'Solo (6 Panels)',
      img: '',
      href: STYLE_OPTIONS_HREF,
    },
  ];

  const { currentOptions, action, clearAction } = useMenuNavigation(
    (direction: Direction, current: number) => {
      if (direction === 'left') {
        return (current - 1 + 4) % 4;
      }

      if (direction === 'right') {
        return (current + 1) % 4;
      }

      return current;
    },
    styleOptions,
    'horizontal',
  );

  const router = useRouter();
  useEffect(() => {
    if (action === 'start') {
      playSound('start');
      setStyle(styleOptions[currentOptions[0]].id as Style);
      console.log('Selected style:', styleOptions[currentOptions[0]].id);
      clearAction();
      router.push(styleOptions[currentOptions[0]].href);
    }
  }, [action]);

  return (
    <MenuList
      options={styleOptions}
      currentIndex={currentOptions[0]}
      styles=''
      renderOption={(option, isActive) => (
        <StyleOption key={option.id} href={option.href} isActive={isActive}>
          {option.label}
        </StyleOption>
      )}
    ></MenuList>
  );
}

export default SelectStyleScreen;
