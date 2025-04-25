const btnMarcher = document.getElementById("btnMarcher")
const popupEnigme = document.querySelector(".popupEnigme")

btnMarcher.addEventListener("click", function () {
    popupEnigme.classList.remove("displayNone");
});