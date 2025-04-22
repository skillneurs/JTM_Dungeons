const btescalader2 = document.querySelector(".btescalader")
const popuplose4 = document.querySelector(".popuplose4");
btescalader2.addEventListener("click", function () {
    if (popuplose4) {
        popuplose4.classList.remove("none4");
        console.log("Classe 'none' retirée !");
    } else {
        console.log("L'élément popuplose n'a pas été trouvé !");
    }
});