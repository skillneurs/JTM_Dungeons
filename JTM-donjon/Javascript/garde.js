
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





