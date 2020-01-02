import * as React from "react";

import { render, cleanup } from "@testing-library/react";

import { Default } from "./PageHeader.story";

describe("PageHeader", () => {
    afterEach(cleanup);

    it("renders correctly", () => {
        const { container } = render(<Default />);
        expect(true).toBeFalsy();
    });
});
