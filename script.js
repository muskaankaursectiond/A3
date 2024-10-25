// Fake authentication
const correctUsername = "muskaan";
const correctPassword = "1234";

// Quiz questions
const quizData = [
    { question: "Which of the following CSS selectors are used to specify a group of elements?",
         options: ["tag", "id", "class"],
         correctAnswer: 2
     },
     { question:"Which CSS property controls the text size?",
        options: ["text-size","font-size", "size"],
        correctAnswer: 1
     },
     { question: "Which CSS property is used to change the background color?",
        options:["bgColor", "color" , "background-color"],
        correctAnswer: 2 
     }
];

// Authenticate function
function authenticate() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        loadQuiz();
    } else {
        alert("Incorrect username or password!");
    }
}

// Load quiz questions dynamically
function loadQuiz() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = ''; // Clear previous questions
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>${index + 1}. ${item.question}</h3>`;
        item.options.forEach((option, i) => {
            questionDiv.innerHTML += `<input type="radio" name="q${index}" value="${i}" id="q${index}a${i}">
                                      <label for="q${index}a${i}">${option}</label><br>`;
        });
        quizForm.appendChild(questionDiv);
    });

    document.getElementById('submit-btn').style.display = 'block';
    document.getElementById('current-question').innerText = 1;
    document.getElementById('total-questions').innerText = quizData.length;
    document.getElementById('progress-bar').style.display = 'block';
}

// Check answers and show results
function checkAnswers() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        const questionDiv = document.querySelectorAll('.question')[index];
        if (selectedAnswer && parseInt(selectedAnswer.value) === item.correctAnswer) {
            questionDiv.classList.add('correct');
            score++;
        } else {
            questionDiv.classList.add('incorrect');
        }
    });

    document.getElementById('score').innerText = `${score} / ${quizData.length}`;
    document.getElementById('quiz-feedback').style.display = 'block';
    document.getElementById('submit-btn').style.display = 'none'; // Hide submit button after submission
}

// Restart the quiz
function restartQuiz() {
    document.getElementById('quiz-form').reset();
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('correct', 'incorrect');
    });
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block';
}