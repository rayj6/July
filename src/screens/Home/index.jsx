import React from "react";
import "./styles.css";

const index = () => {
    return (
        <div className="HomeContainer">
            <div className="MainBox">
                <div id="TopBar">
                    <button id="logout">
                        <p>Log out</p>
                        <img alt="" src={require("../../assets/logout.png")} />
                    </button>
                    <select id="selectLanguage" name="selectedOption">
                        <option value="English">English</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Chinese">Chinese</option>
                    </select>
                </div>
                <div id="Main">
                    <div id="decor1">
                        <p id="title">WELCOME&nbsp;&nbsp;</p>
                        <p id="username">username</p>
                    </div>
                    <div id="decor2">
                        <p id="title">HOW CAN I ASSIST YOU TODAY</p>
                    </div>
                    <img alt="" src={require("../../assets/AI.gif")} />
                    <button id="microphone">
                        <img alt="" src={require("../../assets/microphone.png")} />
                    </button>
                </div>
            </div>
            <div className="FunctionBox"></div>
        </div>
    );
};

export default index;
