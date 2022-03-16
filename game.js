const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progress = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is the capitol of Kentucky?',
        choice1: 'Danville',
        choice2: 'Frankfort',
        choice3: 'Louisville',
        choice4: 'Lexington',
        answer: 2,
    },
    {
        question: 'What is the Kentucky state bird?',
        choice1: 'Cardinal',
        choice2: 'Blue Jay',
        choice3: 'Parakeet',
        choice4: 'Eagle',
        answer: 1,
    },
    {
        question: 'What is element O2 mean?',
        choice1: 'Nitrogen',
        choice2: 'Sodium',
        choice3: 'Iron',
        choice4: 'Oxygen',
        answer: 4,
    },
    {
        question: 'What sound does a dog make?',
        choice1: 'Moo',
        choice2: 'Meow',
        choice3: 'Bark',
        choice4: 'All of the above',
        answer: 3,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('./end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame()