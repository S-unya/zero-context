interface ParsedPath {
    /**
     * The root of the path such as '/' or 'c:\'
     */
    root: string;
    /**
     * The full directory path such as '/home/user/dir' or 'c:\path\dir'
     */
    dir: string;
    /**
     * The file name including extension (if any) such as 'index.html'
     */
    base: string;
    /**
     * The file extension (if any) such as '.html'
     */
    ext: string;
    /**
     * The file name without extension (if any) such as 'index'
     */
    name: string;
}

export interface FileNode extends ParsedPath {
    publicURL: string;
    id: string;
    children: any[];
    sourceInstanceName: string;
    absolutePath: string;
    relativePath: string;
    relativeDirectory: string;
    extension: string;
    size: number;
    prettySize: string;

    modifiedTime: string;
    accessTime: string;
    changeTime: string;
    birthTime: string;
    internal: {
        contentDigest: string;
        type: "Directory" | "File";
        mediaType?: string;
        description: string;
    };
}

export interface FixedObject {
    width: number;
    height: number;
    src: string;
    srcSet: string;
    base64?: string;
    tracedSVG?: string;
    srcWebp?: string;
    srcSetWebp?: string;
    media?: string;
}

export interface FluidObject {
    aspectRatio: number;
    src: string;
    srcSet: string;
    sizes: string;
    base64?: string;
    tracedSVG?: string;
    srcWebp?: string;
    srcSetWebp?: string;
    media?: string;
}
export interface ImageSharp extends Partial<FileNode> {
    childImageSharp: {
        fluid?: FluidObject;
        fixed?: FixedObject;
    };
}
/*
childImageSharp {
                fluid(
                    maxWidth: 1800
                    srcSetBreakpoints: [400, 550, 800, 1600, 1800]
                    quality: 75
                    toFormat: JPG
                ) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }*/

// display parameters
export type QueryFieldType =
    | "maxWidth"
    | "maxHeight"
    | "displayType"
    | "quality"
    | "imageBackground"
    | "fit"
    | "displayBreakpoints"
    | "fragment";

export type PictureFieldType =
    | "displayType"
    | "fit"
    | "spacer"
    | "src"
    | "srcSet"
    | "sizes"
    | "source"
    | "width"
    | "height";

export type FormFieldType =
    | "sourceImageWidth"
    | "sourceImageHeight"
    | "sourceImageType"
    | "sourceImageName";

export interface SourceImageProps {
    width: number | undefined;
    height: number | undefined;
    fileType: string | undefined;
    name: string | undefined;
}

export type KeyedByFields<T> = {
    [P in PictureFieldType | QueryFieldType | FormFieldType]: T;
};

export interface DisplayImageProps {
    maxWidth: number | undefined;
    maxHeight: number | undefined;
    displayType: "fluid" | "fixed" | undefined;
    quality: number | undefined;
    imageBackground: string | undefined;
    fit: string | undefined;
    displayBreakpoints: string | undefined;
    fragment: string | undefined;
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
