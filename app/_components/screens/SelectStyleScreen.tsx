import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound, uiSounds } from '../../_lib/audio/SoundsLibrary';
import StyleOption from '../options/StyleOption';
import MenuList from '../MenuList';

import type { Direction } from '@/app/_lib/input/types';
import type { MenuOption } from '@/app/_lib/ui/types';

function SelectStyleScreen() {
  const STYLE_OPTIONS_HREF = '/game/select_mode';

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

  const { currentOption, action, clearAction } = useMenuNavigation(
    (direction: Direction, current: number) => {
      if (direction === 'left') {
        return (current - 1 + 4) % 4;
      }

      if (direction === 'right') {
        return (current + 1) % 4;
      }

      return current;
    },
    styleOptions
  );

  const router = useRouter();
  useEffect(() => {
    if (action === 'start') {
      playSound(uiSounds.start);
      router.push(styleOptions[currentOption].href);
    }

    clearAction();
  }, [action]);

  return (
    <MenuList
      options={styleOptions}
      currentIndex={currentOption}
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
