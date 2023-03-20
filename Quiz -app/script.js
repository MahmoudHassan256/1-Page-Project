const questions = [{
    question: 'Today the most popular social networking site is',
    a: 'Twitter',
    b: 'Instgram',
    c: 'Facebook',
    d: 'Myspace',
    correct: 'c'
},
{
    question: "What is the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
},
{
    question: "Who is the President of US?",
    a: "Florin Pop",
    b: "Donald Trump",
    c: "Ivan Saldano",
    d: "Mihai Andrei",
    correct: "b",
},
{
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
},
{
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
},
]

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_txt = document.getElementById("a_txt");
const b_txt = document.getElementById("b_txt");
const c_txt = document.getElementById("c_txt");
const d_txt = document.getElementById("d_txt");
const submit = document.getElementById("submit");

let currentQusetion = 0;
let score = 0;
loadQuiz();

function loadQuiz() {
    deSelect();
    const currentQuestionData = questions[currentQusetion];
    questionEl.innerHTML = currentQuestionData.question;
    a_txt.innerHTML = currentQuestionData.a;
    b_txt.innerHTML = currentQuestionData.b;
    c_txt.innerHTML = currentQuestionData.c;
    d_txt.innerHTML = currentQuestionData.d;

}



function getSelected() {
    let answer = undefined;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}
function deSelect() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}
submit.addEventListener('click', () => {

    const answer = getSelected();
    if (answer) {
        if (answer == questions[currentQusetion].correct) { score++; }

        currentQusetion++;
        if (currentQusetion < questions.length) {
            loadQuiz();
        }
        else {
            quiz.innerHTML = `<h2>You answered ${score}/${questions.length} questions.
        <button onclick="location.reload()"> Retry </button>`;
        }
    }
});

