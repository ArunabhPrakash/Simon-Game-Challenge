/*
only this page needs comment
The code you provided appears to be a JavaScript code for a simple game where the user needs to repeat a sequence of button colors. Here's a breakdown of the code:
- The `buttonColours` array stores the colors of the buttons in the game.
- The `gamePattern` array will store the randomly generated sequence of button colors.
- The `userClickedPattern` array will store the colors clicked by the user.
- The `started` variable keeps track of whether the game has started or not.
- The `level` variable keeps track of the current level of the game.
The code sets up event handlers and defines several functions:
- The `$(document).keypress` event handler starts the game when any key is pressed. It updates the level title, calls the `nextSequence()` function to generate the first color in the sequence, and sets `started` to `true`. If the game has already started, it calls the `startOver()` function to restart the game.
- The `$(".btn").click` event handler is triggered when a button is clicked. It retrieves the id of the clicked button, adds the color to the `userClickedPattern` array, plays the corresponding sound, and applies an animation effect. It then calls the `checkAnswer()` function to verify if the user's answer is correct.
- The `checkAnswer()` function compares the user's answer at the current level with the game pattern. If the answer is correct, it checks if the user has completed the entire pattern. If so, it calls `nextSequence()` to generate the next color in the sequence. If the answer is incorrect, it plays a "wrong" sound, applies a CSS class for the "game-over" effect, and updates the level title with a game over message.
- The `nextSequence()` function prepares for the next level. It resets the user's clicked pattern, increments the level, updates the level title, generates a random number to select a random color from `buttonColours`, adds the color to the `gamePattern` array, and applies a fade-in and fade-out animation effect to the button with the random color.
- The `animatePress()` function adds and removes a CSS class to create a visual effect when a button is pressed.
- The `playSound()` function plays an audio file based on the provided sound name.
- The `startOver()` function resets the game variables to their initial values and calls `nextSequence()` to start the game again.
Please note that this code requires the jQuery library to work, as it uses jQuery syntax (`$`) for event handling and DOM manipulation.
*/
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }else {
    startOver();
}
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
console.log("starting Over");
  level = 0;
  gamePattern = [];
  started = false;
   $("#level-title").text("Level 0");
    nextSequence();
}
