import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

const Index = ({ email, password }) => {
    const [Username, setUsername] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("");
    const [Nationality, setNationality] = useState("");

    async function sendDataToServer() {
        console.log(email + password);
        try {
            const response = await axios.post("http://localhost:3300/authentication/register", {
                email: email,
                password: password,
                username: Username,
                age: Age,
                gender: Gender,
                nationality: Nationality,
            });
            console.log("Server response:", response.data);
            if (response.data !== "Internal server error") {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    }

    return (
        <div className="GetInfoContainer">
            <p id="Title">BEFORE USE</p>
            <p id="SubTitle">Please provide some information</p>
            <div id="Input1">
                <input type="text" placeholder="Username ( your nickname )" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div id="InputContainer">
                <input id="Age" type="text" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                <input id="Gender" type="text" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
                <input id="Nationality" type="text" placeholder="Nationality" onChange={(e) => setNationality(e.target.value)} />
            </div>
            <div id="SupportPart">
                <p onClick={() => (window.location.href = "/recovery")}>Forgot password?</p>
                <p onClick={() => (window.location.href = "/login")}>Already have an account</p>
            </div>
            <button id="AuthBtn" onClick={() => sendDataToServer()}>
                START
            </button>
        </div>
    );
};

export default Index;
