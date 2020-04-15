import * as React from "react";
import cx from "classnames";

import styles from "./BlogPage.module.css";
import { BlogData } from "../../types/data";

interface Props extends React.HTMLAttributes<HTMLElement> {
    data: BlogData;
}

export const BlogPage: React.FC<Props> = ({ children, className }) => {
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return <div className={cx(className, styles.component)}>{children}</div>;
};
export default BlogPage;
