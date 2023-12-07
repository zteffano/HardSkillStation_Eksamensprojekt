const GET_WORKSHOP_URL = "http://13.50.4.110:1337/workshops";

var workshopList = [];

async function fetchData() {
    // fecthing data from API and save it in session storage
workshopList = fetch(GET_WORKSHOP_URL)
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
}


// sort data by date
function sortArrayByDate(arrayToSort) {
    arrayToSort.sort((a, b) => {
        let workshopA = a.start;
        let workshopB = b.start;
        if (workshopA < workshopB) {
            return -1;
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
    var workshopDisplay = document.getElementById("workshopDisplay");

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
    const statusTekst = workshop.status === 'completed' ? 'ikke plads' : 'stadig plads';

    workshopElement.innerHTML = `
        <div class="workshop-status ${workshop.status}">${statusTekst}</div>
        <img class="workshop-image" src="${workshop.logo}" alt="${workshop.name}">
        <div class="workshop-content">
            <p class="workshop-date"> ${startDato}</p>
            <p class="workshop-adress"> ${workshop.adress}</p>
            <p class="workshop-firma"> ${workshop.firma}</p>
            <h2 class="workshop-title">${workshop.name}</h2>
            <p class="workshop-discription">${workshop.description}</p>
            <a class="workshop-a" href="${workshop.workshopLink}" target="_blank">Læs mere og tilmeld</a>
        </div>
    `;
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

