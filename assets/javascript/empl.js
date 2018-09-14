// Initial Values

$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDUrWsCGleElofc5fErTiYgS6GlGGVF0HY",
    authDomain: "employeedata13.firebaseapp.com",
    databaseURL: "https://employeedata13.firebaseio.com",
    projectId: "employeedata13",
    storageBucket: "employeedata13.appspot.com",
    messagingSenderId: "666050386861"
  };
  firebase.initializeApp(config);
  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var employeeName = "";
  var employeeRole = "";
  var startDate = "";
  var monthlyRate = 0;

  // Capture Button Click
  $("#add-employee").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    employeeName = $("#employee-name-input").val().trim();
    employeeRole = $("#employee-role-input").val().trim();
    startDate = $("#start-date-input").val().trim();
    monthlyRate = $("#monthly-rate-input").val().trim();

    // Create local "temporary" objects for holding employee data
    var newEmp = {
      name: employeeName,
      role: employeeRole,
      start: startDate,
      rate: monthlyRate,
    }

    // uploads employee data to the database
    database.ref().push(newEmp);

    //logs everything to console 
    console.log(newEmp.employeeName);
    console.log(newEmp.employeeRole);
    console.log(newEmp.startDate);
    console.log(newEmp.monthlyRate);

    alert("successfully added");

    //clear all of the text-boxes;

    $("#employee-name-input").val("");
    $("#employee-role-input").val("");
    $("#start-date-input").val("");
    $("#monthly-rate-input").val("");

  });

  // Firebase watcher + initial loader HINT: .on("child_added")
  database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var employeename = childSnapshot.val().name;
    var employeerole = childSnapshot.val().role;
    var employeestart = childSnapshot.val().start;
    var employeerate = childSnapshot.val().rate;

    // Employee Info
    console.log(employeename);
    console.log(employeerole);
    console.log(employeestart);
    console.log(employeerate);

    //Prettify the employee start

    var empStartPretty = moment.unix(employeestart).format("MM/DD/YYYY");

    //Calculate the months worked using hardcore math

    var empMonths = moment().diff(moment(employeestart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate

    var empBilled = empMonths * employeerate;
    console.log(empBilled);

    var newRow = $("<tr>").append(
      $("<td>").text(employeeName),
      $("<td>").text(employeerole),
      $("<td>").text(empStartPretty),
      $("<td>").text(empMonths),
      $("<td>").text(employeerate),
      $("<td>").text(empBilled)
    );
    //Append the new role to the table
    $("#employee-display").append(newRow);

  });
  

});