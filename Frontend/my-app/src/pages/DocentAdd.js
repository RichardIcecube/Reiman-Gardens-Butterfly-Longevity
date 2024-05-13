import '../css/DocentAdd.css';
import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { url } from "./GlobalVariable";

export const DocentAdd = () => {


  if (localStorage.getItem("userType") != "Docent") {
    window.location.href = "/docent/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  const submitAdd = async event => {
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
            window.open("/docent/add", "_self");
            return response.json;
          }
          else {
            event.preventDefault();
            alert("Butterfly of alpha code " + code + " have not been released yet.");
            // console.log("Alpha code does not exist in database yet!");
          }
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  // Submit 1
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
            window.open("/docent/fact", "_self");
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
  };
  const Load = () => {
    localStorage.setItem('recentCode', "LOADING");
  };

  return (
    <div className="docent-add" onLoad={Load}>
      <header className="docent-add-header">
        <Link to="/docent/home">
          <img src={logo} className="docent-add-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input type="button" value="Logout" className="docent-add-logout"></input>
        </Link>
      </header>
      <div className="docent-add-body">
        <p className="docent-add-label">What butterfly did you see?</p>
        <form id="input">
          <input name="code" maxLength={3} className="docent-codeInput" id="codeInput"></input>
        </form>
        <form id="input">
          <input type="button" onClick={submit} value="Submit" className="docent-add-submit"></input>
        </form>
        <form id="input">
          <input type="button" onClick={submitAdd} value="Quick Submit" className="docent-add-submit"></input>
        </form>
      </div>
    </div>
  );
}
