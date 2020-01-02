import * as React from "react";

import { PageHeader } from "./index";

export default {
    component: PageHeader,
    title: "PageHeader"
};

export const Default = () => (
    <PageHeader className="myClass" heading="This is a heading" />
);
