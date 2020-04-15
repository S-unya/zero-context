import * as React from "react";
import cx from "classnames";

import styles from "./PageHeader.module.css";
import { Link } from "gatsby";

export const PageHeader: React.FC<React.HTMLAttributes<HTMLElement>> = ({
    children,
    className,
    ...rest
}) => (
    <header className={cx(className, styles.component)} {...rest}>
        <Link to="/" className={styles.logo}>
            Zero Context
        </Link>
        {children}
    </header>
);
export default PageHeader;
