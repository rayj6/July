import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

const Index = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    async function sendDataToServer() {
        try {
            const response = await axios.post("http://localhost:3300/authentication/recovery", {
                username: username,
                email: email,
            });
            console.log("Server response:", response.data);
            if (response.data !== "Internal server error") {
                alert(response.data);
            }
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    }

    return (
        <div className="RecoveryContainer">
            <p id="Title">RECOVERY</p>
            <p id="SubTitle">Provide information to recover your account</p>
            <div id="Input1">
                <input type="text" placeholder="Username ( your nickname )" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div id="Input2">
                <input type="password" placeholder="Email | Phone number" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div id="SupportPart">
                <p onClick={() => (window.location.href = "/login")}>Already have an account</p>
                <p onClick={() => (window.location.href = "/register")}>Don't have an account</p>
            </div>
            <button id="AuthBtn" onClick={() => sendDataToServer()}>
                RECOVER
            </button>
        </div>
    );
};

export default Index;
