import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import flex from "styles/flex.module.css"

import CssButton from "components/CssButton";
import CssModuleButton from "components/CssModuleButton";
import EmotionButton from "components/EmotionButton";
import VanillaExtractButton from "components/VanillaExtractButton";

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
            <VanillaExtractButton>Vanilla Extract Button</VanillaExtractButton>
            <Link to='/item'>move to item</Link>
        </div>
    </>
}

export default IndexPage