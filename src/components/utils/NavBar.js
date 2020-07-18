"strict mode"
// contains important components && their dynamic logic.
const temp = document.createElement('template');
temp.innerHTML = `
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: #ffff;
    }
    nav {
        // position: fixed;
        // top: 20px;
       
    }
    button {
        color: #ffff;
    }
    
</style>
<nav> <button> About </button> </nav>
`;

// export main component.
class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
   
}
 // default methods of a web component.
    // connectedCallback () {}
    // disconnectedCallback () {}
    // attributeChangedCallback (attrName, oldVal, newVal){}
    // adoptedCallback () {}
window.customElements.define('navbar-card', Navbar);

const navbarCard = document.createElement('navbar-card');

export default navbarCard;