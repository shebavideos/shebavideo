"strict mode"

const temp = document.createElement('template');
temp.innerHTML = `
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: #ffff;
    }
    
    footer {
        position: fixed;
        bottom: 20px;
        font-size: 12px;
    }
</style>
<footer >&copy; 2020 KT Motshoana</footer>
`;

class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
}

window.customElements.define('footer-card', Footer);

const footerCard = document.createElement('footer-card');

export default footerCard;