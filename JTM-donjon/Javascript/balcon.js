
const btescalader2 = document.getElementById("btescalader2")
const main = document.querySelector("main");

const question = {
    text: "Sometimes, the quickest way is the most dangerous. If you had read the signs, you _______ know not to climb",
    options: ["would", "will", "can", "sould"],
    correct: 0
}
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
        
    } 
});