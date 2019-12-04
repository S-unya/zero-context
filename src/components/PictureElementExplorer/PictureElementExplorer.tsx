/** @jsx jsx */
import * as React from "react";
import jsx from "theme-ui";
import { DisplayImageProps, SourceImageProps } from "../../pages/index";

import { activePreButton, preButton, secondaryPreButton } from "../../theme";
import { QueryFieldType } from "../GraphQlExplorer/GraphQlExplorer";
import { FormFieldType } from "../ImageForm/ImageForm";

export enum PictureFieldType {
    "DISPLAYTYPE" = "displayType",
    "FIT" = "fit",
    "SPACER" = "spacer",
    "SRC" = "src",
    "SRCSET" = "srcSet",
    "SIZES" = "sizes"
}

export interface AlignedImageProps {
    displayImageBreakpoints: number[];
    displayImageType: string;
    fit: string;
    height: number | undefined;
    imageBackground: string;
    quality: number;
    width: number;
}

const formatSizes = (width: number): string =>
    `(max-width: ${width}) 100vw, ${width}`;

const formatSrcset = (arr: number[], type: string): string[] => {
    return arr.reduce(
        (acc, width: number) => [
            ...acc,
            `/path/to/images/${width}/image.${type} ${width}w`
        ],
        []
    );
};

const calculatePossibleBreakpoints = (
    arr: number[],
    baseWidth: number,
    width: string | number
): number[] => {
    let lastNumberStr: boolean = false;

    return arr.reduce((acc, bp: string | number, index: number) => {
        if (((bp as unknown) as number) * 1 < width) {
            acc.push(bp);

            if (
                bp < baseWidth &&
                index + 1 < arr.length &&
                arr[index + 1] > baseWidth
            ) {
                acc.push(baseWidth);
            }

            return acc;
        }

        if (!lastNumberStr) {
            acc.push(width);
            lastNumberStr = true;
        }

        return acc;
    }, []);
};

const defaultBreakPoints = (displayImageBreakPoints): number[] =>
    displayImageBreakPoints
        ? displayImageBreakPoints.split(", ")
        : [800, 1200, 1600]; // double check this when image output works

const formatSrc = (width: number, type = "jpg"): string =>
    `/path/to/images/${width}/image.${type}`;

interface Props extends React.HTMLAttributes<HTMLElement> {
    displayImageProps: DisplayImageProps;
    sourceImageProps: SourceImageProps;
    outgoingFocus: (
        | PictureFieldType
        | QueryFieldType
        | FormFieldType
        | undefined
    )[];
    incomingFocus: (
        | PictureFieldType
        | QueryFieldType
        | FormFieldType
        | undefined
    )[];
    setCurrentFocus: (field: PictureFieldType) => void;
}

const alignDisplayImageProps = (
    displayImageProps: DisplayImageProps,
    sourceImageProps: SourceImageProps
): AlignedImageProps => {
    const imgProps = {} as AlignedImageProps;

    imgProps.width = Math.min(
        displayImageProps.maxWidth,
        sourceImageProps.width
    );
    imgProps.height = Math.min(
        displayImageProps.maxHeight,
        sourceImageProps.height
    );
    imgProps.displayImageBreakpoints = calculatePossibleBreakpoints(
        defaultBreakPoints(displayImageProps.displayBreakpoints),
        displayImageProps.maxWidth || 800,
        sourceImageProps.width
    );
    imgProps.displayImageType = displayImageProps.displayType;
    imgProps.fit = displayImageProps.fit;
    imgProps.imageBackground =
        displayImageProps.imageBackground || "rgba(0, 0, 0, 0,)";
    imgProps.quality = displayImageProps.quality || 50;

    return imgProps;
};

const gatbyImageStrings = {
    wrapStart: `<div className="gatsby-image-wrapper">`,
    spacerDiv: `<div style="width: 100%; padding-bottom: ###"></div>`,
    pictureStart: `<picture>`,
    pictureClose: `</picture>`,
    wrapClose: `</div>`,
    sourcePlaceholder: `<source ... />`
};

export const PictureElementExplorer: React.FC<Props> = props => {
    const {
        displayImageProps,
        sourceImageProps,
        incomingFocus,
        outgoingFocus,
        setCurrentFocus
    } = props;
    const alignedProps = alignDisplayImageProps(
        displayImageProps,
        sourceImageProps
    );
    const sizes = formatSizes(alignedProps.width);
    const srcSet = formatSrcset(
        alignedProps.displayImageBreakpoints,
        sourceImageProps.type
    );
    const src = formatSrc(alignedProps.width, sourceImageProps.type);

    const setSrcsetFocus = (): void => {
        setCurrentFocus(PictureFieldType.SRCSET);
    };
    const setSrcFocus = (): void => {
        setCurrentFocus(PictureFieldType.SRC);
    };
    const setSizesFocus = (): void => {
        setCurrentFocus(PictureFieldType.SIZES);
    };
    const setSpacerFocus = (): void => {
        setCurrentFocus(PictureFieldType.SPACER);
    };

    const checkFocus = (
        fieldType: PictureFieldType,
        focusArray: (PictureFieldType | undefined)[]
    ): boolean => focusArray.some(val => val === fieldType);

    // @todo: put in the <source> elements based on the gatsby query
    // @todo: put in the lowsource image 64bit or svg
    return (
        <pre>
            {gatbyImageStrings.wrapStart}
            <button
                onFocus={setSpacerFocus}
                onClick={setSpacerFocus}
                sx={
                    checkFocus(PictureFieldType.FIT, outgoingFocus)
                        ? activePreButton
                        : checkFocus(PictureFieldType.FIT, incomingFocus)
                        ? secondaryPreButton
                        : preButton
                }
            >
                {gatbyImageStrings.spacerDiv.replace(
                    "###",
                    `${100 /
                        (sourceImageProps.width / sourceImageProps.height)}%`
                )}
            </button>
            {gatbyImageStrings.pictureStart}
            {gatbyImageStrings.sourcePlaceholder}
            {`<img 
            `}
            <button
                onFocus={setSrcsetFocus}
                onClick={setSrcsetFocus}
                tabIndex={0}
                sx={
                    checkFocus(PictureFieldType.SRCSET, outgoingFocus)
                        ? activePreButton
                        : checkFocus(PictureFieldType.SRCSET, incomingFocus)
                        ? secondaryPreButton
                        : preButton
                }
            >{`srcSet="${srcSet.join(", ")}"`}</button>
            {` 
            `}
            <button
                onFocus={setSrcFocus}
                onClick={setSrcFocus}
                tabIndex={0}
                sx={
                    checkFocus(PictureFieldType.SRC, outgoingFocus)
                        ? activePreButton
                        : checkFocus(PictureFieldType.SRC, incomingFocus)
                        ? secondaryPreButton
                        : preButton
                }
            >{`src="${src}"`}</button>
            {` 
            `}
            alt=""
            {` 
            `}
            <button
                onFocus={setSizesFocus}
                onClick={setSizesFocus}
                tabIndex={0}
                sx={
                    checkFocus(PictureFieldType.SIZES, outgoingFocus)
                        ? activePreButton
                        : checkFocus(PictureFieldType.SIZES, incomingFocus)
                        ? secondaryPreButton
                        : preButton
                }
            >{`sizes="${sizes}"`}</button>
            {` loading="lazy" 
        />
    `}
            {gatbyImageStrings.pictureClose}
            {gatbyImageStrings.wrapClose}
        </pre>
    );
};
export default PictureElementExplorer;

/*
fluid(
                    maxWidth: 1400
                    srcSetBreakpoints: [720, 1024, 1400]
                    quality: 75
                    toFormat: JPG
                ) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                }

<div class=" gatsby-image-wrapper" style="position: relative; overflow: hidden;">
<div style="width: 100%; padding-bottom: 58.5714%;"></div>
<img src="data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAMABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDBP/EABYBAQEBAAAAAAAAAAAAAAAAAAMAAv/aAAwDAQACEAMQAAABzRecgOYX/8QAGxAAAgMAAwAAAAAAAAAAAAAAAQIAERMSIjL/2gAIAQEAAQUCzXLiCfMdjSt2qf/EABgRAAIDAAAAAAAAAAAAAAAAAAABAhIi/9oACAEDAQE/AY6RU//EABYRAAMAAAAAAAAAAAAAAAAAAAEQIf/aAAgBAgEBPwExf//EAB8QAAEDAwUAAAAAAAAAAAAAAAEAESECEEESIjFxgf/aAAgBAQAGPwLURPaAO18um59RpxKpgW//xAAbEAEAAwEAAwAAAAAAAAAAAAABABEhMUFxgf/aAAgBAQABPyE+XgxDLiFtpoDj5TiFXE6r+yNm5//aAAwDAQACAAMAAAAQJz//xAAcEQABAwUAAAAAAAAAAAAAAAABABEhMWHB0fD/2gAIAQMBAT8QNwm/UQgGxpf/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAIAQIBAT8QGslv/8QAGhABAQADAQEAAAAAAAAAAAAAAREAITFBUf/aAAgBAQABPxAKcs3jHKuS6ZVVB9nuFJeCxF7PMEmhCYa3udxl4CAVJebwmXq6+bc//9k=" alt="" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; object-position: center center; opacity: 0; transition-delay: 500ms;">
<picture>
<source type="image/webp" srcset="/static/88758e0856afc6bf6126e93288d75d01/a213b/header.webp 600w,
/static/88758e0856afc6bf6126e93288d75d01/240ac/header.webp 800w,
/static/88758e0856afc6bf6126e93288d75d01/266a9/header.webp 1024w,
/static/88758e0856afc6bf6126e93288d75d01/d404e/header.webp 1400w" sizes="(max-width: 1400px) 100vw, 1400px">
<source srcset="/static/88758e0856afc6bf6126e93288d75d01/897d1/header.jpg 600w,
/static/88758e0856afc6bf6126e93288d75d01/57238/header.jpg 800w,
/static/88758e0856afc6bf6126e93288d75d01/e376d/header.jpg 1024w,
/static/88758e0856afc6bf6126e93288d75d01/be4cd/header.jpg 1400w" sizes="(max-width: 1400px) 100vw, 1400px">
<img sizes="(max-width: 1400px) 100vw, 1400px" srcset="/static/88758e0856afc6bf6126e93288d75d01/897d1/header.jpg 600w,
/static/88758e0856afc6bf6126e93288d75d01/57238/header.jpg 800w,
/static/88758e0856afc6bf6126e93288d75d01/e376d/header.jpg 1024w,
/static/88758e0856afc6bf6126e93288d75d01/be4cd/header.jpg 1400w" src="/static/88758e0856afc6bf6126e93288d75d01/be4cd/header.jpg" alt="" loading="lazy" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; object-position: center center; opacity: 1; transition: opacity 500ms ease 0s;">
</picture>

<noscript>
<picture>
<source type='image/webp' srcset="/static/88758e0856afc6bf6126e93288d75d01/a213b/header.webp 600w,
/static/88758e0856afc6bf6126e93288d75d01/240ac/header.webp 800w,
/static/88758e0856afc6bf6126e93288d75d01/266a9/header.webp 1024w,
/static/88758e0856afc6bf6126e93288d75d01/d404e/header.webp 1400w" sizes="(max-width: 1400px) 100vw, 1400px" /><source srcset="/static/88758e0856afc6bf6126e93288d75d01/897d1/header.jpg 600w,
/static/88758e0856afc6bf6126e93288d75d01/57238/header.jpg 800w,
/static/88758e0856afc6bf6126e93288d75d01/e376d/header.jpg 1024w,
/static/88758e0856afc6bf6126e93288d75d01/be4cd/header.jpg 1400w" sizes="(max-width: 1400px) 100vw, 1400px" />
<img loading="lazy" sizes="(max-width: 1400px) 100vw, 1400px" srcset="/static/88758e0856afc6bf6126e93288d75d01/897d1/header.jpg 600w,
/static/88758e0856afc6bf6126e93288d75d01/57238/header.jpg 800w,
/static/88758e0856afc6bf6126e93288d75d01/e376d/header.jpg 1024w,
/static/88758e0856afc6bf6126e93288d75d01/be4cd/header.jpg 1400w" src="/static/88758e0856afc6bf6126e93288d75d01/be4cd/header.jpg" alt="" style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/>
</picture></noscript>
</div>
*/
