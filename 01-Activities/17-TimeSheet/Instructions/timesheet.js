var config = {
    apiKey: "AIzaSyBDTtWTgTYhdb2yUNlW-gu9Urrl5ii9MOo",
    authDomain: "timesheet-b3594.firebaseapp.com",
    databaseURL: "https://timesheet-b3594.firebaseio.com",
    projectId: "timesheet-b3594",
    storageBucket: "timesheet-b3594.appspot.com",
    messagingSenderId: "447337683381"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var role = "";
var startDate = "";
var monthsWorked = 0;
var monthlyRate = 0;
var totalBilled = 0;
var dateAdded = "";

$("#add-employee-btn").on("click", function () {
    event.preventDefault();

    name = $("#employee-name-input").val().trim();
    role = $("#role-input").val().trim();
    startDate = moment($("#start-input").val().trim()).format('YYYY,MM,DD');
    monthsWorked = moment([startDate]).diff(moment([dateAdded]), 'months', true);
    monthlyRate = $("#rate-input").val().trim();
    totalBilled = 0;
    dateAdded = moment(firebase.database.ServerValue.TIMESTAMP).format('YYYY,MM,DD');

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthsWorked: monthsWorked,
        monthlyRate: monthlyRate,
        totalBilled: totalBilled,
        dateAdded: dateAdded
    });

    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");

});

database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val().name);
    console.log(snapshot.val().role);
    console.log(snapshot.val().startDate);
    console.log(snapshot.val().monthsWorked);
    console.log(snapshot.val().monthlyRate);
    console.log(snapshot.val().totalBilled);
    console.log(snapshot.val().dateAdded);

    $(".table tr:last").after("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().role + 
      "</td><td>" + snapshot.val().startDate + "</td><td>" + snapshot.val().monthsWorked + "</td><td>" + 
      snapshot.val().monthlyRate + "</td><td>" + snapshot.val().totalBilled + "</td></tr>");

},
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code)
    });