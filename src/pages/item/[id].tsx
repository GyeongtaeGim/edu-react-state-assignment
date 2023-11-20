import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";

import Box from "components/Box";

type ItemDetailParams = 'id'

const ItemDetailPage = () => {
    const { id } = useParams<ItemDetailParams>()

    if (!id) return <Navigate to='/item' />

    return <>
        <Helmet>
            <title>itemPage {id}</title>
        </Helmet>
        <Box>
            <h1>ItemDetailPage {id}</h1>
            <Link to='./../'>move to item</Link>
        </Box>
    </>
}

export default ItemDetailPage