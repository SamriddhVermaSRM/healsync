import './styles.css';
import { useState } from 'react';
import Header from './Header.js';
import Register from './Register.js';

function Home() {
    const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem("fname") ? true : false);
    return (
        <>
            <Header />
            {
                isLoggedin ?
                    <Welcome name={localStorage.getItem("fname")} /> : <Register setIsLoggedin={setIsLoggedin} />
            }
        </>
    );
}

function Welcome(props) {
    return (
        <div className="welcome">
            <h1>Hello, <div className="name">{props.name}</div></h1>
            <div className="box">
                <p>How are you Feeling today?</p>
                <a href="chat" className="arrow">
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default Home;
