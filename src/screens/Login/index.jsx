import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import Cookies from "js-cookie";
import GetInformation from "../../components/GetInformation";

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
            <GetInformation
                title={"LOGIN"}
                subtitle={"To continue your journey"}
                FunctionName={"LOGIN"}
                MainFunction={sendDataToServer}
                placeholder1={"Email | Phone number"}
                placeholder2={"Password"}
                setData1={setEmail}
                setData2={setPassword}
                support1={"recovery"}
                support2={"register"}
            />
        </div>
    );
}
