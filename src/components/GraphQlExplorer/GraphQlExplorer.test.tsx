import * as React from "react";

import { render, cleanup } from '@testing-library/react';

import { GraphQlExplorer } from "./index";


describe("GraphQlExplorer", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const {container} = render(
                <GraphQlExplorer
                    className="myClass"
                />
            );
        expect(true).toBeFalsy();
    })
});

