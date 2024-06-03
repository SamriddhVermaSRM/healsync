import "./styles.css";
import Header from "./Header";
import { useState } from "react";





// log function
// function log(message) {
//     console.log(message);
// }

// API KEY
const API_KEY = "AIzaSyDz_OSzMjKfWQn88ovD0IEd1kqv-nzFCZs";

function getchat() {
    return (JSON.parse(localStorage.getItem("chat")));
}

// var chunkText = "";
// function chunktext(text) {
//     if (text !== "")
//         chunkText = text ;
//     return chunkText;
// }

var data = getchat();
function dataa(text) {
    if (text != null) {
        data.history.push(text);
    }
    localStorage.setItem("chat", JSON.stringify(data));
    return data;
}

// {role: "user",parts: text}
// {role: "model",parts: text}



// Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat(localStorage.getItem("chatai"));



function ChatBox() {
    const [userQuery, setuserQuery] = useState("");
    // eslint-disable-next-line
    const [DATA, setdata] = useState(dataa());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userQuery !== "") {
            dataa({ role: "user", parts: userQuery });
            setdata(dataa());
            document.getElementById("messagebox").value = "";
            console.log(DATA);
            ai();
            setuserQuery("");

        }
    }

    const ai = async () => {
        const result = await chat.sendMessageStream(userQuery);
        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            // chunktext(chunkText);
            text += chunkText;

        }
        dataa({ role: "model", parts: text });
        setdata(dataa());
        setuserQuery("response received");
        setTimeout(() => {
            setuserQuery("");
        }, 200);
        // chunktext("");
    };


    return (
        <>
            <Header />
            <div className="chat">
                <ChatHistory data={DATA} />
                <form className="chatbox" onSubmit={handleSubmit}>
                    <input id="messagebox" autoCorrect="false" autoComplete="off" type="text" placeholder="Type your message here..." onChange={(e) => setuserQuery(e.target.value)} />
                    <button type="submit">
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.624"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </button>
                </form>
            </div>

        </>
    );
}

function ChatHistory({ data }) {
    return (
        <div className="chathistory">
            {data.history.map((chat, key) => {

                if (chat.role === "user") {
                    return (
                        <User key={key} name={localStorage.getItem("fname")} message={chat.parts} />
                    );
                }
                else {
                    return (
                        <Ai key={key} name={"Ai"} message={chat.parts} />
                    );
                }
            })}
        </div>
    )
}

// to display user chat from local storage
function User(props) {
    return (
        <div className="user">
            <div className="user-name">{props.name}</div>
            <div className="user-message">{props.message}</div>
        </div>
    );
}

// to display ai chat from local storage
function Ai(props) {
    let temp = props.message;
    // temp = temp.replace(/\*\*([A-Za-z0-9]+( [A-Za-z0-9]+)+):\*\*/g, ".");
    temp = temp.replace(/:\*\*/g, ":");
    temp = temp.replace(/\*\*/g, '');
    return (
        <div className="ai">
            <div className="ai-name">{props.name}</div>
            <div className="ai-message">{temp}</div>
        </div>
    );
}


export default ChatBox;