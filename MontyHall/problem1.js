// Global Variables
var gameId; //stores the current game id
var doors = [false, false, false]; // keeps track of door states for display
var actionStep = 0; // Game step. Where are we?
var clickedDoor; //stores the currently clicked door

// Html element to write messages to player
var stats = document.getElementById('status');

//the images
var imageOpenDoor = new Image();
var imageCloseDoor = new Image();
//image paths
imageOpenDoor.src = 'img/open_door.png';
imageCloseDoor.src = 'img/closed_door.png';

//when the door closed image has loaded, set all doors to be closed and start a new game.
imageCloseDoor.onload = function() {
    document.getElementById("door1").src = imageCloseDoor.src;
    document.getElementById("door2").src = imageCloseDoor.src;
    document.getElementById("door3").src = imageCloseDoor.src;

    newGame();
}

//this displays doors depending on their states. uses the doors array variable
//the second parameter determines whether we should ensure all images have a transparent background
var showDoors = function(doors, removeBackground) {
    i = -1;

    var remBackground = removeBackground || false;

    //for each door in the door array, if the door is true (i.e open) show it as open, otherwise show it as closed.
    while (++i < 3) {

        var temp = i + 1;

        if (!doors[i]) {

            document.getElementById("door" + temp).src = imageCloseDoor.src;
        } else {
            document.getElementById("door" + temp).src = imageOpenDoor.src;

        }
        if (remBackground) {
            document.getElementById("door" + temp).style.backgroundColor = "";
        }

    }
}

// Event Listener for DOM Loading

// Choose Door Callback Function
// This function should be called whenever a door is clicked, 
// and should trigger appropriate AJAX calls.
var chooseDoor = function(event) {

    //check the event source. which door was clicked?
    var source = event.target || event.srcElement;

    if (source.id == "door1") { //door 1
        clickedDoor = 0;

    } else if (source.id == "door2") { //door 2
        clickedDoor = 1;

    } else if (source.id == "door3") { //door 3
        clickedDoor = 2;
    }

    /* Game states (actionStep):
      -1: Game is finished or has not started
       0: Player chose a door
       1: Player chose to stay or switch
    */
    if (actionStep == -1) { // Reset game. start a new.

        newGame();

        ++actionStep;


    } else if (actionStep == 0) { // Player chose the first door   

        makeFirstChoice(gameId, clickedDoor);

        //increment the actionStep so that we can proceed accordingly
        ++actionStep;

    } else if (actionStep > 0) { // Player chose to stay or switch, Open the final door

        makeFinalChoice(gameId, clickedDoor);

        //reactionStep to the initial state
        actionStep = -1;
    };
}

// You will need to define various other functions and callbacks.

// ajax helper function
// This function can be used as-is to initiate AJAX calls to the API back-end.
// usage:
//    ajax("cmd=yourcommand&option=value", callbackFunctionName);
//
// callbackFunctionName should then be defined like:
//    var callbackFunctionName = function(response) {
//       console.log(response);
//    }
//
//    The response variable will receive the response from the Server for the
//    given API call.
function ajax(url, callback) {
    url = "http://52.35.157.11/hw6/server.php?" + url;
    url = url + "&seed=" + (new Date()).getTime();

    // Create a new XMLHttpRequest Object
    var req = new XMLHttpRequest();

    // Pass Cookie Credentials along with request
    req.withCredentials = true;

    // Create a callback function when the State of the Connection changes
    req.onreadystatechange = function() {
        if (req.readyState == 4) // state of 4 is 'done'. The request has completed
        {
            console.log(JSON.parse(req.responseText));
            callback(JSON.parse(req.responseText)); // The .responseText property of the request object
        } else { // contains the Text returned from the request.
            // console.log(req.readyState);
        }
    };

    // Set up our HTTP Request
    req.open('GET', url, true);

    // Finally initiate the request
    req.send();

}

//this starts a new game.
var newGame = function() {
    ajax("cmd=newGame", function(responseText) {

        console.log('Step 1 response ' + responseText);
        // 
        if (responseText.message == "new game created") {
            gameId = responseText.data.game_id;

            doors = [false, false, false]; //begin all doors as closed

            showDoors(doors, true); //show doors as they are right now. ensure they all have a transparent background
            populateStats(); //also show the stats

            stats.innerHTML = 'New game, choose a door!';
        }
    });
}

//transmits the users first choice to the server.
var makeFirstChoice = function(gameId, choice) {
    ajax("cmd=firstChoice&game_id=" + gameId + "&choice=" + choice, function(responseText) {
        // 
        if (responseText.message == "opened door") {

            var openedDoor = parseInt(responseText.data.opened_door);
            var initial_selected = parseInt(responseText.data.initial_selected);

            doors[openedDoor] = true;

            showDoors(doors); //show doors as they are right now
            populateStats(); //also show the stats

            //highlight the selected door with a yellow background
            document.getElementById("door" + (initial_selected + 1)).style.backgroundColor = "red";

            stats.innerHTML = (initial_selected + 1) + " doesn't have the prize. Choose your first door again, or switch?";
        }
    });
}

//transmits the users second choice to the server.
var makeFinalChoice = function(gameId, choice) {



    ajax("cmd=finalChoice&game_id=" + gameId + "&choice=" + choice, function(responseText) {

        var prize_door = parseInt(responseText.data.prize_door);

        doors[prize_door] = true;

        showDoors(doors); //show doors as they are right now
        populateStats(); //also show the stats

        //show the prize door with a green background
        document.getElementById("door" + (prize_door + 1)).style.backgroundColor = "green";

        // 
        if (responseText.message == "you won") {

            stats.innerHTML = "You Won! Door " + ++prize_door + " had the prize!";
        } else {

            stats.innerHTML = "You lost! Door " + ++prize_door + " had the prize!";
        }
    });
}

//fetchs the stats from the server and shows them in a table.
var populateStats = function() {
    ajax("cmd=stats", function(responseText) {

        // Html documents to write the scores
        var winOnSwitch = document.getElementById('winOnSwitch');


        var lossOnSwitch = document.getElementById('lossOnSwitch');


        var winNoSwitch = document.getElementById('winNoSwitch');


        var lossNoSwitch = document.getElementById('lossNoSwitch');

        // Update results
        winOnSwitch.innerHTML = responseText.data.switchWins;
        lossOnSwitch.innerHTML = responseText.data.switchLoss;
        winNoSwitch.innerHTML = responseText.data.noSwitchWins;
        lossNoSwitch.innerHTML = responseText.data.noSwitchLoss;
    });
}


//attach the click listener to each door 
var doors = document.getElementsByClassName("door");

for (var i = 0; i < doors.length; i++) {
    doors[i].addEventListener('click', chooseDoor, false);
}


//run!