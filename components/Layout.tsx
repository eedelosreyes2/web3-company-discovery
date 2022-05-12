import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div className="mx-auto max-w-md mb-12 px-4 md:px-10 md:max-w-full md:max-w-6xl md:p-0">
        <Header />
        <div>{props.children}</div>
    </div>
);

export default Layout;
