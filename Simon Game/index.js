var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keypress(function(event) {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

})

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}


$(".btn").click(function() {
  console.log($(this).attr("id"));
  animatePress($(this).attr("id"));
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
  console.log("test");
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("sucsses");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    console.log("failed");
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 1000);
    $("#level-title").text("You failed, press key to restart");
    startOver();

  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started=false;
}
