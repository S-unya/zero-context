import React, { useState, useCallback, useEffect } from "react";
import {
    DisplayImageProps,
    SourceImageProps,
    emptyDisplayParams
} from "../../pages";
import CodeBlock from "../CodeBlock";
import { parse } from "graphql";

import styles from "./GraphQlExplorer.module.css";

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
    setDisplayImageProps: (
        value: DisplayImageProps
    ) => void | DisplayImageProps;
}

type GQLTree = {
    next: GQLTree | null;
    value: string | undefined;
    kind: string;
    line: number;
    column: number;
};

const getColSpaces = (cols: number): string => {
    const spaces = "                                                 ";

    return spaces.slice(0, cols - 1);
};

const extractParam = (
    value: string,
    params: DisplayImageProps
): DisplayImageProps => {
    const newParams = { ...params };
    const typePattern = /fixed|fluid/;

    if (typePattern.test(value)) {
        newParams.displayType = value;
    }

    return newParams;
};

// eslint-disable-next-line complexity
const traverseTo = (
    tok: GQLTree,
    acc: DisplayImageProps
): DisplayImageProps => {
    let params = { ...acc };

    switch (tok.kind) {
        case "Name":
            params = tok.value && extractParam(tok.value, params);
            params = tok.next && traverseTo(tok.next, params);
            break;
        case "...":
            const next = tok.next;
            params.fragment = `...${next!.value}`;
            params = next && traverseTo(next, params);

            break;
        case "<EOF>":
            return params;
        default:
            // params += tok.kind;
            params = tok.next && traverseTo(tok.next, params);
            break;
    }

    return params;
};

// eslint-disable-next-line complexity
const parseGraphQlIntoParams = (graphQl: string): DisplayImageProps | null => {
    try {
        const ast = parse(graphQl);
        if (!ast || !ast.loc || !ast.loc.startToken) {
            throw new Error("Error processing graphQl");
        }

        const params: DisplayImageProps =
            ast.loc &&
            ast.loc.startToken &&
            traverseTo(ast.loc.startToken, {
                ...emptyDisplayParams
            });
        console.log({ ast, params });
        return params;
    } catch (err) {
        const msg = err.message;
        console.log(msg, err);
        return null;
    }
};

const gqlPre = `{
    childImageSharp {`;
const gqlPost = `   }
}`;

// eslint-disable-next-line complexity
const outputParamsString = (params: DisplayImageProps): string => {
    const fitStr = params.fit ? `fit: ${params.fit}` : ``;
    const displayBreakpointsStr = params.displayBreakpoints
        ? `displayBreakpoints: ${params.displayBreakpoints}`
        : ``;
    const heightStr = params.maxHeight
        ? params.displayType === "fixed"
            ? `height: ${params.maxHeight}`
            : `maxHeight: ${params.maxHeight}`
        : ``;
    const widthStr = params.maxWidth
        ? params.displayType === "fixed"
            ? `width: ${params.maxWidth}`
            : `maxWidth: ${params.maxWidth}`
        : ``;
    const imageBackgroundStr = params.imageBackground
        ? `background: ${params.imageBackground}`
        : ``;
    const qualityStr = params.quality ? `quality: ${params.quality}` : ``;

    return [
        fitStr,
        displayBreakpointsStr,
        heightStr,
        widthStr,
        qualityStr,
        imageBackgroundStr
    ]
        .join(", ")
        .replace(/ ,/gi, "");
};
// eslint-disable-next-line complexity
const outputType = (params: DisplayImageProps): string => {
    const type = params.displayType;
    const typeProps =
        params.maxHeight ||
        params.maxWidth ||
        params.displayBreakpoints ||
        params.fit ||
        params.imageBackground ||
        params.quality
            ? `(${outputParamsString(params)})`
            : ``;

    return type ? `    ${type}${typeProps} {` : ``;
};

// @TODO: Actually use the child-image-sharp schema and parse the graphql here
export const GraphQlExplorer: React.FC<Props> = ({
    style,
    displayImageProps,
    setDisplayImageProps,
    sourceImageProps
}) => {
    // STATE
    const [editing, setEditing] = useState<boolean>(false);
    const [graphql, setGraphql] = useState<string>(gqlPre + gqlPost);

    // STATE:END

    // CALLBACKS
    const parseParamsIntoGraphQl = useCallback(
        // eslint-disable-next-line complexity
        (params: DisplayImageProps): string => `${gqlPre}
        ${outputType(params)}
            ${params.fragment || ""}
        ${params.displayType ? "}" : ""}
${gqlPost}`,
        []
    );
    const parseParamsIntoInteractive = useCallback(
        // eslint-disable-next-line complexity
        (params: DisplayImageProps): React.ReactFragment => {
            const str = parseParamsIntoGraphQl(params);
            const imageParamPattern = /(\w+: "*\w*\d*"*)/gi;
            const fragmentPattern = /(\.{3}\w*)/gi;
            const displayTypePattern = /(fluid|fixed)/gi;

            console.log({ str });
            const displayImageParams = str.match(imageParamPattern);
            const fragment = str.match(fragmentPattern);
            const displayType = str.match(displayTypePattern);

            const graphQLFragment = (
                <pre>
                    {gqlPre}
                    {`
        `}
                    {displayType?.length && <button>{displayType[0]}</button>}
                    {displayImageParams?.length &&
                        `(${displayImageParams.join(", \n")}) {
            `}
                    {fragment?.length && <button>{fragment[0]}</button>}
                    {`
        }
`}
                    {gqlPost}
                </pre>
            );

            return graphQLFragment;
        },
        [parseParamsIntoGraphQl]
    );

    const updateGraphQl = useCallback(
        (code: string) => {
            setGraphql(code);
            const params = parseGraphQlIntoParams(code);
            if (params) {
                setDisplayImageProps(params);
            }
        },
        [setDisplayImageProps]
    );

    const updateEditing = useCallback(() => {
        setEditing(!editing);
    }, [editing]);
    // CALLBACKS:END

    // EFFECT
    useEffect(() => {
        parseParamsIntoGraphQl(displayImageProps);
    }, [displayImageProps, parseParamsIntoGraphQl]);
    // EFFECT:END

    return (
        <section className={styles.component}>
            <button onClick={updateEditing} className={styles.button}>
                {editing ? "Save" : "Edit"}
            </button>
            <CodeBlock
                live={editing}
                className="language-graphql"
                changeHandler={updateGraphQl}
                onExit={updateEditing}
            >
                {graphql}
            </CodeBlock>
            <pre>{parseParamsIntoInteractive(displayImageProps)}</pre>
        </section>
    );
};
export default GraphQlExplorer;
