import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="px-10">
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Layout;
