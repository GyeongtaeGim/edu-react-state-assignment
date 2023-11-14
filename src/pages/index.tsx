import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CssModuleButton from "components/CssModuleButton";

import flex from "styles/flex.module.css"
import CssButton from "components/CssButton";

const IndexPage = () => {
    return <>
        <Helmet>
            <title>IndexPage</title>
        </Helmet>
        <div className={flex.column}>
            <h1>IndexPage</h1>
            <CssModuleButton>Hello</CssModuleButton>
            <CssButton>Hello</CssButton>
            <button className="button">Hello</button>
            <Link to='/item'>move to item</Link>
        </div>
    </>
}

export default IndexPage