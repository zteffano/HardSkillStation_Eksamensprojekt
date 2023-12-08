export class HSSApi {

    static async getWorkshops() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/workshopsjoined");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getCategories() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/categories");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getCompanies() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/companies");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getLocations() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/locations");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccounts() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/accounts");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountTypes() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/accounttypes");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async getAccountWorkshops() {
        try {
            const response = await fetch("http://hss.zteffano.dk:1337/accountworkshops");
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async checkLogin(username, password) {
        try {
            const response = await fetch(`http://hss.zteffano.dk:1337/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            return await response.ok // returnere en bool værdi om login er ok elller ej
        } catch (error) {
            console.log(error);
        }
    }

}

export class HSSUtil {


    static getById(array, id) {
        return array.find(element => element.id == id);
    }

    // Kan bruges til fx. at finde et username, eller anden info baseret på et id 
    static getByIdKey(array, id, key) {
        return array.find(element => element.id == id)[key];
    }
    
    static async accountWorkshopsWithNames() {
        let accountWorkshopsWithNames = [];
        let accountWorkshops = await HSSApi.getAccountWorkshops();
        let accounts = await HSSApi.getAccounts();
        let workshops = await HSSApi.getWorkshops();



            accountWorkshops.forEach(accountWorkshop => {
            let accountName = this.getByIdKey(accounts, accountWorkshop.accountId, 'username');
            let workshopName = this.getByIdKey(workshops, accountWorkshop.workshopId, 'name');
            accountWorkshopsWithNames.push({accountName, workshopName});
            return accountWorkshopsWithNames;
    
    });
    }
    static sortByDate(arrayToSort, ascending = false) {
   

        arrayToSort.sort((a, b) => {
            let workshopA = a.start;
            let workshopB = b.start;
            if (workshopA < workshopB) {
                return ascending? -1 : 1;
            }
            if (workshopA > workshopB) {
                return ascending? 1 : -1;
            }
            return 0;
        })
 
    }

 
}


export class Workshops {

    workshops =  [];
    oldWorkshops = [];
    newWorkshops = [];
    dagensDato = new Date();

    constructor() {
        // Bedre måde med HSSAPI klassen, så vi også fri for at have URL hardcoded i hver class if so.
        HSSApi.getWorkshops().then(data => {
            this.workshops = data;
            this.sortWorkshopsByDate();
            this.getNewWorkshops();
            this.getOldWorkshops();
            
            
        });

    }

    getNewWorkshops() {

        this.newWorkshops = this.workshops.filter(element => {return new Date(element.start) >= this.dagensDato});


        return this.newWorkshops
    }

    getOldWorkshops() {

        this.oldWorkshops = this.workshops.filter(element => { return new Date(element.start) < this.dagensDato});

        return this.oldWorkshops
    }
    
    getWorkshopsByCategory(categoryId) {
        return this.workshops.filter(element => {return element.categoryId == categoryId});
    }
    

    searchWorkshops(searchString) {
        return this.workshops.filter(element => {return element.name.includes(searchString)});
    }
    
}

export class Display
    {
        static workshopDisplay = document.getElementById("courseOverviewCards");
        static workshopObj = new Workshops();

        static async startUp(ascending = false) {
            let workshops = await HSSApi.getWorkshops();
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

        static displayOldWorkshops(data) {
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
            Display.workshopDisplay.innerHTML="";
            workshops.forEach(element => {
                const workshopElement = Display.createWorkshopElement(element);
                Display.workshopDisplay.appendChild(workshopElement);
            }
            );
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

  