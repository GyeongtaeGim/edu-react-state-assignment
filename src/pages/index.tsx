import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CssModuleButton from "components/CssModuleButton";

import flex from "styles/flex.module.css"
import CssButton from "components/CssButton";
import EmotionButton from "components/EmotionButton";

const IndexPage = () => {
    return <>
        <Helmet>
            <title>IndexPage</title>
        </Helmet>
        <div className={flex.column}>
            <h1>IndexPage</h1>
            <CssButton>CSS Button</CssButton>
            <button className="button">Class Button</button>
            <CssModuleButton>CSS Module Button</CssModuleButton>
            <EmotionButton>Emotion Button</EmotionButton>
            <Link to='/item'>move to item</Link>
        </div>
    </>
}

export default IndexPage