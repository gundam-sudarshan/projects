const questions = [
    {
        question : "Which one of these lists contains only Java programming language keywords?",
        answers: [
            {text: "class, if, void, long, Int, continue", correct: false},
            {text: "goto, instanceof, native, finally, default, throws", correct: true},
            {text: "try, virtual, throw, final, volatile, transient", correct: false},
            {text: "strictfp, constant, super, implements, do", correct: false},
            {text: "byte, break, assert, switch, include", correct: false},
        ]
    },
    {
        question : 'Which will legally declare, construct, and initialize an array?',
        answers: [
            {text: "int [] myList = {'1','2','3'};", correct: false},
            {text: "int [] myList = (5, 8, 2);", correct: false},
            {text: "int myList [] [] = {4,9,7,0};", correct: false},
            {text: "int myList [] = {4, 3, 7};", correct: true},
        ]
    },
    {
        question : 'Which is a reserved word in the Java programming language?',
        answers: [
            {text: "method", correct: false},
            {text: "native", correct: true},
            {text: "subclasses", correct: false},
            {text: "reference", correct: false },
            {text: "array", correct: false},
        ]
    },
    {
        question : 'Which is a valid keyword in java?',
        answers: [
            {text: "interface", correct: true},
            {text: "string", correct: false},
            {text: "Float", correct: false},
            {text: "unsigned", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    // code of selection of one button and after shows thw next button also 
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();