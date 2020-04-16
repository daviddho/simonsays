
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0
var started = false;

$(document).keypress(function(){
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }


});


$("div.btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
userClickedPattern = [];
level++;
$("h1").text("Level " + level);
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
$("#" + currentColour).addClass("pressed")
setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
});
}

function checkAnswer(currentLevel)
{if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {console.log("success");
      if (userClickedPattern.length === gamePattern.length)
      {setTimeout(function()
        {nextSequence();
        }, 1000);
      }

    }
 else {$("body").addClass("game-over");
       $("h1").text("Game Over");
      var audioWrong = new Audio("sounds/wrong.mp3");
      audioWrong.play();
      setTimeout(function(){
        $("body").removeClass("game-over");
              $("h1").text("Game Over, Press Any Key to Restart");
      },1000);
      started = false;
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
}
}
