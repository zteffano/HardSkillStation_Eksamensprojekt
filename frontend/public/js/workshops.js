var workshopsContainer = document.getElementById("workshopDisplay");
var workshopContent = undefined;

// function to fetch data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network resonse was not ok")
        }
        return response.json();
    } catch (error) {
        throw new Error("There was a problem fetching the data", error)
    }
}

fetchData("http://13.50.4.110:1337/workshops")
    .then(jsonData => {
        workshopContent = jsonData;

        workshopContent.forEach(element => {
            const workshopElement = createWorkshopElement(element);
            workshopsContainer.appendChild(workshopElement);
            console.log(workshopContent);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
})

function createWorkshopElement(workshop) {
    const workshopElement = document.createElement('div');
    workshopElement.classList.add('workshop');

    const startDato = formatDato(workshop.start);
    const slutDato = formatDato(workshop.end);
    const statusTekst = workshop.status === 'completed' ? 'Afsluttet' : 'Åben';

    workshopElement.innerHTML = `
        <div class="event-status ${workshop.status}">${statusTekst}</div>
        <img src="${workshop.logo}" alt="${workshop.name}">
        <div class="event-content">
            <h2>${workshop.name}</h2>
            <p><strong>Start:</strong><br> ${startDato}</p>
            <p><strong>Slut:</strong><br> ${slutDato}</p>
            <p>${workshop.description}</p>
            <a href="${workshop.workshopLink}" target="_blank">Læs mere og tilmeld</a>
        </div>
    `;

    return workshopElement;
}

function formatDato(datoStr) {
    const ugedage = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
    const måneder = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

    const dato = new Date(datoStr);
    const ugedag = ugedage[dato.getDay()];
    const dag = dato.getDate();
    const måned = måneder[dato.getMonth()];
    const år = dato.getFullYear();
    const tid = dato.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });

    return `${ugedag} d. ${dag}. ${måned} ${år} kl. ${tid}`;
}

