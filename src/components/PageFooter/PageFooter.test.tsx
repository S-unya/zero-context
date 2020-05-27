import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { PageFooter } from "./index";


describe("PageFooter", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <PageFooter
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

