import React from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { graphql, Link } from "gatsby";

interface Props extends React.HTMLAttributes<HTMLElement> {
    data: any;
}

const Index: React.FC<Props> = ({ data }) => {
    console.log(data);
    return (
        <>
            <PageHeader backgroundImage={data.file.childImageSharp} />
            <Layout>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                    <div key={node.id}>
                        <Link to={node.fields.slug}>
                            <h3>
                                {node.frontmatter.title}{" "}
                                <span>— {node.frontmatter.date}</span>
                            </h3>
                            <p>{node.excerpt}</p>
                        </Link>
                    </div>
                ))}
            </Layout>
        </>
    );
};

export const query = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
        file(relativePath: { eq: "headers/forest-grave.png" }) {
            relativePath
            childImageSharp {
                fluid(srcSetBreakpoints: [1500, 1024, 720], toFormat: JPG) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
        }
    }
`;

export default Index;
