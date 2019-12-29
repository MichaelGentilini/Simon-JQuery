var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var currentScore = 0;

localStorage.setItem("highScore", 0);
localStorage.setItem("currentScore", 0);

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Current Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    updateHighScore(localStorage.currentScore);

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("h2").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(() => {
      console.log("current score > high score ?");
      console.log(
        parseInt(localStorage.currentScore) > parseInt(localStorage.highScore)
      );

      if (
        parseInt(localStorage.currentScore) > parseInt(localStorage.highScore)
      ) {
        $("h2").text("New High Score!");
      } else {
        $("h2").text("Your Score was " + localStorage.currentScore);
      }
    }, 1500);

    setTimeout(() => {
      $("body").removeClass("game-over");
      updateHighScore(localStorage.currentScore);
      startOver();
    }, 3000);
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;

  localStorage.currentScore = level - 1;
  updateHighScore(localStorage.currentScore);
  $("#level-title").text("Can you remember all of them?");

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  playSound(currentColor);
  $("#" + currentColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function updateHighScore(userScore) {
  if (userScore > localStorage.highScore) {
    localStorage.highScore = userScore;
  }
}

function startOver() {
  level = 0;
  localStorage.currentScore = 0;
  gamePattern = [];
  started = false;
  $("#high-score").text(localStorage.highScore);
  $("h2").text(" Press any key to play again!");
}
