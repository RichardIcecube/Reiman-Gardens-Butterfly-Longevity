import "../css/GenerateReport.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import logo from "../reiman-logo.svg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { url } from "./GlobalVariable";


export const GenerateReport = () => {

  const navigate = useNavigate();

  function handleSubmitIndividual(event) {
    event.preventDefault();
    let alphacode = document.getElementById("alphacode").value;
    let checkBox1 = document.getElementById("individual1").checked;
    let checkBox2 = document.getElementById("individual2").checked;
    let checkBox3 = document.getElementById("individual3").checked;
    let checkBox4 = document.getElementById("individual4").checked;
    if (alphacode === "" || alphacode.length < 3) {
      alert("Please enter a valid alphacode!");
      return;
    }
    let userInput = { alphacode, checkBox1, checkBox2, checkBox3, checkBox4 };

    localStorage.setItem("userInput", JSON.stringify(userInput));
    localStorage.setItem("filterType", "individual");
    // console.log(userInput);
    navigate('/admin/report');
  }

  function handleSubmitSpecies(event) {
    event.preventDefault();
    let speciesname = document.getElementById("speciesname").value;
    let checkBox1 = document.getElementById("species1").checked;
    let checkBox2 = document.getElementById("species2").checked;
    let checkBox3 = document.getElementById("species3").checked;
    if (speciesname === "") {
      alert("Please enter a valid butterfly species!");
      return;
    }
    let userInput = { speciesname, checkBox1, checkBox2, checkBox3 };

    localStorage.setItem("userInput", JSON.stringify(userInput));
    localStorage.setItem("filterType", "species");
    // console.log(userInput);
    navigate('/admin/report');
  }

  function handleSubmitDateRegister(event) {
    event.preventDefault();
    let dateRegister = document.getElementById("dateregister").value;
    let checkBox1 = document.getElementById("register1").checked;
    let checkBox2 = document.getElementById("register2").checked;
    if (dateRegister === "") {
      alert("Please select a date!");
      return;
    }
    let userInput = { dateRegister, checkBox1, checkBox2 };

    localStorage.setItem("userInput", JSON.stringify(userInput));
    localStorage.setItem("filterType", "dateRegister");
    // console.log(userInput);
    navigate('/admin/report');
  }

  function handleSubmitDateReport(event) {

    event.preventDefault();
    let dateReport = document.getElementById("datereport").value;
    let checkBox1 = document.getElementById("report1").checked;
    let checkBox2 = document.getElementById("report2").checked;
    let checkBox3 = document.getElementById("report3").checked;
    if (dateReport === "") {
      alert("Please select a date!");
      return;
    }
    let userInput = { dateReport, checkBox1, checkBox2, checkBox3 };

    localStorage.setItem("userInput", JSON.stringify(userInput));
    localStorage.setItem("filterType", "dateReport");
    // console.log(userInput);
    navigate('/admin/report');
  }

  function handleSubmitStatus(event) {
    event.preventDefault();
    let checkBox1 = document.getElementById("status1").checked;
    let checkBox2 = document.getElementById("status2").checked;
    let checkBox3 = document.getElementById("status3").checked;

    let userInput = { checkBox1, checkBox2, checkBox3 };

    localStorage.setItem("userInput", JSON.stringify(userInput));
    localStorage.setItem("filterType", "status");
    // console.log(userInput);
    navigate('/admin/report');
  }

  function handleSubmitReportBy(event) {
    event.preventDefault();
    let reportBy = document.getElementById("reportby").value;
    if (reportBy === "") {
      alert("Please enter a name!");
      return;
    }
    let userInput = { reportBy };

    localStorage.setItem("userInput", JSON.stringify(userInput));
    localStorage.setItem("filterType", "reportBy");
    // console.log(userInput);
    navigate('/admin/report');
  }

  function handleSubmitReportGroup(event) {

    event.preventDefault();
    let checkBox1 = document.getElementById("group1").checked;
    let checkBox2 = document.getElementById("group2").checked;
    let checkBox3 = document.getElementById("group3").checked;

    let userInput = { checkBox1, checkBox2, checkBox3 };

    localStorage.setItem("userInput", JSON.stringify(userInput));
    localStorage.setItem("filterType", "reportGroup");
    // console.log(userInput);
    navigate('/admin/report');
  }

  const [section, setSection] = useState("individual");
  const handleRadioChange = (event) => {
    setSection(event.target.value);
  };

  if (localStorage.getItem("userType") != "Admin") {
    window.location.href = "/admin/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  let nameList = [];
  let [nameOptions, setOptions] = useState(nameList);
  async function GetList() {
    try {
      let response = await fetch(url + "/bflookup", {
        method: "GET",
      })
        .catch(error => console.log(error));
      let data = await response.text();
      let splitData = data.split("}");
      let test = ["answers1"];
      //answers.pop();
      for (let i = 0; i < splitData.length; i++) {
        test[i] = splitData[i].split("\"")[9] + " | " + splitData[i].split("\"")[5];
        //if(tempint !=1)
        //console.log(test[i]);
        //tempint = 1;
        //str.
      }
      //console.log(splitData);
      test.pop();
      setOptions(test);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-generate" onLoad={GetList}>
      <header className="admin-generate-header">
        <Link to="/admin/home">
          <img src={logo} className="admin-generate-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input
            type="button"
            value="Logout"
            className="admin-generate-logout"
          ></input>
        </Link>
      </header>
      <div className="admin-generate-body">
        <div className="admin-generate-container">
          <label className="admin-generate-label">
            <input
              type="radio"
              name="section"
              value="individual"
              checked={section === "individual"}
              onChange={handleRadioChange}
            />
            Individual Butterfly
          </label>{" "}
          <br />
          <label className="admin-generate-label">
            <input
              type="radio"
              name="section"
              value="species"
              checked={section === "species"}
              onChange={handleRadioChange}
            />
            Species of Butterflies
          </label>
          <br />
          <label className="admin-generate-label">
            <input
              type="radio"
              name="section"
              value="dateRegister"
              checked={section === "dateRegister"}
              onChange={handleRadioChange}
            />
            Date Registered
          </label>
          <br />
          <label className="admin-generate-label">
            <input
              type="radio"
              name="section"
              value="dateReport"
              checked={section === "dateReport"}
              onChange={handleRadioChange}
            />
            Date Butterfly Tagged
          </label>
          <br />
          <label className="admin-generate-label">
            <input
              type="radio"
              name="section"
              value="status"
              checked={section === "status"}
              onChange={handleRadioChange}
            />
            Status
          </label>
          <br />
          <label className="admin-generate-label">
            <input
              type="radio"
              name="section"
              value="reportBy"
              checked={section === "reportBy"}
              onChange={handleRadioChange}
            />
            Reported By
          </label>
          <br />
          <label className="admin-generate-label">
            <input
              type="radio"
              name="section"
              value="reportGroup"
              checked={section === "reportGroup"}
              onChange={handleRadioChange}
            />
            Report Group
          </label>
          <br />
          {section === "individual" && (
            <form className="admin-generate-form" onSubmit={handleSubmitIndividual}>
              <label className="admin-generate-title">Individual Butterfly</label>
              <div>
                <input
                  type="text"
                  name="alphacode"
                  id="alphacode"
                  className="admin-generate-textbox-alphacode"
                  placeholder="AAA"
                  maxLength={3}
                ></input>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="individual1"
                  name="individual1"
                  className="admin-generate-checkbox"
                  value="Long"
                />
                <label for="individual1" className="admin-generate-label">
                  {" "}
                  How long did it live?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="individual2"
                  name="individual2"
                  className="admin-generate-checkbox"
                  value="Times"
                />
                <label for="individual2" className="admin-generate-label">
                  {" "}
                  How many times was it reported?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="individual3"
                  name="individual3"
                  className="admin-generate-checkbox"
                  value="Released"
                />
                <label for="individual3" className="admin-generate-label">
                  {" "}
                  When it was released?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="individual4"
                  name="individual4"
                  className="admin-generate-checkbox"
                  value="Last"
                />
                <label for="individual4" className="admin-generate-label">
                  {" "}
                  When was the last report made?
                </label>
                <br />
                <button type="submit" className="admin-generate-submit">Submit</button>
              </div>

            </form>
          )}
          {section === "species" && (
            <form className="admin-generate-form" onSubmit={handleSubmitSpecies}>
              <label className="admin-generate-title">Species of Butterfly</label>
              <div className="admin-generate-autocomplete">
                <Autocomplete
                  disablePortal
                  id="speciesname"
                  options={nameOptions}
                  sx={{ width: 430 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Butterfly Name" />
                  )}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="species1"
                  name="species1"
                  className="admin-generate-checkbox"
                  value="Different"
                />
                <label for="species1" className="admin-generate-label">
                  {" "}
                  How many different butterflies in the species have reports?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="species2"
                  name="species2"
                  className="admin-generate-checkbox"
                  value="Lifespan"
                />
                <label for="species2" className="admin-generate-label">
                  {" "}
                  What is the average lifespan across the species?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="species3"
                  name="species3"
                  className="admin-generate-checkbox"
                  value="Observations"
                />
                <label for="species3" className="admin-generate-label">
                  {" "}
                  What is the average observations across the species?
                </label>
                <br />
                <button type="submit" className="admin-generate-submit">Submit</button>
              </div>
            </form>
          )}
          {section === "dateRegister" && (
            <form className="admin-generate-form" onSubmit={handleSubmitDateRegister}>
              <label className="admin-generate-title">Date Registered</label>
              <input
                type="date"
                name="name"
                id="dateregister"
                className="admin-generate-textbox"
                placeholder="Date"
              ></input>
              <br />
              <div>
                <input
                  type="checkbox"
                  id="register1"
                  name="register1"
                  className="admin-generate-checkbox"
                  value="Released"
                />
                <label for="register1" className="admin-generate-label">
                  {" "}
                  What butterflies were released that day?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="register2"
                  name="register2"
                  className="admin-generate-checkbox"
                  value="Total"
                />
                <label for="register2" className="admin-generate-label">
                  {" "}
                  How many total butterflies were registered on that day?
                </label>
                <br />
                <button type="submit" className="admin-generate-submit">Submit</button>

              </div>
            </form>
          )}
          {section === "dateReport" && (
            <form className="admin-generate-form" onSubmit={handleSubmitDateReport}>
              <label className="admin-generate-title">Date Butterfly Tagged</label>
              <input
                type="date"
                name="name"
                id="datereport"
                className="admin-generate-textbox"
                placeholder="Date"
              ></input>
              <br />
              <div>
                <input
                  type="checkbox"
                  id="report1"
                  name="report1"
                  className="admin-generate-checkbox"
                  value="Butterflies"
                />
                <label for="report1" className="admin-generate-label">
                  {" "}
                  What butterflies were seen that day?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="report2"
                  name="report2"
                  className="admin-generate-checkbox"
                  value="Alphacodes"
                />
                <label for="report2" className="admin-generate-label">
                  {" "}
                  What alphacodes were seen that day?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="report3"
                  name="report3"
                  className="admin-generate-checkbox"
                  value="Reports"
                />
                <label for="report3" className="admin-generate-label">
                  {" "}
                  How many total reports were made?
                </label>
                <br />
                <button type="submit" className="admin-generate-submit">Submit</button>

              </div>
            </form>
          )}
          {section === "status" && (
            <form className="admin-generate-form" onSubmit={handleSubmitStatus}>
              <label className="admin-generate-title">Status</label>
              <div>
                <input
                  type="checkbox"
                  id="status1"
                  name="status1"
                  className="admin-generate-checkbox"
                  value="Dead"
                />
                <label for="status1" className="admin-generate-label">
                  {" "}
                  What butterflies are dead?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="status2"
                  name="status2"
                  className="admin-generate-checkbox"
                  value="Alive"
                />
                <label for="status2" className="admin-generate-label">
                  {" "}
                  What butterflies are alive?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="status3"
                  name="status3"
                  className="admin-generate-checkbox"
                  value="Categories"
                />
                <label for="status3" className="admin-generate-label">
                  {" "}
                  What are the totals of these categories?
                </label>
                <br />
                <button type="submit" className="admin-generate-submit">Submit</button>

              </div>
            </form>
          )}
          {section === "reportBy" && (
            <form className="admin-generate-form" onSubmit={handleSubmitReportBy}>
              <label className="admin-generate-title">Reported By</label>
              <input
                type="text"
                name="name"
                id="reportby"
                className="admin-generate-textbox"
                placeholder="Name"
              ></input>
              <br />
              <button type="submit" className="admin-generate-submit">Submit</button>

            </form>
          )}
          {section === "reportGroup" && (
            <form className="admin-generate-form" onSubmit={handleSubmitReportGroup}>
              <label className="admin-generate-title">Reported Group</label>
              <div>
                <input
                  type="checkbox"
                  id="group1"
                  name="group1"
                  className="admin-generate-checkbox"
                  value="Admins"
                />
                <label for="group1" className="admin-generate-label">
                  {" "}
                  Total reports made by admins?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="group2"
                  name="group2"
                  className="admin-generate-checkbox"
                  value="Docents"
                />
                <label for="group2" className="admin-generate-label">
                  {" "}
                  Total reports made by docents?
                </label>
                <br />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="group3"
                  name="group3"
                  className="admin-generate-checkbox"
                  value="Public"
                />
                <label for="group3" className="admin-generate-label">
                  {" "}
                  Total reports made by public?
                </label>
                <br />
                <button type="submit" className="admin-generate-submit">Submit</button>

              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
