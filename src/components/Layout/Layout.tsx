import React from "react";
import cx from "classnames";

import "../../theme.css";
import styles from "./Layout.module.css";

export const Layout: React.FC<React.HTMLAttributes<HTMLElement>> = ({
    children,
    className
}) => {
    return (
        <main className={cx(className, styles.component)}>
            <article className={styles.row}>{children}</article>
        </main>
    );
};
