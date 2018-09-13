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



var database = firebase.database();

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
// 3. Button for adding trains
$("#train-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#time").val().trim();
    var frequency = $("#frequency").val().trim();
    // Log to check

    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    // Creates local "temporary" object for holding train data
    var arriveTrain = {

        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    };

    // Uploads train data to the database
    database.ref().push(arriveTrain);

    // Logs everything to console
    console.log(arriveTrain.name);
    console.log(arriveTrain.destination);
    console.log(arriveTrain.time);
    console.log(arriveTrain.frequency);

    // Alert
    alert("It Works bazinga!!");

    // Clears all of the text-boxes
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");

    // Determine when the next train arrives.
    return false;
});