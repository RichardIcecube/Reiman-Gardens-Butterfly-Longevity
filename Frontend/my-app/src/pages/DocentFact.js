import '../css/PublicDocentFact.css';
import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { url } from "./GlobalVariable";

export const DocentFact = () => {

  if (localStorage.getItem("userType") != "Docent") {
    window.location.href = "/docent/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  const addAnotherButterfly = () => {
    //need to have a way to clear the forum
    // console.log("Clicked addAnotherButterfly");
    window.open("/docent/add", "_self");
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
          //parse string to data
          document.getElementById("sciName").innerHTML = "Scientific Name: " + data.sciName;
          document.getElementById("realName").innerHTML = "Common Name: " + data.normName;
        })
        .catch(error => console.log(error));
    }
    catch (error) {
      console.log(error);
    }
    // console.log(localStorage.getItem('user'));
  }

  return (
    <div className="PDFact" onLoad={loadData}>
      <header className="PDFact-header">
        <Link to="/docent/home">
          <img src={logo} className="PDFact-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input type="button" value="Logout" className="PDFact-logout"></input>
        </Link>
      </header>
      <div className="PDFact-body">

        <p className="pdfact-title">
          Butterfly Information
        </p>
        <p className="pdfact-label" id="sciName">
          Loading sci name
        </p>
        <p className="pdfact-label" id="realName">
          Loading real name
        </p>
        <form id="input">
          <input type="button" onClick={addAnotherButterfly} value="Submit another" className="PDFact_submitButton"></input>
        </form>
      </div>
    </div>
  );
}
