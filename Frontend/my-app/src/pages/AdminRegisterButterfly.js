import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../css/AdminRegisterButterfly.css';
import logo from '../reiman-logo.svg';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { url } from "./GlobalVariable";

export const RegisterButterfly = (value) => {

  if (localStorage.getItem("userType") !== "Admin") {
    window.location.href = "/admin/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  let nameList = [];
  const [count, setCount] = useState(4);
  let [nameOptions, setOptions] = useState(nameList);
  const handleRadioChange = async (event) => {
    setCount(parseInt(event.target.value));
  };

  useEffect(() => {
    populateCodes();
  });

  const LabelValue = (label) => {
    return (
      <Box fontSize={23} marginTop={0.5}>
        {label}
      </Box>
    )
  }

  async function populateCodes() {
    try {
      fetch(url + "/butterflies",
        {
          method: "GET",
        }
      )
        .then(async response => {
          let data = await response.json();
          let code = data[data.length - 1].alphaCode;
          // console.log(code);

          for (let i = 1; i <= count; i++) {
            let textbox = document.getElementById("textbox" + i);
            if (code.charAt(2) === 'Z') {
              if (code.charAt(1) === 'Z') {
                if (code.charAt(0) === 'Z') return "";
                else {
                  if (code.charAt(2) === 'Z') {
                    code = String("".concat(String.fromCharCode(code.charAt(0).charCodeAt() + 1), 'A', 'A'));
                    // console.log(code);
                  }
                  else {
                    code = String("".concat(String.fromCharCode(code.charAt(0).charCodeAt() + 1), 'A', code.charAt(2)));
                    // console.log(code);
                  }
                }
              }
              else {
                code = String("".concat(code.charAt(0), String.fromCharCode(code.charAt(1).charCodeAt() + 1), 'A'));
                // console.log(code);
              }
            }
            else {
              code = String("".concat(code.charAt(0), code.charAt(1), String.fromCharCode(code.charAt(2).charCodeAt() + 1)));
              // console.log(code);
            }
            // console.log(code);
            textbox.value = code;
          }

        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

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
      }
      //console.log(splitData);
      test.pop();
      setOptions(test);
    }
    catch (error) {
      console.log(error);
    }
  };
  //GetList().then(response => setOptions(response));

  const submit = async event => {
    var codes = [];
    var names = [];
    var dateRegister = document.getElementById("dateregister").value;

    for (let i = 0; i < count; i++) {
      let code = document.getElementById("textbox" + (i + 1)).value;
      let name = document.getElementById("name" + (i + 1)).value;

      if (code !== "" && name !== "") {
        codes.push(code);
        names.push(name);
      }
    }

    var butterflyData = "[";
    for (let i = 0; i < codes.length; i++) {
      var name = names[i];
      var code = codes[i];
      if (name !== "" && code !== "") {
        if (i !== 0) {
          butterflyData += ",";
        }
        butterflyData += "{ \"user\":\"" + localStorage.getItem("username") + "\",\"sciName\":\"" + name.split(" | ")[1] + "\",\"normName\":\"" + name.split(" | ")[0] + "\",\"alphaCode\":\"" + code + "\",\"status\":\"alive\",\"funFact\":\"Test\",\"creationDate\":\"" + dateRegister + "\"}";
      }
    }
    butterflyData += "]";
    // console.log(butterflyData);
    try {
      fetch(url + "/butterflies",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: butterflyData
        }
      )
        .then(response => {
          if (response.ok) {
            // console.log("Butterflies registered");
            //populateCodes();
            window.location.reload();
          }
          else {
            event.preventDefault();
            alert("Alpha code(s) already exist in database!");
          }
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register" onLoad={GetList}>
      <header className="admin-register-header">
        <Link to="/admin/home">
          <img src={logo} className="admin-register-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input type="button" value="Logout" className="admin-register-logout"></input>
        </Link>
      </header>
      <div className="date-container">
        <input
          type="date"
          name="name"
          id="dateregister"
          className="admin-register-date"
          placeholder="Date"
        ></input>
      </div>
      <div className="radio-container">
        <input type="radio" value="1" className="radio-button" checked={count === 1} onChange={handleRadioChange} />  1
        <input type="radio" value="2" className="radio-button" checked={count === 2} onChange={handleRadioChange} />  2
        <input type="radio" value="3" className="radio-button" checked={count === 3} onChange={handleRadioChange} />  3
        <input type="radio" value="4" className="radio-button" checked={count === 4} onChange={handleRadioChange} />  4
      </div >
      <div id="input" >
        {Array.from({ length: count }, (_, index) => (
          <div id="input-fields" key={index} className="textbox-container" >
            <div>
              <input
                id={`textbox${index + 1}`}
                type="text"
                placeholder="AAA"
                className="admin-register-textbox"
                maxLength={3}
              />
            </div>

            <div className="autofill-box">
              <Autocomplete
                disablePortal
                id={`name${index + 1}`}
                options={nameOptions}
                sx={{ width: 430 }}

                renderInput={(params) => <TextField  {...params} InputProps={{ ...params.InputProps, style: { fontSize: 20 } }} label={LabelValue("Butterfly Name")} />}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="submit-container">
        <button type="submit" onClick={submit} className="admin-register-submit">Submit</button>
      </div>
    </div>
  );
}
