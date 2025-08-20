var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Detect mobile or desktop and set title
if (/Mobi|Android/i.test(navigator.userAgent)) {
  $("#level-title").text("Tap to Start the Game");
} else {
  $("#level-title").text("Press Any Key to Start the Game");
}

// Keyboard: Start or restart
$(document).keydown(function () {
  if (!started || $("#level-title").text().includes("Game Over")) {
    startGame();
  }
});

// Mobile: Start or restart
$(document).on("touchstart", function () {
  if (!started || $("#level-title").text().includes("Game Over")) {
    startGame();
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      $("#level-title").text("Game Over, Tap to Restart");
    } else {
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    started = false; // allow restart
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startGame() {
  level = 0;
  gamePattern = [];
  started = true;
  $("#level-title").text("Level " + level);
  nextSequence();
}
