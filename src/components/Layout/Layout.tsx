/** @jsx jsx */
import * as React from "react";
import { ThemeProvider, jsx } from "theme-ui";
import theme from "../../theme";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export const Layout: React.FC<Props> = ({ children, style }) => {
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return (
        <ThemeProvider theme={theme}>
            <main
                sx={{
                    display: "grid",
                    gridTemplateColumns: `1fr 1fr`,
                    gridAutoRows: `1fr`,
                    gridGap: theme.space[4]
                }}
            >
                {children}
            </main>
        </ThemeProvider>
    );
};
export default Layout;
