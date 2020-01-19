import React, { useCallback, useState } from "react";
import { useImmer } from "use-immer";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import ImageForm from "../components/ImageForm";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import GraphQlExplorer from "../components/GraphQlExplorer";
import { Messages } from "../fixtures/AttributeMessages";
import {
    PictureFieldType,
    FormFieldType,
    QueryFieldType,
    DisplayImageProps,
    SourceImageProps
} from "../types/types";
import { PictureElementExplorer } from "../components/PictureElementExplorer";

export const emptyDisplayParams = ({} as unknown) as DisplayImageProps;

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
                        fixed {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        }
    `);
    const img = imageData.allFile.nodes[0].childImageSharp;
    const [selected, setSelected] = useState<
        PictureFieldType | QueryFieldType | FormFieldType | undefined
    >(undefined);
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

    return (
        <Layout>
            <PageHeader heading="Gatsby image visualiser">
                <>
                    <p>
                        This tool is to help understand the moving parts of the
                        gatsby-image-sharp queries and the gatsby-image output.
                        It aims to address 2 areas of difficulty when using the
                        awesome Gatsby image (and image-sharp) libraries:
                    </p>
                    <ol>
                        <li>
                            Writing the GraphQL query to get the image you want
                        </li>
                        <li>
                            Understanding which parts of the query have which
                            results; especially in regards to the number of
                            images that one might inadvertantly end up
                            processing when we build.
                        </li>
                    </ol>
                    <p>
                        It is still a work in progress and any useful addition
                        suggestions are welcome
                    </p>
                </>
            </PageHeader>
            <ImageForm
                sourceImageProps={sourceImageProps}
                updateSourceImageProps={updateSourceImageProps}
                incomingFocus={selected}
                setCurrentFocus={setSelected}
            />
            <GraphQlExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                incomingFocus={selected}
                setCurrentFocus={setSelected}
                setDisplayImageProps={setDisplayImageProps}
            />
            <PictureElementExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
                incomingFocus={selected}
                setCurrentFocus={setSelected}
            />
            <div aria-atomic="true" aria-live="assertive">
                Message {selected}: {selected && Messages[selected]}
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
