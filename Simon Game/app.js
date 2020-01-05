
const buttonColours = ["red", "green", "blue", "yellow"];
let colourPattern = [];
let userChoices = [];
let level = 0;
let gameStarted = false;

function playSound(name){
    const sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(colour){
    //changes css
    $(`#${colour}`).addClass("pressed");
    setTimeout(function(){$(`#${colour}`).removeClass("pressed");}, 100);
}

function nextTile(){

    const randomNumber = Math.floor(Math.random() * 4);  //rand between 0 and 3
    randomColour = buttonColours[randomNumber];  //get random color from array
    colourPattern.push(randomColour);

    $(`#${randomColour}`).fadeOut(100).fadeIn(100); //flash animation

    //play sound
    playSound(randomColour);

    //update screen and vars
    level++;
    $("h1").text(`Level ${level}`);
        
    //reset user array 
    userChoices = [];
    
}

function checkAnswer(index){
    // check top element
    if (userChoices[index] === colourPattern[index]){
        console.log("correct");
        
        
    }else{   // wrong choice 
        //play audio
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 300);
        $("h1").text("Game over, press any key to restart!");

        //reset values
        gameStarted = false;
        colourPattern = [];
        level = 0;
      

        return;
    }

    //continue if index filled
    if (userChoices.length === colourPattern.length){
        setTimeout(nextTile, 1000); // 1 sec delay before continuing
    }
}

$(".btn").click(function(){

    if (gameStarted === false){
        return;
    }

    const userChoice = $(this).attr("id"); 
    //play sound
    playSound(userChoice);
   
    //animate
    animatePress(userChoice);
   
    //add user choice and call check answer
    
    userChoices.push(userChoice);
    checkAnswer(userChoices.length -1);
    
});

$(document).keypress(function(){

    if(!gameStarted){
        gameStarted = true;
        $("h1").text("Level 0");
        setTimeout(nextTile, 200); // 0.2 sec delay before starting
    }
    
});


