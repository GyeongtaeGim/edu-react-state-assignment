import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Box from "components/Box";

const IndexPage = () => {
    return <>
        <Helmet>
            <title>IndexPage</title>
        </Helmet>
        <Box>
            <h1>IndexPage</h1>
            <Link to='/item'>move to item</Link>
        </Box>
    </>
}

export default IndexPage