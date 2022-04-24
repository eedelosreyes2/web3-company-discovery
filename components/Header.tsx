import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <nav className="flex justify-between py-10">
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
          *Logo*
        </a>
      </Link>
      <Link href="https://google.com">
        <a
          className="bold text-slate-400"
          target="_blank"
          rel="noopener noreferrer"
          data-active={isActive('/')}
        >
          Submit Project
        </a>
      </Link>
    </nav>
  );
};

export default Header;
