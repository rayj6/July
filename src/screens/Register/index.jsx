import React, { useState } from "react";
import "./styles.css";
import GetInformation from "../../components/GetInformation";
import GetInfo from "../GetInfo/index.jsx";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ToInfo, setInfoStatus] = useState(false);

    function ToGetInfo() {
        setInfoStatus(true);
        console.log(ToInfo);
    }

    if (ToInfo === false) {
        return (
            <div className="Container">
                <div className="LogoContainer">
                    <img src={require("../../assets/favicon.png")} alt="" />
                </div>
                <GetInformation
                    title={"REGISTER"}
                    subtitle={"To start your journey"}
                    FunctionName={"REGISTER"}
                    MainFunction={ToGetInfo}
                    placeholder1={"Email | Phone number"}
                    placeholder2={"Password"}
                    setData1={setEmail}
                    setData2={setPassword}
                    support1={"recovery"}
                    support2={"login"}
                />
            </div>
        );
    } else if (ToInfo === true) {
        return <GetInfo email={email} password={password} />;
    }
}
