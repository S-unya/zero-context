import React, { useState, useCallback } from "react";
import { DisplayImageProps, SourceImageProps } from "../../pages";
import CodeBlock from "../CodeBlock";

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
    const [editing, setEditing] = useState<boolean>(false);
    const [graphQL, setGraphQL] = useState<string>(`childImageSharp {

    }`);

    // STATE:END

    // CALLBACKS
    const updateEditing = useCallback(() => {
        setEditing(!editing);
    }, [setEditing, editing]);

    const handleChange = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
            const target = event.target as HTMLElement;
            console.log(event.keyCode, event.key);

            // escape = 27
            // tab == 9
            switch (event.keyCode) {
                case 27:
                    return setEditing(!editing);
                case 9:
                    /// add 4 spaces
                    return;
                default:
                    return;
            }
        },
        [setEditing, editing]
    );
    const updateGraphQl = useCallback(
        (code: string) => {
            console.log({ code });

            setGraphQL(code);
        },
        [graphQL]
    );
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END

    return (
        <section>
            <button onClick={updateEditing}>{editing ? "Save" : "Edit"}</button>

            <div>{parseParamsIntoGraphQl(displayImageProps)}</div>
            <CodeBlock
                live={editing}
                className="language-graphql"
                changeHandler={updateGraphQl}
            >
                {graphQL}
            </CodeBlock>
        </section>
    );
};
export default GraphQlExplorer;
