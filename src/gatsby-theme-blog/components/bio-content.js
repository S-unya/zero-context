import React from "react";
import { Styled } from "theme-ui";

export default () => {
  const [sourceImageWidth, setSourceImageWidth] = React.useState(null);
  const [imageType, setImageType] = React.useState(null);
  const [imageWidth, setImageWidth] = React.useState(400); // default
  const [imageHeight, setImageHeight] = React.useState(null); // default
  const [imageQuality, setImageQuality] = React.useState(50); // default
  const [imageBreakpoints, setImageBreakpoints] = React.useState("800"); // default
  const [imageFit, setImageFit] = React.useState("sharp.fit.cover"); // default
  const [imageBgColor, setImageBgColor] = React.useState("rgba(0, 0, 0, 1)"); // default

  const outPutImageTypeFields = () => {
    if (!imageType) {
      return null;
    }

    const baseProperties = (
      <>
        <legend>Display properties</legend>
        <div className="input-wrap">
          <label htmlFor="image-width">Display width</label>{" "}
          <input type="number" value={imageWidth} onChange={setImageWidth} />
        </div>
        <div className="input-wrap">
          <label htmlFor="image-height">Display height</label>{" "}
          <input type="number" value={imageHeight} onChange={setImageHeight} />
        </div>
        <div className="input-wrap">
          <label htmlFor="image-quality">Display quality</label>{" "}
          <input
            type="number"
            value={imageQuality}
            onChange={event => {
              setImageQuality(event.target.value);
            }}
          />
        </div>
      </>
    );

    const fluidProperties = (
      <>
        <div className="input-wrap">
          <label htmlFor="image-breakpoints">
            Display image sizes (comma separated)
          </label>{" "}
          <input
            type="text"
            value={imageBreakpoints}
            onChange={event => {
              setImageBreakpoints(event.target.value);
            }}
            placeholder="e.g. 320, 800, 1024"
          />
        </div>
      </>
    );

    return (
      <fieldset>
        {imageType === "fixed"
          ? baseProperties
          : [baseProperties, fluidProperties]}
      </fieldset>
    );
  };

  return (
    <>
      <form>
        <fieldset>
          <legend>About your image</legend>
          <div className="input-wrap">
            <label htmlFor="source-image-width">
              Width in pixels of your source image:
            </label>{" "}
            <input
              type="number"
              id="source-image-width"
              value={sourceImageWidth}
            />{" "}
            <span>px</span>
          </div>
          <div className="input-wrap">
            <label htmlFor="source-image-type">Type of source image:</label>{" "}
            <select id="source-image-type" name="source-image-type">
              <option value="">-- Choose --</option>
              <option value="jpg">.jpg</option>
              <option value="webp">.webp</option>
            </select>
          </div>
          <p>maybe put a src here</p>
        </fieldset>
        <fieldset>
          <legend>How will the image display?</legend>
          <div className="input-wrap">
            <label htmlFor="image-type-fixed">Fixed size:</label>{" "}
            <input
              type="radio"
              id="image-type-fixed"
              name="image-type"
              value="fixed"
              checked={imageType === "fixed"}
              onChange={() => {
                setImageType("fixed");
              }}
            />
            <label htmlFor="image-type-fluid">Fluid size:</label>{" "}
            <input
              type="radio"
              id="image-type-fluid"
              name="image-type"
              value="fluid"
              onChange={() => {
                setImageType("fluid");
              }}
            />
            <div className="help">Some help here</div>
          </div>
        </fieldset>
        {outPutImageTypeFields()}
      </form>
    </>
  );
};
