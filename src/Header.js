import "./styles.css";
import logo from "./assets/logo.png";

function Header() {
    return (
        <nav>
            <img src={logo} alt="Logo of HealSync" href="/"></img>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="about">About</a>
                </li>
                <li>
                    <a href="contact">Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default Header;