

class SpecialHeader extends HTMLElement {
    connectedCallback() {
        let url = window.location.href;
        let htmlfile = url.substring(url.lastIndexOf("/") + 1);

        if (sessionStorage.getItem("username") != null) {
            // skal laves en bedre kontrol senere
            this.innerHTML = `
            <header id="header">
                <div class="header-content">
                    <div class="logo">
                        <a href="./index.html"><img src="assets/images/HSS_Logo.webp" alt="Logo"></a>
                    </div>
                    <a href="#" class="toggle-button">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </a>
                    <nav class="navigation">
                        <ul>
                            <li><a href="./index.html" class="nav-link">Hjem</a></li>
                            <li><a href="./about.html" class="nav-link">Om os</a></li>
                            <li><a href="./history.html" class="nav-link">Tidligere</a></li>
                            <li><a href="./contact.html" class="nav-link">Kontakt</a></li>
                        </ul>
                    </nav>
                    
                    <div class="buttons">
                        <p class="languageSwitcher"><span style="font-weight: bold;">DK</span>|EN</p>
                        <button id="logud" class="secondButtonStyle">Logud</button>
                    </div>
                    <div class="profile-header-container">
                    <div class="profile-icon" id="profile-icon">
                    <img src="assets/images/thomas.png" alt="Thomas Sørensen" />                    
                </div>
            </header>
            <div class="profile-outer">
     
            
            <div class="profile-card">
            <p class="username">@${sessionStorage.getItem("username")} </p>
            <p class="user-email">${sessionStorage.getItem("userEmail")} </p>
            <div class="profile-picture">
            <img src="assets/images/thomas.png" alt="Thomas Sørensen" />
            <p style="text-align:center">⭐⭐⭐⭐</p> 
            <div class="linkedin">
            <p>Tilføj til Linkedin</p>
            <img src="assets/images/linkedin_icon.png" alt="linkedin_icon" />
        </div>   
        </div>
                <div class="profile-header">
                  
                    <div class="profile-info">
                    
                    <p>Total XP: 250</p>
                    <p>Skill level: Expert</p>
                    <p>Courses completed: 3</p>
                    
              
                    
                </div>
                
          
            </div>
       
          
            <div id="naesteWorkshopInfo">
            
            <!-- Workshop-informationer vil blive indsat her -->
        </div>
            
            </div>
    
        </div>
        `;
            // let visProfilBtn = document.getElementById("vis-profil");
            let logudBtn = document.getElementById("logud");
            /* visProfilBtn.addEventListener("click", () => {
                //go to profile page
                window.location.href = "profile.html";
            }); */
            logudBtn.addEventListener("click", () => {
                //log out
                sessionStorage.removeItem("username");
                window.location.href = "index.html";
            });
            // let profileButton = document.getElementById('vis-profil');
            let profileCard = document.querySelector('.profile-outer');
            let profilePicture = document.querySelector('.profile-icon');
            
            profilePicture.addEventListener('click', function() {
                let profilePicture = document.querySelector('.profile-icon');
                if (profileCard.classList.contains('show')) {
                    profileCard.classList.remove('show'); // Remove class to hide the profile card
                    profilePicture.style.opacity = 1;  
                } else {
                    
                    //display none
                  
                    profilePicture.style.opacity = 0.4;

                profileCard.classList.add('show'); // Add class to show the profile card
                visNaesteWorkshop();
                }

            });
            
       

            
        } else {
            this.innerHTML = `
                <header id="header">
                    <div class="header-content">
                        <div class="logo">
                            <a href="./index.html"><img src="assets/images/HSS_Logo.webp" alt="Logo"></a>
                        </div>
                        <a href="#" class="toggle-button">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </a>
                        <nav class="navigation">
                            <ul>
                                <li><a href="./index.html" class="nav-link">Hjem</a></li>
                                <li><a href="./about.html" class="nav-link">Om os</a></li>
                                <li><a href="./history.html" class="nav-link">Tidligere</a></li>
                                <li><a href="./contact.html" class="nav-link">Kontakt</a></li>
                            </ul>
                        </nav>
                        <div class="buttons">
                            <p class="languageSwitcher"><span style="font-weight: bold;">DK</span>|EN</p>
                            <button id="loginBtn" >Login</button>
                            <button id="tilmeldBtn" class="secondButtonStyle">Tilmeld</button>
                        </div>
                    </div>
                </header>
            `;
        }
        // Find active link and change font size
        const currentPage = window.location.pathname.split("/").pop(); // Determine current page
        const navLinks = this.querySelectorAll(".nav-link");

        var toggleButton = document.getElementsByClassName("toggle-button")[0];
        var navbar = document.getElementsByClassName("navigation")[0];
        var buttons = document.getElementsByClassName("buttons")[0];
        var profileIcon = document.getElementById("profile-icon");

        toggleButton.addEventListener("click", () => {
            navbar.classList.toggle("active");
            buttons.classList.toggle("active");
            profileIcon.classList.toggle("active");
        });

        navLinks.forEach((link) => {
            const linkPage = link.getAttribute("href").split("/").pop();
            if (linkPage === currentPage) {
                link.style.fontSize = "22px";
                link.style.color = "#002754";
                link.style.textDecoration = "underline";
            }
        });

        function visNaesteWorkshop() {
            let tilmeldteWorkshops = JSON.parse(sessionStorage.getItem('tilmeldtWorkshops'));
            console.log(tilmeldteWorkshops);
            if (tilmeldteWorkshops == `Ingen workshops fundet for AccountID ${sessionStorage.getItem('userId')}`)
            {
               
                let workshopInfoElement = document.getElementById('naesteWorkshopInfo');
                workshopInfoElement.innerHTML = `<h2>Næste Workshop</h2>
                <p>Du er ikke tilmeldt nogen workshops.</p>`;
                return;
            }
        
            // Filtrér for workshops i fremtiden og sortér dem efter dato
            let kommendeWorkshops = tilmeldteWorkshops.filter(workshop => 
                new Date(workshop.start) > new Date()
            ).sort((a, b) => new Date(a.start) - new Date(b.start));
        
            // Vælg den første workshop, hvis der er nogen
            if (kommendeWorkshops.length > 0) {
                let naesteWorkshop = kommendeWorkshops[0];
                visWorkshopInfo(naesteWorkshop);
            }
        }
        
        function visWorkshopInfo(workshop) {
            let workshopInfoElement = document.getElementById('naesteWorkshopInfo');
        
            // Sætter workshop-billedet som baggrundsbillede
            
        
            workshopInfoElement.innerHTML = `
            
                    <h2>Næste Workshop</h2>
                    <p id="countdownTimer"></p>
                    <h3>${workshop.name}</h3>
                   
                    <p>Dato: ${new Date(workshop.start).toLocaleDateString()}</p>
                    
                `;
            opdaterCountdown(workshop.start);
        }
        
        function opdaterCountdown(startDato) {
            const countdownTimerElement = document.getElementById('countdownTimer');
            const workshopStart = new Date(startDato);
        
            function opdaterTimer() {
                const nu = new Date();
                const resterendeTid = workshopStart - nu;
        
                if (resterendeTid > 0) {
                    let dage = Math.floor(resterendeTid / (1000 * 60 * 60 * 24));
                    let timer = Math.floor((resterendeTid % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutter = Math.floor((resterendeTid % (1000 * 60 * 60)) / (1000 * 60));
                    let sekunder = Math.floor((resterendeTid % (1000 * 60)) / 1000);
        
                    countdownTimerElement.textContent = `${dage} dage ${timer} timer ${minutter} minutter ${sekunder} sekunder`;
                } else {
                    countdownTimerElement.textContent = 'Workshoppen er startet!';
                    clearInterval(interval);
                }
            }
        
            // Opdater hver sekund
            opdaterTimer(); // Opdater straks
            const interval = setInterval(opdaterTimer, 1000);
        }
        
        
        
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer id="footer">
                <div class="someLogos">
                    <a href="https://www.instagram.com/hardskillsstation/" target="_blank"><img src="assets/images/InstagramLogo.webp" alt="Instagram logo"></a>
                    <a href="https://www.facebook.com/hardskillsstation" target="_blank"><img src="assets/images/FacebookLogo.webp" alt="Facebook logo"></a>
                </div>
                <p>skabt med dedikation af PBI/PBW-teamet</p>
            </footer>
        `;
    }
}

customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);
