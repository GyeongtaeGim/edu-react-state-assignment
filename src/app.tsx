import React from "react"
import loadable from "@loadable/component"
import { Route, Routes } from "react-router-dom"

const IndexPage = loadable(() => import('pages/index'))
const ItemPage = loadable(() => import('pages/item'))
const ItemDetailPage = loadable(() => import('pages/item/[id]'))

const App = () => {
    return <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
    </Routes>
}

export default App;