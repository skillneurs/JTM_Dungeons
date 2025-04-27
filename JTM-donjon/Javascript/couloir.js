const questions = [
    {
        text: "Complete the sentence: The princess was taken by the ______.",
        options: ["Dragon", "Princess", "Knight", "Dungeon"],
        correct: 0
    },
    {
        text: "Quel est le mot de passe pour la porte 2 ?",
        options: ["dragon", "princesse", "chevalier", "donjon"],
        correct: 1
    },
    {
        text: "Quelle clé ouvre la porte 3 ?",
        options: ["Clé d'or", "Clé d'argent", "Clé de bronze", "Clé magique"],
        correct: 3
    }
];

const doors = document.querySelectorAll(".porte-container");
const quizSection = document.getElementById("quiz");
const questionText = document.getElementById("questionText");
const answerButtons = document.querySelectorAll(".answer");

let currentQuestionIndex = 0;
document.addEventListener("DOMContentLoaded", () => {
    const quizSection = document.getElementById("quiz");
    quizSection.classList.add("none");

});
// Charger une question
function loadQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.text;
    answerButtons.forEach((button, i) => {
        button.textContent = question.options[i];
        button.dataset.correct = i === question.correct;
    });
}

// Gérer le clic sur une porte
doors.forEach((door, index) => {
    door.addEventListener("click", () => {
        currentQuestionIndex = index;
        quizSection.classList.remove("none");
        loadQuestion(index);
        window.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                quizSection.classList.add("none");
            }
        });
    });
});

// Gérer les réponses
answerButtons.forEach(button => {
    button.addEventListener("click", function () {
        if (this.dataset.correct === "true") {
            alert("Bonne réponse ! La porte s'ouvre.");
            quizSection.classList.add("none");
            doors[currentQuestionIndex].classList.add("open"); // Ajoutez une classe pour animer la porte
            setTimeout(() => {
                if (currentQuestionIndex === 0) window.location = "balcon.html";
                if (currentQuestionIndex === 1) window.location = "cave.html";
                if (currentQuestionIndex === 2) window.location = "garde.html";
            }, 1000);
        } else {
            alert("Mauvaise réponse ! Réessayez.");
        }
    });
});