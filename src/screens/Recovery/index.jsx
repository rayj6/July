import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

function VerifyPassword({ sendDataToServer, email }) {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState(false);

    if (confirm !== false) {
        window.location.href = "/login";
    }

    return (
        <div className="RecoveryContainer">
            <p id="Title">LASt STEP</p>
            <p id="SubTitle">Provide received password in your email</p>
            <div id="Input1">
                <input type="text" placeholder="Password ( Check your email )" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div id="Input2">
                <input type="password" placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div id="SupportPart">
                <p onClick={() => (window.location.href = "/login")}>Already have an account</p>
                <p onClick={() => (window.location.href = "/register")}>Don't have an account</p>
            </div>
            <button
                id="AuthBtn"
                onClick={() => sendDataToServer("/recovery/changePassword", { email: email, password: password, newPassword: newPassword }, setConfirm)}
            >
                RECOVER
            </button>
        </div>
    );
}

const Index = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(false);

    async function sendDataToServer(to, data, confirm) {
        try {
            const response = await axios.post(`http://localhost:3300/authentication${to}`, data);
            console.log("Server response:", response.data);
            if (response.data !== "Internal server error") {
                alert(response.data);
                confirm(true);
            } else {
                alert("Please recheck your information");
            }
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    }

    if (status === false) {
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
                <button
                    id="AuthBtn"
                    onClick={() =>
                        sendDataToServer(
                            "/recovery",
                            {
                                username: username,
                                email: email,
                            },
                            setStatus
                        )
                    }
                >
                    RECOVER
                </button>
            </div>
        );
    } else {
        return <VerifyPassword sendDataToServer={sendDataToServer} email={email} />;
    }
};

export default Index;
