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
                    require("postcss-easing-gradients"),
                ],
            },
        },
        // SEO for react
        `gatsby-plugin-react-helmet`,
        // Expose `/pages` to graphQL layer
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                // eslint-disable-next-line no-undef
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                // eslint-disable-next-line no-undef
                path: `${__dirname}/src/assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (e.g. <pre class="language-js">).
                            // classPrefix: "language-",
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            // aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in gatsby-browser.js
                            // right after importing the prism color scheme:
                            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false,
                            // This adds a new language definition to Prism or extend an already
                            // existing language definition. More details on this option can be
                            // found under the header "Add new language definition or extend an
                            // existing language" below.
                            languageExtensions: [
                                {
                                    language: "superscript",
                                    extend: "javascript",
                                    definition: {
                                        superscript_types: /(SuperType)/,
                                    },
                                    insertBefore: {
                                        function: {
                                            superscript_keywords: /(superif|superelse)/,
                                        },
                                    },
                                },
                            ],
                            // Customize the prompt used in shell output
                            // Values below are default
                            prompt: {
                                user: "root",
                                host: "localhost",
                                global: false,
                            },
                            // By default the HTML entities <>&'" are escaped.
                            // Add additional HTML escapes by providing a mapping
                            // of HTML entities and their escape value IE: { '}': '&#123;' }
                            escapeEntities: {},
                        },
                    },
                ],
            },
        },
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
                display: `minimal-ui`,
                // icon: `src/images/logo-512x512.png`, // This path is relative to the root of the site.
            },
        },
        // To learn more, visit: https://gatsby.app/offline
        `gatsby-plugin-offline`,
    ],
    // Customize your site metadata:
    siteMetadata: {
        title: `Zero context`,
        author: `S'unya DIckman`,
        description: `A simple visualiser to help understand the Gatsby image inputs`,
        social: [
            {
                name: `twitter`,
                url: `https://twitter.com/sunyasunya`,
            },
            {
                name: `github`,
                url: `https://github.com/S-unya/`,
            },
        ],
    },
};
