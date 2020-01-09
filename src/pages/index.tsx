import React, { useCallback } from "react";
import { useImmer, useImmerReducer } from "use-immer";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import ImageForm from "../components/ImageForm";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import GraphQlExplorer from "../components/GraphQlExplorer";
import { messages } from "../fixtures/attributeMessages";
import {
    MessageFieldType,
    PictureFieldType,
    FormFieldType,
    QueryFieldType,
    DisplayImageProps,
    SourceImageProps
} from "../types/types";
import { PictureElementExplorer } from "../components/PictureElementExplorer";

interface Reducer {
    message: MessageFieldType;
    outgoingFocus: Array<
        PictureFieldType | FormFieldType | QueryFieldType | undefined
    >;
    incomingFocus: Array<
        PictureFieldType | FormFieldType | QueryFieldType | undefined
    >;
}

const initialState = { message: null, outgoingFocus: [], incomingFocus: [] };

// eslint-disable-next-line complexity
function reducer(
    draft: Reducer,
    action: { type: PictureFieldType | FormFieldType | QueryFieldType }
) {
    draft.outgoingFocus = [action.type];
    switch (action.type) {
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
                QueryFieldType.DISPLAYTYPE,
                PictureFieldType.SRCSET
            ];
            draft.message = MessageFieldType.DISPLAYTYPE;

            return void draft;
        case PictureFieldType.FIT:
            draft.incomingFocus = [QueryFieldType.FIT];
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
                QueryFieldType.BRKPNTS,
                QueryFieldType.MAXWIDTH
            ];
            draft.message = MessageFieldType.SRC;

            return void draft;
        case PictureFieldType.SRCSET:
            draft.incomingFocus = [
                FormFieldType.SOURCEWIDTH,
                QueryFieldType.BRKPNTS,
                QueryFieldType.MAXWIDTH
            ];
            draft.message = MessageFieldType.SRCSET;

            return void draft;
        case PictureFieldType.SIZES:
            draft.incomingFocus = [
                FormFieldType.SOURCEWIDTH,
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
            draft.incomingFocus = [];
            draft.message = MessageFieldType.QUALITY;

            return void draft;
        case QueryFieldType.IMGBG:
            draft.incomingFocus = [];
            draft.message = MessageFieldType.IMGBG;

            return void draft;
        case QueryFieldType.FIT:
            draft.incomingFocus = [];
            draft.message = MessageFieldType.FIT;

            return void draft;
        case QueryFieldType.BRKPNTS:
            draft.incomingFocus = [PictureFieldType.SRCSET];
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
    return void draft;
}

export const emptyDisplayParams: DisplayImageProps = {};

interface Props extends React.HTMLAttributes<HTMLElement> {
    sourceImageProps: SourceImageProps;
    displayImageProps: DisplayImageProps;
}

const Index: React.FC<Props> = () => {
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
        width: null,
        height: null,
        fileType: null,
        name: null
    } as SourceImageProps);

    const [displayImageProps, updateDisplayImageProps] = useImmer<
        DisplayImageProps
    >(emptyDisplayParams);
    const [
        infoMessage,
        setInfoMessage
    ] = React.useState<null | React.ReactFragment>(null);

    const setDisplayImageProps = useCallback(
        (props: DisplayImageProps) => {
            updateDisplayImageProps(draft => {
                draft.maxWidth = props.maxWidth;
                draft.maxHeight = props.maxHeight;
                draft.displayBreakpoints = props.displayBreakpoints;
                draft.displayType = props.displayType;
                draft.fit = props.fit;
                draft.fragment = props.fragment;
                draft.quality = props.quality;
                draft.imageBackground = props.imageBackground;
            });
        },
        [updateDisplayImageProps]
    );

    React.useEffect(() => {
        const msg = messages[state.message];

        setInfoMessage(msg);
    }, [state, setInfoMessage, img]);

    return (
        <Layout>
            <PageHeader heading="Gatsby image visualiser">
                <>
                    <p>
                        This tool is to help understand the moving parts of the
                        gatsby-image-sharp queries and the gatsby-image output.
                    </p>
                    <p>
                        It is still a work in progress and any useful addition
                        suggestions are welcome
                    </p>
                </>
            </PageHeader>
            <ImageForm
                sourceImageProps={sourceImageProps}
                updateSourceImageProps={updateSourceImageProps}
            />
            <GraphQlExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                incomingFocus={state.incomingFocus}
                outgoingFocus={state.outgoingFocus}
                setCurrentFocus={dispatch}
                setDisplayImageProps={setDisplayImageProps}
            />
            <PictureElementExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                incomingFocus={state.incomingFocus}
                outgoingFocus={state.outgoingFocus}
                setCurrentFocus={dispatch}
            />
            <div aria-atomic="true" aria-live="assertive">
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

export default Index;
