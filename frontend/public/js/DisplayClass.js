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


        
        static displaySpecificNewWorkshops(categoryIDs) {
            let newWorkshops = this.workshopObj.getNewWorkshops()
        
            Display.workshopDisplay.innerHTML = "";
            newWorkshops.forEach(element => {
                if (categoryIDs.includes(element.categoryId)) {
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
                    element.innerHTML += `• ${company.name}<br>`
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
        const workshopId = workshop.id;

        workshopElement.classList.add('courseCard');
        workshopElement.id = `workshop-${workshop.id}`;

        const startDato = Display.formatDato(workshop.start);
        const statusTekst = workshop.status === 'closed' ? 'Kurset er desværre allerede fuldt booket' : 'stadig plads';

        // get city by locationAddress
        const locationAddress = workshop.locationAddress;
        console.log(locationAddress)
        const parts = locationAddress.split(' ');
        const city = parts.pop();

        // Limit the workshop description to 50 characters 
        const truncatedDescription = workshop.description.length > 80 ?
            workshop.description.slice(0, 80) + ' ...' :
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
            ${workshop.status !== 'closed' ? `<button class="button-link")">Læs mere og tilmeld</button>` : `<p id="workshopStatus">${statusTekst}</p>`}
        </div>
        `;

    // Add the click event listener to open formPopup to each element with the class "button-link"
    const cardButtons = document.querySelectorAll(".button-link");

    const overlay = document.getElementById("overlay");
    const popupForm = document.getElementById("formPopup");


    function openForm() {

        popupForm.style.display = "block";
        overlay.style.display = "block"
    }

    function closeForm() {
        popupForm.style.display = "none";
        overlay.style.display = "none";
    }
    
    cardButtons.forEach(card => {
        
        card.addEventListener('click', ()=> {
            
            if(!card.classList.contains("afmeld")) {

            let clickedWorkshopId = card.parentNode.parentNode.id.split("-");
            clickedWorkshopId = clickedWorkshopId[clickedWorkshopId.length - 1];
      
            let allWorkshops = Display.workshopObj.workshops.filter(item => item.id == clickedWorkshopId);
            createWorkshopPopup(allWorkshops[0]);
            openForm()
            }
        });
    });





    
    //overlay.addEventListener("click", closeForm);
    function createWorkshopPopup(workshop)
    {
    const workshopPopup = document.getElementById("formPopup");
    workshopPopup.innerHTML = `
        <div class="close-btn">X</div>
        <div class="categoryBar"> ${workshop.categoryName}</div>
        <div class="container">
            <img class="workshopImage" src="${workshop.logo}" alt="${workshop.name}">
            <h2 class="workshopTitle">${workshop.name}</h2>
        </div>
        <div class="workshopContent">
            <p class="workshopCompany">${workshop.companyName} </p>
            <p class="workshopDateAndLocation">${startDato}, ${city}</p>
            <p class="workshopDiscription">${workshop.description}</p>
            ${workshop.status !== 'closed' ? `<button class="button-link tilmeld-button-popup">Tilmeld</button>` : `<p id="workshopStatus">${statusTekst}</p>`}
        </div>
    `;
        let tilmeldButton = workshopPopup.querySelector(".tilmeld-button-popup");
        tilmeldButton.addEventListener("click", () => {
            //tilmelding og ny fetch af brugerens tilmelderiner
            
            HSSApi.addWorkshopToAccount(sessionStorage.getItem("userId"), workshop.id).then(response => {
                   
                    HSSApi.getAccountWorkshops(sessionStorage.getItem('userId')).then((response) => {
          
                        //gemmer tilmeldte workshops i session storage
                       
                        sessionStorage.setItem('tilmeldtWorkshops', JSON.stringify(response));
                        console.log(sessionStorage.getItem('tilmeldtWorkshops'));
                    }
                        
                  
                );
            });
                
                    

                    
            tilmeldButton.innerHTML = "Afmeld";
            tilmeldButton.classList.add("afmeld");
            
            setTimeout(closeForm, 1000);
            
         
        });
        // Get the close button element and add a click event listener
        const closeButton = workshopPopup.querySelector(".close-btn");
        closeButton.addEventListener("click", closeForm);
        const categoryPopupElement = workshopPopup.querySelector(".categoryBar");

        switch (workshop.categoryName) {
            case "Tech":
                categoryPopupElement.classList.add("tech");
                break;
            case "Social":
                categoryPopupElement.classList.add("social");
                break;
            case "Business":
                categoryPopupElement.classList.add("business");
                break;
            case "Creative":
                categoryPopupElement.classList.add("creative");
                break;
            default:
                categoryPopupElement.classList.add("other");
                break;
        } 
    }
    


    // assign color to categoryBar by category
    const categoryElement = workshopElement.querySelector(".categoryBar");
        switch (workshop.categoryName) {
            case "Tech":
                categoryElement.classList.add("tech");
                break;
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