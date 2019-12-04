import * as React from "react";
import { SourceImageProps, DisplayImageProps } from "../../pages";

export enum FormFieldType {
    // display parameters
    "MAXWIDTH" = "maxWidth",
    "MAXHEIGHT" = "maxHeight",
    "DISPLAYTYPE" = "displayType",
    "QUALITY" = "quality",
    "IMGBG" = "imageBackground",
    "FIT" = "fit",
    "BRKPNTS" = "displayBreakpoints",
    // Source image parameters
    "SOURCEWIDTH" = "sourceImageWidth",
    "SOURCEHEIGHT" = "sourceImageHeight",
    "SOURCETYPE" = "sourceImageType"
}

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    sourceImageProps: SourceImageProps;
    displayImageProps: DisplayImageProps;
    updateSourceImageProps: (
        f: (draft: SourceImageProps) => void | SourceImageProps
    ) => void;
    updateDisplayImageProps: (
        f: (draft: DisplayImageProps) => void | DisplayImageProps
    ) => void;
    currentFocus: FieldType;
}

// @TODO: add fragments support
export const ImageForm: React.FC<Props> = ({
    sourceImageProps,
    displayImageProps,
    updateDisplayImageProps,
    updateSourceImageProps,
    currentFocus
}) => {
    function setImageType(event: React.ChangeEvent<HTMLSelectElement>) {
        updateSourceImageProps((draft: SourceImageProps) => {
            const type = event.currentTarget.value;

            draft.type = type;
        });
    }
    function setImageWidth(event: React.ChangeEvent<HTMLInputElement>) {
        updateSourceImageProps((draft: SourceImageProps) => {
            const width = parseInt(event.target.value, 10);

            draft.width = width;
        });
    }
    function setImageHeight(event: React.ChangeEvent<HTMLInputElement>) {
        updateSourceImageProps((draft: SourceImageProps) => {
            const height = parseInt(event.target.value, 10);

            draft.height = height;
        });
    }
    function setImageDisplayType(event: React.ChangeEvent<HTMLInputElement>) {
        const type: "fluid" | "fixed" | undefined = event.target.value as
            | "fluid"
            | "fixed"
            | undefined;

        updateDisplayImageProps((draft: DisplayImageProps) => {
            draft.displayType = type;
        });
    }
    function setDisplayImageWidth(event: React.ChangeEvent<HTMLInputElement>) {
        const width = parseInt(event.target.value, 10);

        updateDisplayImageProps((draft: DisplayImageProps) => {
            draft.maxWidth = width;
        });
    }
    function setDisplayImageHeight(event: React.ChangeEvent<HTMLInputElement>) {
        const height = parseInt(event.target.value, 10);

        updateDisplayImageProps((draft: DisplayImageProps) => {
            draft.maxHeight = height;
        });
    }
    function setDisplayImageQuality(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const quality = parseInt(event.target.value, 10);

        updateDisplayImageProps((draft: DisplayImageProps) => {
            draft.quality = quality;
        });
    }
    function setDisplayImageFit(event: React.ChangeEvent<HTMLInputElement>) {
        updateDisplayImageProps((draft: DisplayImageProps) => {
            const fit = event.target.value;

            draft.fit = fit;
        });
    }
    function setDisplayImageBreakpoints(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const displayBreakpoints = event.target.value;

        updateDisplayImageProps((draft: DisplayImageProps) => {
            draft.displayBreakpoints = displayBreakpoints;
        });
    }

    const outPutImageTypeFields = () => {
        if (!displayImageProps.displayType) {
            return null;
        }

        const baseProperties = (
            <div key="base-props">
                <div className="input-wrap">
                    <label htmlFor="image-width">Display width</label>{" "}
                    <input
                        type="number"
                        value={displayImageProps.maxWidth || ""}
                        onChange={setDisplayImageWidth}
                        placeholder="800"
                    />
                </div>
                <div className="input-wrap">
                    <label htmlFor="image-height">Display height</label>{" "}
                    <input
                        type="number"
                        value={displayImageProps.maxHeight || ""}
                        onChange={setDisplayImageHeight}
                    />
                </div>
                <div className="input-wrap">
                    <label htmlFor="image-quality">
                        Image compression quality
                    </label>{" "}
                    <input
                        type="number"
                        value={displayImageProps.quality || ""}
                        onChange={setDisplayImageQuality}
                        max="100"
                        min="0"
                        placeholder="50"
                    />
                </div>
            </div>
        );

        const fluidProperties = (
            <div key="fluid-props">
                <div className="input-wrap">
                    <label htmlFor="image-breakpoints">
                        Display image sizes (comma separated)
                    </label>{" "}
                    <input
                        type="text"
                        value={displayImageProps.displayBreakpoints || ""}
                        onChange={setDisplayImageBreakpoints}
                        placeholder="800"
                    />
                </div>
            </div>
        );

        return (
            <fieldset>
                {displayImageProps.displayType === "fixed"
                    ? baseProperties
                    : [baseProperties, fluidProperties]}
            </fieldset>
        );
    };

    return (
        <form>
            <fieldset>
                <legend>About your image</legend>
                <p>
                    These options are about your source image, they would
                    normally be read directly from the file by{" "}
                    <code>gatsby-plugin-sharp</code>
                </p>
                <div className="input-wrap">
                    <label htmlFor="source-image-width">Width in pixels:</label>{" "}
                    <input
                        type="number"
                        id="source-image-width"
                        value={sourceImageProps.width || ""}
                        onChange={setImageWidth}
                    />{" "}
                    <span>px</span>
                </div>
                <div className="input-wrap">
                    <label htmlFor="source-image-height">
                        height in pixels:
                    </label>{" "}
                    <input
                        type="number"
                        id="source-image-height"
                        value={sourceImageProps.height || ""}
                        onChange={setImageHeight}
                    />{" "}
                    <span>px</span>
                </div>
                <div className="input-wrap">
                    <label htmlFor="source-image-type">
                        Type of source image:
                    </label>{" "}
                    <select
                        id="source-image-type"
                        name="source-image-type"
                        onChange={setImageType}
                    >
                        <option value="">-- Choose --</option>
                        <option value="jpg">.jpg</option>
                        <option value="webp">.webp</option>
                    </select>
                </div>
                <p>maybe put a src here</p>
            </fieldset>
            <fieldset>
                <legend>How will the image display?</legend>
                <p>
                    These options are about how you want your image to display,
                    there is more help available for each field.
                </p>
                <div className="input-wrap">
                    <label htmlFor="image-type-fixed">
                        Fixed size (with appropriate images for hi-res screens):
                    </label>{" "}
                    <input
                        type="radio"
                        id="image-type-fixed"
                        name="image-type"
                        value="fixed"
                        checked={displayImageProps.displayType === "fixed"}
                        onChange={setImageDisplayType}
                    />
                    <br />
                    <label htmlFor="image-type-fluid">
                        Fluid size (adapts to the width of the screen):
                    </label>{" "}
                    <input
                        type="radio"
                        id="image-type-fluid"
                        name="image-type"
                        value="fluid"
                        checked={displayImageProps.displayType === "fluid"}
                        onChange={setImageDisplayType}
                    />
                    <div className="help">Some help here</div>
                </div>
            </fieldset>
            {outPutImageTypeFields()}
        </form>
    );
};
export default ImageForm;
