import * as React from "react";
import { DisplayImageProps, SourceImageProps } from "../../pages";

interface ParsedPath {
    /**
     * The root of the path such as '/' or 'c:\'
     */
    root: string;
    /**
     * The full directory path such as '/home/user/dir' or 'c:\path\dir'
     */
    dir: string;
    /**
     * The file name including extension (if any) such as 'index.html'
     */
    base: string;
    /**
     * The file extension (if any) such as '.html'
     */
    ext: string;
    /**
     * The file name without extension (if any) such as 'index'
     */
    name: string;
}

export interface FileNode extends ParsedPath {
    publicURL: string;
    id: string;
    children: any[];
    sourceInstanceName: string;
    absolutePath: string;
    relativePath: string;
    relativeDirectory: string;
    extension: string;
    size: number;
    prettySize: string;

    modifiedTime: string;
    accessTime: string;
    changeTime: string;
    birthTime: string;
    internal: {
        contentDigest: string;
        type: "Directory" | "File";
        mediaType?: string;
        description: string;
    };
}

export interface FixedObject {
    width: number;
    height: number;
    src: string;
    srcSet: string;
    base64?: string;
    tracedSVG?: string;
    srcWebp?: string;
    srcSetWebp?: string;
    media?: string;
}

export interface FluidObject {
    aspectRatio: number;
    src: string;
    srcSet: string;
    sizes: string;
    base64?: string;
    tracedSVG?: string;
    srcWebp?: string;
    srcSetWebp?: string;
    media?: string;
}
export interface ImageSharp extends Partial<FileNode> {
    childImageSharp: {
        fluid?: FluidObject;
        fixed?: FixedObject;
    };
}
/*
childImageSharp {
                fluid(
                    maxWidth: 1800
                    srcSetBreakpoints: [400, 550, 800, 1600, 1800]
                    quality: 75
                    toFormat: JPG
                ) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }*/
export enum QueryFieldType {
    // display parameters
    "MAXWIDTH" = "maxWidth",
    "MAXHEIGHT" = "maxHeight",
    "DISPLAYTYPE" = "displayType",
    "QUALITY" = "quality",
    "IMGBG" = "imageBackground",
    "FIT" = "fit",
    "BRKPNTS" = "displayBreakpoints",
    "TOFORMAT" = "toFormat",
    "FRAGMENT" = "fragment"
}
// @TODO: add fragments support
// @TODO: add fit support
// @TODO: add background support
// @TODO: add toFormat support
interface Props extends React.HTMLAttributes<HTMLElement> {
    displayImageProps: DisplayImageProps;
    sourceImageProps: SourceImageProps;
}

const parseParamsIntoGraphQl = (
    params: DisplayImageProps
): React.ReactFragment => {
    let graphQLFragment;
    if (params.displayType === "fixed") {
        graphQLFragment = `
childImageSharp {
    fixed(
        width: ${params.maxWidth ? params.maxWidth : "400"}${
            params.maxHeight
                ? `
        height: ${params.maxHeight}`
                : ""
        }${
            params.quality
                ? `
        quality: ${params.quality}`
                : ""
        }
    ) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
    }
}
`;
    }

    graphQLFragment = `
childImageSharp {
    fluid(
        maxWidth: ${params.maxWidth ? params.maxWidth : "400"}${
        params.maxHeight
            ? `
        maxHeight: ${params.maxHeight}`
            : ""
    }${
        params.quality
            ? `
        quality: ${params.quality}`
            : ""
    }
        srcSetBreakpoints: [ ${
            params.displayBreakpoints ? params.displayBreakpoints : "800"
        } ]
        fit: ${params.fit ? params.fit : "sharp.fit.cover"}
        background: ${
            params.imageBackground ? params.imageBackground : "sharp.fit.cover"
        }
    ) {
        ...GatsbyImageSharpFixed_withWebp_tracedSVG
    }
}
`;

    return <pre>{graphQLFragment}</pre>;
};

export const GraphQlExplorer: React.FC<Props> = ({
    style,
    displayImageProps,
    sourceImageProps
}) => {
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return (
        <figure style={style}>
            {parseParamsIntoGraphQl(displayImageProps)}
        </figure>
    );
};
export default GraphQlExplorer;
