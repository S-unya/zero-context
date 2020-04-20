import React from "react";
import cx from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import BlogPage from "../components/BlogPage";
import { BlogData, FileNode } from "../types/data";
import PageHeader from "../components/PageHeader";

interface Props extends React.HTMLAttributes<HTMLElement> {
    data: BlogData & FileNode;
}
export const BlogTemplate: React.FC<Props> = ({ className, data, ...rest }) => {
    console.log({ data });

    return (
        <>
            <PageHeader>
                <Img fluid={data.file.childImageSharp.fluid} />;
            </PageHeader>
            <Layout className={cx(className)}>
                <BlogPage data={data} />
            </Layout>
        </>
    );
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
                headerImage
            }
            timeToRead
            tableOfContents
        }
        file(relativePath: { eq: "/assets/headers/forest-grave.png" }) {
            childImageSharp {
                fluid(srcSetBreakpoints: [1500, 1024, 720], toFormat: JPG) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
        }
    }
`;
