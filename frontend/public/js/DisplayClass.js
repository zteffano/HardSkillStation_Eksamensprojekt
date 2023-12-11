import { Workshops } from "./Workshop.js";
import { HSSApi } from "./HSSApi.js";
import { HSSUtil } from "./HSSUtil.js";

export class Display
    {
        static workshopDisplay = document.getElementById("courseOverviewCards");
        
        static workshopObj = new Workshops();
            
        static async startUp(ascending = false) {
            let workshops = await HSSApi.getWorkshops();

            let urllocation = window.location.href.split("/"); 
            let side = urllocation[urllocation.length - 1];
            switch (side) {

                case "history.html":
                    workshops = workshops.filter(element => {return new Date(element.start) < new Date()});
                    break;
        
                default:
                    workshops = workshops.filter(element => {return new Date(element.start) >= new Date()});
                    break;
            }
            
           
            HSSUtil.sortByDate(workshops, ascending);
            Display.displayWorkshopsData(workshops);
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

        static displayOldWorkshops() {
            let oldWorkshops = this.workshopObj.getOldWorkshops();
            Display.workshopDisplay.innerHTML="";
            oldWorkshops.forEach(element => {
                const workshopElement = Display.createWorkshopElement(element);
                Display.workshopDisplay.appendChild(workshopElement);
            });
        }

        static displayAllWorkshops() {
            let workshops = this.workshopObj.workshops;
            Display.workshopDisplay.innerHTML="";
            workshops.forEach(element => {
                const workshopElement = Display.createWorkshopElement(element);
                Display.workshopDisplay.appendChild(workshopElement);
            }
            );
        }

        static displayWorkshopsData(data) {
            Display.workshopDisplay.innerHTML="";
            data.forEach(element => {
                const workshopElement = Display.createWorkshopElement(element);
                Display.workshopDisplay.appendChild(workshopElement);
            }
            );
        }

        static displayWorkshopsByCategory(categoryId) {
            let workshops = this.workshopObj.getWorkshopsByCategory(categoryId);
            workshops = workshops.filter(element => {return new Date(element.start) >= new Date()});
            Display.workshopDisplay.innerHTML="";
            workshops.forEach(element => {
                const workshopElement = Display.createWorkshopElement(element);
                Display.workshopDisplay.appendChild(workshopElement);
            }
            );
        }
        static displayCompanies()

        {
            HSSApi.getCompanies().then(data => {
               
                let element = document.getElementById("companyDisplay");
                element.innerHTML = "";
                data.forEach(company => {
                    element.innerHTML += company.name + "<br>"
                })
                
                

            });
        }

        static createCompany(company) {
            const workshopElement = document.createElement('div');
            workshopElement.classList.add('courseCard');
    
    
            workshopElement.innerHTML = `
            ${company.name}
            `;
        }



        // create element for each workshop
    static createWorkshopElement(workshop) {
        const workshopElement = document.createElement('div');
        workshopElement.classList.add('courseCard');

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
        <p class ="workshopCompany">${workshop.companyName} </p>
            <p class ="workshopDateAndLocation">${startDato}, ${city}</p>
            <p class ="workshopDiscription">${truncatedDescription}</p>
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