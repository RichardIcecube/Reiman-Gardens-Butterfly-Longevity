import '../css/Report.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import logo from '../reiman-logo.svg';
import { url } from "./GlobalVariable";

export const Report = () => {

  const navigate = useNavigate();

  if (localStorage.getItem("userType") != "Admin") {
    window.location.href = "/admin/login";
  }
  else {
    //console.log(localStorage.getItem("userType"));
  }


  var butterflies = [
    ["Alphacode", "Species", "Date Registered", "Date Report Made", "Status", "Reported by", "Reported Group"]
  ];

  async function exportData() {
    let csvData = "data:text/csv;charset=utf-8," + butterflies.map(e => e.join(",")).join("\n");;
    var encodedUri = encodeURI(csvData);
    window.open(encodedUri);
  }

  async function getData() {
    let userInputString = localStorage.getItem("userInput");
    let userInputJSON = JSON.parse(userInputString);
    let filterType = localStorage.getItem("filterType");
    const body = document.getElementById("report-body");
    //let row = tableHead.insertRow();


    switch (filterType) {
      case "individual":
        try {
          fetch(url + "/logs/alpha",
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": userInputJSON.alphacode
              })
            }
          )
            .then(async response => {
              var data = await response.json();
              if (data[0] == null) {
                alert("Butterfly with alphacode " + userInputJSON.alphacode + " does not exist in the farm");
              }

              let alphaHeader = document.createElement('div');
              alphaHeader.innerHTML = "Alphacode";
              alphaHeader.className = "admin-report-title";
              body.appendChild(alphaHeader);

              let alpha = document.createElement('div');
              alpha.innerHTML = data[0].butterfly.alphaCode;
              alpha.className = "admin-report-body";
              body.appendChild(alpha);

              let speciesHeader = document.createElement('div');
              speciesHeader.innerHTML = "Species";
              speciesHeader.className = "admin-report-title";
              body.appendChild(speciesHeader);

              let species = document.createElement('div');
              species.innerHTML = data[0].butterfly.normName + " | " + data[0].butterfly.sciName;
              species.className = "admin-report-body";
              body.appendChild(species);

              let statusHeader = document.createElement('div');
              statusHeader.innerHTML = "Status";
              statusHeader.className = "admin-report-title";
              body.appendChild(statusHeader);

              let status = document.createElement('div');
              status.innerHTML = data[0].butterfly.status;
              status.className = "admin-report-body";
              body.appendChild(status);

              if (userInputJSON.checkBox1 === true) {
                let header = document.createElement('div');
                header.innerHTML = "How long did it live?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                let initial = new Date(data[0].butterfly.creationDate);
                let final = data[0].butterfly.deathDate;
                if (final === null)
                  final = new Date();
                else
                  final = new Date(final);
                let delta = (final - initial) / 1000;

                let days = Math.floor(delta / 86400);
                delta -= days * 86400;

                let hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600;

                let minutes = Math.floor(delta / 60) % 60;
                delta -= minutes * 60;

                let seconds = delta % 60;

                value.innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds.toFixed(2) + " seconds ";
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              if (userInputJSON.checkBox2 === true) {
                let header = document.createElement('div');
                header.innerHTML = "How many times was it reported?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = data[0].butterfly.totViews - 1;
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              if (userInputJSON.checkBox3 === true) {
                let header = document.createElement('div');
                header.innerHTML = "When it was released?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = data[0].butterfly.creationDate.split("T")[0];
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              if (userInputJSON.checkBox4 === true) {
                let header = document.createElement('div');
                header.innerHTML = "When was the last report made?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = data[0].creationDate.split("T")[0];
                value.className = "admin-report-body";
                body.appendChild(value);


              }
              for (let i = 0; i < data.length; i++) {
                const csvRow = [
                  "" + data[i].butterfly.alphaCode,
                  "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                  "" + data[i].butterfly.creationDate,
                  "" + data[i].creationDate,
                  "" + data[i].butterfly.status,
                  "" + data[i].user.username,
                  "" + data[i].user.userType
                ];
                // console.log(csvRow);
                butterflies.push(csvRow);
              }

            }).catch(error => console.log(error));
        }
        catch (error) {
          console.log(error);
        }
        break;

      case "species":
        try {
          fetch(url + "/logs/species",
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": userInputJSON.speciesname.split(" | ")[1]
              })
            }
          )
            .then(async response => {
              var data = await response.json();

              if (data[0] == null) {
                alert("There are no butterfly of species " + userInputJSON.speciesname + " in the farm.");
              }

              let butterflyArr = [];
              var butterflyArrUnique;
              for (let i = 0; i < data.length; i++) {
                let alphaCode = data[i].butterfly.alphaCode;
                let butterfly = data[i].butterfly;
                let creationDate = data[i].creationDate;
                let action = data[i].action;
                let user = data[i].user;
                let initial = new Date(data[i].butterfly.creationDate);
                let final = data[0].butterfly.deathDate;
                if (final === null)
                  final = new Date();
                else
                  final = new Date(final);
                let lifespan = (final - initial) / 1000;
                let totViews = data[i].butterfly.totViews - 1;
                let status = data[i].butterfly.status;

                butterflyArr.push({ alphaCode, lifespan, totViews, butterfly, action, user, creationDate, status });
                butterflyArrUnique = [...new Map(butterflyArr.map(item => [item["alphaCode"], item])).values()];
              }

              let speciesHeader = document.createElement('div');
              speciesHeader.innerHTML = "Species";
              speciesHeader.className = "admin-report-title";
              body.appendChild(speciesHeader);

              let species = document.createElement('div');
              species.innerHTML = data[0].butterfly.normName + " | " + data[0].butterfly.sciName;
              species.className = "admin-report-body";
              body.appendChild(species);

              if (userInputJSON.checkBox1 === true) {
                let header = document.createElement('div');
                header.innerHTML = "How many different butterflies in the species have reports?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');

                value.innerHTML = butterflyArrUnique.length;
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              if (userInputJSON.checkBox2 === true) {
                let header = document.createElement('div');
                header.innerHTML = "What is the average lifespan across the species?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let lifespan = 0;
                let count = 0;
                for (let i = 0; i < butterflyArrUnique.length; i++) {
                  if (butterflyArrUnique[i].status === "dead") {
                    lifespan += butterflyArrUnique[i].lifespan;
                    count++;
                  }
                }

                let value = document.createElement('div');

                if (count !== 0 && lifespan !== 0) {
                  var lifespanAvg = lifespan / count;

                  let days = Math.floor(lifespanAvg / 86400);
                  lifespanAvg -= days * 86400;

                  let hours = Math.floor(lifespanAvg / 3600) % 24;
                  lifespanAvg -= hours * 3600;

                  let minutes = Math.floor(lifespanAvg / 60) % 60;
                  lifespanAvg -= minutes * 60;

                  let seconds = lifespanAvg % 60;

                  value.innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds.toFixed(2) + " seconds ";
                  value.className = "admin-report-body";
                }
                else {
                  value.innerHTML = "There are no information on the average lifespan of this species of butterfly yet.";
                  value.className = "admin-report-body";
                }
                body.appendChild(value);
              }

              if (userInputJSON.checkBox3 === true) {
                let header = document.createElement('div');
                header.innerHTML = "What is the average observations across the species?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let views = 0;
                for (let i = 0; i < butterflyArrUnique.length; i++) {
                  views += butterflyArrUnique[i].totViews;
                }

                var viewsAvg = views / butterflyArrUnique.length;

                let value = document.createElement('div');
                value.innerHTML = viewsAvg;
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              let table = document.createElement('table');
              table.className = "admin-report-table"
              body.appendChild(table);

              let headerContainer = document.createElement('thead');
              table.appendChild(headerContainer);

              let headerRow = document.createElement('tr');
              headerContainer.appendChild(headerRow);

              let headerName = ["Alphacode", "Species", "Date Register", "Date Report Made", "Status", "Lifespan", "Number of Observations"];

              for (let i = 0; i < headerName.length; i++) {
                let head = document.createElement('th');
                head.innerHTML = headerName[i];
                if (headerName[i] === "Species")
                  head.className = "admin-report-expand";
                headerRow.appendChild(head);
              }

              let tableBody = document.createElement("tbody");
              table.appendChild(tableBody);

              for (let i = 0; i < butterflyArrUnique.length; i++) {
                let row = tableBody.insertRow();
                row.id = i;

                if (parseInt(row.id) % 2 != 0)
                  row.style.backgroundColor = "#808080";

                let alpha = row.insertCell(0);
                alpha.innerHTML = butterflyArrUnique[i].butterfly.alphaCode;

                let species = row.insertCell(1);
                species.innerHTML = butterflyArrUnique[i].butterfly.normName + " | " + data[i].butterfly.sciName;

                let dateRegister = row.insertCell(2);
                dateRegister.innerHTML = butterflyArrUnique[i].butterfly.creationDate.split("T")[0];

                let dateReport = row.insertCell(3);
                dateReport.innerHTML = butterflyArrUnique[i].creationDate.split("T")[0];

                let status = row.insertCell(4);
                status.innerHTML = butterflyArrUnique[i].butterfly.status;

                let lifespan = butterflyArrUnique[i].lifespan
                let days = Math.floor(lifespan / 86400);
                lifespan -= days * 86400;

                let hours = Math.floor(lifespan / 3600) % 24;
                lifespan -= hours * 3600;

                let minutes = Math.floor(lifespan / 60) % 60;
                lifespan -= minutes * 60;

                let seconds = lifespan % 60;

                let lifespanCol = row.insertCell(5);
                lifespanCol.innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds.toFixed(2) + " seconds ";

                let numViews = row.insertCell(6);
                numViews.innerHTML = butterflyArrUnique[i].totViews;

                const csvRow = [
                  "" + data[i].butterfly.alphaCode,
                  "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                  "" + data[i].butterfly.creationDate,
                  "" + data[i].creationDate,
                  "" + data[i].butterfly.status,
                  "" + data[i].user.username,
                  "" + data[i].user.userType
                ];
                // console.log(csvRow);
                butterflies.push(csvRow);

              }


            }).catch(error => console.log(error));
        }
        catch (error) {
          console.log(error);
        }
        break;

      case "dateRegister":
        try {
          fetch(url + "/logs/date/register",
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": userInputJSON.dateRegister
              })
            }
          )
            .then(async response => {
              var data = await response.json();
              if (data[0] == null) {
                alert("There are no butterflies registered on the date " + userInputJSON.dateRegister);
              }

              let header = document.createElement('div');
              header.innerHTML = "Date";
              header.className = "admin-report-title";
              body.appendChild(header);

              let value = document.createElement('div');
              value.innerHTML = userInputJSON.dateRegister;
              value.className = "admin-report-body";
              body.appendChild(value);

              let releaseSpecies = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].action === "Butterfly created") {
                  let name = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;
                  let code = data[i].butterfly.alphaCode;
                  releaseSpecies.push({ name, code });
                }
              }

              if (userInputJSON.checkBox1 === true) {
                let header = document.createElement('div');
                header.innerHTML = "What butterflies were released that day?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');

                let table = document.createElement('table');
                table.className = "admin-report-table-small"
                body.appendChild(table);

                let headerContainer = document.createElement('thead');
                table.appendChild(headerContainer);

                let headerRow = document.createElement('tr');
                headerContainer.appendChild(headerRow);

                let headerName = ["Alphacode", "Species"];

                for (let i = 0; i < headerName.length; i++) {
                  let head = document.createElement('th');
                  head.innerHTML = headerName[i];
                  if (headerName[i] === "Species")
                    head.className = "admin-report-expand";
                  headerRow.appendChild(head);
                }

                let tableBody = document.createElement("tbody");
                table.appendChild(tableBody);

                for (let i = 0; i < releaseSpecies.length; i++) {
                  let row = tableBody.insertRow();
                  row.id = i;

                  if (parseInt(row.id) % 2 != 0)
                    row.style.backgroundColor = "#808080";

                  let alpha = row.insertCell(0);
                  alpha.innerHTML = releaseSpecies[i].code;

                  let species = row.insertCell(1);
                  species.innerHTML = releaseSpecies[i].name;

                }
              }

              if (userInputJSON.checkBox2 === true) {
                let header = document.createElement('div');
                header.innerHTML = " How many total butterflies were registered on that day?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = releaseSpecies.length;
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              let table = document.createElement('table');
              table.className = "admin-report-table"
              body.appendChild(table);

              let headerContainer = document.createElement('thead');
              table.appendChild(headerContainer);

              let headerRow = document.createElement('tr');
              headerContainer.appendChild(headerRow);

              let headerName = ["Alphacode", "Species", "Date Registered", "Status", "Report By", "Group", "Action"];

              for (let i = 0; i < headerName.length; i++) {
                let head = document.createElement('th');
                head.innerHTML = headerName[i];
                if (headerName[i] === "Species")
                  head.className = "admin-report-expand";
                headerRow.appendChild(head);
              }

              let tableBody = document.createElement("tbody");
              table.appendChild(tableBody);

              for (let i = 0; i < data.length; i++) {
                let row = tableBody.insertRow();
                row.id = i;

                if (parseInt(row.id) % 2 != 0)
                  row.style.backgroundColor = "#808080";

                let alpha = row.insertCell(0);
                alpha.innerHTML = data[i].butterfly.alphaCode;

                let species = row.insertCell(1);
                species.innerHTML = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;

                let dateReport = row.insertCell(2);
                dateReport.innerHTML = data[i].creationDate.split("T")[0];

                let status = row.insertCell(3);
                status.innerHTML = data[i].butterfly.status;

                let user = row.insertCell(4);
                user.innerHTML = data[i].user.username;

                let group = row.insertCell(5);
                group.innerHTML = data[i].user.userType;

                let action = row.insertCell(6);
                action.innerHTML = data[i].action;

                const csvRow = [
                  "" + data[i].butterfly.alphaCode,
                  "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                  "" + data[i].butterfly.creationDate,
                  "" + data[i].creationDate,
                  "" + data[i].butterfly.status,
                  "" + data[i].user.username,
                  "" + data[i].user.userType
                ];
                // console.log(csvRow);
                butterflies.push(csvRow);
              }


            }).catch(error => console.log(error));
        }
        catch (error) {
          console.log(error);
        }
        break;

      case "dateReport":
        try {
          fetch(url + "/logs/date/public",
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": userInputJSON.dateReport
              })
            }
          )
            .then(async response => {
              var data = await response.json();
              if (data[0] == null) {
                alert("There are no butterflies reported on the date " + userInputJSON.dateReport);
              }

              let header = document.createElement('div');
              header.innerHTML = "Date";
              header.className = "admin-report-title";
              body.appendChild(header);

              let value = document.createElement('div');
              value.innerHTML = userInputJSON.dateReport;
              value.className = "admin-report-body";
              body.appendChild(value);

              let taggedButterfly = [];
              for (let i = 0; i < data.length; i++) {
                let name = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;
                let code = data[i].butterfly.alphaCode;
                taggedButterfly.push({ name, code });
              }

              let taggedButterflyUnique = [...new Map(taggedButterfly.map(item => [item["name"], item])).values()];

              if (userInputJSON.checkBox1 === true) {
                let header = document.createElement('div');
                header.innerHTML = "What butterflies were seen that day?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = "";
                for (let i = 0; i < taggedButterflyUnique.length; i++) {
                  value.innerHTML += taggedButterflyUnique[i].name + "<br>";
                }
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              if (userInputJSON.checkBox2 === true) {
                let header = document.createElement('div');
                header.innerHTML = "What alphacodes were seen that day?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = "";
                for (let i = 0; i < taggedButterflyUnique.length; i++) {
                  value.innerHTML += taggedButterflyUnique[i].code + "<br>";
                }
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              if (userInputJSON.checkBox3 === true) {
                let header = document.createElement('div');
                header.innerHTML = "How many total reports were made?";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = taggedButterfly.length;
                value.className = "admin-report-body";
                body.appendChild(value);
              }

              let table = document.createElement('table');
              table.className = "admin-report-table"
              body.appendChild(table);

              let headerContainer = document.createElement('thead');
              table.appendChild(headerContainer);

              let headerRow = document.createElement('tr');
              headerContainer.appendChild(headerRow);

              let headerName = ["Alphacode", "Species", "Date Report Made", "Status", "Report By", "Group", "Action"];

              for (let i = 0; i < headerName.length; i++) {
                let head = document.createElement('th');
                head.innerHTML = headerName[i];
                if (headerName[i] === "Species")
                  head.className = "admin-report-expand";
                headerRow.appendChild(head);
              }

              let tableBody = document.createElement("tbody");
              table.appendChild(tableBody);

              for (let i = 0; i < data.length; i++) {
                let row = tableBody.insertRow();
                row.id = i;

                if (parseInt(row.id) % 2 != 0)
                  row.style.backgroundColor = "#808080";

                let alpha = row.insertCell(0);
                alpha.innerHTML = data[i].butterfly.alphaCode;

                let species = row.insertCell(1);
                species.innerHTML = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;

                let dateReport = row.insertCell(2);
                dateReport.innerHTML = data[i].creationDate.split("T")[0];

                let status = row.insertCell(3);
                status.innerHTML = data[i].butterfly.status;

                let user = row.insertCell(4);
                user.innerHTML = data[i].user.username;

                let group = row.insertCell(5);
                group.innerHTML = data[i].user.userType;

                let action = row.insertCell(6);
                action.innerHTML = data[i].action;

                const csvRow = [
                  "" + data[i].butterfly.alphaCode,
                  "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                  "" + data[i].butterfly.creationDate,
                  "" + data[i].creationDate,
                  "" + data[i].butterfly.status,
                  "" + data[i].user.username,
                  "" + data[i].user.userType
                ];
                // console.log(csvRow);
                butterflies.push(csvRow);
              }


            }).catch(error => console.log(error));
        }
        catch (error) {
          console.log(error);
        }
        break;

      case "status":
        let status = []
        if (userInputJSON.checkBox1 === true)
          status.push("dead");
        if (userInputJSON.checkBox2 === true)
          status.push("alive");

        butterflies = [
          ["Alphacode", "Species", "Date Registered", "Status", "Reported by"]
        ];

        for (let i = 0; i < status.length; i++) {
          try {
            fetch(url + "/logs/status",
              {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "username": status[i]
                })
              }
            )
              .then(async response => {
                var data = await response.json();
                // console.log(data);
                let header = document.createElement('div');
                header.innerHTML = "Status";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = status[i];
                value.className = "admin-report-body";
                body.appendChild(value);

                if (userInputJSON.checkBox3 === true) {
                  let header = document.createElement('div');
                  header.innerHTML = "What are the total number of " + status[i] + " butterflies?";
                  header.className = "admin-report-title";
                  body.appendChild(header);

                  let value = document.createElement('div');
                  value.innerHTML = data.length;
                  value.className = "admin-report-body";
                  body.appendChild(value);
                }

                let table = document.createElement('table');
                table.className = "admin-report-table"
                body.appendChild(table);

                let headerContainer = document.createElement('thead');
                table.appendChild(headerContainer);

                let headerRow = document.createElement('tr');
                headerContainer.appendChild(headerRow);

                let headerName = ["Alphacode", "Species", "Date Register", "Status", "Butterfly Registered By"];

                for (let k = 0; k < headerName.length; k++) {
                  let head = document.createElement('th');
                  head.innerHTML = headerName[k];
                  if (headerName[k] === "Species")
                    head.className = "admin-report-expand";
                  headerRow.appendChild(head);
                }

                let tableBody = document.createElement("tbody");
                table.appendChild(tableBody);

                for (let k = 0; k < data.length; k++) {
                  let row = tableBody.insertRow();
                  row.id = k;

                  if (parseInt(row.id) % 2 != 0)
                    row.style.backgroundColor = "#808080";

                  let alpha = row.insertCell(0);
                  alpha.innerHTML = data[k].alphaCode;

                  let species = row.insertCell(1);
                  species.innerHTML = data[k].normName + " | " + data[k].sciName;

                  let dateRegister = row.insertCell(2);
                  dateRegister.innerHTML = data[k].creationDate.split("T")[0];

                  let status = row.insertCell(3);
                  status.innerHTML = data[k].status;

                  let group = row.insertCell(4);
                  group.innerHTML = data[k].user


                  const csvRow = [ //potiential error here
                    "" + data[k].alphaCode,
                    "" + data[k].normName + " | " + data[k].sciName,
                    "" + data[k].creationDate,
                    "" + data[k].status,
                    "" + data[k].user,
                  ];
                  // console.log(csvRow);
                  butterflies.push(csvRow);

                }

              }).catch(error => console.log(error));
          }
          catch (error) {
            console.log(error);
          }
        }

        break;

      case "reportBy":
        try {
          fetch(url + "/logs/user",
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": userInputJSON.reportBy
              })
            }
          )
            .then(async response => {
              var data = await response.json();
              if (data[0] == null) {
                alert("There are no butterflies reported by the user " + userInputJSON.reportBy);
                //navigate('/admin/generate');
              }

              let header = document.createElement('div');
              header.innerHTML = "Reported by";
              header.className = "admin-report-title";
              body.appendChild(header);

              let value = document.createElement('div');
              value.innerHTML = userInputJSON.reportBy;
              value.className = "admin-report-body";
              body.appendChild(value);

              let table = document.createElement('table');
              table.className = "admin-report-table"
              body.appendChild(table);

              let headerContainer = document.createElement('thead');
              table.appendChild(headerContainer);

              let headerRow = document.createElement('tr');
              headerContainer.appendChild(headerRow);

              let headerName = ["Alphacode", "Species", "Date Register", "Date Report Made", "Status", "Group", "Action"];

              for (let i = 0; i < headerName.length; i++) {
                let head = document.createElement('th');
                head.innerHTML = headerName[i];
                if (headerName[i] === "Species")
                  head.className = "admin-report-expand";
                headerRow.appendChild(head);
              }

              let tableBody = document.createElement("tbody");
              table.appendChild(tableBody);

              for (let i = 0; i < data.length; i++) {
                let row = tableBody.insertRow();
                row.id = i;

                if (parseInt(row.id) % 2 != 0)
                  row.style.backgroundColor = "#808080";

                let alpha = row.insertCell(0);
                alpha.innerHTML = data[i].butterfly.alphaCode;

                let species = row.insertCell(1);
                species.innerHTML = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;

                let dateRegister = row.insertCell(2);
                dateRegister.innerHTML = data[i].butterfly.creationDate.split("T")[0];

                let dateReport = row.insertCell(3);
                dateReport.innerHTML = data[i].creationDate.split("T")[0];

                let status = row.insertCell(4);
                status.innerHTML = data[i].butterfly.status;

                let group = row.insertCell(5);
                group.innerHTML = data[i].user.userType;

                let action = row.insertCell(6);
                action.innerHTML = data[i].action;
                const csvRow = [
                  "" + data[i].butterfly.alphaCode,
                  "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                  "" + data[i].butterfly.creationDate,
                  "" + data[i].creationDate,
                  "" + data[i].butterfly.status,
                  "" + data[i].user.username,
                  "" + data[i].user.userType
                ];
                // console.log(csvRow);
                butterflies.push(csvRow);

              }


            }).catch(error => console.log(error));
        }
        catch (error) {
          console.log(error);
        }
        break;

      case "reportGroup":
        let group = [];

        if (userInputJSON.checkBox1 === true)
          group.push("admin");
        if (userInputJSON.checkBox2 === true)
          group.push("docent");
        if (userInputJSON.checkBox3 === true)
          group.push("public");

        for (let i = 0; i < group.length; i++) {
          try {
            fetch(url + "/logs/group",
              {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "username": group[i]
                })
              }
            )
              .then(async response => {
                var data = await response.json();

                let header = document.createElement('div');
                header.innerHTML = "Reported by Group";
                header.className = "admin-report-title";
                body.appendChild(header);

                let value = document.createElement('div');
                value.innerHTML = group[i];
                value.className = "admin-report-body";
                body.appendChild(value);

                let table = document.createElement('table');
                table.className = "admin-report-table"
                body.appendChild(table);

                let headerContainer = document.createElement('thead');
                table.appendChild(headerContainer);

                let headerRow = document.createElement('tr');
                headerContainer.appendChild(headerRow);

                let headerName = ["Alphacode", "Species", "Date Register", "Date Report Made", "Status", "Reported by", "Action"];

                for (let i = 0; i < headerName.length; i++) {
                  let head = document.createElement('th');
                  head.innerHTML = headerName[i];
                  if (headerName[i] === "Species")
                    head.className = "admin-report-expand";
                  headerRow.appendChild(head);
                }

                let tableBody = document.createElement("tbody");
                table.appendChild(tableBody);

                for (let i = 0; i < data.length; i++) {
                  let row = tableBody.insertRow();
                  row.id = i;

                  if (parseInt(row.id) % 2 != 0)
                    row.style.backgroundColor = "#808080";

                  let alpha = row.insertCell(0);
                  alpha.innerHTML = data[i].butterfly.alphaCode;

                  let species = row.insertCell(1);
                  species.innerHTML = data[i].butterfly.normName + " | " + data[i].butterfly.sciName;

                  let dateRegister = row.insertCell(2);
                  dateRegister.innerHTML = data[i].butterfly.creationDate.split("T")[0];

                  let dateReport = row.insertCell(3);
                  dateReport.innerHTML = data[i].creationDate.split("T")[0];

                  let status = row.insertCell(4);
                  status.innerHTML = data[i].butterfly.status;

                  let reportedBy = row.insertCell(5);
                  reportedBy.innerHTML = data[i].user.username;

                  let action = row.insertCell(6);
                  action.innerHTML = data[i].action;

                  const csvRow = [
                    "" + data[i].butterfly.alphaCode,
                    "" + data[i].butterfly.normName + " | " + data[i].butterfly.sciName,
                    "" + data[i].butterfly.creationDate,
                    "" + data[i].creationDate,
                    "" + data[i].butterfly.status,
                    "" + data[i].user.username,
                    "" + data[i].user.userType
                  ];
                  // console.log(csvRow);
                  butterflies.push(csvRow);

                }



              }).catch(error => console.log(error));
          }
          catch (error) {
            console.log(error);
          }
        }
        break;

      default:
        // console.log("There seem to be some error generating the report, please try again.");
        break;
    }
  };

  return (
    <div className='datatable' onLoad={getData}>
      <div>
        <header className="admin-report-header">
          <Link to="/admin/home">
            <img src={logo} className="admin-report-logo" alt="logo" />
          </Link>
          <Link to="/">
            <input type="button" value="Logout" className="admin-report-logout"></input>
          </Link>
        </header>
        <div id='report-body'>
        </div>
      </div>
      <button type="button" className="admin-report-export" onClick={exportData}>Export to CSV</button>
    </div>
  );
}