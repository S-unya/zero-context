import * as React from "react";

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
export const messages = {
    // display parameters
    maxWidth: (
        <>
            <p>
                The <code>maxWidth</code> value is used to construct the{" "}
                <code>srcSet</code> and the <code>sizes</code> for "fluid"
                images and <code>&lt;source /&gt;</code> elements. "Fixed"
                images use the <code>width</code> value.
            </p>
            <p>
                If no <code>maxWidth</code> is set, the default width for
                "fluid" sizing images is <strong>800px</strong>. This will
                generate a <code>sizes</code> attribute that assumes max-width
                of 800px and a behaviour of stretching across the entire screen.
            </p>
            <p>
                "Fluid" image queries with no <code>srcSetBreakpoints</code>{" "}
                will generate a default <code>srcSet</code> attribute in the
                image based around 1x, 1.5x and 2x of the <code>maxWidth</code>{" "}
                (800px by default). Otherwise, if it is present, the{" "}
                <code>srcSet</code> in the image will include an extra entry for
                the value of the <code>maxWidth</code> (again, default will be
                800px).
            </p>
        </>
    ),
    maxHeight: (
        <>
            <p>
                The <code>maxHeight</code> value in the GraphQL query is used by
                default to set the image fit value to cover if present. As this
                is the default, I'm not sure what else it does...er @todo
            </p>
        </>
    ),
    displayType: (
        <>
            <p>
                The <em>image sizing query</em> tells{" "}
                <code>gatsby-plugin-sharp</code> and <code>gatsby-image</code>{" "}
                how you want your image to behave on the page. This means that
                it will change the output from <code>gatsby-image</code> and the
                default behaviours of <code>gatsby-plugin-sharp</code>.
            </p>
            <p>
                <strong>"Fixed" size images</strong> are images for which you
                know the absolute size they will display in your app. The
                "fixed" query will cause <code>gatsby-plugin-sharp</code> to
                make a 1x, 1.5x and 2x sized image of the <code>width</code>{" "}
                parameter passed in to it. This is 400px by default for fixed
                images. <code>gatsby-image</code> doesn't provide for different
                "fixed" size images across breakpoints.
            </p>
            <p>
                <strong>"Fluid" sizing images</strong> are images that fill the
                available space of their container. The "fluid" query will cause{" "}
                <code>gatsby-plugin-sharp</code> to make a 1x, 1.5x and 2x sized
                image of the <code>maxWidth</code> parameter passed in to it
                unless a <code>srcSetBreakpoints</code> is also passed to it. In
                which case it will generate 1 image for <code>maxWidth</code>{" "}
                and 1 for each <code>srcSetBreakpoints</code> entry.
                <code>gatsby-image</code> assumes that the "available space" is
                the full width of the screen; there is no provision as yet for
                adjusting this assumption.
            </p>
        </>
    ),
    quality: (
        <>
            <p>
                The <code>quality</code> value for the GraphQL query sets the
                compression amount used by <code>gatsby-plugin-sharp</code>. The
                higher the number, the less compression and better the quality.
            </p>
            <p>
                If no <code>quality</code> is set, the default is 50 for all
                image types.
            </p>
        </>
    ),
    imageBackground: (
        <>
            <p>
                The <code>imageBackground</code> value in the query is the
                colour to set as the background to the processed image. It will
                only be visible where there is alpha (transparency) in the
                image.
            </p>
            <p>
                The format is rgba (red, green, blue, alpha) as a string. For
                example this would be a semi-transparent red colour,{" "}
                <code>"rgba(255, 0, 0, 90)"</code>. The default is transparent,{" "}
                <code>"rgba(0, 0, 0, 0)"</code>
            </p>
        </>
    ),
    fit: (
        <>
            <p>
                The <code>fit</code> value in the query sets some CSS on the
                image. It uses the CSS rule, <code>object-fit</code>. This is
                partially related to the <code>maxHeight</code> and{" "}
                <code>height</code> values.
            </p>
            <p>The default value is "cover.</p>
        </>
    ),
    displayBreakpoints: (
        <>
            <p>
                The <code>srcSetBreakpoints</code> value set in the query is
                essentially setting a number of image sizes for{" "}
                <code>gatsby-plugin-sharp</code> to make. The images, along with
                any created by the <code>maxWidth</code> value, are then added
                to the image's <code>srcset</code>.
            </p>
            <p>
                If no <code>srcSetBreakpoints</code> is set, 3 will be created
                for 800px because of the default <code>maxWidth</code>.
            </p>
            <p>
                If the source image is smaller than one or more of the entries
                here, the largest entry here will be the width of the original
                source image.
            </p>
        </>
    ),
    spacer: (
        <>
            <p>
                The spacer div is used to make a placeholder element the same
                size as your image, it is based on the aspect ratio of your
                original image that is passed through from the GraphQL result.
                It uses the fact that padding precentage is{" "}
                <em>relative to the width</em> of the element.
            </p>
        </>
    ),
    // Source image parameters
    sourceImageWidth: (
        <>
            <p>
                In Gatsby, the source image <code>width</code> value is
                discovered automatically when generating the image, but it has
                an effect on the <code>sizes</code> and <code>srcset</code>{" "}
                attribute in the image because <code>gatsby-plugin-sharp</code>{" "}
                cleverly doesn't generate any images larger than the source
                image to avoid blurry images.
            </p>
        </>
    ),
    sourceImageHeight: (
        <>
            <p>
                In Gatsby, the source image <code>width</code> value is
                discovered automatically when generating the image. It isn't
                used for much unless you add height to your GraphQL query.
            </p>
        </>
    ),
    sourceImageType: (
        <>
            <p>
                The source image <code>file type</code> is normally
                automatically discovered. It is only ever used with the{" "}
                <code>toFormat</code> and automatic transforms "...withWebP". If
                either of those is present and not equal to your source image
                format, it will generate a <code>&lt;source /&gt;</code> element
                with a full set of images for the original file format and the
                new file format, as well as within the{" "}
                <code>&lt;img /&gt;</code> element.
            </p>
        </>
    ),
    // Element fields
    src: (
        <>
            <p>
                The <code>src</code> attribute is set to the image closest to
                the <code>maxWidth</code> value set in the query.
            </p>
            <p>
                If no <code>maxWidth</code> is set, the default width for
                "fixed" size images is <strong>400px</strong> and{" "}
                <strong>800px</strong> for "fluid" sizing images. This matches
                the assumption that "fluid" images are full width and that one
                would use "fixed" images otherwise.
            </p>
        </>
    ),
    srcSet: (
        <>
            <p>
                The <code>srcSet</code> attribute is based around the{" "}
                <code>maxWidth</code> value and the{" "}
                <code>srcSetBreakpoints</code> value set in the query along with
                the width of the original source image.
            </p>
        </>
    ),
    sizes: (
        <>
            <p>
                The <code>sizes</code> attribute is based around{" "}
                <code>maxWidth</code> value set in the query.
            </p>
            <p>
                If no <code>maxWidth</code> is set, the default width for
                "fixed" size images is <strong>400px</strong> and{" "}
                <strong>800px</strong> for "fluid" sizing images. This matches
                the assumption that "fluid" images are full width and that one
                would use "fixed" images otherwise.
            </p>
        </>
    )
};
