import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function sendDataToServer() {
        try {
            const response = await axios.post("http://localhost:3300/authentication/register", { email: email, password: password });
            console.log("Server response:", response.data);
            window.location.href = "/login";
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    }
    return (
        <div className="Container">
            <div className="LogoContainer">
                <img src={require("../../assets/favicon.png")} alt="" />
            </div>
            <div className="AuthContainer">
                <p id="Title">REGISTER</p>
                <p id="SubTitle">To start your journey</p>
                <div id="Input1">
                    <input type="text" placeholder="Email | Phone number" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div id="Input2">
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="SupportPart">
                    <p onClick={() => (window.location.href = "/recovery")}>Forgot password?</p>
                    <p onClick={() => (window.location.href = "/login")}>Already have an account</p>
                </div>
                <button id="AuthBtn" onClick={() => sendDataToServer()}>
                    REGISTER
                </button>
            </div>
        </div>
    );
}
