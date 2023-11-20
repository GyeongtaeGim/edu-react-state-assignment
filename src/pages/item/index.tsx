import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Box from "components/Box";

const ItemPage = () => {
    return <>
        <Helmet>
            <title>itemPage</title>
        </Helmet>
        <Box>
            <h1>ItemPage</h1>
            <Box display='flex' flexDirection='column' spacing={2}>
                <Link to='/'>move to index</Link>
                <Link to='/item/1'>item 1</Link>
                <Link to='./2'>item 2</Link>
            </Box>
        </Box>
    </>
}

export default ItemPage