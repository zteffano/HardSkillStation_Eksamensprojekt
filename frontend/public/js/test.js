import { Display } from "./DisplayClass.js";



const techBtn = document.querySelector(".tech");
const socialBtn = document.querySelector(".social");
const businessBtn = document.querySelector(".business");
const creativeBtn = document.querySelector(".creative");

techBtn.addEventListener('click', () => {
   Display.displayWorkshopsByCategory(1);
});

socialBtn.addEventListener('click', () => {
    Display.displayWorkshopsByCategory(2);
   
});

businessBtn.addEventListener('click', () => {
    Display.displayWorkshopsByCategory(3);
  
});

creativeBtn.addEventListener('click', () => {
    Display.displayWorkshopsByCategory(4);
  
   
});

document.addEventListener('DOMContentLoaded', () => {
    Display.startUp(true); // Den vises nu i decending rækkefølge, hvis det skal være omvendt, kan der parses en true til metoden.
    Display.displayCompanies();    

});

