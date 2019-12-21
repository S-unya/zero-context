import React from "react";

import "../../theme.css";
import styles from "./Layout.module.css";

interface Props extends React.HTMLAttributes<HTMLElement> {
    headerContent: React.FunctionComponent;
}

export const Layout: React.FC<Props> = ({ children, style, headerContent }) => {
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return (
        <main className={styles.component}>
            <header className={styles.header}>{headerContent}</header>
            <article className={styles.row}>{children}</article>
        </main>
    );
};
export default Layout;
