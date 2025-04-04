
const btncontinue3 = document.getElementById("btncontinuer3");
const btncontinue4 = document.getElementById("btncontinuer4")
const main3 = document.querySelector("main");
btncontinue3.addEventListener("click", function () {
    main3.classList.add("animation3");
    setTimeout(() => {
        main.style.background = "none";
    }, 3000);
});

btncontinue4.addEventListener("click", function () {
    main3.classList.add("animation3");
    setTimeout(() => {
        main.style.background = "none";
    }, 3000);
});

const popuplose3 = document.querySelector(".popuplose3");
btncontinue3.addEventListener("click", function () {
    if (popuplose3) {
        popuplose3.classList.remove("none3");
        console.log("Classe 'none' retirée !");
    } else {
        console.log("L'élément popuplose n'a pas été trouvé !");
    }
});

const popupwin = document.querySelector(".popupwin");
btncontinue4.addEventListener("click", function () {
    if (popupwin) {
        popupwin.classList.remove("none3");
        console.log("Classe 'none' retirée !");
    } else {
        console.log("L'élément popupwin n'a pas été trouvé !");
    }
});