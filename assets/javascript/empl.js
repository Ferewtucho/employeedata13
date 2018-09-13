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
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        // Grabbed values from text-boxes
        employeeName = $("#employee-name").val().trim();
        employeeRole = $("#employee-role").val().trim();
        startDate = $("#start-date").val().trim();
        monthlyRate = $("#monthly-rate").val().trim();

        // Code for "Setting values in the database"
        database.ref().push({
            employeeName: employeeName,
            employeeRole: employeeRole,
            startDate: startDate,
            monthlyRate: monthlyRate
        });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function (snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val());

        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


});