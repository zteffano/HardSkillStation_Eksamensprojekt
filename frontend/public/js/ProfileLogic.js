import {HSSApi} from './HSSApi.js';
/* Elements
        <!-- Login Popup -->
        <div id="loginPopup" class="popup">
            <div class="popup-content">
                <span class="close">&times;</span>
                <h2>Log-in</h2>
                <input id="login-username" class="login-input" type="text" placeholder="brugernavn" name="username" required>
                <input id="login-password" class="login-input" type="password" placeholder="password" name="password" required>
                <button id="login-submit" class="button" type="submit">Login</button>
                <p id="login-message"></p>
            </div>
        </div>

        <!-- Tilmeld Popup -->
        <div id="tilmeldPopup" class="popup">
            <div class="popup-content">
                <span class="close">&times;</span>
                <h2>Opret Bruger</h2>
                <input id="register-username" class="login-input" type="text" placeholder="brugernavn" name="username" required>
                <input id="register-password" class="login-input" type="password" placeholder="password" name="password" required>
                <input id="register-email" class="login-input" type="email" placeholder="email" name="email" required>
                <button id="register-submit" class="button" type="submit">Opret Bruger</button>
                <p id="register-message"></p>
            </div>
        </div>

        */

/* Ren Javascript injection af Login & tilmeld popups */

(function() {
    var popupHTML = `
        <!-- Login Popup -->
        <div id="loginPopup" class="popup">
            <div class="popup-content">
                <span class="close">&times;</span>
                <h2>Log-in</h2>
                <input id="login-username" class="login-input" type="text" placeholder="brugernavn" name="username"  required>
                <input id="login-password" class="login-input" type="password" placeholder="password" name="password" required>
                <button id="login-submit" class="button" type="submit">Login</button>
                <p id="login-message"></p>
            </div>
        </div>

        <!-- Tilmeld Popup -->
        <div id="tilmeldPopup" class="popup">
            <div class="popup-content">
                <span class="close">&times;</span>
                <h2>Opret Bruger</h2>
                <input id="register-username" class="login-input" type="text" placeholder="brugernavn" name="username" required>
                <input id="register-password" class="login-input" type="password" placeholder="password" name="password" required>
                <input id="register-email" class="login-input" type="email" placeholder="email" name="email" required>
                <button id="register-submit" class="button" type="submit">Opret Bruger</button>
                <p id="register-message"></p>
            </div>
        </div>
    `;

    document.addEventListener('DOMContentLoaded', function() {
        if(sessionStorage.getItem('username')) {
            HSSApi.getAccountWorkshops(sessionStorage.getItem('userId')).then((response) => {
              
                //gemmer tilmeldte workshops i session storage
               
                sessionStorage.setItem('tilmeldtWorkshops', JSON.stringify(response));
                ;
                
            });
        }
    
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        setInterval(markTilmeldtWorkshop,500); // temp fix til altid at vise tilmeldt på workshops
       

        let loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', showPopup);
            let tilmeldBtn = document.getElementById('tilmeldBtn');
            tilmeldBtn.addEventListener('click', showTilmeldPopup);
        }
        



        let submitLoginBtn = document.getElementById('login-submit');
        submitLoginBtn.addEventListener('click', checkLogin);

        let submitTilmeldBtn = document.getElementById('register-submit');
        submitTilmeldBtn.addEventListener('click', createAccount);

        let closeBtns = document.querySelectorAll('.close');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', closePopup);
        });

        window.onclick = function(event) {
            if (event.target === document.getElementById('loginPopup') || 
                event.target === document.getElementById('tilmeldPopup')) {
                closePopup();
            }
        };

    });

     // temp fix til altid at vise tilmeldt på workshops
})();







// Funktion til at vise popup
function showPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
    
}
function showTilmeldPopup() {

    document.getElementById('tilmeldPopup').style.display = 'flex';
}

// Funktion til at lukke popup
function closePopup() {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('tilmeldPopup').style.display = 'none';
    
}

// Luk popup, når der klikkes udenfor popup-vinduet
window.onclick = function(event) {
    let modal = document.getElementById('loginPopup');
    let modal2 = document.getElementById('tilmeldPopup');
    if (event.target === modal || event.target === modal2) {
        closePopup();
    }
}

//let usernameInput = document.getElementById('login-username');
//let passwordInput = document.getElementById('login-password');

function checkLogin() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;
    let message = document.getElementById('login-message');
   

    HSSApi.checkLogin(username, password)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Return the Promise from .json()
        })
        .then(userJson => {
            console.log(userJson); // userJson is now the parsed JSON object

            sessionStorage.setItem('username', username);

            // Assuming getUserInfo handles the userJson correctly
            HSSApi.getAccount(userJson[0]).then((response) => {
                console.log(response);
                sessionStorage.setItem('userId', response.id);
                sessionStorage.setItem('userEmail',response.email);
                sessionStorage.setItem('userType', response.accounttypeid);
                console.log(response.id);
            }
            );
            HSSApi.getAccountWorkshops(sessionStorage.getItem('userId')).then((response) => {
          
                //gemmer tilmeldte workshops i session storage
               
                sessionStorage.setItem('tilmeldtWorkshops', JSON.stringify(response));
                console.log(sessionStorage.getItem('tilmeldtWorkshops'));
                
            });


           
            message.innerHTML = "Du er nu logget ind!";
            message.style.color = "green";

        
             setTimeout(() => {
                 closePopup();
                 window.location.reload();
             }, 1000);
        })
        .catch(error => {
            console.error('Login error:', error);
            message.innerHTML = "Der skete en fejl. Prøv igen";
            message.style.color = "red"; 
        });
}


function createAccount() {
    let username = document.getElementById('register-username').value;
    let password = document.getElementById('register-password').value;
    let email = document.getElementById('register-email').value;
    let message = document.getElementById('register-message');
    HSSApi.createAccount(username, password, email).then((response) => {
        if (response) {
            
            // Opdater header med profil
            //let loginBtn = document.querySelectorAll(".buttons button")
            
            //loginBtn[0].innerText = "Profil";
            //loginBtn[1].innerText = `Logged in: ${username}`;
            message.innerHTML = "Din konto er nu oprettet";
            message.style.color = "green";
        
        } else {
            message.innerHTML = "Der skete en fejl. Prøv igen";
            message.style.color = "red";
        }
    }
    );
}


function markTilmeldtWorkshop() {
    const enrolledWorkshops = JSON.parse(sessionStorage.getItem('tilmeldtWorkshops'));
    if (enrolledWorkshops == `Ingen workshops fundet for AccountID ${sessionStorage.getItem('userId')}`) {
        return;
    }




    if (enrolledWorkshops && enrolledWorkshops.length > 0) {

        enrolledWorkshops.forEach(workshop => {
            const workshopId = workshop.id;
            const workshopCard = document.getElementById(`workshop-${workshopId}`);

            if (workshopCard) {
                const imageContainer = workshopCard.querySelector('.container');
                const button = workshopCard.querySelector('.button-link');

                if (imageContainer && !imageContainer.querySelector('.tilmeldt-overlay')) {
                    const tilmeldtOverlay = document.createElement('div');
                    tilmeldtOverlay.classList.add('tilmeldt-overlay');
                    tilmeldtOverlay.textContent = 'Tilmeldt';

                    imageContainer.style.position = 'relative';
                    imageContainer.appendChild(tilmeldtOverlay);

                    button.innerHTML = "Afmeld";
                    button.classList.add('afmeld');
                    button.addEventListener('click', function() {
                        removeFromAccount(workshopId, button);
                    });
                }
            }
        });
    
}
}



function removeFromAccount(workshopId, button) {
    HSSApi.deleteWorkshopFromAccount(sessionStorage.getItem('userId'), workshopId).then((response) => {
        if (response) {
            if (button.innerHTML === "Afmeld") {
                button.innerHTML = "Tilmeld";
                button.classList.remove('afmeld');
            } else {
                button.innerHTML = "Afmeld";
                button.classList.add('afmeld');
            }
            //update session storage
            HSSApi.getAccountWorkshops(sessionStorage.getItem('userId')).then((response) => {
                sessionStorage.setItem('tilmeldtWorkshops', JSON.stringify(response));
            });
            //remove overlay from workshop card
            setTimeout(() => {
                const workshopCard = document.getElementById(`workshop-${workshopId}`);
                const imageContainer = workshopCard.querySelector('.container');
                const overlay = imageContainer.querySelector('.tilmeldt-overlay');
                imageContainer.removeChild(overlay);

            }, 500);
            
            
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}



