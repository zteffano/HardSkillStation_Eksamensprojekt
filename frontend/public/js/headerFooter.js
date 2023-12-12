

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
                        <button id="vis-profil">Vis Profil</button>
                        <button id="logud" class="secondButtonStyle">Logud</button>
                    </div>
                    <div class="profile-header-container">
                    <div class="profile-icon">
                    <img src="assets/images/thomas.png" alt="Thomas Sørensen" />
                  
                    </div>
                    <p class="username-header">${sessionStorage.getItem("username")}</p>
                    </div>
                    
                </div>
            </header>
            <div class="profile-outer">
     
            
            <div class="profile-card">
            <p class="username">@${sessionStorage.getItem("username")} </p>
            <p class="user-email">${sessionStorage.getItem("userEmail")} </p>
            <div class="profile-picture">
            <img src="assets/images/thomas.png" alt="Thomas Sørensen" />
            <p style="text-align:center">⭐⭐⭐⭐</p> 
        </div>
                <div class="profile-header">
                  
                    <div class="profile-info">
                    
                    <p>Total XP: 250</p>
                    <p>Skill level: expert</p>
                    <p>Courses completed: 3</p>
              
                    
                </div>
                
          
            </div>
            <div class="linkedin">
                <p>Add To Linkedin</p>
                <img src="assets/images/linkedin_icon.png" alt="linkedin_icon" />
            </div>      
                <p class="joined">Joined: september 2023</p>
                <button class="rate-button">View Archievements</button>
            
            </div>
    
        </div>
        `;
            let visProfilBtn = document.getElementById("vis-profil");
            let logudBtn = document.getElementById("logud");
            visProfilBtn.addEventListener("click", () => {
                //go to profile page
                window.location.href = "profile.html";
            });
            logudBtn.addEventListener("click", () => {
                //log out
                sessionStorage.removeItem("username");
                window.location.href = "index.html";
            });
            let profileButton = document.getElementById('vis-profil');
            let profileCard = document.querySelector('.profile-outer');
            
            profileButton.addEventListener('mouseover', function() {
                profileCard.classList.add('show'); // Add class to show the profile card
        

                let usernameHeader = document.querySelector('.username-header');
                let profilePicture = document.querySelector('.profile-icon');
                //display none
                usernameHeader.style.opacity = 0.4;
                profilePicture.style.opacity = 0.4;
            });
            
            profileButton.addEventListener('mouseout', function(event) {
                if (!profileCard.contains(event.relatedTarget)) {
                    profileCard.classList.remove('show'); // Remove class to hide the profile card
                }
                let usernameHeader = document.querySelector('.username-header');
                let profilePicture = document.querySelector('.profile-icon');
                //display block
                usernameHeader.style.opacity = 1;
                profilePicture.style.opacity = 1;  
            });
            
            profileCard.addEventListener('mouseout', function(event) {
                if (!profileButton.contains(event.relatedTarget)) {
                    profileCard.classList.remove('show'); // Remove class to hide the profile card
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

            // Find active link and change font size
            const currentPage = window.location.pathname.split("/").pop(); // Determine current page
            const navLinks = this.querySelectorAll(".nav-link");

            var toggleButton = document.getElementsByClassName("toggle-button")[0];
            var navbar = document.getElementsByClassName("navigation")[0];
            var buttons = document.getElementsByClassName("buttons")[0];

            toggleButton.addEventListener("click", () => {
                navbar.classList.toggle("active");
                buttons.classList.toggle("active");
            });

            navLinks.forEach((link) => {
                const linkPage = link.getAttribute("href").split("/").pop();
                if (linkPage === currentPage) {
                    link.style.fontSize = "22px";
                    link.style.color = "#002754";
                    link.style.textDecoration = "underline";
                }
            });
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
