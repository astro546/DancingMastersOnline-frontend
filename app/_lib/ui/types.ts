import { Style, Mode } from '../game/types';
export type MenuOption = {
  id: Style | Mode | string;
  label: string;
  href: string;
  img?: string;
};

export type MenuOptionProps = {
  children: React.ReactNode;
  isActive: boolean;
  href: string;
};

export type MenuAction = 'start' | 'cancel' | null;
