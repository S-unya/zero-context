/* eslint-disable import/no-commonjs */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

// eslint-disable-next-line no-undef
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    // Ensures we are processing only markdown files
    if (node.internal.type === "MarkdownRemark") {
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
};

// eslint-disable-next-line no-undef
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    /**
     * Work out the necessary to generate distinct pages
     * @param {object} node - The data for the distinct page
     */
    const generateDistinctPage = node => {
        const template = node.path && node.path.replace("/", "");
        const { id } = node;
        console.log(template, node.fields.slug, node);

        // for the time being we can just assume that there are different teplates for each of the pages, but we can add logic here to reuse page templates
        createPage({
            path: node.fields.slug,
            component: path.resolve(`src/templates/blog.tsx`), //path.resolve(`src/templates/${String(template)}.tsx`),
            // additional data can be passed via context
            context: {
                id,
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.fields.slug
            }
        });
    };
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        generateDistinctPage(node);
    });
};
