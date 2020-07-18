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
    
</style>
<h1 id="container">main content</h1>
`;

// export main component.
class MainContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
     // default methods of a web component.
    // connectedCallback () {}
    // disconnectedCallback () {}
    // attributeChangedCallback (attrName, oldVal, newVal){}
    // adoptedCallback () {}
}
window.customElements.define('main-card', MainContent);

const mainCard = document.createElement('main-card');

export default mainCard;