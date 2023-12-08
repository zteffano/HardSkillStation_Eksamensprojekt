
export class Workshops {
    WORKSHOP_URL = "http://hss.zteffano.dk:1337/workshopsjoined";
    workshops =  [];
    oldWorkshops = [];
    newWorkshops = [];
    dagensDato = new Date();

    constructor() {
        this.fetchWorkshopData();
        // kan kalde getNew og getOldworkshops metoder hvis det ønskes at lave dem fra start

    }

    async fetchWorkshopData() {
        try{

           
            const response = await fetch(this.WORKSHOP_URL)

            if(!response.ok)
            {
                throw new Error("Cant get workshops from ${WORKSHOP_URL}");
            }
            this.workshops = await response.json();
            console.log("Netop fetch workshop data:")
            console.log(this.workshops);
            console.log("-----------------------");
               
        }
        catch (error) { 
            console.error("Error fetching or processing workshop data:", error);
        }

    }

    getNewWorkshops() {

        this.newWorkshops = this.workshops.filter(element => {return new Date(element.start) >= this.dagensDato});


        return this.newWorkshops
    }

    getOldWorkshops() {

        this.oldWorkshops = this.workshops.filter(element => { return new Date(element.start) < this.dagensDato});
      
  
        return this.oldWorkshops
    }
    
}

export class Display
    {
        static workshopDisplay = document.getElementById("courseOverviewCards");
        static workshopObj = new Workshops();

        static logDisplay() {
            console.log(this.workshopDisplay);
            console.log(this.workshopObj);
        }

        static displaySpecificNewWorkshops(categoryID) {
            let newWorkshops = this.workshopObj.getNewWorkshops()

            Display.workshopDisplay.innerHTML="";
            newWorkshops.forEach(element => {
                if(element.categoryId == categoryID) {
                    const workshopElement = Display.createWorkshopElement(element);
                    Display.workshopDisplay.appendChild(workshopElement);
                }
            });
        }

        static displayNewWorkshops() {
            let newWorkshops = this.workshopObj.getNewWorkshops()

            Display.workshopDisplay.innerHTML="";
            newWorkshops.forEach(element => {
                const workshopElement = Display.createWorkshopElement(element);
                Display.workshopDisplay.appendChild(workshopElement);
            });
        }

        static displayOldWorkshops(data) {
            let oldWorkshops = this.workshopObj.getOldWorkshops();
            Display.workshopDisplay.innerHTML="";
            oldWorkshops.forEach(element => {
                const workshopElement = Display.createWorkshopElement(element);
                Display.workshopDisplay.appendChild(workshopElement);
            });
        }

        // create element for each workshop
    static createWorkshopElement(workshop) {
        const workshopElement = document.createElement('div');
        workshopElement.classList.add('workshop');

        const startDato = Display.formatDato(workshop.start);
        const statusTekst = workshop.status === 'completed' ? 'Kurset er desværre allerede fuldt booket' : 'stadig plads';

        // get city by locationAddress
        const locationAddress = workshop.locationAddress;
        console.log(locationAddress)
        const parts = locationAddress.split(' ');
        const city = parts.pop();

        // Limit the workshop description to 50 characters 
        const truncatedDescription = workshop.description.length > 150 ?
            workshop.description.slice(0, 150) + ' ...' :
            workshop.description;

        workshopElement.innerHTML = `
            <div class="categoryBar"> ${workshop.categoryName}</div>
            <div class="container">
                <img class="workshopImage" src="${workshop.logo}" alt="${workshop.name}">
                <h2 class="workshopTitle">${workshop.name}</h2>
            </div>
            <div class="workshopContent">
                <p class="workshopDateAndLocation">${startDato}, ${city}</p>
                <p class="workshopDiscription">${truncatedDescription}</p>
                ${workshop.status !== 'completed' ? `<button class="button-link" onclick="redirectToPage('${workshop.workshopLink}')">Læs mere og tilmeld</button>` : `<p class="workshopStatus">${statusTekst}</p>`}
            </div>
        `;

    // assign color to categoryBar by category
    const categoryElement = workshopElement.querySelector(".categoryBar");
        switch (workshop.categoryName) {
            case "Tech":
                categoryElement.classList.add("tech");
                break;
            // Add more cases for other categories as needed
            case "Social":
                categoryElement.classList.add("social");
                break;
            case "Business":
                categoryElement.classList.add("business");
                break;
            case "Creative":
                categoryElement.classList.add("creative");
                break;
            default:
                categoryElement.classList.add("other");
                break;
        }

        return workshopElement;
    }
    static formatDato(datoStr) {
        const måneder = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

        const dato = new Date(datoStr);
        const dag = dato.getDate();
        const måned = måneder[dato.getMonth()];
        const år = dato.getFullYear();
        const tid = dato.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });

        return `${dag}. ${måned} ${år} kl. ${tid}`;
    }


}


