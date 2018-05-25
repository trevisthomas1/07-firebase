// Initialize Firebase (YOUR OWN APP)
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)

var config = {
  apiKey: "AIzaSyCoyo6in4ZS92aZF67Yg_kPQlEAU-D8W24",
  authDomain: "fir-practice-209d5.firebaseapp.com",
  databaseURL: "https://fir-practice-209d5.firebaseio.com",
  projectId: "fir-practice-209d5",
  storageBucket: "fir-practice-209d5.appspot.com",
  messagingSenderId: "726745729586"
};
firebase.initializeApp(config);

// Create a variable to reference the database
// var database = ...
var database = firebase.database();

// Use the below initialValue
var initialValue = 100;

// Use the below variable clickCounter to keep track of the clicks.
var count = initialValue;

// --------------------------------------------------------------

// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// This callback keeps the page updated when a value changes in firebase.
// HINT: Assuming 'database' is our database variable, use...
// database.ref().on("value", function(snapshot)) {}
database.ref().on("value",function(snapshot){

// We are now inside our .on function...

// Console.log the "snapshot" value (a point-in-time representation of the database)
// This "snapshot" allows the page to get the most current values in firebase.


// Change the value of our clickCounter to match the value in the database
// ___________ = snapshot.val().______________________

  count = snapshot.val().clicks;

// Console Log the value of the clickCounter

// Change the HTML using jQuery to reflect the updated clickCounter value

  $("#click-value").html(count);

// Then include Firebase error logging
// HINT: }, function(errorObject)

})

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#click-button").on("click", function() {

  // Reduce the clickCounter by 1
  count--;

  // Alert User and reset the counter
  if (count === 0) {

    alert("Phew! You made it! That sure was a lot of clicking.");

    count = initialValue;

  }

  // Save new value to Firebase
  firebase.database().ref().set({
    clicks: count
  });

  // Log the value of clickCounter
  console.log(count);

});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {

  // Set the clickCounter back to initialValue
  count = initialValue;

  // Save new value to Firebase
  firebase.database().ref().set({
    clicks: count
  });

  // Log the value of clickCounter
  console.log(count);

  // Change the HTML Values
  $("#click-value").text(count);


});
