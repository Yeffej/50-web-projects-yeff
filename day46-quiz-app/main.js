const quiz = document.getElementById("formQuiz");
const itemWrapper = document.getElementById("wrapper");
const submitBt = document.getElementById("submitBt");
let state = { current: 0, correct: 0 };
const items = [
  {
    question: "What year was JavaScript launched?",
    choices: ["1995", "1999", "1996", "1994"],
    answer: "1995",
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
      "None of the above",
    ],
    answer: "Hypertext Markup Language",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Central Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
      "Cascading Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C++", "Javascript", "Python"],
    answer: "Javascript",
  },
];

quiz.addEventListener("submit", (e) => {
  e.preventDefault();

  const quizData = new FormData(quiz);
  if (quizData.get("item") && quizData.get("answer")) {
    const item = items[Number(quizData.get("item"))];
    if (item.answer == quizData.get("answer")) state.correct++;
    return nextQuiz();
  }

  alert(
    "The current question have not been answered. Please answer the question to advance."
  );
});

function RenderQuizResult() {
  itemWrapper.innerHTML = `
      <h3 class="quiz-result">You answered <strong>${state.correct}/${items.length}</strong> questions correctly</h3>
   `;

   submitBt.type = "button";
   submitBt.textContent = "Reload";
   submitBt.onclick = () => window.location.reload();
}

function RenderQuizItem() {
  if (state.current >= items.length) return RenderQuizResult();

  const item = items[state.current];
  itemWrapper.innerHTML = `
        <h3 class="quiz-question">${item.question}</h3>
        <input type="hidden" name="item" value="${state.current}">
        <ul class="quiz-choices">
            ${item.choices.reduce((prev, curr) => {
              const choice = `
                    <li class="quiz-choice">
                        <input type="radio" id="a-${curr}" name="answer" value="${curr}">
                        <label for="a-${curr}">${curr}</label>
                    </li>
                `;
              return prev + choice;
            }, "")}
            
        </ul>
    `;
}

function nextQuiz() {
  state.current += 1;
  RenderQuizItem();
}

// Render the first quiz.
RenderQuizItem();
