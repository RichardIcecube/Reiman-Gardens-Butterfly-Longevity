import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../css/PublicLogin.css';
import { useState } from 'react';
import { url } from "./GlobalVariable";


export const PublicLogin = () => {

  localStorage.setItem("userType", "noUserType");

  const setUser = () => {
    if (document.getElementById("publicLogin").value != null) {
      localStorage.setItem("user", document.getElementById("publicLogin").value);
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
      userType: "public"
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

        localStorage.setItem("userType", "Public");
        localStorage.setItem("username", username);
        navigate('/public/home');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  return (
    <div className="public-login" onLoad={localStorage.setItem("user", "noUser")}>
      <header className="public-login-header">
        <Link to="/public/login">
          <img src={logo} className="public-login-logo" alt="logo" />
        </Link>
        <div className="public-subheader">
          <label className="public-project-label">Butterfly Longevity Project</label>
        </div>
      </header>
      <div className="public-login-body">
        <p className="public-login-type-label">Public Login </p>
        <form onSubmit={handleSubmit}>
          <input type="test" name="name" className="public-login-textbox" onChange={handleUsernameChange} id="publicLogin" placeholder='Username'></input><br />
          {error && <div className="error"> {error} </div>}
          <button type="submit" value="Login" className="public-login-button">Login</button>
        </form>
      </div>
      <footer className="public-login-footer">

      </footer>
    </div>
  );
}

export default PublicLogin;