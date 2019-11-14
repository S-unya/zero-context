import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export interface Meta {
    name: string;
    content: string | string[];
    property?: undefined;
}

interface Props {
    description?: string;
    lang?: string;
    meta?: Meta[];
    title: string;
}

export const Seo: React.FC<Props> = ({
    description = "",
    lang = `en`,
    meta = [],
    title
}) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription
                },
                {
                    property: `og:title`,
                    content: title
                },
                {
                    property: `og:description`,
                    content: metaDescription
                },
                {
                    property: `og:type`,
                    content: `website`
                }
            ].concat(meta)}
        />
    );
};
export default Seo;
