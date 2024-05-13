import logo from '../reiman-logo.svg';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../css/AdminEditDelete.css';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { url } from "./GlobalVariable";

export const AdminEditDelete = () => {

  const id = localStorage.getItem("dataID");
  let nameList = [];
  let [nameOptions, setOptions] = useState(nameList);

  const LabelValue = (label) => {
    return (
      <Box fontSize={23} marginTop={0.5}>
        {label}
      </Box>
    )
  }

  async function loadData() {
    // Butterfly
    let code = document.getElementById("code");
    let species = document.getElementById("species");
    let status = document.getElementById("status");
    let creationDate = document.getElementById("creationDate");
    let deathDate = document.getElementById("deathDate");
    let totalViews = document.getElementById("totalViews");
    // User
    let reportedBy = document.getElementById("reportedBy");
    let reportGroup = document.getElementById("reportGroup");
    let reportDate = document.getElementById("reportDate");

    try {
      fetch(url + "/logs/" + id,
        {
          method: "GET",
        }
      )
        .then(async response => {
          let data = await response.json();
          // console.log(data);

          //Butterfly data
          localStorage.setItem("butterflyID", data.butterfly.id);
          code.value = data.butterfly.alphaCode;
          species.value = data.butterfly.normName + " | " + data.butterfly.sciName;
          status.value = data.butterfly.status;
          if (data.butterfly.creationDate === null)
            creationDate.value = "";
          else
            creationDate.value = data.butterfly.creationDate.split("T")[0];
          if (data.butterfly.deathDate === null)
            deathDate.value = "";
          else
            deathDate.value = data.butterfly.deathDate.split("T")[0];
          totalViews.value = data.butterfly.totViews;
          //User data
          reportedBy.value = data.user.username;
          reportGroup.value = data.user.userType;
          reportDate.value = data.creationDate;
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }

    try {
      fetch(url + "/bflookup", {
        method: "GET",
      })
        .then(async response => {
          let data = await response.text();
          let splitData = data.split("}");
          let test = ["answers1"];
          for (let i = 0; i < splitData.length; i++) {
            test[i] = splitData[i].split("\"")[9] + " | " + splitData[i].split("\"")[5];
          }
          test.pop();
          setOptions(test);
        })
        .catch(error => console.log(error));
    }
    catch (error) {
      console.log(error);
    }
  }

  function updateData() {
    // Butterfly
    let butterflyID = localStorage.getItem("butterflyID");
    let alphaCode = document.getElementById("code").value;
    let species = document.getElementById("new-species").value;
    if (species === "") // if no new species is selected
      species = document.getElementById("species").value;
    let normName = species.split(" | ")[0];
    let sciName = species.split(" | ")[1];
    let status = document.getElementById("status").value;
    let creationDate = document.getElementById("creationDateInput").value;
    if (creationDate === "")  // if no new date is selected
      creationDate = document.getElementById("creationDate").value;
    if (creationDate === "") //change to null for input to database
      creationDate = null;
    let deathDate = document.getElementById("deathDateInput").value;
    if (deathDate === "")  // if no new date is selected
      deathDate = document.getElementById("deathDate").value;
    if (deathDate === "") //change to null for input to database
      deathDate = null;
    let totViews = document.getElementById("totalViews").value;

    //Update status depending of death date
    if (deathDate !== null)
      status = "dead";
    else
      status = "alive";

    let butterflyData = { alphaCode, normName, sciName, status, creationDate, deathDate, totViews };
    console.log(butterflyData);
    try {
      fetch(url + "/butterflies/" + butterflyID, {
        method: "PUT",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(butterflyData)
      })
        .then(async response => {
          if (response.ok) {
            // console.log("Butterfly Data Updated!");
            document.location.reload();
          }
          else {
            alert("Alpha code " + alphaCode + " already exists in the database. Please input a new alpha code.");
          }
          return response.json();
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error)
    }
  }

  function deleteData() {
    let butterflyID = localStorage.getItem("butterflyID");
    let alphaCode = document.getElementById("code").value;
    let message = "Are you sure you want to delete the butterfly with alphacode " + alphaCode + "?";

    if (!window.confirm(message)) {
      // console.log("Confirmation Denied");
      return;
    }

    try {
      fetch(url + "/butterflies/" + butterflyID,
        {
          method: "Delete",
        }
      )
        .then(response => {
          window.open("/admin/manage", "_self")
          return response.json();
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }

  function deleteLog() {
    let message = "Are you sure you want to delete the logs with id " + id + "?";

    if (!window.confirm(message)) {
      // console.log("Confirmation Denied");
      return;
    }

    try {
      fetch(url + "/logs/" + id,
        {
          method: "Delete",
        }
      )
        .then(response => {
          window.open("/admin/manage", "_self")
          return response.json();
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }

  function back() {
    window.open("/admin/manage", "_self")
  }

  return (
    <div className="admin-edit" onLoad={loadData}>
      <header className="admin-edit-header">
        <Link to="/admin/home">
          <img src={logo} className="admin-edit-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input type="button" value="Logout" className="admin-edit-logout"></input>
        </Link>
      </header>
      <div className="admin-edit-body">
        <div>
          <div className='admin-edit-title'>Butterfly Data</div>

          <div className="admin-edit-label"> Alpha Code: </div>
          <input type='text' id='code' className='admin-edit-textbox' maxLength={3}></input>

          <div className="admin-edit-label"> Current Butterfly Species: </div>
          <input type='text' id='species' className='admin-edit-textbox'></input>

          <div className="admin-edit-label"> Update to New Species: </div>
          <div className="autofill-box">
            <Autocomplete
              disablePortal
              id="new-species"
              options={nameOptions}
              sx={{ width: 430 }}

              renderInput={(params) => <TextField  {...params} InputProps={{ ...params.InputProps, style: { fontSize: 20 } }} label={LabelValue("Butterfly Species")} />}
            />
          </div>

          <div className="admin-edit-label"> Status: </div>
          <input type='text' id='status' className='admin-edit-textbox'></input>

          <div className="admin-edit-label"> Creation Date: </div>
          <input type='text' id='creationDate' className='admin-edit-textbox'></input>

          <input
            type="date"
            name="name"
            id="creationDateInput"
            className="admin-edit-date"
            placeholder="Date"
          ></input>

          <div className="admin-edit-label"> Death Date: </div>
          <input type='text' id='deathDate' className='admin-edit-textbox'></input>

          <input
            type="date"
            name="name"
            id="deathDateInput"
            className="admin-edit-date"
            placeholder="Date"
          ></input>

          <div className="admin-edit-label"> Total Views: </div>
          <input type='text' id='totalViews' className='admin-edit-textbox'></input>

          <div className='admin-edit-title'>Report Data</div>

          <div className="admin-edit-label"> Reported by: </div>
          <input type='text' id='reportedBy' className='admin-edit-textbox'></input>

          <div className="admin-edit-label"> Report Group: </div>
          <input type='text' id='reportGroup' className='admin-edit-textbox'></input>

          <div className="admin-edit-label"> Report Date: </div>
          <input type='text' id='reportDate' className='admin-edit-textbox'></input>

          <div className="admin-button-container">
            <button type="submit" onClick={back} className="admin-edit-button">Back</button>
            <button type="submit" onClick={updateData} className="admin-edit-button">Update</button>
            <button type="submit" onClick={deleteData} className="admin-edit-button">Delete Butterfly</button>
            <button type="submit" onClick={deleteLog} className="admin-edit-button">Delete Report</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminEditDelete;