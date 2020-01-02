import React from "react";

import "../../theme.css";
import styles from "./Layout.module.css";

export const Layout: React.FC<React.HTMLAttributes<HTMLElement>> = ({
    children,
    style
}) => {
    return (
        <main className={styles.component}>
            <article className={styles.row}>{children}</article>
        </main>
    );
};
export default Layout;
