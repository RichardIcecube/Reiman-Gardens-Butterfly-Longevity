import '../css/DocentHome.css';
import logo from '../reiman-logo.svg';
import diagram from '../tag_diagram.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export const DocentHome = () => {

  if(localStorage.getItem("userType") != "Docent"){
    window.location.href = "/docent/login";
  }
  else{
    // console.log(localStorage.getItem("userType"));
  }

  return (
    <div className="docent-home">
      <header className="docent-home-header">
        <Link to="/docent/home">
          <img src={logo} className="docent-home-logo" alt="logo" />
        </Link>
        <Link to ="/">
          <input type="button" value="Logout" className="docent-home-logout"></input>
        </Link>
      </header>
      <div className="docent-home-body">
        <form id="input">
          <p>
            <label className="docent-tag-label">Report a Butterfly</label>
            <Link to="/docent/add">
              <input type="button"  value=" + " className="docent-tag-button"></input>
            </Link>
          </p>
        </form>
        <label className="docent-diagram-label">How to read a butterfly tag:</label>
        <img src={diagram} className="docent-home-diagram" alt="diagram" />
      </div>
    </div>
  );
}
