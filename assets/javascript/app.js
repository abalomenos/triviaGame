var masterQuestionList = [
    {
        q: "In the X-Men film franchise, Halle Berry played the role of which character?",
        a1: "Cyclops",
        a2: "Beast",
        a3: "Storm",
        a4: "Wolverine",
        c:  3,
        img: "https://via.placeholder.com/150"
    },
    {
        q: "How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?",
        a1: "Adam Sandler",
        a2: "Jim Carrey",
        a3: "Eddie Murphy",
        a4: "Ben Stiller",
        c:  2,
        img: "https://via.placeholder.com/150"
    },
    {
        q: "In what city would you find the Wizard of Oz?",
        a1: "Diamond City",
        a2: "Silvermoon City",
        a3: "Amber City",
        a4: "Emerald City",
        c:  4,
        img: "https://via.placeholder.com/150"
    },
    {
        q: "What is Shawshank, in the movie The Shawshank Redemption?",
        a1: "The town",
        a2: "The prison",
        a3: "The warden",
        a4: "The main character",
        c:  2,
        img: "https://via.placeholder.com/150"
    },
]


var gameState = "notPlaying";

var correct;
var incorrect;
var unanswered;
var time;
var resultTimer;
var currentQuestionList;

//Avoid text selection
function noText(x){
    x.attr('unselectable', 'on');
    x.css('user-select', 'none');
    x.on('selectstart', false);
 }

function clear() {
    currentQuestionList = masterQuestionList.slice();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    console.log("New Ganme");
}

function startTimer() {
    timer = setInterval(function(){
        if (time > 0) {
            time--;
            $("#timer").html("Time Remaining: " + time);
        } else {
            showUnanswered()
        }
    }, 1000);
}

function gameOver (){
    clearInterval(timer);
    $("#game").hide();
    $("#gameOver").show();
    $("#correct").html("Correct answers: " + correct);
    $("#incorrect").html("Incorrect answers: " + incorrect);
    $("#unanswered").html("Unanswered answers: " + unanswered);
    gameState = "notPlaying";
}

function showCorrect() {
    clearInterval(timer);
    $("#game").hide();
    $("#gameResult").show();
    $("#resultStatus").html("Correct!");
    $("#correctAnswer").html("The answer is: " + correctAnswerText);
    $("#resultPhoto").html("<a><img src=" + currentPhoto + "></>")

    correct++;
    console.log("Correct");
    resultTimer = setInterval(showQuestion, 5000);
}

function showIncorrect() {
    clearInterval(timer);
    $("#game").hide();
    $("#gameResult").show();
    $("#resultStatus").html("Wrong!");
    $("#correctAnswer").html("The answer is: " + correctAnswerText);
    $("#resultPhoto").html("<a><img src=" + currentPhoto + "></>")
    
    incorrect++;
    console.log("Incorrect");
    resultTimer = setInterval(showQuestion, 5000);
}

function showUnanswered(){
    clearInterval(timer);
    $("#game").hide();
    $("#gameResult").show();
    $("#resultStatus").html("Out of Time!");
    $("#correctAnswer").html("The answer is: " + correctAnswerText);
    $("#resultPhoto").html("<a><img src=" + currentPhoto + "></>")

    unanswered++;
    console.log("Timeout");
    resultTimer = setInterval(showQuestion, 5000);
}

function showQuestion() {
    $("#gameStart").hide();
    $("#gameResult").hide();
    $("#gameOver").hide();
    $("#game").show();
    clearInterval(resultTimer);
    time = 10;
    startTimer();
    if (currentQuestionList.length > 0){
        currentQuestionPointer = Math.floor(Math.random() * currentQuestionList.length);
        currentQuestion = currentQuestionList[currentQuestionPointer].q;
        correctAnswerID = currentQuestionList[currentQuestionPointer].c;
        currentPhoto = currentQuestionList[currentQuestionPointer].img;
        correctAnswerText = currentQuestionList[currentQuestionPointer]["a" + correctAnswerID];
        $("#timer").html("Time Remaining: " + time);
        $("#currentQuestion").html("<td>" + currentQuestion + "</td>");
        $("#currentAnswers").html(""); // to clear ansewers for next question
        for (i=1; i<5; i++) {
            var currentAnswer = $("<td>");
            var text = currentQuestionList[currentQuestionPointer]["a" + i];
            currentAnswer.attr("id", i),
            currentAnswer.addClass("answer");
            currentAnswer.html(text);
            
            //Avoid text selection
            noText(currentAnswer);

            $("#currentAnswers").append(currentAnswer);
        }
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
            gameState = "Playing";
            clear();
            showQuestion();
        }
    }
}

$(document).on('click','.answer', function() {
    if (this.id == correctAnswerID){
        showCorrect();
    } else {
        showIncorrect();
    }
});

window.onload = function() {
    $("#game").hide();
    $("#gameResult").hide();
    $("#gameOver").hide();
}