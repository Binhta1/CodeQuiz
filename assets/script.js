var questions = [
    {
        question: "What is a pseudo-class?",
        options: ["A CSS rule that contains no declarations.","A CSS declaration that hides the element.","An element that has more than one class.","A CSS keyword to target an element's state."],
        answer: "A CSS keyword to target an element's state."
    },
    {
        question: "Which of the following is an example of a pseudo-element?",
        options: ["::before","::after","::first-letter","all of the above"],
        answer: "all of the above"
    },
    {
        question: "What do media queries allow us to do?",
        options: ["Play videos on our page"," Create responsive designs","Change css at different browser widths","Do nothing"],
        answer: "Change css at different browser widths"

    },
    {
        question: "what does the Z-index property do?",
        options: ["Removes an element from the DOM","Changes the stacking order of elements","Changes the opacity of an element.","Forces an element to be positioned relatively."],
        answer: "Changes the stacking order of elements"
    },
    {
        question: "Which one of these is NOT a valid media type for media queries?",
        options: ["All","Screen","Tablet","Speech"],
        answer: "Tablet"
    },
];

var timer = document.querySelector("#Timer")
var timeRemaining = 75
var startQuiz = document.querySelector("#start")
var quizArea = document.querySelector("#quiz")
var QI = 0
var qList = document.createElement("ul")
var timePenalty = 15

timer.textContent = "Time Remaining: " + timeRemaining

startQuiz.addEventListener("click", function() {
    setInterval( function() {
        if (timeRemaining > 0) {
            timeRemaining--
            timer.textContent = "Time Remaining: " + timeRemaining
        }
        else {
            clearInterval(timeRemaining)
            endQuiz()
        }
    }, 1000)
    Quiz()
})

var Quiz = function() {
    quizArea.innerHTML = ""
    qList.innerHTML = ""

    for (i = 0; i < questions.length; i++) {
        var currentQuestion = questions[QI].question
        var currentOptions = questions[QI].options
        quizArea.textContent = currentQuestion
    }
    currentOptions.forEach (function (newQ) {
        var qlItem = document.createElement("li")
        qlItem.textContent = newQ
        quizArea.appendChild(qList)
        qList.appendChild(qlItem)
        qlItem.addEventListener("click", validate)
    })
}
function validate(event) {
    var element = event.target
    
    if (element.matches("li")){
        var result = document.createElement("div")
        result.setAttribute("id", "result")
        if (element.textContent == questions[QI].answer){
            result.textContent = "Correct! that is right " + questions[QI].answer
        }else{
            timeRemaining = timeRemaining - timePenalty;
            result.textContent = "Wrong! the answer is " + questions[QI].answer
        }
    }
    QI++

    if (QI < questions.length) {
        Quiz(QI)
    }else {
        endQuiz()
        result.textContent = "You have finish the quiz: " + timeRemaining + " seconds remaining"
    }
    quizArea.appendChild(result)
}

function endQuiz(){
    quizArea.innerHTML= ""

    var createH1 = document.createElement("h1")
    createH1.setAttribute("id","createH1")
    createH1.textContent = "FINISHED!!"

    quizArea.appendChild(createH1)

    var createP = document.createElement("p")
    createP.setAttribute("id","createP")

    quizArea.appendChild(createH1)
    
    if (timeRemaining >= 0 ) {                
        clearInterval(timeRemaining)        
    }

    createLabel = document.createElement("label")
    createLabel.setAttribute("id", "createLabel")
    createLabel.textContent = "Enter your Name"

    quizArea.appendChild(createLabel)

    var createInput = document.createElement("input")
    createInput.setAttribute("type", "text")
    createInput.setAttribute("id","initials")
    createInput.textContent = ""

    quizArea.appendChild(createInput)

    var createSumbit = document.createElement("button")
    createSumbit.setAttribute("type", "submit")
    createSumbit.setAttribute("id","submit")    
    createSumbit.textContent = "submit"

    quizArea.appendChild(createSumbit)

    createSumbit.addEventListener("click", function(){
        var initials = createInput.value

        while(initials === null) {
            alert("Plz enter your Initials or Name")
            var initials = createInput.value
        }
        var finalscore = {
            initials: initials,
            score: timeRemaining,
        }

        var allScores = localStorage.getItem(allScores)
        if (allScores === null){
            allScores = []
        }else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalscore)
        var newScore =JSON.stringify(allScores)
        localStorage.setItem("allScores", newScore)

    })

}

//localStorage.setItem('allScores', JSON.stringify({initials , allScores}))