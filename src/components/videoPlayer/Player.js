"strict mode"
import styles from "./styles";
import controls from "./controls/videoControls";
import dropMenu from "./controls/dropupMenu";

const temp = document.createElement('template');
temp.innerHTML = `
<style>
${styles()}
</style>
<div id="videoPlayer"> 
    <video ></video>
    ${controls()}
    ${dropMenu()}
</div>
`;

class Player extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
    // connectedCallback(){}
    // disconnectedCallback () {}
    // attributeChangedCallback (attrName, oldVal, newVal){}
    // adoptedCallback () {}
}

window.customElements.define('player-card', Player);

const playerCard = document.createElement('player-card');

export default playerCard;