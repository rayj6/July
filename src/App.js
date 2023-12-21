import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./screens/Home/index.jsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="app/:userid" element={<Home />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
