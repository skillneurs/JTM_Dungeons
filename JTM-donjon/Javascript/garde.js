document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btncontinuer");
    const main = document.querySelector("main.test");

    btn.addEventListener("click", function () {
        main.style.background = "none"; // Supprime le background
    });
});


