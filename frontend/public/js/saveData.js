import { fetchData } from "./fetchModule.js";

const GET_WORKSHOP_URL = "http://hss.zteffano.dk:1337/workshopsjoined";

// declaring arrays
var newWorkshops = [];
var oldWorkshops = [];

function fetchWorkshopData() {
    try{
        var workshopListe = fetchData(GET_WORKSHOP_URL)
        .then(response => {
            console.log(response); // This will log the fetched data
    
            seperateWorkshops(response);
    
            console.log("New Workshops:", newWorkshops);
            console.log("Old Workshops:", oldWorkshops);
        })
    }
    catch (error) {
    console.error("Error fetching or processing data:", error);
    }
}


// seperating allworkshops into new and old 
function seperateWorkshops(array) {
    let dagensDato = new Date();
    newWorkshops = array.filter(element => { element.start >= dagensDato });
    oldWorkshops = array.filter(element => { element.start < dagensDato })
}

fetchWorkshopData();
