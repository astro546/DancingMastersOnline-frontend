import React from 'react';
import type { MenuOption } from '../_lib/ui/types';

type MenuListProps = {
  options: MenuOption[];
  currentIndex: number;
  styles: string;
  renderOption?: (option: MenuOption, isActive: boolean) => React.ReactNode;
};

function MenuList({
  options,
  currentIndex,
  styles,
  renderOption,
}: MenuListProps) {
  return (
    <ul className={styles}>
      {options.map((option, i) =>
        renderOption ? (
          renderOption(option, i === currentIndex)
        ) : (
          <li key={option.id + i}>{option.label}</li>
        )
      )}
    </ul>
  );
}

export default MenuList;
