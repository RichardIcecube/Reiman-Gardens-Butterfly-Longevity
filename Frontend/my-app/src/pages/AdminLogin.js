import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css';
import { useState } from 'react';
import { url } from "./GlobalVariable";

export const AdminLogin = () => {

  localStorage.setItem("userType", "noUserType");

  const setUser = () => {
    if (document.getElementById("adminLogin").value != null) {
      localStorage.setItem("user", document.getElementById("adminLogin").value);
      if (localStorage.getItem("user") == "") {
        localStorage.setItem("user", "noUser");
      }
      // console.log(localStorage.getItem("user"));
    }
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUser();
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userType = 'admin';

    if (username.trim() === "") {
      setError("Username cannot be empty");
      event.preventDefault();
      return;
    }

    try {
      const response = await fetch(url + '/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, userType })
      }).then((response => {
        if (!response.ok) {
          setError("Invalid Password!");
          event.preventDefault();
        }
        else {
          localStorage.setItem("userType", "Admin");
          localStorage.setItem("username", username);
          navigate('/admin/home');
        }
      }));


    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  return (
    <div className="admin-login">
      <header className="admin-login-header">
        <Link to="/">
          <img src={logo} className="admin-login-logo" alt="logo" />
        </Link>
        <div className="admin-subheader">
          <label className="admin-project-label">Butterfly Longevity Project</label>
        </div>
      </header>
      <div className="admin-login-body">
        <p className="admin-login-type-label">Admin Login </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder='Username' value={username} onChange={handleUsernameChange} className="admin-login-textbox" id="adminLogin"></input><br />
          <input type="password" name="password" placeholder='Password' value={password} onChange={handlePasswordChange} className="admin-login-textbox"></input><br />
          {error && <div className="error"> {error} </div>}
          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
      <footer className="admin-login-footer">

      </footer>
    </div>
  );
}

export default AdminLogin;