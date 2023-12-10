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

/* Lagt de gamle kald på knapperne i Headeren */

/*
const headerBtns = document.querySelectorAll(".buttons button");

headerBtns[0].innerHTML = "Alle WS";
headerBtns[1].innerHTML = "Nye WS";
headerBtns[2].innerHTML = "Gamle WS";
console.log(headerBtns);
headerBtns[0].addEventListener('click', () => {
    Display.displayAllWorkshops();
});
headerBtns[1].addEventListener('click', () => {
    Display.displayNewWorkshops();
});
headerBtns[2].addEventListener('click', () => {
    Display.displayOldWorkshops();
});
*/
document.addEventListener('DOMContentLoaded', () => {
    Display.startUp(true); // Den vises nu i decending rækkefølge, hvis det skal være omvendt, kan der parses en true til metoden.
    Display.displayCompanies();
    

});

