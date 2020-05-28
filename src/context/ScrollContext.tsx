import React, { createContext, useEffect, useState } from "react";

const ScrollingContext = createContext<number>(0);

export const ScrollingProvider: React.FC<React.HTMLAttributes<HTMLElement>> = (
    props
) => {
    const [scroll, setScroll] = useState<number>(0);
    useEffect(() => {
        if (!window) {
            return;
        }

        const scrollCheck = () => {
            const scrollY = window.scrollY;

            setScroll(scrollY);
        };

        window.addEventListener("scroll", scrollCheck);

        // eslint-disable-next-line consistent-return
        return () => {
            window.removeEventListener("scroll", scrollCheck);
        };
    }, [setScroll]);

    return <ScrollingContext.Provider value={scroll} {...props} />;
};

export const useScrollValue = () => {
    const context = React.useContext(ScrollingContext);

    if (typeof context !== "number") {
        throw new Error(
            "ScrollingContext must be used within an ScrollingProvider"
        );
    }

    return context;
};
