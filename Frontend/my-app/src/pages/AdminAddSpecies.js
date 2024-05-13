import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../css/AdminAddSpecies.css';
import { useState } from 'react';
import { url } from "./GlobalVariable";

export const AdminAddSpecies = () => {

  if (localStorage.getItem("userType") != "Admin") {
    window.location.href = "/admin/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  const [common, setCommon] = useState('');
  const [scientific, setScientific] = useState('');
  const navigate = useNavigate();

  const handleCommonChange = (event) => {
    setCommon(event.target.value);
  };

  const handleScientificChange = (event) => {
    setScientific(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCommon(document.getElementById("common").innerText);
    setScientific(document.getElementById("scientific").innerText);
    try {
      const response = await fetch(url + '/bflookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ "scientificName": scientific, "normalName": common })
      }).then((response => {
        if (!response.ok) {
          alert('Invalid common or scientific name');
          event.preventDefault();
        }
        else {
          navigate('/admin/species');
        }
      }));


    } catch (error) {
      console.error('Error adding species:', error);
      throw error;
    }
  };

  return (
    <div className="admin-species">
      <header className="admin-species-header">
        <Link to="/admin/home">
          <img src={logo} className="admin-species-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input type="button" value="Logout" className="admin-species-logout"></input>
        </Link>
      </header>
      <div className="admin-species-body">
        <p className="admin-species-label">Add Species </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="common" placeholder='Common Name' value={common} onChange={handleCommonChange} className="admin-species-textbox" id="common"></input><br />
          <input type="text" name="scientific" placeholder='Scientific Name' value={scientific} onChange={handleScientificChange} className="admin-species-textbox" id="scientific"></input><br />
          <button type="submit" onClick={handleSubmit} className="admin-species-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddSpecies;