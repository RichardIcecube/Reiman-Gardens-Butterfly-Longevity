import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../css/DocentLogin.css';
import { useState } from 'react';
import { url } from "./GlobalVariable";

export const DocentLogin = () => {

  localStorage.setItem("userType", "noUserType");

  const setUser = () => {
    if (document.getElementById("docentLogin").value != null) {
      localStorage.setItem("user", document.getElementById("docentLogin").value);
      if (localStorage.getItem("user") == "") {
        localStorage.setItem("user", "noUser");
      }
      // console.log(localStorage.getItem("user"));
    }
  }

  const [username, setUsername] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUser();

    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() === "") {
      setError("Username cannot be empty");
      event.preventDefault();
      return;
    }

    var user = {
      username: username,
      password: "",
      userType: "docent"
    }
    try {
      const response = await fetch(url + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        let temp = "";
        temp = await response.text();
        localStorage.setItem("user", temp.split(",")[1].split("\"")[3]);
        // console.log(temp.split(",")[1].split("\"")[3]);
        localStorage.setItem("userType", "Docent");
        localStorage.setItem("username", username);
        navigate('/docent/home');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  return (
    <div className="docent-login" onLoad={localStorage.setItem("user", "noUser")}>
      <header className="docent-login-header">
        <Link to="/">
          <img src={logo} className="docent-login-logo" alt="logo" />
        </Link>
        <div className="docent-subheader">
          <label className="docent-project-label">Butterfly Longevity Project</label>
        </div>
      </header>
      <div className="docent-login-body">
        <p className="docent-login-type-label">Docent Login </p>
        <form onSubmit={handleSubmit}>
          <input type="test" name="name" className="docent-login-textbox" onChange={handleUsernameChange} id="docentLogin" placeholder='Name'></input><br />
          {error && <div className="error"> {error} </div>}
          <button type="submit" value="Login" className="docent-login-button">Login</button>
        </form>
      </div>
      <footer className="docent-login-footer">

      </footer>
    </div>
  );
}

export default DocentLogin;