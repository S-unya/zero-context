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
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const date = new Date(
        data.markdownRemark.frontmatter.date
    ).toLocaleDateString("en-gb", dateOptions);
    return (
        <section className={cx(className, styles.component)} {...rest}>
            <header className={styles.header}>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                <p className={styles.info}>
                    First published on{" "}
                    <time dateTime={data.markdownRemark.frontmatter.date}>
                        {date}
                    </time>
                </p>
                <p className={styles.readingTime}>
                    Reading time ~
                    <span>{data.markdownRemark.timeToRead} minutes</span>.
                </p>
            </header>
            {/* <div
                dangerouslySetInnerHTML={{
                    __html: data.markdownRemark.tableOfContents
                }}
            ></div> */}
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            ></div>
        </section>
    );
};
export default BlogPage;
