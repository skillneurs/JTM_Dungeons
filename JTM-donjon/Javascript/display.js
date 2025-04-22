const menu = document.querySelector("#menu");
const menuitem = document.querySelector(".menuItem");

menu.addEventListener("click", function () {
  if (menuitem.style.display == "none") {
    menuitem.style.display = "block";
  } else {
    menuitem.style.display = "none";
  }
});
