'use client';
import Link from 'next/link';
import type { MenuOptionProps } from '@/app/_lib/ui/types';

function HomeMenuOption({ children, isActive, href }: MenuOptionProps) {
  return (
    <div>
      <Link
        href={href}
        className={isActive ? 'text-yellow-500' : 'text-white-500'}
      >
        {children}
      </Link>
    </div>
  );
}

export default HomeMenuOption;
