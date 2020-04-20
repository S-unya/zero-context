import * as React from "react";
import cx from "classnames";
import { Link } from "gatsby";
import { ImageSharp } from "../../types/data";
import Img from "gatsby-image";
import styles from "./PageHeader.module.css";

interface Props extends React.HTMLAttributes<HTMLElement> {
    backgroundImage: ImageSharp;
}
export const PageHeader: React.FC<Props> = ({
    children,
    backgroundImage,
    className,
    ...rest
}) => (
    <header className={cx(className, styles.component)} {...rest}>
        <Img {...backgroundImage} className={styles.backgroundImage} />
        <Link to="/" className={styles.logo}>
            Zero Context
        </Link>
        {children}
    </header>
);
export default PageHeader;
