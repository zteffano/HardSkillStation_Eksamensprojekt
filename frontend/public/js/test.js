import { Display, Workshops} from "./Workshop.js";

Display.displayNewWorkshops();

const techBtn = document.querySelector(".tech");
const socialBtn = document.querySelector(".social");
const businessBtn = document.querySelector(".business");
const creativeBtn = document.querySelector(".creative");

techBtn.addEventListener('click', () => {
    Display.displaySpecificNewWorkshops(1);
});

socialBtn.addEventListener('click', () => {
    Display.displayNewWorkshops();
});

businessBtn.addEventListener('click', () => {
    Display.displayOldWorkshops();
});

businessBtn.addEventListener('click', () => {
    Display.displayOldWorkshops();
});