
const btncontinue = document.getElementById("btncontinuer");
const main = document.querySelector("main");
btncontinue.addEventListener("click", function () {
    main.classList.add("animation");
    setTimeout(() => {
        main.style.background = "none";
    }, 3000);
});
const popuplose = document.querySelector(".popuplose");
btncontinue.addEventListener("click", function () {
    if (popuplose) {
        popuplose.classList.remove("none");
        console.log("Classe 'none' retirée !");
    } else {
        console.log("L'élément popuplose n'a pas été trouvé !");
    }
});
const question = document.querySelector(".checkbox")
const qst1 = document.getElementById("qst1")
const qst2 = document.getElementById("qst2")
const qst3 = document.getElementById("qst3")
const qst4 = document.getElementById("qst4")
const btn = document.querySelector("boutonok")

btn.addEventListener("click", function(){
    if (qst1.value === "yes") {
        window.location = "./game.html"
    } else {
       let p = document.createElement("p")
       p.textContent = "FALSE !" 
       main.appendChild(p)
    }
})