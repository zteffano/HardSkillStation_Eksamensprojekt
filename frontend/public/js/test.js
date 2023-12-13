import { Display } from "./DisplayClass.js";

const techBtn = document.querySelector(".tech");
const socialBtn = document.querySelector(".social");
const businessBtn = document.querySelector(".business");
const creativeBtn = document.querySelector(".creative");

let aktiveKategorier = []; // Array til at holde styr på valgte kategorier

function toggleCategory(btn, categoryId) {
    btn.classList.toggle("active-category");
    const index = aktiveKategorier.indexOf(categoryId);

    if (index > -1) {
        aktiveKategorier.splice(index, 1); // Fjern kategori fra array
    } else {
        aktiveKategorier.push(categoryId); // Tilføj kategori til array
    }

    if (aktiveKategorier.length === 0 || aktiveKategorier.length === 4) {
        Display.displayNewWorkshops(); // Vis alle, hvis ingen eller alle kategorier er valgte
    } else {
        Display.displaySpecificNewWorkshops(aktiveKategorier); // Vis specifikke kategorier
    }
}

techBtn.addEventListener('click', () => toggleCategory(techBtn, 1));
socialBtn.addEventListener('click', () => toggleCategory(socialBtn, 2));
businessBtn.addEventListener('click', () => toggleCategory(businessBtn, 3));
creativeBtn.addEventListener('click', () => toggleCategory(creativeBtn, 4));

document.addEventListener('DOMContentLoaded', () => {
    Display.startUp(true);
    Display.displayCompanies();
});
