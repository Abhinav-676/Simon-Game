
let level = 0;
let index = 0;
let started = false;

const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []

const playSound = (name) => {
    new Audio(`sounds/${name}.mp3`).play()
}

const animatePress = (name) => {

    $(`#${name}`).addClass("pressed")

    setTimeout(function(){
        $(`#${name}`).removeClass("pressed")
    }, 200)

}

const nextSequence = () => {

    let randomNumber = Math.floor(Math.random() * 4)

    let randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour);
    
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
}

$(document).on("keypress", function(){
    if(!started)
    {
        started = true;

        $("h1").text(`${level}`)

        setTimeout(function(){
            nextSequence();
        }, 700)
    }
})

$(".start-button").on("click", function(){
    if(!started)
    {
        started = true;

        $("h1").text(`${level}`)

        setTimeout(function(){
            nextSequence();
        }, 700)
    }
})

$(".btn").on("click", function(e){
    let userChosenColour = $(e.target).attr("id")

    animatePress(userChosenColour)

    if(userChosenColour == gamePattern[index])
    {
        playSound(userChosenColour)
        if(index == level)
        {
            userClickedPattern = []
            level++;
            index = 0;

            $("h1").text(`${level}`)

            setTimeout(function(){
                nextSequence()
            }, 700)
            
        }else {
            index++;
        }

    } else {
        let highScore = level

        level = 0;
        started = false
        gamePattern = []

        playSound("wrong")
        $("h1").html(`<p>Game Over, Press any key to restart</p><p>Score: ${highScore}</p>`)
    }
})
