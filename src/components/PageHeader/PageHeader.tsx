import * as React from "react";
import cx from "classnames";

import styles from "./PageHeader.module.css";

interface Props extends React.HTMLAttributes<HTMLElement> {
    heading: string;
}

export const PageHeader: React.FC<Props> = ({
    heading,
    children,
    className,
    style
}) => (
    <header className={cx(className, styles.component)} style={style}>
        <h1>{heading}</h1>
        {children}
    </header>
);
export default PageHeader;
