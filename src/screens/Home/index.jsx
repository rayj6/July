import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.lang = "vi-VN";

async function sendDataToServer(question, setResponse) {
    try {
        const response = await axios.post("http://localhost:3300/botchat", {
            question: `Take note and organize information, anwser in the same language with the content: ${question}`,
        });
        console.log("Server response:", response.data);
        setResponse(response.data);
    } catch (error) {
        console.error("Error sending data to server:", error);
    }
}

const MainBox = ({ CurrentMode, setCurrentMode, setTranscript }) => {
    const [isListening, setIsListening] = useState(false);
    const [shouldContinue, setShouldContinue] = useState(false);

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
    };

    const stopListening = () => {
        setShouldContinue(false);
        recognition.stop();
    };

    const handleModeChange = (event) => {
        setCurrentMode(event.target.value);
    };

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
                <select id="selectMode" name="selectedOption" onChange={handleModeChange} value={CurrentMode}>
                    <option value="Assistant">Assistant</option>
                    <option value="TakeNote">Take note</option>
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
                <button id="microphone" onClick={isListening ? stopListening : startListening}>
                    <img alt="" src={require("../../assets/microphone.png")} />
                </button>
            </div>
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
const Index = () => {
    const [CurrentMode, setCurrentMode] = useState("Assistant");
    const [transcript, setTranscript] = useState("");

    return (
        <div className="HomeContainer">
            <MainBox CurrentMode={CurrentMode} setCurrentMode={setCurrentMode} setTranscript={setTranscript} />
            {CurrentMode === "Assistant" ? <FunctionBox /> : <NoteBox content={transcript} />}
        </div>
    );
};

export default Index;
