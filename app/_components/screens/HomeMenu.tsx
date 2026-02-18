import HomeMenuOption from '../options/HomeMenuOption';
import MenuList from '../MenuList';
import { useMenuNavigation } from '../../_lib/ui/useMenuNavigation';
import { playSound } from '@/app/_lib/audio/songsPlayer';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import type { Direction } from '@/app/_lib/input/types';
import type { MenuOption } from '../../_lib/ui/types';

function HomeMenu() {
  const homeMenuOptions: MenuOption[] = [
    {
      id: 'local',
      label: 'Local Mode',
      href: '/game/select_style',
    },
    {
      id: 'online',
      label: 'Online Mode',
      href: '/',
    },
    {
      id: 'training',
      label: 'Training Mode',
      href: '/',
    },
    {
      id: 'edit',
      label: 'Edit Mode',
      href: '/',
    },
    {
      id: 'records',
      label: 'Records',
      href: '/',
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/',
    },
  ];

  const { currentOptions, action, clearAction } = useMenuNavigation(
    (direction: Direction, current: number) => {
      if (direction === 'up') {
        return (current - 1 + 6) % 6;
      }

      if (direction === 'down') {
        return (current + 1) % 6;
      }

      return current;
    },
    homeMenuOptions,
    'vertical',
  );

  const router = useRouter();
  useEffect(() => {
    if (action === 'start') {
      playSound('start');
      clearAction();
      router.push(homeMenuOptions[currentOptions[1]].href);
    }
  }, [action]);

  return (
    <MenuList
      options={homeMenuOptions}
      currentIndex={currentOptions[1]}
      styles=''
      renderOption={(option, isActive) => (
        <HomeMenuOption key={option.id} href={option.href} isActive={isActive}>
          {option.label}
        </HomeMenuOption>
      )}
    ></MenuList>
  );
}

export default HomeMenu;
