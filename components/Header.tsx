import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { typeform } from '../pages/data';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <nav className="flex justify-between py-10">
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
          <Image src="/logo.png" width={36} height={48} />
        </a>
      </Link>
      <Link href={typeform}>
        <a
          className="bold text-slate-400 text-sm"
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
