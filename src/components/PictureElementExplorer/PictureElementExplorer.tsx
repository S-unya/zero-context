import * as React from "react";
import { DisplayImageProps, SourceImageProps } from "../../pages";

const calculateSizes = ({ maxWidth }: DisplayImageProps): string => {
    return `(max-width: ${maxWidth || "800px"}) 100vw, ${maxWidth || "800px"}`;
};
const calculateSrcSet = (
    { displayBreakpoints, maxWidth, displayType },
    { width }
): [string, string][] => {
    // this is only for fluid so far
    const baseWidth = maxWidth || 800;
    const breakPoints = displayBreakpoints.split(", ");
    let srcSet;
    let lastNumberStr: boolean = false;

    if (breakPoints.length) {
        srcSet = breakPoints.reduce((acc, bp: string) => {
            if (((bp as unknown) as number) * 1 < width) {
                acc.push(`/static/path/to/image.jpg ${bp}w`);
            }

            if (!lastNumberStr) {
                acc.push(`/static/path/to/image.jpg ${width}w`);
                lastNumberStr = true;
            }

            return acc;
        }, []);
    }

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
}

export const PictureElementExplorer: React.FC<Props> = props => {
    const { displayImageProps, sourceImageProps } = props;
    const sizes = calculateSizes(displayImageProps);
    const srcSet = calculateSrcSet(displayImageProps, sourceImageProps);
    const src = calculateSrc(srcSet, displayImageProps);

    return (
        <pre>
            {`
<div className="gatsby-image-wrapper">
    <picture>
        <source /><!-- todo -->
        <img
            srcSet="${srcSet.join(", ")}"
            src="${src}"
            alt=""
            sizes="${sizes}"
        />
    </picture>
</div>`}
        </pre>
    );
};
export default PictureElementExplorer;
