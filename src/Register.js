import "./styles.css";
import { useState } from 'react';

function Register({setIsLoggedin}) {
    const [checkboxcd, setcheckboxcd] = useState(false);
    const [checkboxloc, setcheckboxloc] = useState(true);
    const [location, setlocation] = useState();
    const [enableSubmit, setenableSubmit] = useState(false);
  
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("api called")
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=4e489c08f13d4a269d9e271219953919`)
          .then(response => response.json())
          .then(data => {console.log(data.results[0].formatted);
          setlocation(data.results[0].formatted);
          setenableSubmit(true);
        });
          
      });
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      localStorage.setItem("fname", event.target.fname.value);
        var fname = localStorage.getItem("fname");
      localStorage.setItem("lname", event.target.lname.value);
      localStorage.setItem("medical", event.target.medcd.value);
        var medical = localStorage.getItem("medical");
      localStorage.setItem("location", event.target.loc.value);
        var location = localStorage.getItem("location");
      console.log("chat update called from chat.js")
      var text = "Hello, I am "+ fname +" " +". I am from "+ location +". I have "+ medical +". You are to act as my personal assistant and are supposed to tell me how can i care for myself in short 100 words paragraphs. You can use the information i have given you to get started.";
      localStorage.setItem("chatai", JSON.stringify({
          "history":[{
                  "role":"user","parts": text
              },
              {
                  "role":"model","parts":"Hello, I am your personal assistant. I will help you to care for yourself."
              }]}));
      localStorage.setItem("chat", JSON.stringify({
          "history":[
              {
                  "role":"model","parts":"Hello, I am your personal assistant. I will help you to care for yourself."
              }]}));
      
      setIsLoggedin(true);
    }
    return (
      <>
        <form className="register" onSubmit={handleSubmit}>
            <p>First Name</p>
            <input type="text" id="fname" placeholder="Enter your name"></input>
            <p>Last Name</p>
            <input type="text" id="lname" placeholder="Enter your name"></input>
            <div className="disease">
                <p>Diseases
                <input type='checkbox' id='medcb' onInput={() => {if (checkboxcd === false)
                    setcheckboxcd(true)
                    else
                    setcheckboxcd(false)
                }}></input>
                </p>
            </div>
            {checkboxcd? <input type="text" id="medcd" placeholder="Enter your congenital disease"></input> : 
            <input type="text" id="medcd" value="no diseases" disabled placeholder="Enter your congenital disease"></input>}
            <p>Location</p>
              <div className="loc">
                <p>Get Location automatically
                <input id='loccb' type="checkbox" onInput={() => {if (checkboxloc === false)
                    {setcheckboxloc(true);
                    }
                    else
                   { setcheckboxloc(false);
                    getLocation();}
                }}></input>
                </p>
              </div>
  
                {checkboxloc? <input type="text" id='loc' onChange={(e)=> {
  
                 if(e.target.value === "")
                 {
                  setenableSubmit(false);
                 }
                 else
                  setenableSubmit(true);
                 }}
                 placeholder="Enter your location"></input> : 
                    <input type="text" id='loc' disabled value={location} placeholder={location}></input>
                }
                {enableSubmit? <input className="submit" type="submit" value="Submit"></input> : 
                    <input className="submit" type="submit" value="Submit" disabled></input>
                }
        </form>
      </>
    );
  }

  export default Register; 