"strict mode"
// contains important components && their dynamic logic.
const temp = document.createElement('template');
temp.innerHTML = `
<style>
@import url('https://fonts.googleapies.com/css2?family=Comic+Neue&display=swap');
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: #ffff;
        font-family: 'Comic Neue', cursive;
    }
    nav {
       float:right;
        margin: 20px;
       
    }
    nav * {
        cursor:pointer;
    }
    input[type="file"]{
        margin-right:20px;
    }
    button{
        border:none;
        height:30px;
        width:60px;
        background-color:#008CFF;
    }
    
</style>
<nav> 
    <input type="file" multiple accept="video/*" />
    <button id="about"> About </button>
 </nav>
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
    connectedCallback () {
        const root = this.shadowRoot,
        upload = root.querySelector('input[type="file"]'),
        about = root.querySelector('#about');

        upload.addEventListener('change', e => {

        });
        about.addEventListener('click', e => {
            e.stopImmediatePropagation();
        })
    }
    // disconnectedCallback () {}
    // attributeChangedCallback (attrName, oldVal, newVal){}
    // adoptedCallback () {}
window.customElements.define('navbar-card', Navbar);

const navbarCard = document.createElement('navbar-card');

export default navbarCard;