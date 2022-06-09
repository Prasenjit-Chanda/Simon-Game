var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


//Start of new Level
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level: " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  sound(randomChosenColor);
}

//Produce sound of given color
function sound(color) {
  $("#" + color).click(function() {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
  })
}

//EventListener  for click event over buttons
$(".btn").click(function(event) {
  var userChosenColor = event.target.id;   //'this' can be used in place of 'event.target' as well.
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  sound(userChosenColor);
  checkAnswer(userClickedPattern.length-1); //Passing the index of latest addition to userClickedPattern
})

//Animation on button being pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

//Start/Restart og Game
$(document).keydown(function() {
  if (gameStarted == false) {
    gameStarted = true;
    $("#level-title").text("Level: " + level);
    nextSequence();
  }
});

//Checks the latest addition in userClickedPattern
function checkAnswer(currentIndex) {
  if(userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    // console.log("Yes");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  }
  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300)
    startOver();
  }
}

//Restart Game
function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
