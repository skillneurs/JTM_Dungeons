const btncontinue = document.getElementById("btncontinuer")

btncontinue.addEventListener("click", function() {
    document.body.classList.remove("background-active");
    document.body.classList.add("background-disabled");
});

