const btnstart = document.getElementById("closePopup")
const popup = document.getElementById("popup")

btnstart.addEventListener("click", function () {
   popup.style.display="none"
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        popup.style.display = "flex";
    }
});