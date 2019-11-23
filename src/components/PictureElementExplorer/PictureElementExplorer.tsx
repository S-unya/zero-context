import * as React from "react";
import { DisplayImageProps, SourceImageProps, FieldType } from "../../pages";

const calculateSizes = (
    { maxWidth }: DisplayImageProps,
    { width }: SourceImageProps
): string => {
    const w = `${Math.min(maxWidth, width) || 800}px`;
    return `(max-width: ${w}) 100vw, ${w}`;
};
const outputSrcsSetFromArray = (
    arr: number[],
    baseWidth: number,
    width: string | number
): string[] => {
    let lastNumberStr: boolean = false;

    return arr.reduce((acc, bp: string | number, index: number) => {
        if (((bp as unknown) as number) * 1 < width) {
            acc.push(`/static/path/to/image.jpg ${bp}w`);

            if (
                bp < baseWidth &&
                index + 1 < arr.length &&
                arr[index + 1] > baseWidth
            ) {
                acc.push(`/static/path/to/image.jpg ${baseWidth}w`);
            }

            return acc;
        }

        if (!lastNumberStr) {
            acc.push(`/static/path/to/image.jpg ${width}w`);
            lastNumberStr = true;
        }

        return acc;
    }, []);
};

const calculateSrcSet = (
    { displayBreakpoints, maxWidth, displayType },
    { width }
): [string, string][] => {
    // this is only for fluid so far
    const baseWidth = maxWidth || 800;
    const breakPoints = displayBreakpoints
        ? displayBreakpoints.split(", ")
        : [800, 1200, 1600];
    let srcSet;

    srcSet = outputSrcsSetFromArray(breakPoints, baseWidth, width);

    return srcSet;
};
const calculateSrc = (
    srcSet: [string, string][],
    displayImageProps: DisplayImageProps
): string => {
    let src = "";

    return src;
};
interface Props extends React.HTMLAttributes<HTMLElement> {
    displayImageProps: DisplayImageProps;
    sourceImageProps: SourceImageProps;
    currentFocus: FieldType;
    setCurrentFocus: (field: FieldType) => void;
}

const gatsbyImagePre = `<div className="gatsby-image-wrapper">
    <picture>
        `;
const gatsbyImagePost = `
    </picture>
</div>`;
export const PictureElementExplorer: React.FC<Props> = props => {
    const {
        displayImageProps,
        sourceImageProps,
        currentFocus,
        setCurrentFocus
    } = props;
    const sizes = calculateSizes(displayImageProps, sourceImageProps);
    const srcSet = calculateSrcSet(displayImageProps, sourceImageProps);
    const src = calculateSrc(srcSet, displayImageProps);

    const setSrcsetFocus = (): void => {
        setCurrentFocus(FieldType.SRCSET);
    };
    const setSrcFocus = (): void => {
        setCurrentFocus(FieldType.SRC);
    };
    const setSizesFocus = (): void => {
        setCurrentFocus(FieldType.SIZES);
    };

    // Ugly :(
    return (
        <pre>
            {gatsbyImagePre}
            {`<img 
            `}
            <span onFocus={setSrcsetFocus} tabIndex={0}>{`srcSet="${srcSet.join(
                ", "
            )}"`}</span>
            {` 
            `}
            <span onFocus={setSrcFocus} tabIndex={0}>{`src="${src}"`}</span>
            {` 
            `}
            alt=""
            {` 
            `}
            <span
                onFocus={setSizesFocus}
                tabIndex={0}
            >{`sizes="${sizes}"`}</span>
            {` 
        />
    `}
            {gatsbyImagePost}
        </pre>
    );
};
export default PictureElementExplorer;
