
class SpecialHeader extends HTMLElement {
    connectedCallback() {
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
                            <button>Login</button>
                            <button class="secondButtonStyle">Tilmed</button>
                        </div>
                    </div>
                </header>
            `;
    
            // Find active link and change font size
            const currentPage = window.location.pathname.split('/').pop(); // Determine current page
            const navLinks = this.querySelectorAll('.nav-link');


            var toggleButton = document.getElementsByClassName("toggle-button")[0];
            var navbar = document.getElementsByClassName("navigation")[0];
            var buttons = document.getElementsByClassName("buttons")[0];


            toggleButton.addEventListener("click", () => {
                navbar.classList.toggle("active")
                buttons.classList.toggle("active")
            })
    
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.style.fontSize = '22px';
                    link.style.color = '#002754';
                    link.style.textDecoration = 'underline';
                }
            });
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

customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter);