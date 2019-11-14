import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const Layout: React.FC<Props> = ({ children, style }) => {
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return <main style={style}>{children}</main>;
};
export default Layout;
