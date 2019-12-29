import React, { useCallback, useRef, useState, useLayoutEffect } from "react";
import cx from "classnames";

import styles from "./CodeBlock.module.css";
import { GqlError } from "../GraphQlExplorer/GraphQlExplorer";

interface Props extends React.HTMLAttributes<HTMLElement> {
    live: boolean;
    changeHandler: (code: string) => void;
    onExit: (code: string) => void;
    error?: GqlError;
    children: string;
}

export const CodeBlock: React.FC<Props> = ({
    children,
    style,
    className,
    live,
    changeHandler,
    onExit,
    error
}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    // STATE
    const [cursorPosition, setCursorPosition] = useState(0);
    // STATE:END

    // CALLBACKS
    const setTab = useCallback(
        ref => {
            const start = ref?.current.selectionStart;
            const end = ref?.current.selectionEnd;
            const preSelection = children.slice(0, start);
            const postSelection = children.slice(end);

            changeHandler(`${preSelection}  ${postSelection}`);
            setCursorPosition(start + 2);
        },
        [changeHandler, children]
    );

    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            console.log(event.keyCode, event.key);

            // escape = 27
            // tab == 9
            switch (event.keyCode) {
                case 27:
                    event.preventDefault();
                    const code = event.currentTarget.value;

                    return onExit(code);
                case 9:
                    event.preventDefault();
                    /// add 2 spaces
                    setTab(textareaRef);
                    return;
                default:
                    return;
            }
        },
        [onExit, setTab]
    );
    const onChange = useCallback(
        (event: React.FormEvent<HTMLTextAreaElement>) => {
            const code = event.currentTarget.value;

            changeHandler(code);

            textareaRef.current &&
                setCursorPosition(textareaRef.current.selectionEnd);
        },
        [changeHandler]
    );
    // CALLBACKS:END

    // EFFECT
    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.selectionStart = cursorPosition;
            textareaRef.current.selectionEnd = cursorPosition;
        }
    });
    // EFFECT:END

    return (
        <div style={style} className={cx(className, styles.component)}>
            <textarea
                className={styles.area}
                ref={textareaRef}
                value={children}
                onChange={onChange}
                onKeyDown={handleKeyPress}
                disabled={!live}
            >
                {children}
            </textarea>
            {error && (
                <p className={styles.error}>
                    {error.message} at line {error.location.line}, column{" "}
                    {error.location.line}
                </p>
            )}
        </div>
    );
};
export default CodeBlock;
