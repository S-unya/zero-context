import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { ImageForm } from "./index";


describe("ImageForm", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <ImageForm
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

