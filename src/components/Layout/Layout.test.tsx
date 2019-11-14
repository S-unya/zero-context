import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { Layout } from "./index";


describe("Layout", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <Layout
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

