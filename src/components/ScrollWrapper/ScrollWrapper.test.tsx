import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { ScrollWrapper } from "./index";


describe("ScrollWrapper", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <ScrollWrapper
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

