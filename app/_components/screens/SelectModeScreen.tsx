import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { playSound, uiSounds } from '../../_lib/audio/SoundsLibrary';
import ModeOption from '../options/ModeOption';
import MenuList from '../MenuList';
import type { Direction } from '@/app/_lib/input/types';
import type { MenuOption } from '../../_lib/ui/types';

function SelectModeScreen() {
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
      href: '/game/select_music/stardard_mode',
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

  const { currentOption, action, clearAction } = useMenuNavigation(
    (direction: Direction, current: number) => {
      if (direction === 'left') {
        return (current - 1 + 5) % 5;
      }

      if (direction === 'right') {
        return (current + 1) % 5;
      }

      return current;
    },
    modeOptions
  );

  const router = useRouter();
  useEffect(() => {
    if (action === 'start') {
      playSound(uiSounds.start);
      router.push(modeOptions[currentOption].href);
    }

    clearAction();
  }, [action]);

  return (
    <MenuList
      options={modeOptions}
      currentIndex={currentOption}
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
