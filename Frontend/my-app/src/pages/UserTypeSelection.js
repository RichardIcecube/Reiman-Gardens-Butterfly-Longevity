import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../css/UserTypeSelection.css';

export const UserTypeSelection = () => {

  localStorage.setItem("userType", "noUserType");

  return (
    <div className="App" onLoad={localStorage.setItem("userType", "noUserType")}>
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <div className="subheader">
          <label className="project-label">Butterfly Longevity Project</label>
        </div>
      </header>
      <div className="App-body">
        <p className="user-type-label">
          What kind of user are you?
        </p>
        <div className="button-container">
          
          <Link to="/public/login">
            <button className='usertype-selection-button'>Public</button>
          </Link>
          <Link to="/docent/login">
            <button className='usertype-selection-button'>Docent</button>
          </Link>
          <Link to="/admin/login">
            <button className='usertype-selection-button'>Admin</button>
          </Link>
        </div>
      </div>
      <footer className="App-footer">
        
      </footer>
    </div>
  );
}

export default UserTypeSelection;