/** @jsx jsx */
import * as React from "react";
import { useImmer, useImmerReducer } from "use-immer";
import { useStaticQuery, graphql } from "gatsby";
import { jsx } from "theme-ui";
import Image from "gatsby-image";

import { ImageForm } from "../components/ImageForm";
import { Layout } from "../components/Layout";
import GraphQlExplorer, {
    QueryFieldType
} from "../components/GraphQlExplorer/GraphQlExplorer";
import PictureElementExplorer, {
    PictureFieldType
} from "../components/PictureElementExplorer/PictureElementExplorer";
import { messages, MessageFieldType } from "../fixtures/attributeMessages";
import { FormFieldType } from "../components/ImageForm/ImageForm";

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

interface Reducer {
    message: MessageFieldType;
    outgoingFocus: (
        | PictureFieldType
        | FormFieldType
        | QueryFieldType
        | undefined
    )[];
    incomingFocus: (
        | PictureFieldType
        | FormFieldType
        | QueryFieldType
        | undefined
    )[];
}

const initialState = { message: null, outgoingFocus: [], incomingFocus: [] };

function reducer(
    draft: Reducer,
    action: { type: PictureFieldType | FormFieldType | QueryFieldType }
) {
    draft.outgoingFocus = [action.type];
    switch (action.type) {
        case FormFieldType.MAXWIDTH:
            draft.incomingFocus = [
                PictureFieldType.SIZES,
                PictureFieldType.SRCSET,
                PictureFieldType.SRC,
                QueryFieldType.MAXWIDTH
            ];
            draft.message = MessageFieldType.MAXWIDTH;

            return void draft;
        case FormFieldType.MAXHEIGHT:
            draft.incomingFocus = [PictureFieldType.SPACER];
            draft.message = MessageFieldType.MAXHEIGHT;

            return void draft;
        case FormFieldType.DISPLAYTYPE:
            draft.incomingFocus = [QueryFieldType.DISPLAYTYPE];
            draft.message = MessageFieldType.DISPLAYTYPE;

            return void draft;
        case FormFieldType.QUALITY:
            draft.incomingFocus = [QueryFieldType.QUALITY];
            draft.message = MessageFieldType.QUALITY;

            return void draft;
        case FormFieldType.IMGBG:
            draft.incomingFocus = [
                QueryFieldType.IMGBG,
                FormFieldType.SOURCETYPE,
                QueryFieldType.TOFORMAT
            ];
            draft.message = MessageFieldType.IMGBG;

            return void draft;
        case FormFieldType.FIT:
            draft.incomingFocus = [
                QueryFieldType.FIT,
                FormFieldType.DISPLAYTYPE
            ];
            draft.message = MessageFieldType.FIT;

            return void draft;
        case FormFieldType.BRKPNTS:
            draft.incomingFocus = [
                PictureFieldType.SRCSET,
                QueryFieldType.BRKPNTS
            ];
            draft.message = MessageFieldType.BRKPNTS;

            return void draft;
        case FormFieldType.SOURCEWIDTH:
            draft.incomingFocus = [
                PictureFieldType.SRCSET,
                PictureFieldType.SIZES,
                PictureFieldType.SRC
            ];
            draft.message = MessageFieldType.SOURCEWIDTH;

            return void draft;
        case FormFieldType.SOURCEHEIGHT:
            draft.incomingFocus = [];
            draft.message = MessageFieldType.SOURCEHEIGHT;

            return void draft;
        case FormFieldType.SOURCETYPE:
            draft.incomingFocus = [QueryFieldType.TOFORMAT];
            draft.message = MessageFieldType.SOURCETYPE;

            return void draft;
        // picture field types
        case PictureFieldType.DISPLAYTYPE:
            draft.incomingFocus = [
                FormFieldType.DISPLAYTYPE,
                QueryFieldType.DISPLAYTYPE,
                PictureFieldType.SRCSET
            ];
            draft.message = MessageFieldType.DISPLAYTYPE;

            return void draft;
        case PictureFieldType.FIT:
            draft.incomingFocus = [FormFieldType.FIT];
            draft.message = MessageFieldType.FIT;

            return void draft;
        case PictureFieldType.SPACER:
            draft.incomingFocus = [
                PictureFieldType.SPACER,
                FormFieldType.SOURCEWIDTH,
                FormFieldType.SOURCEHEIGHT
            ];
            draft.message = MessageFieldType.SPACER;

            return void draft;
        case PictureFieldType.SRC:
            draft.incomingFocus = [
                FormFieldType.SOURCEWIDTH,
                QueryFieldType.TOFORMAT,
                FormFieldType.MAXWIDTH,
                FormFieldType.BRKPNTS,
                QueryFieldType.BRKPNTS,
                QueryFieldType.MAXWIDTH
            ];
            draft.message = MessageFieldType.SRC;

            return void draft;
        case PictureFieldType.SRCSET:
            draft.incomingFocus = [
                FormFieldType.SOURCEWIDTH,
                FormFieldType.MAXWIDTH,
                FormFieldType.BRKPNTS,
                QueryFieldType.BRKPNTS,
                QueryFieldType.MAXWIDTH
            ];
            draft.message = MessageFieldType.SRCSET;

            return void draft;
        case PictureFieldType.SIZES:
            draft.incomingFocus = [
                FormFieldType.SOURCEWIDTH,
                FormFieldType.MAXWIDTH,
                FormFieldType.BRKPNTS,
                QueryFieldType.BRKPNTS,
                QueryFieldType.MAXWIDTH
            ];
            draft.message = MessageFieldType.SIZES;

            return void draft;
        case QueryFieldType.MAXWIDTH:
            draft.incomingFocus = [
                PictureFieldType.SIZES,
                QueryFieldType.MAXWIDTH
            ];
            draft.message = MessageFieldType.MAXWIDTH;

            return void draft;
        case QueryFieldType.MAXHEIGHT:
            draft.incomingFocus = [
                PictureFieldType.SPACER,
                QueryFieldType.MAXHEIGHT
            ];
            draft.message = MessageFieldType.MAXHEIGHT;

            return void draft;
        case QueryFieldType.DISPLAYTYPE:
            draft.incomingFocus = [
                PictureFieldType.SRCSET,
                PictureFieldType.SIZES,
                QueryFieldType.DISPLAYTYPE
            ];
            draft.message = MessageFieldType.DISPLAYTYPE;

            return void draft;
        case QueryFieldType.QUALITY:
            draft.incomingFocus = [FormFieldType.QUALITY];
            draft.message = MessageFieldType.QUALITY;

            return void draft;
        case QueryFieldType.IMGBG:
            draft.incomingFocus = [FormFieldType.IMGBG];
            draft.message = MessageFieldType.IMGBG;

            return void draft;
        case QueryFieldType.FIT:
            draft.incomingFocus = [FormFieldType.FIT];
            draft.message = MessageFieldType.FIT;

            return void draft;
        case QueryFieldType.BRKPNTS:
            draft.incomingFocus = [
                PictureFieldType.SRCSET,
                FormFieldType.BRKPNTS
            ];
            draft.message = MessageFieldType.BRKPNTS;

            return void draft;
        case QueryFieldType.TOFORMAT:
            // draft.incomingFocus = [FormFieldType.TOFORMAT];
            // draft.message = MessageFieldType.TOFORMAT;

            return void draft;
        case QueryFieldType.FRAGMENT:
            draft.incomingFocus = [PictureFieldType.SPACER];
            // draft.message = MessageFieldType.FRAGMENT;

            return void draft;
    }
}

interface Props extends React.HTMLAttributes<HTMLElement> {
    sourceImageProps: any;
    displayImageProps: any;
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
    const [state, dispatch] = useImmerReducer(reducer, initialState);

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

    React.useEffect(() => {
        const msg = messages[state.message];
        console.log({ msg });
        console.log({ img });

        setInfoMessage(msg);
    }, [state, setInfoMessage]);

    return (
        <Layout>
            <ImageForm
                sourceImageProps={sourceImageProps}
                displayImageProps={displayImageProps}
                updateDisplayImageProps={updateDisplayImageProps}
                updateSourceImageProps={updateSourceImageProps}
                incomingFocus={state.incomingFocus}
                outgoingFocus={state.outgoingFocus}
                setCurrentFocus={dispatch}
            />
            <GraphQlExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                incomingFocus={state.incomingFocus}
                outgoingFocus={state.outgoingFocus}
                setCurrentFocus={dispatch}
            />
            <PictureElementExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                incomingFocus={state.incomingFocus}
                outgoingFocus={state.outgoingFocus}
                setCurrentFocus={dispatch}
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
            {img && img.fixed ? (
                <Image fixed={img.fixed} />
            ) : img && img.fluid ? (
                <Image fluid={img.fluid} />
            ) : null}
        </Layout>
    );
};
