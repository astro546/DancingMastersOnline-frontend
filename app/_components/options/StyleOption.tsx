import React from 'react';
import Link from 'next/link';

function StyleOption({ children, isActive, href }) {
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

export default StyleOption;
