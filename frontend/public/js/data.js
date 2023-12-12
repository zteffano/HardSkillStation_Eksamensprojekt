const GET_WORKSHOP_URL = "http://hss.zteffano.dk:1337/workshopsjoined";

var workshopList = [];

// fecthing data from API and save it in session storage
fetch(GET_WORKSHOP_URL)
    .then(response => {
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then (jsonData => {
        jsonData.forEach(element => {
            workshopList.push(element);
        });
        console.log('Data fetched and saved to workshoplist', workshopList);
        sortArrayByDate(workshopList);
        console.log('array sorted', workshopList);
        displayAllWorkshops();
            
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem fetching the data:', error);
    });

// sort data by date
function sortArrayByDate(arrayToSort) {
    arrayToSort.sort((a, b) => {
        let workshopA = a.start;
        let workshopB = b.start;
        if (workshopA < workshopB) {
            return 1;
        }
        if (workshopA > workshopB) {
            return 1;
        }
        return 0;
    })
}

// 
function sortArrayByDate(arrayToSort) {
    arrayToSort.sort((a, b) => {
        let workshopA = a.start;
        let workshopB = b.start;
        if (workshopA < workshopB) {
            return 1;
        }
        if (workshopA > workshopB) {
            return 1;
        }
        return 0;
    })
}


// display workshops
function displayAllWorkshops() {
    var workshopDisplay = document.getElementById("courseOverviewCards");

    workshopList.forEach(element => {
        const workshopElement = createWorkshopElement(element);
        workshopDisplay.appendChild(workshopElement);
    });
}

// create element for each workshop
function createWorkshopElement(workshop) {
    const workshopElement = document.createElement('div');
    workshopElement.classList.add('workshop');

    const startDato = formatDato(workshop.start);
    const statusTekst = workshop.status === 'completed' ? 'Kurset er desværre allerede fuldt booket' : 'stadig plads';

    // get city by locationAddress
    const locationAddress = workshop.locationAddress;
    console.log(locationAddress)
    const parts = locationAddress.split(' ');
    const city = parts.pop();

    // Limit the workshop description to 50 characters 
    const truncatedDescription = workshop.description.length > 10 ?
        workshop.description.slice(0, 10) + ' ...' :
        workshop.description;
        console.log(truncatedDescription)

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

function formatDato(datoStr) {
    const måneder = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

    const dato = new Date(datoStr);
    const dag = dato.getDate();
    const måned = måneder[dato.getMonth()];
    const år = dato.getFullYear();
    const tid = dato.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });

    return `${dag}. ${måned} ${år} kl. ${tid}`;
}

