
const btncontinue = document.getElementById("btncontinuer");
const main = document.querySelector("main");
btncontinue.addEventListener("click", function () {
    main.classList.add("animation");
    setTimeout(() => {
        main.style.background = "none";
    }, 3000);
});
const popuplose = document.querySelector(".popuplose");
btncontinue.addEventListener("click", function () {
    if (popuplose) {
        popuplose.classList.remove("none");
        console.log("Classe 'none' retirée !");
    } else {
        console.log("L'élément popuplose n'a pas été trouvé !");
    }
});
const question = document.querySelector(".checkbox")
const checkboxes = document.querySelectorAll(".checkbox input[type='checkbox']");
const btn = document.querySelector(".boutonok")

btn.addEventListener("click", function(){
   let checked = false;
   checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
         if (checkbox.value === "yes") {
            checked = true;
            window.location.href = "game.html";
         }else{
            let p = document.createElement("p")
            p.textContent = "FALSE !"
            p.style.color = "red"
            p.style.zIndex = "1000"
            p.classList.toggle('false')
            question.append(p);
            setTimeout(() => {
               p.remove()
            }, 5000);
         }
      }
   });

})