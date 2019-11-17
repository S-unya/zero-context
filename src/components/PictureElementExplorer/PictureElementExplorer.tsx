import * as React from "react";
import { DisplayImageProps, SourceImageProps } from "../../pages";

const calculateSizes = ({ maxWidth }: DisplayImageProps): string => {
    return `(max-width: ${maxWidth}) 100vw, ${maxWidth}`;
};
const calculateSrcSet = (
    displayImageProps: DisplayImageProps,
    sourceImageProps: SourceImageProps
): [string, string][] => {
    const srcSet = [];

    return srcSet;
};
const calculateSrc = (
    srcSet: [string, string][],
    sourceImageProps: SourceImageProps
): string => {
    let src = "";

    return src;
};
interface Props extends React.HTMLAttributes<HTMLElement> {
    displayImageProps: DisplayImageProps;
    sourceImageProps: SourceImageProps;
}

export const PictureElementExplorer: React.FC<Props> = ({
    displayImageProps: DisplayImageProps,
    sourceImageProps: SourceImageProps
}) => {
    const sizes = calculateSizes(displayImageProps);
    const srcSet = calculateSrcSet(displayImageProps, sourceImageProps);
    const src = calculateSrc(srcSet, displayImageProps);

    return (
        <code>
            <div className="gatsby-image-wrapper">
                <picture>
                    <source />
                    <img
                        srcSet={srcSet
                            .map(resourceData => {
                                return resourceData.join(" ");
                            })
                            .join(", ")}
                        src={src}
                        alt=""
                        sizes={sizes}
                    />
                </picture>
            </div>
        </code>
    );
};
export default PictureElementExplorer;
