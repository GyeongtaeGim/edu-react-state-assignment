import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import flex from "styles/flex.module.css"

const ItemPage = () => {
    return <>
        <Helmet>
            <title>itemPage</title>
        </Helmet>
        <div className={flex.column}>
            <h1>ItemPage</h1>
            <button className="button">Hello</button>
            <ul>
                <li><Link to='/'>move to index</Link></li>
                <li><Link to='/item/1'>item 1</Link></li>
                <li><Link to='./2'>item 2</Link></li>
            </ul>
        </div>
    </>
}

export default ItemPage