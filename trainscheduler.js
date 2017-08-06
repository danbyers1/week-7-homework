
  var config = {
    apiKey: "AIzaSyC5NSbdsTjmC4EXti94UYEKzYydyQKRsNE",
    authDomain: "trainscheduledb.firebaseapp.com",
    databaseURL: "https://trainscheduledb.firebaseio.com",
    projectId: "trainscheduledb",
    storageBucket: "trainscheduledb.appspot.com",
    messagingSenderId: "48349009137"
  };
 
firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrain").on("click", function() {
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#trainTime").val().trim(), "HH:mm").subtract(10,"years").format("X");
  var frequency = $("#trainMinutes").val().trim();

  var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
  }

  trainData.ref().push(newTrain);

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainTime").val("");
  $("#trainMinutes").val("");

  return false;

})

  trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")% frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><td>");

  })

  // Train Info
  //console.log(name);
  //console.log(destination);
  //console.log(frequency);
  //console.log(firstTrain);
