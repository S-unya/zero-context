import * as React from "react";
import { useImmer } from "use-immer";

import { ImageForm } from "../components/ImageForm";
import { Layout } from "../components/Layout";
import GraphQlExplorer from "../components/GraphQlExplorer/GraphQlExplorer";
import PictureElementExplorer from "../components/PictureElementExplorer/PictureElementExplorer";

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

export default () => {
    const [sourceImageProps, updateSourceImageProps] = useImmer<
        SourceImageProps
    >({
        width: null,
        height: null,
        type: null
    } as SourceImageProps);
    const [displayImageProps, updateDisplayImageProps] = useImmer<
        DisplayImageProps
    >({
        maxWidth: null,
        maxHeight: null,
        displayType: null,
        quality: 50,
        fit: "cover",
        imageBackground: "rgba(0, 0, 0, 0)",
        displayBreakpoints: "800"
    } as DisplayImageProps);

    return (
        <Layout>
            <ImageForm
                sourceImageProps={sourceImageProps}
                displayImageProps={displayImageProps}
                updateDisplayImageProps={updateDisplayImageProps}
                updateSourceImageProps={updateSourceImageProps}
            />
            <GraphQlExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
            />
            <PictureElementExplorer
                displayImageProps={displayImageProps}
                sourceImageProps={sourceImageProps}
            />
        </Layout>
    );
};
