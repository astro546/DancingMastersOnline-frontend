export type MenuOption = {
  id: string;
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
