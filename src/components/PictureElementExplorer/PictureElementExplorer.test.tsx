import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { PictureElementExplorer } from "./index";


describe("PictureElementExplorer", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <PictureElementExplorer
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

