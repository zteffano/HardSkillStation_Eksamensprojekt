const cardButtons = document.getElementsByClassName("button-link");
const overlay = document.getElementById("overlay");

function openForm() {
    const popupForm = document.getElementById("formPopup");
    overlay.style.display = "block";
    popupForm.style.display = "block";
}

for (const cardButton of cardButtons) {
    cardButton.addEventListener("click", openForm);
}