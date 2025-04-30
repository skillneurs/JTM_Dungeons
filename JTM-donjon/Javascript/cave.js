const btnMarcher = document.getElementById("btnMarcher")
const btncourir = document.getElementById("btncourir")
const btnmarcher = document.getElementById("btnmarcher")
const popupEnigme = document.querySelector(".popupEnigme")

btnMarcher.addEventListener("click", function () {
    popupEnigme.classList.remove("displayNone");
    btncourir.classList.add("displayNone");
    btnmarcher.classList.add("displayNone");

});
btncourir.addEventListener("click", function () {
    window.location = "./jardin.html";

});