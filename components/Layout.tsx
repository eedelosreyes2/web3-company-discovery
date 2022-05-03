import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="mx-auto max-w-4xl px-10 lg:max-w-full mb-8">
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Layout;
