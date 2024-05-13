import '../css/AdminManageData.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import logo from '../reiman-logo.svg';
import { url } from "./GlobalVariable";

export const AdminManageData = () => {

  if (localStorage.getItem("userType") != "Admin") {
    window.location.href = "/admin/login";
  }
  else {
    // console.log(localStorage.getItem("userType"));
  }

  var butterflies = [
    ["Alphacode", "Species", "Date Registered", "Date Dead", "Status", "Reported by", "Reported Group", "Date Report Made", "Action"]
  ];

  async function exportData() {
    let csvData = "data:text/csv;charset=utf-8," + butterflies.map(e => e.join(",")).join("\n");;
    var encodedUri = encodeURI(csvData);
    window.open(encodedUri);
  }

  async function getData() {
    try {
      fetch(url + "/logs",
        {
          method: "Get",
        }
      )
        .then(async response => {
          let data = await response.json();
          const table = document.getElementById("table-body");
          //console.log(data[0]);
          const order = document.getElementById("order-by");
          table.innerHTML = '';
          if (order.value === "Oldest") {
            for (let i = 0; i < data.length; i++) {
              let temp = data[i].butterfly.deathDate;
              if (temp === null)
                temp = ""

              const csvRow = [
                "" + data[i].butterfly.alphaCode,
                "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                "" + data[i].butterfly.creationDate.split("T")[0],
                "" + temp.split("T")[0],
                "" + data[i].butterfly.status,
                "" + data[i].user.username,
                "" + data[i].user.userType,
                "" + data[i].creationDate.split("T")[0],
                "" + data[i].action
              ];
              // console.log(csvRow);
              butterflies.push(csvRow);

              let filter = document.getElementById("filter-by");
              let textbox = document.getElementById("admin-manage-textbox");
              if (filter.value !== "") {
                switch (filter.value) {
                  case "Alphacode":
                    let string = data[i].butterfly.alphaCode;
                    if (!string.includes(textbox.value)) continue;
                    break;
                  case "Date Registered":
                    let string4 = data[i].creationDate;
                    let a = string4.split("T");
                    if (!a[0].includes(textbox.value)) continue;
                    break;
                  case "Species":
                    let string2 = data[i].butterfly.normName;
                    let string3 = data[i].butterfly.sciName;
                    if (!string2.includes(textbox.value) && !string3.includes(textbox.value)) continue;
                    break;
                  case "Reported By":
                    let string5 = data[i].user.username;
                    if (!string5.includes(textbox.value)) continue;
                    break;
                  default:
                    break;
                }
              }
              let row = table.insertRow();
              row.id = i;

              if (parseInt(row.id) % 2 != 0)
                row.style.backgroundColor = "#808080";

              let alpha = row.insertCell(0);
              alpha.innerHTML = data[i].butterfly.alphaCode;

              let species = row.insertCell(1);
              species.innerHTML = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;

              let dateRegister = row.insertCell(2);
              dateRegister.innerHTML = data[i].butterfly.creationDate.split("T")[0];


              let dateDead = row.insertCell(3);
              let deathDate = data[i].butterfly.deathDate;
              if (deathDate === null)
                deathDate = ""
              dateDead.innerHTML = deathDate.split("T")[0];

              let status = row.insertCell(4);
              status.innerHTML = data[i].butterfly.status;

              let reportedBy = row.insertCell(5);
              reportedBy.innerHTML = data[i].user.username;

              let reportedGroup = row.insertCell(6);
              reportedGroup.innerHTML = data[i].user.userType;

              let dateReport = row.insertCell(7);
              dateReport.innerHTML = data[i].creationDate.split("T")[0];

              let action = row.insertCell(8);
              action.innerHTML = data[i].action;

              let btn = document.createElement('input');
              btn.type = "button";
              btn.className = "admin-manage-edit";
              btn.value = "Edit / Delete";
              btn.onclick = function () {
                // console.log("Edit/Delete the row with the id: \n" + data[i].id);
                localStorage.setItem("dataID", data[i].id);
                //console.log(localStorage.getItem("dataID"));
                window.open("/admin/edit", "_self");
              };
              row.appendChild(btn);

            }
          }
          else if (order.value === "Newest") {
            for (let i = data.length - 1; i >= 0; i--) {
              let temp = data[i].butterfly.deathDate;
              if (temp === null)
                temp = ""

              const csvRow = [
                "" + data[i].butterfly.alphaCode,
                "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                "" + data[i].butterfly.creationDate.split("T")[0],
                "" + temp.split("T")[0],
                "" + data[i].butterfly.status,
                "" + data[i].user.username,
                "" + data[i].user.userType,
                "" + data[i].creationDate.split("T")[0],
                "" + data[i].action
              ];
              // console.log(csvRow);
              butterflies.push(csvRow);
              let filter = document.getElementById("filter-by");
              let textbox = document.getElementById("admin-manage-textbox");
              if (filter.value !== "") {
                switch (filter.value) {
                  case "Alphacode":
                    let string = data[i].butterfly.alphaCode;
                    if (!string.includes(textbox.value)) continue;
                    break;
                  case "Date Registered":
                    let string4 = data[i].creationDate;
                    let a = string4.split("T");
                    if (!a[0].includes(textbox.value)) continue;
                    break;
                  case "Species":
                    let string2 = data[i].butterfly.normName;
                    let string3 = data[i].butterfly.sciName;
                    if (!string2.includes(textbox.value) && !string3.includes(textbox.value)) continue;
                    break;
                  case "Reported By":
                    let string5 = data[i].user.username;
                    if (!string5.includes(textbox.value)) continue;
                    break;
                  default:
                    break;
                }
              }
              let row = table.insertRow();
              row.id = i;

              if (parseInt(row.id) % 2 != 0)
                row.style.backgroundColor = "#808080";

              let alpha = row.insertCell(0);
              alpha.innerHTML = data[i].butterfly.alphaCode;

              let species = row.insertCell(1);
              species.innerHTML = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;

              let dateRegister = row.insertCell(2);
              dateRegister.innerHTML = data[i].butterfly.creationDate.split("T")[0];

              let dateDead = row.insertCell(3);
              let deathDate = data[i].butterfly.deathDate;
              if (deathDate === null)
                deathDate = "Not dead yet"
              dateDead.innerHTML = deathDate.split("T")[0];

              let status = row.insertCell(4);
              status.innerHTML = data[i].butterfly.status;

              let reportedBy = row.insertCell(5);
              reportedBy.innerHTML = data[i].user.username;

              let reportedGroup = row.insertCell(6);
              reportedGroup.innerHTML = data[i].user.userType;

              let dateReport = row.insertCell(7);
              dateReport.innerHTML = data[i].creationDate.split("T")[0];

              let action = row.insertCell(8);
              action.innerHTML = data[i].action;

              let btn = document.createElement('input');
              btn.type = "button";
              btn.value = "Edit / Delete";
              btn.className = "admin-manage-edit";
              btn.onclick = function () {
                // console.log("Edit/Delete the row with the id: \n" + data[i].id);
                localStorage.setItem("dataID", data[i].id);
                //console.log(localStorage.getItem("dataID"));
                window.open("/admin/edit", "_self");
              };
              row.appendChild(btn);
            }
          }

        })
        .catch(error => console.log(error));
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='datatable' onLoad={getData}>
      <header className="admin-manage-header">
        <Link to="/admin/home">
          <img src={logo} className="admin-manage-logo" alt="logo" />
        </Link>
        <Link to="/">
          <input type="button" value="Logout" className="admin-manage-logout"></input>
        </Link>
      </header>
      <div className='admin-manage-sort'>
        <label className='admin-manage-label'>Filter by: </label>
        <select name='Sort' id="filter-by" onChange={getData}>
          <option value='Alphacode'>Alphacode</option>
          <option value='Date Registered'>Date Registered</option>
          <option value='Species'>Species</option>
          <option value='Reported By'>Reported By</option>

        </select>
        <input type="text" className="admin-manage-textbox" id="admin-manage-textbox" onChange={getData}></input>

        <label className='admin-manage-label'>Order by: </label>
        <select name='Order' id="order-by" onChange={getData}>
          <option value='Oldest'>Oldest</option>
          <option value='Newest'>Newest</option>

        </select>
      </div>
      <table className='admin-manage-table'>
        <thead>
          <tr>
            <th>Alphacode</th>
            <th className='admin-manage-expand'>Species</th>
            <th>Date Register</th>
            <th>Date Death</th>
            <th>Status</th>
            <th>Reported by</th>
            <th>Reported Group</th>
            <th>Date Report Made</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody id='table-body'>
        </tbody>
      </table>
      <button type="button" className="admin-report-export" onClick={exportData}>Export to CSV</button>
    </div>
  );
}

export default AdminManageData;