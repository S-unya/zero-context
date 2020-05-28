import * as React from "react";

import styles from "./ScrollWrapper.module.css";
import { ScrollingProvider } from "../../context/ScrollContext";

export const ScrollWrapper: React.FC<React.HTMLAttributes<HTMLElement>> = ({
    children,
}) => {
    return <ScrollingProvider>{children}</ScrollingProvider>;
};
export default ScrollWrapper;
