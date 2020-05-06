import React from "react";
import cx from "classnames";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogPage from "../components/BlogPage";
import { BlogData, MarkdownRemark } from "../types/data";
import PageHeader from "../components/PageHeader";

interface Props extends React.HTMLAttributes<HTMLElement> {
    data: MarkdownRemark<BlogData>;
}
export const BlogTemplate: React.FC<Props> = ({ className, data, ...rest }) => {
    console.log(data.markdownRemark.frontmatter.headerImage);
    return (
        <div>
            <PageHeader
                backgroundImage={data.markdownRemark.frontmatter.headerImage}
            />
            <Layout className={cx(className)}>
                <BlogPage data={data} />
            </Layout>
        </div>
    );
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
                headerImage {
                    childImageSharp {
                        fluid(
                            srcSetBreakpoints: [1500, 1024, 720]
                            toFormat: JPG
                        ) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
            timeToRead
            tableOfContents
        }
    }
`;

export default BlogTemplate;
