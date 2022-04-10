var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var user_level = 0;
var game_count=0;

document.addEventListener("keypress", function(){
    level=0;
    if(game_count==0)
        $("h1").text("Press A Key to Start");
    if(level==0){
        gamePattern = [];   //initially gamePattern = []
        userClickedPattern = [];    //initially userPattern = []
        setTimeout(function () {
            nextSequence();
        },1000);
    }
});

function nextSequence(){    //populate gamePattern
    level++;
    $("h1").text("Level "+level);
    
    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);

    userClickedPattern = [];
    user_level = 0;

}

//for(i=0;i<=level;i++){
    $(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        if(!checkAnswer(user_level)){
            $("h1").text("Game Over. Press any key to restart!!");
            game_count++;
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            },200);
        }
        else{
            if(user_level==level){
                setTimeout(function () {
                    nextSequence();
                },1000);
            }
        }
        
    });
//}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        user_level++;
        return true;
    }
    else{
        
        return false;
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);
}


