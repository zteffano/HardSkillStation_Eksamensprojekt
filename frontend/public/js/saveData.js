import { fetchData } from "./fetchModule.js";

const GET_WORKSHOP_URL = "http://hss.zteffano.dk:1337/workshopsjoined";

// declaring arrays
var workshopListe = [];
var newWorkshops = [];
var oldWorkshops = [];

async function fetchWorkshopData() {
    try{
        var data = await fetchData(GET_WORKSHOP_URL)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then (response => {
            response.forEach(element => {
                workshopList.push(element);
            });
            console.log('Data fetched and saved to workshoplist', workshopList);
            sortArrayByDate(workshopList);
            console.log('array sorted', workshopList);
            displayAllWorkshops();
                
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
