import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { CodeBlock } from "./index";


describe("CodeBlock", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <CodeBlock
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

