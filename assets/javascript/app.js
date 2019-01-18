var masterQuestionList = [
    {
        q: "In the X-Men film franchise, Halle Berry played the role of which character?",
        a1: "Cyclops",
        a2: "Beast",
        a3: "Storm",
        a4: "Wolverine",
        c:  3
    },
    {
        q: "How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?",
        a1: "Adam Sandler",
        a2: "Jim Carrey",
        a3: "Eddie Myrphy",
        a4: "Ben Stiller",
        c:  2
    },
    {
        q: "In what city would you find the Wizard of Oz?",
        a1: "Diamond City",
        a2: "Silvermoon City",
        a3: "Amber City",
        a4: "Emerald City",
        c:  4
    },
    {
        q: "What is Shawshank, in the movie The Shawshank Redemption?",
        a1: "The town",
        a2: "The prison",
        a3: "The warden",
        a4: "The main character",
        c:  2
    },
]


var gameState = "notPlaying";

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 15;
var resultTimer = null;


var currentQuestionList = masterQuestionList.slice();

//Avoid text selection
function noText(x){
    x.attr('unselectable', 'on');
    x.css('user-select', 'none');
    x.on('selectstart', false);
 }

function clear() {
    currentQuestionList = masterQuestionList.slice();
    time = 15;
    console.log("New ganme");
}

function startTimer() {
    // tempTimer = setInterval(timer, 1000);
    timer = setInterval(function(){
        if (time > 0) {
            time--;
            $("#timer").html("Time Remaining: " + time);
        } else {
            showUnanswered()
        }
    }, 1000);
}

// function timer(){
    
// }



function gameOver (){
    // console.log(currentQuestionList.length);
    clear();
}

function showCorrect() {
    clearInterval(timer);
    $("#game").hide();
    $("#correct").show();
    correct++;
    console.log("correct");
    resultTimer = setInterval(showQuestion, 5000);
}

function showIncorrect() {
    clearInterval(timer);
    $("#game").hide();
    $("#incorrect").show();
    incorrect++;
    console.log("incorrect");
    resultTimer = setInterval(showQuestion, 5000);
}

function showUnanswered(){
    clearInterval(timer);
    $("#game").hide();
    $("#unanswered").show();
    unanswered++;
    console.log("Timeout");
    resultTimer = setInterval(showQuestion, 5000);
}

function showQuestion() {
    $("#gameStart").hide();
    $("#game").show();
    clearInterval(resultTimer);
    time = 15;
    startTimer();
    if (currentQuestionList.length > 0){
        currentQuestionPointer = Math.floor(Math.random() * currentQuestionList.length);
        currentQuestion = currentQuestionList[currentQuestionPointer].q;
        correctAnswer = currentQuestionList[currentQuestionPointer].c;
        $("#timer").html("Time Remaining: " + time);
        $("#currentQuestion").html("<td>" + currentQuestion + "</td>");
        $("#currentAnswers").html(""); // to clear ansewers for next question
        for (i=1; i<5; i++) {
            var currentAnswer = $("<td>");
            var text = currentQuestionList[currentQuestionPointer]["a"+i];
            currentAnswer.attr("id", i),
            currentAnswer.addClass("answer");
            currentAnswer.html(text);
            
            //Avoid text selection
            noText(currentAnswer);

            $("#currentAnswers").append(currentAnswer);
        }
        console.log(correctAnswer);
        currentQuestionList.splice(currentQuestionPointer, 1);
    } else {
        gameOver();
    }
}

document.onkeyup = function(event) {
    // Start Game By Pressing Enter
    var x = event.charCode || event.keyCode; // depending on browser - for compatibility
    if (x === 13) {
        if (gameState == "notPlaying") { // If Enter is pressed while playing game, avoid reset
            // clear();
            showQuestion();
        }
    }
}

$(document).on('click','.answer', function() {
    if (this.id == correctAnswer){
        showCorrect();
    } else {
        showIncorrect();
    }
});

window.onload = function() {
    $("#game").hide();
    $("#correct").hide();
    $("#incorrect").hide();
    $("#unanswered").hide();
}