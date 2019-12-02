/** @jsx jsx */
import * as React from "react";
import { useImmer } from "use-immer";
import { useStaticQuery, graphql } from "gatsby";
import { jsx } from "theme-ui";
import { Image } from "gatsby-image";

import { ImageForm } from "../components/ImageForm";
import { Layout } from "../components/Layout";
import GraphQlExplorer from "../components/GraphQlExplorer/GraphQlExplorer";
import PictureElementExplorer from "../components/PictureElementExplorer/PictureElementExplorer";
import { messages } from "../fixtures/attributeMessages";

export interface SourceImageProps {
    width: number | null;
    height: number | null;
    type: string | null;
}

export interface DisplayImageProps {
    maxWidth: number | null;
    maxHeight: number | null;
    displayType: "fluid" | "fixed" | null;
    quality: number;
    imageBackground: string;
    fit: string | null;
    displayBreakpoints: string;
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    sourceImageProps: any;
    displayImageProps: any;
}

export enum FieldType {
    // display parameters
    "MAXWIDTH" = "maxWidth",
    "MAXHEIGHT" = "maxHeight",
    "DISPLAYTYPE" = "displayType",
    "QUALITY" = "quality",
    "IMGBG" = "imageBackground",
    "FIT" = "fit",
    "BRKPNTS" = "displayBreakpoints",
    "SPACER" = "spacer",
    // Source image parameters
    "SOURCEWIDTH" = "sourceImageWidth",
    "SOURCEHEIGHT" = "sourceImageHeight",
    "SOURCETYPE" = "sourceImageType",
    // Element fields
    "SRC" = "src",
    "SRCSET" = "srcSet",
    "SIZES" = "sizes"
}

export default () => {
    const imageData = useStaticQuery(graphql`
        query imgs {
            allFile {
                nodes {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid_withWebp_noBase64
                        }
                    }
                }
            }
        }
    `);
    const img = imageData.allFile.nodes[0].childImageSharp;

    const [sourceImageProps, updateSourceImageProps] = useImmer<
        SourceImageProps
    >({
        width: 400,
        height: null,
        type: null
    } as SourceImageProps);
    const [displayImageProps, updateDisplayImageProps] = useImmer<
        DisplayImageProps
    >({
        maxWidth: 800,
        maxHeight: null,
        displayType: null,
        quality: 50,
        fit: "cover",
        imageBackground: "rgba(0, 0, 0, 0)",
        displayBreakpoints: ""
    } as DisplayImageProps);
    const [
        infoMessage,
        setInfoMessage
    ] = React.useState<null | React.ReactFragment>(null);
    const [currentFocus, setCurrentFocus] = React.useState<null | FieldType>(
        null
    );

    React.useEffect(() => {
        const msg = messages[currentFocus];
        console.log({ msg });
        console.log({ img });

        setInfoMessage(msg);
    }, [currentFocus, setInfoMessage]);

    return (
        <Layout>
            <ImageForm
                sourceImageProps={sourceImageProps}
                displayImageProps={displayImageProps}
                updateDisplayImageProps={updateDisplayImageProps}
                updateSourceImageProps={updateSourceImageProps}
                currentFocus={currentFocus}
                setCurrentFocus={setCurrentFocus}
            />
            <GraphQlExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                currentFocus={currentFocus}
                setCurrentFocus={setCurrentFocus}
            />
            <PictureElementExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                currentFocus={currentFocus}
                setCurrentFocus={setCurrentFocus}
            />
            <div
                aria-atomic="true"
                aria-live="assertive"
                sx={{
                    gridColumn: `2 / 3`,
                    gridRow: `1 / 2`
                }}
            >
                {infoMessage}
            </div>
            {/* {img && img.fixed ? (
                <Image fixed={img.fixed} />
            ) : img && img.fluid ? (
                <Image fluid={img.fluid} />
            ) : null} */}
        </Layout>
    );
};
