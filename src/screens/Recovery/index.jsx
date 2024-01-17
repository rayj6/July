import React from "react";
import "./styles.css";

const Index = () => {
    return (
        <div className="RecoveryContainer">
            <p id="Title">RECOVERY</p>
            <p id="SubTitle">Provide information to recover your account</p>
            <div id="Input1">
                <input type="text" placeholder="Email | Phone number" />
            </div>
            <div id="Input2">
                <input type="password" placeholder="Most recent password" />
            </div>
            <div id="SupportPart">
                <p onClick={() => (window.location.href = "/login")}>Already have an account</p>
                <p onClick={() => (window.location.href = "/register")}>Don't have an account</p>
            </div>
            <button id="AuthBtn">RECOVER</button>
        </div>
    );
};

export default Index;
