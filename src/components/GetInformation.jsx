import React from "react";

const GetInformation = ({ title, subtitle, placeholder1, placeholder2, support1, support2, setData1, setData2, MainFunction, FunctionName }) => {
    return (
        <div className="AuthContainer">
            <p id="Title">{title}</p>
            <p id="SubTitle">{subtitle}</p>
            <div id="Input1">
                <input type="text" placeholder={placeholder1} onChange={(e) => setData1(e.target.value)} />
            </div>
            <div id="Input2">
                <input type="password" placeholder={placeholder2} onChange={(e) => setData2(e.target.value)} />
            </div>
            <div id="SupportPart">
                <p onClick={() => (window.location.href = `/${support1}`)}>Forgot password?</p>
                {support2 === "login" ? (
                    <p onClick={() => (window.location.href = `/${support2}`)}>Already have an account</p>
                ) : (
                    <p onClick={() => (window.location.href = `/${support2}`)}>Don't have an account</p>
                )}
            </div>
            <button id="AuthBtn" onClick={() => MainFunction()}>
                {FunctionName}
            </button>
        </div>
    );
};

export default GetInformation;
