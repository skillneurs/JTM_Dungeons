
const btescalader2 = document.getElementById("btescalader2")
const main = document.querySelector("main");
const quizSection = document.getElementById("quiz");
const questionText = document.getElementById("questionText");
const answerButtons = document.querySelectorAll(".answer");
const question = {

    text: "Sometimes, the quickest way is the most dangerous. If you had read the signs, you _______ know not to climb",
    options: ["would", "will", "can", "sould"],
    correct: 0

}

function loadQuestion() {
    questionText.textContent = question.text;
    answerButtons.forEach((button, i) => {
        button.textContent = question.options[i];
        button.dataset.correct = i === question.correct;
    });
}
btescalader2.addEventListener("click", function () {
    main.classList.add("animation");
    quizSection.classList.remove("none");
    loadQuestion();
    answerButtons.forEach(button => {
        button.addEventListener('click', function (){
            if (this.dataset.correct === 'true'){
                alert("Bonne réponse ! Vous pouvez continuer.")
                quizSection.classList.add("none");
                
                    window.location = "game.html"
                
            }else{
                alert("Mauvaise réponse ! Réessayez.")
            }
        })
        
    })
    setTimeout(() => {
        main.style.background = "none";
    }, 3000);
});
const popuplose4 = document.querySelector(".popuplose4");
btescalader2.addEventListener("click", function () {
    if (popuplose4) {
        popuplose4.classList.remove("none4");
        
    } 
});

