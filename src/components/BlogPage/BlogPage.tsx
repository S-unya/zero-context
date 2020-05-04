import * as React from "react";
import cx from "classnames";

import styles from "./BlogPage.module.css";
import { BlogData, MarkdownRemark } from "../../types/data";

interface Props extends React.HTMLAttributes<HTMLElement> {
    data: MarkdownRemark<BlogData>;
}

export const BlogPage: React.FC<Props> = ({
    children,
    className,
    data,
    ...rest
}) => {
    console.log({ data });
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return (
        <section className={cx(className, styles.component)}>
            <header>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                <p>
                    Aproximate reading time:{" "}
                    <span>{data.markdownRemark.timeToRead} minutes</span>
                </p>
            </header>
            <div
                dangerouslySetInnerHTML={{
                    __html: data.markdownRemark.tableOfContents
                }}
            ></div>
            <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            ></div>
        </section>
    );
};
export default BlogPage;
