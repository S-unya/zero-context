/* eslint-disable import/no-commonjs */
/* eslint-disable-next-line no-undef */
module.exports = {
    plugins: [
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-plugin-postcss`,
            options: {
                postCssPlugins: [
                    require(`postcss-preset-env`)({ stage: 0 }),
                    require("postcss-easing-gradients")
                ]
            }
        },
        // SEO for react
        `gatsby-plugin-react-helmet`,
        // Expose `/pages` to graphQL layer
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                // eslint-disable-next-line no-undef
                path: `${__dirname}/src/pages`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                // eslint-disable-next-line no-undef
                path: `${__dirname}/src/assets`
            }
        },
        `gatsby-transformer-remark`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Zero context`,
                short_name: `zerocontext`,
                start_url: `/`,
                background_color: `#000a45`,
                theme_color: `#000a45`,
                display: `minimal-ui`
                // icon: `src/images/logo-512x512.png`, // This path is relative to the root of the site.
            }
        },
        // To learn more, visit: https://gatsby.app/offline
        `gatsby-plugin-offline`
    ],
    // Customize your site metadata:
    siteMetadata: {
        title: `Zero context`,
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
