var workshopList = [];
var newWorkshops = [];
var oldWorkshops = [];
var companyData = [];

async function fetchWorkshopData() {
    try{
        var data = await fetch(GET_WORKSHOP_URL)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response for workshop was not ok");
            }
            return response.json();
        })                     
    }
    catch (error) {
    console.error("Error fetching or processing workshop data:", error);
    }
    workshopList = JSON.parse(data);
    let dagensDato = new Date();
    newWorkshops = array.filter(element => { element.start >= dagensDato });
    oldWorkshops = array.filter(element => { element.start < dagensDato })
}

async function fetchCompanyData() {
    try{
        var data = await fetch(GET_WORKSHOP_URL2)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response for companies was not ok");
            }
            return response.json();
        })                     
    }
    catch (error) {
    console.error("Error fetching or processing company data:", error);
    }
    companyData = JSON.parse(data);
}
