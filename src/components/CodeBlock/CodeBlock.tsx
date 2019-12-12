/* eslint react/jsx-key: 0 */

import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

interface Props extends React.AllHTMLAttributes<HTMLElement> {
    live: boolean;
    changeHandler: (code: string) => void;
}
export const CodeBlock: React.FC<Props> = ({
    children,
    className,
    live,
    changeHandler
}) => {
    const language = className.replace(/language-/, "");

    if (live) {
        return (
            <div style={{ marginTop: "40px", backgroundColor: "black" }}>
                <LiveProvider code={children.trim()}>
                    <LivePreview />
                    <LiveEditor onChange={changeHandler} />
                    <LiveError />
                </LiveProvider>
            </div>
        );
    }

    return (
        <Highlight {...defaultProps} code={children.trim()} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    style={{ ...style, padding: "20px" }}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token, key })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};
