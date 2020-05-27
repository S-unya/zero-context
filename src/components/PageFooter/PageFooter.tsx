import * as React from "react";
import cx from "classnames";

import styles from "./PageFooter.module.css";

export const PageFooter: React.FC<React.HTMLAttributes<HTMLElement>> = ({
    children,
    className,
}) => {
    return (
        <footer className={cx(className, styles.component)}>
            <div>{children}</div>
            <div className={styles.author}>by Śūnya</div>
        </footer>
    );
};
