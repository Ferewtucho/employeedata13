 // Initial Values

$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDUrWsCGleElofc5fErTiYgS6GlGGVF0HY",
        authDomain: "fir-recent-user.firebaseapp.com",
        databaseURL: "https://fir-recent-user.firebaseio.com",
        storageBucket: "fir-recent-user.appspot.com"
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
  $("#add-employee").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    employeeName = $("#employee-name-input").val().trim();
    employeeRole = $("#employee-role-input").val().trim();
    startDate = $("#start-date-input").val().trim();
    monthlyRate = $("#monthly-rate-input").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
      employeeName: employeeName,
      employeeRole: employeeRole,
      startDate: startDate,
      monthlyRate: monthlyRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

// Firebase watcher + initial loader HINT: .on("child_added")
database.ref().on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());

    // Change the HTML to reflect
    $("#employee-name-display").text(snapshot.val().employeeName);
    $("#employee-role-display").text(snapshot.val().employeeRole);
    $("#start-date-display").text(snapshot.val().startDate);
    $("#monthly-rate-display").text(snapshot.val().monthlyRate);
    $("#months-worked").text(snapshot.val().monthsWorked);
    $("#total-billed").text(snapshot.val().totalBilled);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
});