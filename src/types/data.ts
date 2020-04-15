import { FluidObject, FixedObject } from "gatsby-image";

export type ImageField = string | ImageSharp;
export type FileField = string | Partial<FileNode>;

// Images

export interface GalleryImage {
    alt?: string;
    image: ImageField;
}

export interface FileNode extends ParsedPath, Stats {
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

export interface ImageSharp extends Partial<FileNode> {
    childImageSharp: {
        fluid?: FluidObject;
        fixed?: FixedObject;
    };
}
export interface ImageSharpFluid {
    aspectRatio?: number;
    sizes?: string;
    src: string;
    srcSet?: string;
    tracedSVG?: string;
    base64?: string;
}

export interface ImageSharpFixed {
    aspectRatio?: number;
    src: string;
    srcSet?: string;
    tracedSVG?: string;
    base64?: string;
    width: number;
    height: number;
}

// PAGES

export interface NodeList<T> {
    edges: Array<Edge<T>>;
}

export interface Edge<T> {
    node: T;
}

export interface BlogData {
    html: string;
    frontmatter: {
        title: string;
        date: string;
        headerImage: string;
    };
    timeToRead: string;
    tableOfContents: string;
}
