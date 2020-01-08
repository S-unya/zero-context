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
export enum QueryFieldType {
    "MAXWIDTH" = "maxWidth",
    "MAXHEIGHT" = "maxHeight",
    "DISPLAYTYPE" = "displayType",
    "QUALITY" = "quality",
    "IMGBG" = "imageBackground",
    "FIT" = "fit",
    "BRKPNTS" = "displayBreakpoints",
    "TOFORMAT" = "toFormat",
    "FRAGMENT" = "fragment"
}

export enum PictureFieldType {
    "DISPLAYTYPE" = "displayType",
    "FIT" = "fit",
    "SPACER" = "spacer",
    "SRC" = "src",
    "SRCSET" = "srcSet",
    "SIZES" = "sizes"
}

export enum FormFieldType {
    "SOURCEWIDTH" = "sourceImageWidth",
    "SOURCEHEIGHT" = "sourceImageHeight",
    "SOURCETYPE" = "sourceImageType",
    "SOURCENAME" = "sourceImageName"
}

export enum MessageFieldType {
    // display parameters
    "MAXWIDTH" = "maxWidth",
    "MAXHEIGHT" = "maxHeight",
    "DISPLAYTYPE" = "displayType",
    "QUALITY" = "quality",
    "IMGBG" = "imageBackground",
    "FIT" = "fit",
    "BRKPNTS" = "displayBreakpoints",
    "SPACER" = "spacer",
    // Source image parameters
    "SOURCEWIDTH" = "sourceImageWidth",
    "SOURCEHEIGHT" = "sourceImageHeight",
    "SOURCETYPE" = "sourceImageType",
    // Element fields
    "SRC" = "src",
    "SRCSET" = "srcSet",
    "SIZES" = "sizes"
}

export interface SourceImageProps {
    width: number | null;
    height: number | null;
    fileType: string | null;
    name: string | null;
}

export interface DisplayImageProps {
    maxWidth: number | null;
    maxHeight: number | null;
    displayType: "fluid" | "fixed" | null;
    quality: number;
    imageBackground: string;
    fit: string | null;
    displayBreakpoints: string;
    fragment: string | null;
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
