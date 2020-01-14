import React, { useState, useCallback, useEffect, useRef } from "react";
import cx from "classnames";
import { emptyDisplayParams } from "../../pages";
import CodeBlock from "../CodeBlock";
// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from "graphql";

import {
    DisplayImageProps,
    SourceImageProps,
    PictureFieldType,
    QueryFieldType,
    FormFieldType
} from "../../types/types";

import styles from "./GraphQlExplorer.module.css";

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
    acc = ({} as unknown) as DisplayImageProps
): DisplayImageProps => {
    let params = ({ ...acc } as unknown) as DisplayImageProps;

    switch (tok.kind) {
        case "Name":
            if (tok.value) {
                params = extractParam(tok.value, params);
            }
            if (tok.next) {
                params = traverseTo(tok.next, params);
            }
            break;
        case "...": // fragment
            const next = tok.next;

            params.fragment = `...${next!.value}`;
            if (tok.next) {
                params = traverseTo(tok.next, params);
            }

            break;
        case "<EOF>":
            return params;
        default:
            // params += tok.kind;
            if (tok.next) {
                params = traverseTo(tok.next, params);
            }
            break;
    }

    return params;
};

// eslint-disable-next-line complexity
const parseGraphQlIntoParams = (
    graphQl: string
): DisplayImageProps | GqlError => {
    try {
        // @todo: it would be really good to parse this against the image-sharp schema
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
const gqlPost = `}
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

const parseParamsIntoGraphQl = (params: DisplayImageProps): string =>
    `${gqlPre}${outputType(params)}${params.fragment || ""}${
        params.displayType ? "}" : ""
    }${gqlPost}`;

const associateQueryToSelection = {
    // display parameters
    MAXWIDTH: ["maxWidth"],
    MAXHEIGHT: ["maxHeight"],
    DISPLAYTYPE: ["displayType"],
    QUALITY: ["quality"],
    IMGBG: ["imageBackground"],
    FIT: ["fit"],
    BRKPNTS: ["displayBreakpoints"],
    FRAGMENT: ["fragment"],
    // Source image parameters
    SOURCEWIDTH: [],
    SOURCEHEIGHT: [],
    SOURCETYPE: ["fragment"],
    SOURCENAME: [],
    // Element fields
    SRC: ["maxWidth", "fragment"],
    SRCSET: ["maxWidth", "displayBreakpoints", "displayType"],
    SPACER: ["fragment", "maxWidth", "maxHeight", "displayType"],
    SIZES: ["maxWidth", "displayType", "displayBreakpoints"],
    SOURCE: ["fragment"],
    WIDTH: ["maxWidth"],
    HEIGHT: ["maxHeight"]
};

interface Props extends React.HTMLAttributes<HTMLElement> {
    displayImageProps: DisplayImageProps;
    sourceImageProps: SourceImageProps;
    setDisplayImageProps: (
        value: DisplayImageProps
    ) => void | DisplayImageProps;
    incomingFocus:
        | PictureFieldType
        | QueryFieldType
        | FormFieldType
        | undefined;
    setCurrentFocus: (focus: string) => void;
}

// @TODO: Actually use the child-image-sharp schema and parse the graphql here
export const GraphQlExplorer: React.FC<Props> = ({
    style,
    className,
    displayImageProps,
    setDisplayImageProps,
    setCurrentFocus,
    incomingFocus
}) => {
    const [selected] = useState<Array<string | undefined> | undefined>(
        incomingFocus ? associateQueryToSelection[incomingFocus] : undefined
    );
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
                return setFocus("FIT");
            }
            if (/width:/i.test(param)) {
                return setFocus("MAXWIDTH");
            }
            if (/height:/i.test(param)) {
                return setFocus("MAXHEIGHT");
            }
            if (/background:/i.test(param)) {
                return setFocus("IMGBG");
            }
            if (/breakpoint:/i.test(param)) {
                return setFocus("BRKPNTS");
            }
            if (/quality:/i.test(param)) {
                return setFocus("QUALITY");
            }
            return undefined;
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
                                className={
                                    selected && selected.includes(param)
                                        ? styles.selected
                                        : styles.queryTerm
                                }
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
        [getButtonAction, selected]
    );

    // @TODO: add fragments support
    // @TODO: add fit support
    // @TODO: add background support
    // @TODO: add toFormat support
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

            const fragmentAction = setFocus("FRAGMENT");
            const displayTypeAction = setFocus("DISPLAYTYPE");

            const graphQLFragment = (
                <>
                    {gqlPre}
                    {`
    `}
                    {displayType?.length && (
                        <button
                            onFocus={displayTypeAction}
                            onClick={displayTypeAction}
                            className={
                                selected && selected.includes("displayType")
                                    ? styles.selected
                                    : styles.queryTerm
                            }
                        >
                            {displayType[0]}
                        </button>
                    )}
                    {displayImageParams?.length
                        ? outputTypeParams(displayImageParams)
                        : null}
                    {fragment?.length && (
                        <button
                            onFocus={fragmentAction}
                            onClick={fragmentAction}
                            className={
                                selected && selected.includes("fragment")
                                    ? styles.selected
                                    : styles.queryTerm
                            }
                        >
                            {fragment[0]}
                        </button>
                    )}
                    {``}
                    {gqlPost}
                </>
            );

            return graphQLFragment;
        },
        [outputTypeParams, setFocus, selected]
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

    // @TODO: removal of tab to unfocus could make this hard to use... consider help panel?
    return (
        <section className={cx(className, styles.component)} style={style}>
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
                <pre
                    onClick={updateEditing}
                    className={styles.codePreview}
                    tabIndex={-1}
                >
                    {parseParamsIntoInteractive(displayImageProps)}
                </pre>
            )}
        </section>
    );
};
export default GraphQlExplorer;
