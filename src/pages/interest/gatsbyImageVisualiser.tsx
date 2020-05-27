import React, { useCallback, useState } from "react";
import { useImmer } from "use-immer";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import ImageForm from "../../components/ImageForm";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import GraphQlExplorer from "../../components/GraphQlExplorer";
import { Messages } from "../../fixtures/AttributeMessages";
import {
    PictureFieldType,
    FormFieldType,
    QueryFieldType,
    DisplayImageProps,
    SourceImageProps
} from "../../types/types";
import { PictureElementExplorer } from "../../components/PictureElementExplorer";

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
        width: undefined,
        height: undefined,
        fileType: undefined,
        name: undefined
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
        <>
            <PageHeader />
            <Layout>
                <header>
                    <h1>Gatsby image visualisation tool</h1>
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
                            results; especially in regard to the number of
                            images that one might inadvertantly end up
                            processing when we build.
                        </li>
                    </ol>
                    <p>
                        It is still a work in progress and any useful addition
                        suggestions are welcome
                    </p>
                </header>
                <ImageForm
                    sourceImageProps={sourceImageProps}
                    displayImageProps={displayImageProps}
                    updateSourceImageProps={updateSourceImageProps}
                    updateDisplayImageProps={setDisplayImageProps}
                    incomingFocus={selected}
                    setCurrentFocus={setSelected}
                />
                <div aria-atomic="true" aria-live="polite" className="section">
                    <header>
                        <h2>Information</h2>
                        <p>
                            Select elements from any of the areas to find out
                            about them.
                        </p>
                        <h3 className="cssCapitalise">{selected}</h3>
                    </header>{" "}
                    {selected && Messages[selected]}
                </div>
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

                {img && img.fixed ? (
                    <Image fixed={img.fixed} />
                ) : img && img.fluid ? (
                    <Image fluid={img.fluid} />
                ) : null}
            </Layout>
        </>
    );
};

export default Index;