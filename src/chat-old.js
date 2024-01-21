import "./styles.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import Data from "./Data.json";

// log function
    const log = (message) => {
        console.log(message);
    };

// API KEY
    const API_KEY = "AIzaSyDz_OSzMjKfWQn88ovD0IEd1kqv-nzFCZs";

    const getchat = () => {
        return (JSON.parse(localStorage.getItem("chat")));
    }

// Gemini API
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const chat = model.startChat({
        "history":[
            {
                "role":"user","parts":"Hello, I have 2 dogs in my house."
            },
            {
                "role":"model","parts":"Great to meet you. What would you like to know?"
            }]
        });




// local storage logger
    const logc = () => {
        log(localStorage.getItem("chat"));
    };

// reset local storage
    const resetls = () => {
        localStorage.setItem("chat", JSON.stringify(Data.chat));
    }

// Data.json to local storage
    // localStorage.setItem("chat", JSON.stringify(data.chat));


// main chat function
    function ChatBox() {
        const [chunkText, setchunkText] = useState("");
        const [utext, setuText] = useState("");
        const [finalText, setfinalText] = useState("");
        const [req, setreq] = useState(false);
        // to update local storage with user message
            const UserChatStore = (text) => {
                var data = getchat();
                    data.history.push(
                        {
                            role: "user",
                            parts: text
                        }
                    );
                    localStorage.setItem("chat", JSON.stringify(data));
                    // setData(data);
            }

        // to update local storage with AI message
            const AiChatStore = (text) => {
                var data = getchat();
                data.history.push(
                    {
                        role: "model",
                        parts: text
                    }
                );
                localStorage.setItem("chat", JSON.stringify(data));
                // setData(data);
            }

        // to handle submit and call the ai function
            const handleSubmit = (event) => {
                event.preventDefault();         // prevents page from reloading
                if (utext !== "") {
                    setreq(true);                // set req to true to call ai function
                }                               // if user input is not empty, call ai function
            }

        // ai function
            useEffect(() => {
                const ai = async () => {
                    const result = await chat.sendMessageStream(utext);
                    let text = '';
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        setchunkText(chunkText);
                        text += chunkText;
                    }
                    
                    // console.log(result);
                    setfinalText(text);             // set final text to be displayed
                    UserChatStore(utext);           // update local storage with user message
                    AiChatStore(text);             // update local storage with AI message
                };
                ai();
                log("func called")
            }, [req, utext]);
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={e => setuText(e.target.value)} placeholder="Enter message" />
                    <button type="submit">Send</button>
                </form>
                <button onClick={logc}>Log chat</button> {/*      to log local storage:         REMOVE */}
                <button onClick={resetls}>Reset chat</button> {/* to reset local storage:       REMOVE */}
                {finalText}
            </>
        );
    }

    function Chat() {
        return (
            <>
                <Header />
                <div className="chat">
                    <ChatHistory  />
                    <div className="chat-box">
                        <ChatBox  />
                    </div>
                </div>
            </>
        );
    }

    function test(dataTBU) {
        var data = getchat();
        if (dataTBU != null)
            data = dataTBU;
        return data;
    }

    function ChatHistory() {
        // var data = JSON.parse(localStorage.getItem("chat"));
        var data = test();
        
        return (
            <>
                <div className="chat-history">
                    {data.history.map((chat) => {
                        if (chat.role === "user") {
                            return (
                                <User name={chat.role} message={chat.parts} />
                            );
                        }
                        else {
                            return (
                                <Ai name={chat.role} message={chat.parts} />
                            );
                        }
                    })}
                </div>
            </>
        );
    }

// to display user chat from local storage
    function User(props) {
        return (
            <div bgcolor="#eeeee" className="user">
                <div className="user-name">{props.name}</div>
                <div className="user-message">{props.message}</div>
            </div>
        );
    }

// to display ai chat from local storage
    function Ai(props) {
        return (
            <div background="#acacac" className="ai">
                <div className="ai-name">{props.name}</div>
                <div className="ai-message">{props.message}</div>
            </div>
        );
    }

export default Chat;



// things to do for tomorrow:
// 1. add css for user and ai chat
// 2. add css for chat box
// 3. make a map to display all the chats
// 
// 
// IMPORTANT:
// SIGNUP PAGE
// LOGIN PAGE