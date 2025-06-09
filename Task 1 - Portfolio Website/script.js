let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
});
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-xmark");
    });
});
