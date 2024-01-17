import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./screens/Home/index.jsx";
import Login from "./screens/Login/index.jsx";
import Register from "./screens/Register/index.jsx";
import Recovery from "./screens/Recovery/index.jsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="app/:userid" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="recovery" element={<Recovery />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
