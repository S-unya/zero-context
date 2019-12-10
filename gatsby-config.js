// eslint-disable-next-line no-undef, import/no-commonjs
module.exports = {
    plugins: [
        `gatsby-plugin-typescript`,
        // SEO for react
        "gatsby-plugin-react-helmet",
        // Expose `/content` to graphQL layer
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                // eslint-disable-next-line no-undef
                path: `${__dirname}/src/assets`
            }
        },
        // {
        //     resolve: `gatsby-source-filesystem`,
        //     options: {
        //         name: `content`,
        //         // eslint-disable-next-line no-undef
        //         path: `${__dirname}/content`
        //     }
        // },
        // `gatsby-plugin-mdx`,
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Gatsby Image Visualiser",
                short_name: "imagevisualiser",
                start_url: "/",
                background_color: "#051c48",
                theme_color: "#051c48",
                display: "minimal-ui"
                // icon: "src/images/logo-512x512.png", // This path is relative to the root of the site.
            }
        },
        // To learn more, visit: https://gatsby.app/offline
        `gatsby-plugin-offline`
    ],
    // Customize your site metadata:
    siteMetadata: {
        title: `Gatsby Image Visualiser`,
        author: `S'unya DIckman`,
        description: `A simple visualiser to help understand the Gatsby image inputs`,
        social: [
            {
                name: `twitter`,
                url: `https://twitter.com/sunyasunya`
            },
            {
                name: `github`,
                url: `https://github.com/S-unya/`
            }
        ]
    }
};
