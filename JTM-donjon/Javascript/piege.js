
const btncontinue2 = document.getElementById("btncontinuer2");
const main2 = document.querySelector("main");
btncontinue2.addEventListener("click", function () {
    main2.classList.add("animation2");
    setTimeout(() => {
        main.style.background = "none";
    }, 3000);
});
const popuplose2 = document.querySelector(".popuplose2");
btncontinue2.addEventListener("click", function () {
    if (popuplose2) {
        popuplose2.classList.remove("none2");
        console.log("Classe 'none' retirée !");
    } else {
        console.log("L'élément popuplose n'a pas été trouvé !");
    }
});





