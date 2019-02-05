//   TRAINSCHEDULER HOMEWORK using Firebase 



// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKvmV5uBiSI8RtB7FhF7R5O05_Sigubn8",
    authDomain: "train-homework-d2a35.firebaseapp.com",
    databaseURL: "https://train-homework-d2a35.firebaseio.com",
    projectId: "train-homework-d2a35",
    storageBucket: "train-homework-d2a35.appspot.com",
    messagingSenderId: "860752388000"
  };

  firebase.initializeApp(config);

// 2. assign a name to the firebase database of trainData

  var trainData = firebase.database();



// 3. Button for adding Train Data with an onclick function
    
        $("#addTrainBtn").on("click", function(){

// 4. Assign name to firebase database fields with correct id names from html

            var trainName = $("#trainNameInput").val().trim();
            var destination = $("#destinationInput").val().trim();
            var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10, "years").format("X");
            var frequency = $("#frequencyInput").val().trim();

// 5. Create object array with key pairs that correspond to the Data

            var newTrain = {
              name: trainName,
              destination: destination,
              firstTrain: firstTrain,
              frequency: frequency
            }

// 6. Write function to push newTrain JSON into firebase Database

            trainData.ref().push(newTrain);


// 7. Get Firebase values to correct ids with JQuery

            $("#trainNameInput").val("");
            $("#destinationInput").val("");
            $("#firstTrainInput").val("");
            $("#frequencyInput").val("");

// 9. Return false when user hits Submit button

            return false;

        })

// 10. Use snapshot function to add children to database as when it is input 

        trainData.ref().on("child_added", function(snapshot){
          var name = snapshot.val().name;
          var destination = snapshot.val().destination;
          var frequency = snapshot.val().frequency;
          var firstTrain = snapshot.val().firstTrain;

// 11. Use moment.js to convert military time into minutes for the arrival and calculate the remainder between firstTrain and next Train then make minutes to the next train the difference between the frequency and the remainder!
          var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
          var minutes = frequency - remainder;
          var arrival = moment().add(minutes,"m").format("hh:mm A");



// 12. Append data to the table body using correct database variables in trainData
          $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><tr>");



        })

