class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header id="header">
                <div class="header-content">
                    <div class="logo">
                        <img src="assets/images/HSS_Logo.webp" alt="Logo">
                    </div>
                    <nav>
                        <ul>
                            <li><a href="./home.html" class="nav-link">Home</a></li>
                            <li><a href="./about.html" class="nav-link">About</a></li>
                            <li><a href="./history.html" class="nav-link">History</a></li>
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

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.style.fontSize = '22px';
                link.style.color = '#6F3C8B';
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
