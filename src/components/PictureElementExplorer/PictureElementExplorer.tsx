import React, { useState, useCallback } from "react";

import {
    DisplayImageProps,
    SourceImageProps,
    PictureFieldType,
    QueryFieldType,
    FormFieldType,
    AlignedImageProps
} from "../../types/types";

import styles from "./PictureElementExplorer.module.css";

const formatSizes = (width: number): string =>
    `(max-width: ${width}) 100vw, ${width}`;

const formatSrcset = (
    arr: number[],
    type = "No source image data"
): string[] => {
    return arr.reduce(
        (acc, width) => [
            ...acc,
            `/path/to/images/${width}/image.${type} ${width}w`
        ],
        [] as string[]
    );
};

const calculatePossibleBreakpoints = (
    arr: Array<string | number>,
    baseWidth: number,
    width: string | number | null
): number[] => {
    let lastNumberStr = false;

    if (!width) {
        return [] as number[];
    }

    return arr.reduce((acc, bp: string | number, index: number) => {
        const breakPoint: number = ((bp as unknown) as number) * 1;

        if (breakPoint < width) {
            acc.push(breakPoint);

            if (
                breakPoint < baseWidth &&
                index + 1 < arr.length &&
                arr[index + 1] > baseWidth
            ) {
                acc.push(baseWidth);
            }

            return acc;
        }

        if (!lastNumberStr) {
            acc.push(((width as unknown) as number) * 1);
            lastNumberStr = true;
        }

        return acc;
    }, [] as number[]);
};

const defaultBreakPoints = (displayImageBreakPoints: string): string[] =>
    displayImageBreakPoints
        ? displayImageBreakPoints.split(", ")
        : ["800", "1200", "1600"]; // double check this when image output works

const formatSrc = (width: number, type = "jpg"): string =>
    `/path/to/images/${width}/image.${type}`;

const associateQueryToSelection = {
    // display parameters
    MAXWIDTH: ["srcSet", "sizes", "width", "spacer"],
    MAXHEIGHT: ["spacer", "height"],
    DISPLAYTYPE: ["srcSet", "sizes", "spacer"],
    QUALITY: [],
    IMGBG: [],
    FIT: [],
    BRKPNTS: ["srcSet", "sizes"],
    FRAGMENT: ["source", "spacer", "src"],
    // Source image parameters
    SOURCEWIDTH: ["width", "srcSet", "sizes", "spacer"],
    SOURCEHEIGHT: ["height", "spacer"],
    SOURCETYPE: ["src"],
    SOURCENAME: ["src"],
    // Element fields
    SRC: ["src"],
    SRCSET: ["srcSet"],
    SPACER: ["spacer"],
    SIZES: ["sizes"],
    SOURCE: ["source"],
    WIDTH: ["width"],
    HEIGHT: ["height"]
};

// eslint-disable-next-line complexity
const alignDisplayImageProps = (
    displayImageProps: DisplayImageProps,
    sourceImageProps: SourceImageProps
): AlignedImageProps => {
    // @TODO: either use the image-sharp heal method or check this against it
    const imgProps: AlignedImageProps = ({} as unknown) as AlignedImageProps;

    const defaultWidth = displayImageProps.displayType === "fixed" ? 600 : 800;
    imgProps.width = Math.min(
        displayImageProps?.maxWidth || defaultWidth,
        sourceImageProps?.width || defaultWidth
    );

    imgProps.height =
        displayImageProps.maxHeight && sourceImageProps.height
            ? Math.min(displayImageProps.maxHeight, sourceImageProps.height)
            : undefined;

    imgProps.displayImageBreakpoints = calculatePossibleBreakpoints(
        defaultBreakPoints(displayImageProps.displayBreakpoints),
        displayImageProps?.maxWidth || defaultWidth,
        sourceImageProps?.width
    );
    imgProps.displayImageType = displayImageProps?.displayType || "fixed";
    imgProps.fit = displayImageProps?.fit || "cover";
    imgProps.imageBackground =
        displayImageProps?.imageBackground || "rgba(0, 0, 0, 0,)";
    imgProps.quality = displayImageProps?.quality || 50;

    return imgProps;
};

// @TODO: add width and height processing to div
// @TODO: real source output
const gatbyImageStrings = {
    wrapStart: `<div className="gatsby-image-wrapper">`,
    spacerDiv: `<div style="width: 100%; padding-bottom: ###"></div>`,
    pictureStart: `<picture>`,
    pictureClose: `</picture>`,
    wrapClose: `</div>`,
    sourcePlaceholder: `<source ... />`
};

interface Props extends React.HTMLAttributes<HTMLElement> {
    displayImageProps: DisplayImageProps;
    sourceImageProps: SourceImageProps;
    incomingFocus:
        | PictureFieldType
        | QueryFieldType
        | FormFieldType
        | undefined;
    setCurrentFocus: (field: PictureFieldType) => void;
}

// eslint-disable-next-line complexity
export const PictureElementExplorer: React.FC<Props> = props => {
    const {
        displayImageProps,
        sourceImageProps,
        incomingFocus,
        setCurrentFocus
    } = props;
    const [selected] = useState<Array<string | undefined> | undefined>(
        incomingFocus ? associateQueryToSelection[incomingFocus] : undefined
    );
    const alignedProps = alignDisplayImageProps(
        displayImageProps,
        sourceImageProps
    );
    const sizes = formatSizes(alignedProps.width);
    const srcSet = formatSrcset(
        alignedProps.displayImageBreakpoints,
        sourceImageProps.fileType
    );
    const src = formatSrc(alignedProps.width, sourceImageProps.fileType);

    const setFocus = useCallback(
        (queryFieldType: PictureFieldType) => () => {
            setCurrentFocus(queryFieldType);
        },
        [setCurrentFocus]
    );

    const getButtonAction = useCallback(
        (param: PictureFieldType): (<T>(event: T) => void) | undefined => {
            return setFocus(param);
        },
        [setFocus]
    );

    const checkFocus = (fieldType: string): boolean | undefined =>
        selected?.includes(fieldType);

    const aspectRatio =
        sourceImageProps.width && sourceImageProps.height
            ? `${100 / (sourceImageProps.width / sourceImageProps.height)}%`
            : "No source image data";

    // @todo: put in the <source> elements based on the gatsby query
    // @todo: put in the lowsource image 64bit or svg
    return (
        <pre>
            {gatbyImageStrings.wrapStart}
            <button
                onFocus={getButtonAction("SPACER")}
                onClick={getButtonAction("SPACER")}
                className={
                    checkFocus("spacer") ? styles.selected : styles.elementTerm
                }
            >
                {gatbyImageStrings.spacerDiv.replace("###", aspectRatio)}
            </button>
            {gatbyImageStrings.pictureStart}
            {gatbyImageStrings.sourcePlaceholder}
            {`<img 
            `}
            <button
                onFocus={getButtonAction("SRCSET")}
                onClick={getButtonAction("SRCSET")}
                className={
                    checkFocus("srcset") ? styles.selected : styles.elementTerm
                }
            >{`srcSet="${srcSet.join(", ")}"`}</button>
            {` 
            `}
            <button
                onFocus={getButtonAction("SRC")}
                onClick={getButtonAction("SRC")}
                className={
                    checkFocus("src") ? styles.selected : styles.elementTerm
                }
            >{`src="${src}"`}</button>
            {` 
            `}
            alt=""
            {` 
            `}
            <button
                onFocus={getButtonAction("SIZES")}
                onClick={getButtonAction("SIZES")}
                className={
                    checkFocus("sizes") ? styles.selected : styles.elementTerm
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
