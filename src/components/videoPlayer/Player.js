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
    ${controls(dropMenu())}
  
</div>
`;

class Player extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
    connectedCallback() {
        const root = this.shadowRoot,
            btn = root.querySelector('button[name="dropupbtn"]'),
            settings = root.querySelector('.dropup-content'),
            nodeChildren = [...settings.children].filter(node => node['nodeName'] === 'BUTTON'),
            { getVisibility, setVisibility } = this.toggleSettingsMenu();

        btn.onclick = e => {
            setVisibility();
            switch (getVisibility()) {
                case true:
                    settings.style.display = 'block';
                    nodeChildren.forEach(node => node.addEventListener('click', this.settings))
                    btn.blur();
                    break
                default:
                    settings.style.display = 'none';
                    btn.blur();
                    break
            }
        }

    }
    /**
     * @param {string} event 
     * @description listens for a click event, on settings child node.
     */

    settings(e) {

        if (e.target['nodeName'] !== 'BUTTON') {

            getParent(e.target, parent => {
                changeSettings(parent);
            });

        } else {
            changeSettings(e.target);
        }

        function changeSettings(target) {
            console.log(target['attributes']['name'].value);
            target.blur();
        }

        /**
         * @param {HTMLElement} node 
         * @param {function} callback 
         * @description finds a  HTMLElemtent with nodeName of Button.
         */
        function getParent(node, callback) {

            if (node['nodeName'] === 'BUTTON') {
                callback(node);
            } else {
                getParent(node.parentElement, callback);
            }
        }


    }
    /**
     * @description toggles visibility of className[.dropup-content] HTMLElement in DOM.
     */
    toggleSettingsMenu() {
        var visible = false,
            setVisibility = () => (visible ? visible = false : visible = true),
            getVisibility = () => visible;
        return ({
            getVisibility,
            setVisibility
        });

    }
    // disconnectedCallback () {}
    // attributeChangedCallback (attrName, oldVal, newVal){}
    // adoptedCallback () {}
}

window.customElements.define('player-card', Player);

const playerCard = document.createElement('player-card');

export default playerCard;