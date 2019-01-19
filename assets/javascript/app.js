
// To be able to easily modify root directory
var path = "./assets/";

var masterQuestionList = [
    {
        question: "In the X-Men film franchise, Halle Berry played the role of which character?",
        answers: {
            a1: "Cyclops",
            a2: "Beast",
            a3: "Storm",
            a4: "Wolverine"
        },
        correct:  3,
        img: path + "images/st.gif"
    },
    {
        question: "How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?",
        answers: {
            a1: "Adam Sandler",
            a2: "Jim Carrey",
            a3: "Eddie Murphy",
            a4: "Ben Stiller"
        },
        correct:  2,
        img: path + "images/jc.gif"
    },
    {
        question: "In what city would you find the Wizard of Oz?",
        answers: {
            a1: "Diamond City",
            a2: "Silvermoon City",
            a3: "Amber City",
            a4: "Oz City",
            a5: "Emerald City"
        },
        correct:  5,
        img: path + "images/oz.gif"
    },
    {
        question: "What is Shawshank, in the movie The Shawshank Redemption?",
        answers: {
            a1: "The town",
            a2: "The prison",
            a3: "The warden"
        },
        correct:  2,
        img: path + "images/sr.gif"
    },
    {
        question: "What 2013 science fiction blockbuster starred Sandra Bullock and George Clooney?",
        answers: {
            a1: "Speed",
            a2: "The Heat",
            a3: "Gravity",
            a4: "Ocean's 8",
            a5: "Solaris",
        },
        correct:  3,
        img: path + "images/gr.gif"
    },
    {
        question: "In the movie " + '"The Lion King"' + ", what was Simba's mother's name?",
        answers: {
            a1: "Sarabi",
            a2: "Nala",
            a3: "Zazu",
            a4: "Tatiana",
            a5: "Sharia",
            a6: "Kiara"
        },
        correct:  1,
        img: path + "images/lk.gif"
    }
]


var gameState = "notPlaying";

var correct;
var incorrect;
var unanswered;
var time;
var resultTimer;
var currentQuestionList;
var arrayPointer; // To randomize order of possible answers

var audioTheme = new Audio(path + "audio/movie-theme.mp3");
var audioCorrect = new Audio(path + "audio/applause.mp3");
var audioWrong = new Audio(path + "audio/fail-trombone.mp3");
var audioTimeout = new Audio(path + "audio/fail-trumpet.mp3");



window.onload = function() {
    $("#game").hide();
    $("#gameResult").hide();
    $("#gameOver").hide();
}



// On click Answer
$(document).on('click','.answer', function() {
    if (this.id == correctAnswerID){
        showCorrect();
    } else {
        showIncorrect();
    }
});

// Start Game by Clicking
$(document).on('click','.centerMessage', function() {
    initialize();
});

// Start Game by Pressing Enter
document.onkeyup = function(event) { // Grab key event
    var x = event.charCode || event.keyCode; // depending on browser - for compatibility
    if (x === 13) {
        if (gameState == "notPlaying") { // If Enter is pressed while playing game, avoid reset
            initialize();
        }
    }
}

// Initiallize game
function initialize() {
    gameState = "Playing";
    clear();
    showQuestion();
}

function playTheme() {
    if (!(audioTheme.duration > 0 && !audioTheme.paused)) {
        audioTheme.currentTime = 0;
        audioTheme.play();
    }
}

function playCorrect() {
    audioCorrect.currentTime = 0;
    audioCorrect.play();
}

function playWrong() {
    audioWrong.currentTime = 0;
    audioWrong.play();
}

function playTimeout() {
    audioTimeout.currentTime = 0;
    audioTimeout.play();
}

// Avoid text selection
function noText(x){
    x.attr('unselectable', 'on');
    x.css('user-select', 'none');
    x.on('selectstart', false);
}

function clear() {
    playTheme();
    currentQuestionList = masterQuestionList.slice();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    console.log("New Game");
}

function startTimer() {
    timer = setInterval(function(){
        if (time > 0) {
            time--;
            $("#timer").html("Time Remaining: <font color='red'>" + time + "</font>");
        } else {
            showUnanswered()
        }
    }, 1000);
}

function gameOver (){
    clearInterval(timer);
    $("#game").hide();
    $("#gameOver").show();
    $("#correct").html("<font color='green'>" + correct + "</font>");
    $("#incorrect").html("<font color='red'>" + incorrect + "</font>");
    $("#unanswered").html("<font color='orange'>" + unanswered + "</font>");
    gameState = "notPlaying";
    console.log("Game Over");
}

function showCorrect() {
    clearInterval(timer);
    $("#game").hide();
    $("#gameResult").show();
    $("#resultStatus").html("<font color='green'>Correct!</font>");
    $("#correctAnswer").html("The answer is: <font color='green'>" + correctAnswerText + "</font>");
    $("#resultPhoto").html("<a><img src=" + currentPhoto + "></>")

    correct++;
    playCorrect();
    console.log("Correct");
    resultTimer = setInterval(showQuestion, 5000);
}

function showIncorrect() {
    clearInterval(timer);
    $("#game").hide();
    $("#gameResult").show();
    $("#resultStatus").html("<font color='red'>Wrong!</font>");
    $("#correctAnswer").html("The answer is: <font color='red'>" + correctAnswerText + "</font>");
    $("#resultPhoto").html("<a><img src=" + currentPhoto + "></>")
    
    incorrect++;
    playWrong();
    console.log("Incorrect");
    resultTimer = setInterval(showQuestion, 5000);
}

function showUnanswered(){
    clearInterval(timer);
    $("#game").hide();
    $("#gameResult").show();
    $("#resultStatus").html("<font color='orange'>Out of Time!</font>");
    $("#correctAnswer").html("The answer is: <font color='orange'>" + correctAnswerText + "</font>");
    $("#resultPhoto").html("<a><img src=" + currentPhoto + "></>")

    unanswered++;
    playTimeout();
    console.log("Timeout");
    resultTimer = setInterval(showQuestion, 5000);
}

// To randomize order of possible answers
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function showQuestion() {
    $("#gameStart").hide();
    $("#gameResult").hide();
    $("#gameOver").hide();
    $("#game").show();
    clearInterval(resultTimer);
    time = 10; // reset time
    arrayPointer = []; //reset array
    startTimer();
    if (currentQuestionList.length > 0){
        currentQuestionPointer = Math.floor(Math.random() * currentQuestionList.length);
        currentQuestion = currentQuestionList[currentQuestionPointer].question;
        correctAnswerID = currentQuestionList[currentQuestionPointer].correct;
        currentPhoto = currentQuestionList[currentQuestionPointer].img;
        currentAnswerList = currentQuestionList[currentQuestionPointer].answers
        correctAnswerText = currentAnswerList["a" + correctAnswerID];
        $("#timer").html("Time Remaining: <font color='red'>" + time + "</font>");
        $("#currentQuestion").html(currentQuestion);
        $("#currentAnswers").html(""); // to clear ansewers for next question
        
        // Create an array with the length of possible answers
        for (i=1; i <= Object.keys(currentAnswerList).length; i++) {
            arrayPointer.push(i);
        }
        console.log(arrayPointer);

        // To randomize order of possible answers
        arrayPointer = shuffle(arrayPointer);
        

        for (i=0; i<arrayPointer.length; i++) {
            
            var currentAnswer = $("<td>");
            var text = currentQuestionList[currentQuestionPointer].answers["a" + arrayPointer[i]];
            currentAnswer.attr("id", arrayPointer[i]),
            currentAnswer.addClass("answer animated flipInX");
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