import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { BlogPage } from "./index";


describe("BlogPage", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <BlogPage
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

