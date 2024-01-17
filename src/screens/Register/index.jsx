import React from "react";
import "./styles.css";

export default function Index() {
    return (
        <div className="Container">
            <div className="LogoContainer">
                <img src={require("../../assets/favicon.png")} alt="" />
            </div>
            <div className="AuthContainer">
                <p id="Title">REGISTER</p>
                <p id="SubTitle">To start your journey</p>
                <div id="Input1">
                    <input type="text" placeholder="Email | Phone number" />
                </div>
                <div id="Input2">
                    <input type="text" placeholder="Password" />
                </div>
                <div id="SupportPart">
                    <p>Forgot password?</p>
                    <p onClick={() => (window.location.href = "/login")}>Already have an account</p>
                </div>
                <button id="AuthBtn">REGISTER</button>
            </div>
        </div>
    );
}
