import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Cookies from "js-cookie";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.lang = "vi-VN";

async function sendDataToServer(question, setResponse) {
    try {
        const response = await axios.post("http://localhost:3300/botchat", {
            userid: "testId",
            question: `Take note and organize information, anwser in the same language with the content: ${question}`,
            // question: `${question}`,
        });
        console.log("Server response:", response.data);
        setResponse(response.data);
    } catch (error) {
        console.error("Error sending data to server:", error);
    }
}

const MainBox = ({ CurrentMode, setCurrentMode, setTranscript, setUpgradeStatus, transcript }) => {
    const [isListening, setIsListening] = useState(false);
    const [shouldContinue, setShouldContinue] = useState(false);
    const [AiImage, setAiImage] = useState("AIAnimation");

    useEffect(() => {
        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const text = event.results[last][0].transcript;

            sendDataToServer(text, (newResponse) => {
                // Concatenate the new response to the existing transcript
                setTranscript((prevTranscript) => prevTranscript + newResponse + "\n\n");
            });

            console.log(text);
        };

        recognition.onend = () => {
            setIsListening(false);
            if (shouldContinue) {
                recognition.start();
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    }, [shouldContinue, setTranscript]);

    const startListening = () => {
        setShouldContinue(true);
        recognition.start();
        setAiImage("AIAnimation2");
    };

    const stopListening = () => {
        setShouldContinue(false);
        recognition.stop();
        setAiImage("AIAnimation");
    };

    const handleModeChange = (event) => {
        setCurrentMode(event.target.value);
    };

    function TopBar() {
        return (
            <div id="TopBar">
                <button
                    id="logout"
                    onClick={() => {
                        Cookies.remove("userid");
                        window.location.href = "/login";
                    }}
                >
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
                <select id="selectMode" name="selectedOption" onChange={handleModeChange} value={CurrentMode}>
                    <option value="Assistant">Assistant</option>
                    <option value="Health">Health</option>
                    <option value="TakeNote">Take note</option>
                </select>
                <button id="ToJulyPro" onClick={() => setUpgradeStatus(true)}>
                    JULY PRO
                </button>
            </div>
        );
    }

    function AssistantBox() {
        return (
            <div className="AssistantContainer">
                <div id="SideBar"></div>
                <div id="MainAssistant">
                    <div id="AssistantDecor">
                        <img alt="" src={require("../../assets/AI.gif")} />
                        <p>How can I help you today ?</p>
                    </div>
                    <div id="AssistantCommandBar">
                        <textarea placeholder="Your command..." id="AssistantInputCommand" name="text"></textarea>
                        <button id="AssistantSendButton">
                            <img alt="" src={require("../../assets/send.png")} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function TakeNoteBox() {
        return (
            <>
                <div id="Main">
                    <div id="decor1">
                        <p id="title">WELCOME&nbsp;&nbsp;</p>
                        <p id="username">username</p>
                    </div>
                    <div id="decor2">
                        <p id="title">HOW CAN I ASSIST YOU TODAY</p>
                    </div>
                    <img id={AiImage} alt="" src={require("../../assets/AI.gif")} />
                    <button id="microphone" onClick={isListening ? stopListening : startListening}>
                        <img alt="" src={require("../../assets/microphone.png")} />
                    </button>
                </div>
                <NoteBox content={transcript} />
            </>
        );
    }

    return (
        <div className="MainBox">
            <TopBar />
            {CurrentMode === "Assistant" ? <AssistantBox /> : CurrentMode === "TakeNote" ? <TakeNoteBox /> : <div></div>}
        </div>
    );
};

const FunctionBox = () => {
    return (
        <div className="FunctionBox">
            <div id="CommandContainer">
                <div id="SampleCommandBox">
                    <p id="CommandTitle">Commands</p>
                    <div id="SampleBox">
                        <div id="Boxes"></div>
                        <div id="Boxes"></div>
                        <div id="Boxes"></div>
                        <div id="Boxes"></div>
                    </div>
                </div>
                <div id="CommandBar">
                    <textarea placeholder="Your command..." id="InputCommand" name="text"></textarea>
                    <button id="SendButton">
                        <img alt="" src={require("../../assets/send.png")} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const NoteBox = ({ content }) => {
    return (
        <div className="FunctionBox">
            <div id="CommandContainer">
                <textarea id="NotePlace" readOnly value={content} />
            </div>
        </div>
    );
};

const Index = () => {
    const [CurrentMode, setCurrentMode] = useState("Assistant");
    const [transcript, setTranscript] = useState("");
    const [UpgradeStatus, setUpgradeStatus] = useState(false);

    useEffect(() => {
        const myCookieValue = Cookies.get("userid");

        if (myCookieValue) {
            console.log(`Value of myCookie: ${myCookieValue}`);
        } else {
            console.log("myCookie not found");
            window.location.href = "/login";
        }
    }, []);

    if (UpgradeStatus === false) {
        return (
            <div className="HomeContainer">
                <MainBox
                    CurrentMode={CurrentMode}
                    setUpgradeStatus={setUpgradeStatus}
                    setCurrentMode={setCurrentMode}
                    setTranscript={setTranscript}
                    transcript={transcript}
                />
            </div>
        );
    } else {
        return (
            <div className="HomeContainer">
                <div className="UpgradeBox">
                    <div id="TitleContainer">
                        <p>UPGRADE YOUR PLAN</p>
                        <button onClick={() => setUpgradeStatus(false)}>
                            <img src={require("../../assets/exit.png")} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Index;
