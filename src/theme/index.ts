import { funk } from "@theme-ui/presets";
export default {
    ...funk,
    styles: {
        ...funk.styles
    }
};

export const preButton = {
    fontWeight: "bold",
    appearance: "none",
    cursor: "pointer",
    border: "0 none",
    borderBottom: " 1px dashed #999",
    background: "transparent"
};

export const activePreButton = {
    ...preButton,
    background: "#eba"
};
export const secondaryPreButton = {
    ...preButton,
    background: "#abe"
};
