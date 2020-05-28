import * as React from "react";
import cx from "classnames";
import { Link } from "gatsby";
import { ImageSharp } from "../../types/data";
import Img from "gatsby-image";
import styles from "./PageHeader.module.css";
import { useScrollValue } from "../../context/ScrollContext";

interface Props extends React.HTMLAttributes<HTMLElement> {
    backgroundImage?: ImageSharp;
}
export const PageHeader: React.FC<Props> = ({
    children,
    backgroundImage,
    className,
    ...rest
}) => {
    const scrollValue = useScrollValue();

    return (
        <header
            className={cx(className, styles.component, {
                [styles.stuck]: scrollValue > 10,
            })}
            {...rest}
        >
            {backgroundImage && (
                <Img
                    {...backgroundImage.childImageSharp}
                    className={styles.backgroundImage}
                />
            )}
            <Link
                to="/"
                className={cx({
                    [styles.stuckLogo]: scrollValue > 10,
                    [styles.logo]: scrollValue <= 10,
                })}
            >
                Zero Context
            </Link>
            {children}
        </header>
    );
};
export default PageHeader;
