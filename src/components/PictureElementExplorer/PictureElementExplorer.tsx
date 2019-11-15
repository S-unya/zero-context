import * as React from "react";


interface Props extends React.HTMLAttributes<HTMLElement> {
}

export const PictureElementExplorer: React.FC<Props> = ({ children, style, className }) => {
    // STATE
    // STATE:END

    // CALLBACKS
    // CALLBACKS:END

    // EFFECT
    // EFFECT:END
    
    return (
    <div style={style}>
        {children}
    </div>
    );
};
export default PictureElementExplorer;
