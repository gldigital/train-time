  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxvbBGZcF7w7RIZArO20LjDzTMtG1w_IA",
    authDomain: "train-schedular-8be22.firebaseapp.com",
    databaseURL: "https://train-schedular-8be22.firebaseio.com",
    projectId: "train-schedular-8be22",
    storageBucket: "",
    messagingSenderId: "1096858982587"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding trains
$('#add-train-btn').on("click", function(event) {
    
    event.preventDefault();

    // Grabs user input 
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "minutes").format("X");
    var trainFrequency = $("#trainFrequency-input").val().trim();
    
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrain,
        frequency: trainFrequency
    }

    // uploads train data to Firebase
    database.ref().push(newTrain);

	// clear text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#trainFrequency-input").val("");

});

database.ref().on('child_added', function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // storing firebase data into a variable 
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;

    // creating Next arrival and minutes away 
    var diffTime = moment().diff(moment.unix(firstTrain), "minutes");
    var timeRemainder = moment().diff(moment.unix(firstTrain), "minutes") % trainFrequency ;
    var minutes = trainFrequency - timeRemainder;


    var nextTrainArrival = moment().add(minutes, "m").format("LT");

    // debugging
    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("HH:mm A"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));
  

     // adding data into table
    $("#train-table > tbody").append("<tr><td>" + trainName + 
    "</td><td>" + trainDestination + 
    "</td><td>" + trainFrequency + " mins" +
    "</td><td>" + nextTrainArrival + 
    "</td><td>" + minutes + "</td></tr>");

    
});

