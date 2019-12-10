import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const Layout: React.FC<Props> = ({ children, style }) => {
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return (
        <main
            style={{
                display: "grid",
                gridTemplateColumns: `1fr 1fr`,
                gridAutoRows: `1fr`,
                gridGap: "32px"
            }}
        >
            {children}
        </main>
    );
};
export default Layout;
