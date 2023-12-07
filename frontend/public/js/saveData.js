import { fetchData } from "./fetchModule.js";

const GET_WORKSHOP_URL = "http://13.50.4.110:1337/workshops";

var workshopListe = fetchData(GET_WORKSHOP_URL);
var newWorkshops = [];
var oldWorkshops = [];


seperateWorkshops(workshopListe);

function seperateWorkshops(allWorkshops) {
    let dagensDato = new Date();
    newWorkshops = allWorkshops.filter(element => {
        element.start >= dagensDato
    });
    oldWorkshops = allWorkshops.filter(element => {
        element.start < dagensDato
    })
}

