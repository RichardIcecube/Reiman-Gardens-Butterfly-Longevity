import '../css/PublicAdd.css';
import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { url } from "./GlobalVariable";


export const PublicAdd = () => {

  if (localStorage.getItem("userType") != "Public") {
    window.location.href = "/public/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  const submit = async event => {
    var codes = document.querySelector('#codeInput');

    var butterflyData = "";
    butterflyData += "{\"user\":\"" + localStorage.getItem("user") + "\",";
    var code = codes.value;
    butterflyData += "\"alphaCode\":\"" + code + "\"}";

    localStorage.setItem('recentCode', code);
    // console.log(butterflyData);
    //needs to be updated to actual call
    try {
      fetch(url + "/butterflies/view",
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
          },
          body: butterflyData
        }
      )
        .then(response => {
          if (response.ok) {
            // console.log("Butterfly reported!");
            window.open("/public/fact", "_self");
            return response.json;
          }
          else {
            event.preventDefault();
            alert("Butterfly of alpha code " + code + " have not been released into the farm yet.");
            // console.log("Alpha code does not exist in database yet!");
          }
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }
  const Load = () => {
    localStorage.setItem('recentCode', "LOADING");
    // console.log(localStorage.getItem("user"));
  }

  return (
    <div className="public-add" onLoad={Load}>
      <header className="public-add-header">
        <Link to="/public/home">
          <img src={logo} className="public-add-logo" alt="logo" />
        </Link>
        <Link to="/public/login">
          <input type="button" value="Logout" className="public-add-logout"></input>
        </Link>
      </header>
      <div className="public-add-body">
        <p className="public-add-label">What butterfly did you see?</p>
        <form id="input">
          <input name="code" maxLength={3} className="public-codeInput" id="codeInput"></input>
        </form>
        <form id="input">
          <input type="button" onClick={submit} value="Submit" className="public-add-submit"></input>
        </form>
      </div>
    </div>
  );
}
