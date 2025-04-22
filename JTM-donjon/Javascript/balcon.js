
const btescalader2 = document.getElementById("btescalader2")
const main = document.querySelector("main");
btescalader2.addEventListener("click", function () {
    main.classList.add("animation");
    setTimeout(() => {
        main.style.background = "none";
    }, 3000);
});
const popuplose4 = document.querySelector(".popuplose4");
btescalader2.addEventListener("click", function () {
    if (popuplose4) {
        popuplose4.classList.remove("none4");
        console.log("Classe 'none' retirée !");
    } else {
        console.log("L'élément popuplose n'a pas été trouvé !");
    }
});