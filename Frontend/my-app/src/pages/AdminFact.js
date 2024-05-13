import '../css/AdminFact.css';
import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { url } from "./GlobalVariable";


export const AdminFact = () => {

  if (localStorage.getItem("userType") != "Admin") {
    window.location.href = "/admin/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  const addAnotherButterfly = () => {
    //need to have a way to clear the forum
    // console.log("Clicked addAnotherButterfly");
    window.open("/admin/add", "_self");
  }

  async function loadData() {
    var code = "Loading";
    if (localStorage.getItem('recentCode') != null && localStorage.getItem('recentCode').length == 3) {
      code = localStorage.getItem('recentCode');
      // console.log(code);
    } else {
      alert("This butterfly does not exist in the farm!");
      // console.log("Item not found");
    }
    try {
      fetch(url + "/butterflies/alpha",
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
          },
          body: "{\"username\"\:\"" + code + "\"}"
        }).then(async response => {
          let data = await response.json();
          let initial = new Date(data.creationDate);
          let final = data.deathDate;
          if (final === null)
            final = new Date();
          else
            final = new Date(final);

          let delta = (final - initial) / 1000;

          let days = Math.floor(delta / 86400);
          delta -= days * 86400;

          let hours = Math.floor(delta / 3600) % 24;
          delta -= hours * 3600;

          let minutes = Math.floor(delta / 60) % 60;
          delta -= minutes * 60;

          let seconds = delta % 60;


          //parse string to data
          document.getElementById("alphacode").innerHTML = "Alphacode: " + data.alphaCode;
          document.getElementById("sciName").innerHTML = "Scientific Name: " + data.sciName;
          document.getElementById("commonName").innerHTML = "Common Name: " + data.normName;
          document.getElementById("lifespan").innerHTML = "Lifespan: " + days + " days " + hours + " hours " + minutes + " minutes " + seconds.toFixed(2) + " seconds ";
          document.getElementById("times-seen").innerHTML = "Total Number of views: " + (data.totViews - 1);
        })
        .catch(error => console.log(error));
    }
    catch (error) {
      console.log(error);
    }
    // console.log(localStorage.getItem('user'));
  }

  return (
    <div className="AdminFact" onLoad={loadData}>
      <header className="AdminFact-header">
        <Link to="/admin/home">
          <img src={logo} className="AdminFact-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input type="button" value="Logout" className="AdminFact-logout"></input>
        </Link>
      </header>
      <div className="AdminFact-body">
        <p className="admin-fact-title">
          Butterfly Information
        </p>
        <p className="admin-fact-label" id="alphacode">
          alpha code 
        </p>
        <p className="admin-fact-label" id="sciName">
          scientific name
        </p>
        <p className="admin-fact-label" id="commonName">
          common name
        </p>
        <p className="admin-fact-label" id="lifespan">
          lifespan
        </p>
        <p className="admin-fact-label" id="times-seen">
          times seen
        </p>
        <form id="input">
          <input type="button" onClick={addAnotherButterfly} value="Submit another" className="PDFact_submitButton"></input>
        </form>
      </div>
    </div>
  );
}
