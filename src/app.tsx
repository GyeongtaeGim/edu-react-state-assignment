import React from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

const App = () => {
    return <BrowserRouter>
        <h6>안녕</h6>
        <div><a href="/home">링크</a></div>
        <div><Link to='/home'>링크</Link></div>
        <Routes>
            <Route path="/home" element={<h1>홈</h1>} />
            <Route path="/create" element={<h2>생성</h2>} />
            <Route path="/edit" element={<h3>수정</h3>} />
        </Routes>
    </BrowserRouter>
}

export default App;