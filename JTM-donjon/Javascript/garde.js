
    const btn = document.getElementById("btncontinuer");
    const main = document.querySelector("main");

    btn.addEventListener("click", function () {
        btn.addEventListener("click", function () {
            main.classList.add("animation"); 
            setTimeout(() => {
                main.style.background = "none"; 
            }, 3000); 
        });
    });
        
    
    

