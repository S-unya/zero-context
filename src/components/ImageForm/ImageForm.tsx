import React from "react";
import { SourceImageProps } from "../../pages";

export enum FormFieldType {
    "SOURCEWIDTH" = "sourceImageWidth",
    "SOURCEHEIGHT" = "sourceImageHeight",
    "SOURCETYPE" = "sourceImageType",
    "SOURCENAME" = "sourceImageName"
}

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    sourceImageProps: SourceImageProps;
    updateSourceImageProps: (
        f: (draft: SourceImageProps) => void | SourceImageProps
    ) => void;
}

// @TODO: add fragments support
export const ImageForm: React.FC<Props> = ({
    sourceImageProps,
    updateSourceImageProps
}) => {
    const canvasRef = React.useRef<undefined | HTMLCanvasElement>();

    const setImage = React.useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const target: HTMLInputElement = event.nativeEvent
                .target as HTMLInputElement;
            const files: FileList =
                typeof target.files !== "undefined" && target.files;
            const getInfoFromUpload = (
                file: File
            ): Promise<SourceImageProps> => {
                return new Promise((resolve, reject) => {
                    try {
                        const imageProps: SourceImageProps = {
                            name: file.name,
                            fileType: file.type.replace("image/", ""),
                            width: null,
                            height: null
                        };
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = () => {
                            const img = new Image();

                            // @todo: may wish to save this for making a real image example
                            img.src = fileReader.result as string;
                            imageProps.width = img.width;
                            imageProps.height = img.height;

                            resolve(imageProps);
                        };
                    } catch (err) {
                        reject(err);
                    }
                });
            };

            if (files.length) {
                const imageInfo = await getInfoFromUpload(files[0]);

                updateSourceImageProps((draft: SourceImageProps) => {
                    draft.width = imageInfo.width;
                    draft.height = imageInfo.height;
                    draft.fileType = imageInfo.fileType;
                    draft.name = imageInfo.name;
                });
            }
        },
        []
    );

    return (
        <form>
            <fieldset>
                <legend>Your image</legend>
                <p>
                    This is used to get information about your image. It stays
                    on your computer.
                </p>
                <div className="input-wrap">
                    <label htmlFor="source-image">
                        Your hi-res source image:
                    </label>{" "}
                    <input
                        type="file"
                        id="source-image"
                        onChange={setImage}
                        accept="image/png, image/jpg, image/webp"
                    />{" "}
                </div>
                <table>
                    <tr>
                        <th>Name:</th>
                        <td>{sourceImageProps.name}</td>
                    </tr>
                    <tr>
                        <th>Width:</th>
                        <td>{sourceImageProps.width}</td>
                    </tr>
                    <tr>
                        <th>Height:</th>
                        <td>{sourceImageProps.height}</td>
                    </tr>
                    <tr>
                        <th>File type:</th>
                        <td>{sourceImageProps.fileType}</td>
                    </tr>
                </table>
            </fieldset>
            <canvas ref={canvasRef} />
        </form>
    );
};
export default ImageForm;
