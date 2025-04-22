const start = document.querySelector("#closePopup")
const popup = document.getElementById("popup")
const canvas = document.querySelector('#renderCanvas')
let code = document.getElementById("codeBefore")


start.addEventListener("click", function () {
   popup.style.display="none"
   canvas.style.display = 'block'
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        popup.style.display = "flex";
        canvas.style.display = 'none';
        
    }
});



