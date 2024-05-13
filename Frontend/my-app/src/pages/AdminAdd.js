import '../css/AdminAdd.css';
import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { url } from "./GlobalVariable";

export const AdminAdd = () => {

  if (localStorage.getItem("userType") != "Admin") {
    window.location.href = "/admin/login";
  }
  else {
    //console.log(localStorage.getItem("userType"));
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
            window.open("/admin/fact", "_self");
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
            window.open("/admin/add", "_self");
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

  const Load = () => {
    localStorage.setItem('recentCode', "LOADING");
    // console.log(localStorage.getItem("user"));
  }
  return (
    <div className="admin-add" onLoad={Load}>
      <header className="admin-add-header">
        <Link to="/admin/home">
          <img src={logo} className="admin-add-logo" alt="logo" />
        </Link>
        <Link to="/admin/login">
          <input type="button" value="Logout" className="admin-add-logout"></input>
        </Link>
      </header>
      <div className="admin-add-body">
        <p className="admin-add-label">What butterfly did you see?</p>
        <form id="input">
          <input name="code" maxLength={3} className="admin-codeInput" id="codeInput"></input>
        </form>
        <form id="input">
          <input type="button" onClick={submit} value="Submit" className="admin-add-submit"></input>
        </form>

        <form id="input">
          <input type="button" onClick={submitAdd} value="Quick Submit" className="admin-add-submit"></input>
        </form>

      </div>
    </div>
  );
}
