const quizData =  [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"], // Options must be an array!
        correctAnswer: "Paris"
    },
    {
        question: "What is the highest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "what is the main color of nigeria Flag?",
        options: ["white", "green", "Green White Green", "green&white"],
        correctAnswer: "Green White Green"
    },

    {
        question: "what year did nigeria got her independence?",
        options: ["1980", "1961", "1970", "1960"],
        correctAnswer: "1960"
    },
    {
        question: "which country is not among the G8 nations?",
        options: ["Nigeria", "U.S.A", "Germany", "China"],
        correctAnswer: "Nigeria"
    },
    {
        question: "what is the capital of Ghana?",
        options: ["kogija", "Accra", "uzukwu", "China-town"],
        correctAnswer: "Accra"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Jupiter", "Mars", "Venus", "Saturn"],
        correctAnswer: "Mars"
    },

    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "CH4"],
        correctAnswer: "H2O"
    },
];


const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 20; // Time in seconds for each question
let selectedOption;

function loadQuiz() {
    console.log("loadQuiz() called. Current question:", currentQuestion);

    if (currentQuestion >= 0 && currentQuestion < quizData.length) {
        const currentQuizData = quizData[currentQuestion];
        questionEl.innerText = currentQuizData.question;
        optionsEl.innerHTML = "";
        selectedOption = null;

        currentQuizData.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.addEventListener("click", () => {
                console.log("Option clicked:", option);
                document.querySelectorAll("#options button").forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
                selectedOption = option;
                checkAnswer(selectedOption); // Directly call checkAnswer on click
            });
            optionsEl.appendChild(button);
        });

        startTimer();
        updateProgress();
    } else {
        console.warn("loadQuiz() called with invalid currentQuestion:", currentQuestion);
        showResult();
    }
}

function checkAnswer(selectedOption) {
    console.log("checkAnswer() called. Selected option:", selectedOption);
    clearInterval(timer); // Stop the timer immediately

    const currentQuizData = quizData[currentQuestion];

    if (selectedOption === null) {
        console.log("Time ran out! No option selected.");
    } else if (selectedOption === currentQuizData.correctAnswer) {
        score++;
        console.log("Correct answer! Score:", score);
    } else {
        console.log("Incorrect answer.");
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuiz(); // Load the next question immediately
    } else {
        showResult();
    }
}

submitBtn.addEventListener("click", () => {
    if (selectedOption) {
        checkAnswer(selectedOption);
    } else {
        alert("Please select an answer before submitting.");
    }
});

function showResult() {
    resultEl.innerText = `Your score is ${score} out of ${quizData.length}.`;
    resultEl.style.display = 'block';
    submitBtn.style.display = 'none';
    optionsEl.style.display = 'none';
    progressEl.style.display = 'none';
    timerEl.style.display = 'none';
}

function updateProgress() {
    progressEl.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function startTimer() {
    timeLeft = 20;
    timerEl.innerText = `Time Left: ${timeLeft}`;

    clearInterval(timer); // Clear any existing timer

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time Left: ${timeLeft}`;

        if (timeLeft < 0) {
            clearInterval(timer);
            checkAnswer(null);
        }
    }, 1000);
}

loadQuiz();






//     currentQuestion++;

//     if (currentQuestion < quizData.length) {
//         loadQuiz();
//     } else {
//         showResult();
//     }
// }

// // submitBtn.addEventListener("click", () => {
// //     if (selectedOption) {
// //         checkAnswer(selectedOption);
// //     } else {
// //         alert("Please select an answer before submitting.");
// //     }
// // });

// function startTimer() {
//     timeLeft = 20;
//     timerEl.innerText = `Time Left: ${timeLeft}`;

//     clearInterval(timer); // Clear any existing timer before starting a new one

//     timer = setInterval(() => {
//         timeLeft--;
//         timerEl.innerText = `Time Left: ${timeLeft}`;

//         if (timeLeft < 0) {
//             clearInterval(timer);
//             checkAnswer(null);
//         }
//     }, 1000);
// }

// loadQuiz();