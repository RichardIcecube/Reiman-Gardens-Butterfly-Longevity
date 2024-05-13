import '../css/PublicHome.css';
import logo from '../reiman-logo.svg';
import diagram from '../tag_diagram.svg';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

export const PublicHome = () => {
  const navigate = useNavigate();


  if (localStorage.getItem("userType") != "Public") {
    window.location.href = "/public/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  return (
    <div className="public-home">
      <header className="public-home-header">
        <Link to="/public/home">
          <img src={logo} className="public-home-logo" alt="logo" />
        </Link>
        <Link to="/public/login">
          <input type="button" value="Logout" className="public-home-logout"></input>
        </Link>
      </header>
      <div className="public-home-body">
        <form id="input">
          <p>
            <label className="public-tag-label">Report a Butterfly</label>
            <Link to="/public/add">
              <input type="button" value=" + " className="public-tag-button"></input>
            </Link>
          </p>

        </form>
        <label className="public-diagram-label">How to read a butterfly tag:</label>
        <img src={diagram} className="public-home-diagram" alt="diagram" />



      </div>
    </div>
  );
}
