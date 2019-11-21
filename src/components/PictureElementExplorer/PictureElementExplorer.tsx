import * as React from "react";
import { DisplayImageProps, SourceImageProps, FieldType } from "../../pages";

const calculateSizes = ({ maxWidth }: DisplayImageProps): string => {
    return `(max-width: ${maxWidth || "800px"}) 100vw, ${maxWidth || "800px"}`;
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

export const PictureElementExplorer: React.FC<Props> = props => {
    const {
        displayImageProps,
        sourceImageProps,
        currentFocus,
        setCurrentFocus
    } = props;
    const sizes = calculateSizes(displayImageProps);
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
            &lt;div className="gatsby-image-wrapper"&gt;
            {`
    `}
            &lt;picture&gt;
            {`
        `}
            &lt;img{` `}
            <span onFocus={setSrcsetFocus}>{`srcSet="${srcSet.join(
                ", "
            )}"`}</span>{" "}
            <span onFocus={setSrcFocus}>{`src="${src}"`}</span> alt=""{" "}
            <span onFocus={setSizesFocus}>{`sizes="${sizes}"`}</span> /&gt;
            {`
    `}{" "}
            &lt;/picture&gt;
            {`
`}
            &lt;/div&gt;
        </pre>
    );
};
export default PictureElementExplorer;
