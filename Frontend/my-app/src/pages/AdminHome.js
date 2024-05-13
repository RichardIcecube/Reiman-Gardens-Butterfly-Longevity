import '../css/AdminHome.css';
import logo from '../reiman-logo.svg';
import diagram from '../tag_diagram.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export const AdminHome = () => {

  if(localStorage.getItem("userType") != "Admin"){
    window.location.href = "/admin/login";
  }
  else{
    //console.log(localStorage.getItem("userType"));
    //console.log(localStorage.getItem("username"));
  }
  return (
    <div className="admin-home">
      <header className="admin-home-header">
        <Link to="/admin/home">
          <img src={logo} className="admin-home-logo" alt="logo" />
        </Link>
        <Link to ="/">
          <input type="button" value="Logout" className="admin-home-logout"></input>
        </Link>
      </header>
      <div className="admin-home-body">
        <form id="input">
          <div className="admin-tagging">
            <label className="admin-tag-label">Report a Butterfly</label>
            <Link to = "/admin/add">
            <input type="button"  value=" + " className="admin-tag-button"></input>
            </Link>
          </div>
          <p>
          <Link to = "/admin/register">
            <input type="button" value="Register Butterfly" className="admin-home-button"></input>
          </Link>
          </p>
          <p>
          <Link to = "/admin/species">
            <input type="button" value="Add Species" className="admin-home-button"></input>
          </Link>
          </p>
          <p>
          <Link to = "/admin/manage">
            <input type="button" value="Access Database" className="admin-home-button"></input>
            </Link>
          </p>
          <p>
          <Link to = "/admin/generate">
            <input type="button"  value="Generate a Report" className="admin-home-button"></input>
            </Link>
          </p>

        </form>
        <label className="admin-diagram-label">How to read a butterfly tag:</label>
        <img src={diagram} className="admin-home-diagram" alt="diagram" />
      </div>
    </div>
  );
}
