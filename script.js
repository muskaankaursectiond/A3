// Variables for authentication (fake)
const correctUsername = "Muskaan";
const correctPassword = "password1234";

// Variable for quiz data
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [ "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Markup Language"],
        correctAnswer: 2
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
        correctAnswer: 1
    },
    {
        question: "What tag is used to define a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>"],
        correctAnswer: 1
    }
];

// Fake authentication function
function authenticate() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        loadQuiz();
    } else {
        alert("Incorrect username or password. Try again.");
    }
}

// Load quiz questions dynamically
function loadQuiz() {
    const quizForm = document.getElementById('quiz-form');
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>${index + 1}. ${item.question}</h3>`;
        
        item.options.forEach((option, i) => {
            questionDiv.innerHTML += `
                <input type="radio" name="q${index}" value="${i}" id="q${index}a${i}">
                <label for="q${index}a${i}">${option}</label><br>`;
        });

        quizForm.appendChild(questionDiv);
    });

    document.getElementById('submit-btn').style.display = 'block'; // Show submit button
}

// Function to check answers
function checkAnswers() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && parseInt(selectedAnswer.value) === item.correctAnswer) {
            score++;
        }
    });

    // Show feedback
    document.getElementById('score').innerText = `${score} out of ${quizData.length}`;
    document.getElementById('quiz-feedback').style.display = 'block';
    document.getElementById('submit-btn').style.display = 'none'; // Hide submit button after submission
}

// Function to restart the quiz
function restartQuiz() {
    document.getElementById('quiz-form').reset(); // Reset the form
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block'; // Show submit button again
}
