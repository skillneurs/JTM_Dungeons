import { createScene } from './scene.js';
import './PointerLock.js';
const start = document.querySelector('#closePopup');
const popup = document.querySelector('.popup');

const quizSection = document.getElementById("quiz");
const questionText = document.getElementById("questionText");
const answerButtons = document.querySelectorAll(".answer");

const question = {
    text: 'What must you find in order to open the door and escape from the prison?',
    options: ["A map of building", "A secret tunnel", "A security code", "A set of keys"],
    correct: 2
}

function loadQuestion() {
    questionText.textContent = question.text;
    answerButtons.forEach((button, i) => {
        button.textContent = question.options[i];
        button.dataset.correct = i === question.correct;
    });
}



start.addEventListener("click", function () {
    popup.classList.add("none");
    popup.classList.remove("popup");
    loadQuestion();
    quizSection.classList.remove("none");
    answerButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.dataset.correct === 'true') {
                alert("Bonne réponse ! Vous pouvez continuer.")
                quizSection.classList.add("none");
                var canvas = document.querySelector(".renderCanvas");
                var engine = new BABYLON.Engine(canvas, true, { antialias: true });
                canvas.classList.remove('none');
                canvas.style.width = "100%";
                canvas.style.height = "100%";
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;// Affiche le canvas
                var scene = createScene(engine, canvas); // Création de la scène

                // Sélectionner l'élément HTML pour afficher les FPS
                const fpsCounter = document.getElementById("fpsCounter");

                engine.runRenderLoop(function () {
                    scene.render(); // Rendu de la scène à chaque image

                    // Mettre à jour les FPS
                    const fps = Math.round(engine.getFps());
                    fpsCounter.textContent = `FPS: ${fps}`;
                });

                window.addEventListener("resize", function () {
                    engine.resize(); // Redimensionne le moteur quand la fenêtre change de taille
                });
            } else {
                alert("Mauvaise réponse ! Réessayez.")
            }
        })
    })



});

