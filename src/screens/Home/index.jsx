import React, { useRef, useEffect } from "react";
import "./styles.css";

const MainBox = () => {
    return (
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
    );
};
const FunctionBox = () => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textareaRef]);

    return (
        <div className="FunctionBox">
            <div id="CommandContainer">
                <div id="SampleCommandBox"></div>
                <div id="CommandBar">
                    <textarea
                        placeholder="Your command..."
                        id="InputCommand"
                        name="text"
                        ref={textareaRef}
                        onInput={() => {
                            if (textareaRef.current) {
                                textareaRef.current.style.height = "auto";
                                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                            }
                        }}
                    ></textarea>
                    <button id="SendButton">
                        <img alt="" src={require("../../assets/send.png")} />
                    </button>
                </div>
            </div>
        </div>
    );
};
const index = () => {
    return (
        <div className="HomeContainer">
            <MainBox />
            <FunctionBox />
        </div>
    );
};

export default index;
