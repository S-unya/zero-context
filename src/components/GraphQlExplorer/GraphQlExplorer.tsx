import React, { useState, useCallback, useEffect, useRef } from "react";
import cx from "classnames";
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
    setCurrentFocus: (focus: string) => void;
}

type GQLTree = {
    next: GQLTree | null;
    value: string | undefined;
    kind: string;
    line: number;
    column: number;
};

export type GqlError = {
    message: string;
    location: { line: number; column: number };
};

// const getColSpaces = (cols: number): string => {
//     const spaces = "                                                 ";

//     return spaces.slice(0, cols - 1);
// };

const extractParam = (
    value: string,
    params: DisplayImageProps
): DisplayImageProps => {
    const newParams = { ...params };
    const typePattern = /fixed|fluid/;

    if (typePattern.test(value)) {
        newParams.displayType = value as "fluid" | "fixed";
    }

    return newParams;
};

// eslint-disable-next-line complexity
const traverseTo = (
    tok: GQLTree,
    acc?: DisplayImageProps
): DisplayImageProps => {
    let params: DisplayImageProps = { ...acc };

    switch (tok.kind) {
        case "Name":
            params = tok.value && extractParam(tok.value, params);
            params = tok.next && traverseTo(tok.next, params);
            break;
        case "...": // fragment
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
const parseGraphQlIntoParams = (
    graphQl: string
): DisplayImageProps | GqlError => {
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
        // @todo use this to add code hints
        const message = err.message;
        console.log(message, err);
        return { message, location: err?.locations[0] };
    }
};

const determineIfIsGqlError = (
    parseReturn: DisplayImageProps | GqlError
): parseReturn is GqlError => {
    if ((parseReturn as GqlError).message) {
        return true;
    }
    return false;
};

const gqlPre = `{
  childImageSharp {`;
const gqlPost = `  }
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
        .join("\n\t")
        .replace(/\t\n/gi, "");
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
            ? `(
        ${outputParamsString(params)}
    )`
            : ``;

    return type ? `${type}${typeProps}{` : ``;
};

const parseParamsIntoGraphQl = (params: DisplayImageProps): string => `${gqlPre}
    ${outputType(params)}
        ${params.fragment || ""}
    ${params.displayType ? "}" : ""}
${gqlPost}`;

// @TODO: Actually use the child-image-sharp schema and parse the graphql here
export const GraphQlExplorer: React.FC<Props> = ({
    style,
    className,
    displayImageProps,
    setDisplayImageProps,
    setCurrentFocus
}) => {
    // STATE
    const [editing, setEditing] = useState<boolean>(false);
    const [graphql, setGraphql] = useState<string>(
        parseParamsIntoGraphQl(displayImageProps)
    );
    const [error, setError] = useState<GqlError | undefined>();

    // STATE:END
    const graphQlRef = useRef(graphql);

    // CALLBACKS
    const setFocus = useCallback(
        (queryFieldType: QueryFieldType) => () => {
            setCurrentFocus(queryFieldType);
        },
        [setCurrentFocus]
    );

    const getButtonAction = useCallback(
        // eslint-disable-next-line complexity
        (param: string): (<T>(event: T) => void) | undefined => {
            if (/fit:/i.test(param)) {
                return setFocus(QueryFieldType.FIT);
            }
            if (/width:/i.test(param)) {
                return setFocus(QueryFieldType.MAXWIDTH);
            }
            if (/height:/i.test(param)) {
                return setFocus(QueryFieldType.MAXHEIGHT);
            }
            if (/background:/i.test(param)) {
                return setFocus(QueryFieldType.IMGBG);
            }
            if (/breakpoint:/i.test(param)) {
                return setFocus(QueryFieldType.BRKPNTS);
            }
            if (/quality:/i.test(param)) {
                return setFocus(QueryFieldType.QUALITY);
            }
            return;
        },
        [setFocus]
    );

    const outputTypeParams = useCallback(
        (params: string[]) => {
            return [
                `(
            `,
                ...params.map(param => {
                    const action = getButtonAction(param);

                    return (
                        <>
                            <button
                                key={param}
                                onFocus={action}
                                onClick={action}
                            >
                                {param}
                            </button>
                            {`
            `}
                        </>
                    );
                }),
                `
        ) {
            `
            ];
        },
        [getButtonAction]
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

            const fragmentAction = setFocus(QueryFieldType.FRAGMENT);

            const graphQLFragment = (
                <pre>
                    {gqlPre}
                    {`
    `}
                    {displayType?.length && <button>{displayType[0]}</button>}
                    {displayImageParams?.length
                        ? outputTypeParams(displayImageParams)
                        : null}
                    {fragment?.length && (
                        <button
                            onFocus={fragmentAction}
                            onClick={fragmentAction}
                        >
                            {fragment[0]}
                        </button>
                    )}
                    {`
    }
`}
                    {gqlPost}
                </pre>
            );

            return graphQLFragment;
        },
        [outputTypeParams, setFocus]
    );

    const updateGraphQl = useCallback(
        (code: string): void => {
            const params = parseGraphQlIntoParams(code);

            setGraphql(code);
            graphQlRef.current = code;

            if (params) {
                const gqlError = determineIfIsGqlError(params);
                if (gqlError) {
                    setError(params as GqlError);
                    return;
                }

                setError(undefined);
                setDisplayImageProps(params as DisplayImageProps);
            }
        },
        [setDisplayImageProps]
    );

    const updateEditing = useCallback(() => {
        // setGraphql(graphQlRef.current);
        setEditing(!editing);
    }, [editing]);
    // CALLBACKS:END

    // EFFECT
    useEffect(() => {
        graphQlRef.current = parseParamsIntoGraphQl(displayImageProps);
    }, [displayImageProps]);
    // EFFECT:END

    return (
        <section className={cx(className, styles.component)} style={style}>
            <button onClick={updateEditing} className={styles.button}>
                {editing ? "Save" : "Edit"}
            </button>
            {editing ? (
                <CodeBlock
                    live={editing}
                    changeHandler={updateGraphQl}
                    onExit={updateEditing}
                    error={error}
                >
                    {graphql}
                </CodeBlock>
            ) : (
                <pre>{parseParamsIntoInteractive(displayImageProps)}</pre>
            )}
        </section>
    );
};
export default GraphQlExplorer;
