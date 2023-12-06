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
                    <li><a href="./home.html">Home</a></li>
                    <li><a href="./about.html">About</a></li>
                    <li><a href="./history.html">History</a></li>
                    <li><a href="./contact.html">Kontakt</a></li>
                </ul>
            </nav>
            <div class="buttons">
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
            </div>
        </div>
    </header>
        `
    }
 }

 class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer id="footer">
            footer
        </footer>
        `
    }
 }

customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter);