import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function sendDataToServer() {
        try {
            console.log(email + password);
            const response = await axios.post("http://localhost:3300/authentication/login", { email: email, password: password });
            console.log("Server response:", response.data);
            window.location.href = "/app/" + response.data;
            Cookies.set("userid", response.data, { expires: 365, path: "/" });
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
                <p id="Title">LOGIN</p>
                <p id="SubTitle">To continue your journey</p>
                <div id="Input1">
                    <input type="text" placeholder="Email | Phone number" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div id="Input2">
                    <input type="password" placeholder="Password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="SupportPart">
                    <p onClick={() => (window.location.href = "/recovery")}>Forgot password?</p>
                    <p onClick={() => (window.location.href = "/register")}>Don't have an account</p>
                </div>
                <button id="AuthBtn" onClick={() => sendDataToServer()}>
                    LOGIN
                </button>
            </div>
        </div>
    );
}
