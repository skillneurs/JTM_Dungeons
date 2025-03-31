

document.addEventListener("DOMContentLoaded", function () {
    let menu = document.querySelector(".menuItem");
    let menuIcon = document.getElementById("menu");

    menuIcon.addEventListener("click", function () {
        menu.classList.toggle("menuActive"); 
    });
});


