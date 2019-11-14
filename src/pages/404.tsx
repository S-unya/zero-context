import * as React from "react";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Link } from "gatsby";

export default () => {
    return (
        <Layout>
            <Seo title="404" />
            <h1>Every great journey begins with the first step...</h1>
            <p>
                <Link to="/">Choose wisely</Link> where you step or{" "}
                <a href="https://duckduckgo.com?q=!safeon%20just%20go%20for%20it">
                    just go for it
                </a>
                !
            </p>
        </Layout>
    );
};
