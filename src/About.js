import "./styles.css";
import Header from "./Header";

import shivs from "./assets/shivs.jpg";
import sam from "./assets/sam.webp";
import saniya from "./assets/sans.jpg";
import shruti from "./assets/shruti.jpg";

function Aboutus() {
    return (
        <>
            <Header />
            <div className="aboutus">
                As a collective team of dedicated engineering students, our primary mission is to contribute significantly to the achievement of United Nations Goal 3, which centers around ensuring good health and well-being for all worldwide. Recognizing the critical need for accessible healthcare solutions, we are committed to leveraging our expertise in technology to create a sustainable and impactful model. While we acknowledge that technological knowledge alone may not be sufficient, our unwavering determination propels us forward, empowering us to make a noteworthy and enduring impact in the field. We understand the complexity of global health challenges and firmly believe that our collaborative efforts will lead to the development of innovative solutions that can positively influence healthcare accessibility and address the diverse healthcare issues faced by communities around the world.
            </div>
            <div className="team">
                <h1>Meet the Team</h1>
                <div className="team-member">
                    <div className="member">
                        <img src={sam} alt="member" />
                        <h3>Samriddh Verma</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="member">
                        <img src={saniya} alt="member" />
                        <h3>Saniya Sundrani</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="member">
                        <img src={shivs} alt="member" />
                        <h3>Shivaya Gupta</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="member">
                        <img src={shruti} alt="member" />
                        <h3>Shruti Upadhaya</h3>
                        <p>Full Stack Developer</p>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Aboutus;