import React from "react";
import {
    SourceImageProps,
    PictureFieldType,
    QueryFieldType,
    FormFieldType
} from "../../types/types";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    incomingFocus:
        | PictureFieldType
        | QueryFieldType
        | FormFieldType
        | undefined;
    setCurrentFocus: (
        f: PictureFieldType | QueryFieldType | FormFieldType | undefined
    ) => void;
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
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const setImage = React.useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const target: HTMLInputElement = event.nativeEvent
                .target as HTMLInputElement;

            const files: FileList | null = target?.files;
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

                            // @todo: may wish to use this for making a live image example
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

            if (files?.length) {
                const imageInfo = await getInfoFromUpload(files[0]);

                updateSourceImageProps((draft: SourceImageProps) => {
                    draft.width = imageInfo.width;
                    draft.height = imageInfo.height;
                    draft.fileType = imageInfo.fileType;
                    draft.name = imageInfo.name;
                });
            }
        },
        [updateSourceImageProps]
    );

    return (
        <form>
            <fieldset>
                <legend>Your image</legend>
                <p>
                    This is used to calculate information about your image that
                    would normally be done by Gatsby's infrastructure. No need
                    to worry, it will not leave your computer.
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
                <h3>About your image</h3>
                <dl>
                    <dt>Name:</dt>
                    <dd>{sourceImageProps.name}</dd>
                    <dt>Width:</dt>
                    <dd>{sourceImageProps.width}</dd>
                    <dt>Height:</dt>
                    <dd>{sourceImageProps.height}</dd>
                    <dt>File type:</dt>
                    <dd>{sourceImageProps.fileType}</dd>
                </dl>
            </fieldset>
            <canvas ref={canvasRef} />
        </form>
    );
};
export default ImageForm;
