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
        this.videoControls();
    }

    videoControls() {
        const root = this.shadowRoot,
            video = root.querySelector('video'),
            fullscreenBtn = root.querySelector('button[name="fullscreen"'),
            volumeBtn = root.querySelector('button[name="volume"]'),
            skipBackBtn = root.querySelector('button[name="skipback"]'),
            skipForwardBtn = root.querySelector('button[name="skipahead"'),
            playBtn = root.querySelector('button[name="playbtn"]');

        fullscreenBtn.onclick = e => {
            e.stopImmediatePropagation();
            video.requestFullscreen();
            fullscreenBtn.blur();
        }
        volumeBtn.onclick = e => {
            e.stopImmediatePropagation();
            let increase =  video.volume !== 1 ,
            decrease = video.volume !== 0;
            // control volume.
           
            if(increase){
              video.volume = Number(video.volume + 0.1).toFixed(1);
              console.log("increase");
              console.log(video.volume);
            }else {
                video.volume = Number(video.volume - 0.1).toFixed(1);
                console.log("decrease");
                console.log(video.volume);
            }
            volumeBtn.blur();
        }

        skipBackBtn.onclick = e => {
            e.stopImmediatePropagation();
            video.currentTime -= 15;
            skipBackBtn.blur();
        }
        skipForwardBtn.onclick = e => {
            e.stopImmediatePropagation();
            video.currentTime += 15;
            skipForwardBtn.blur();
        }

        playBtn.onclick = e => {
            e.stopImmediatePropagation();
            video.paused ? video.play() : video.pause()
            playBtn.blur();
        }
        const settingsBtn = root.querySelector('button[name="dropupbtn"]'),
            settings = root.querySelector('.dropup-content'),
            nodeChildren = [...settings.children].filter(node => node['nodeName'] === 'BUTTON'),
            { getVisibility, setVisibility } = this.toggleSettingsMenu();

        settingsBtn.onclick = e => {
            setVisibility();
            switch (getVisibility()) {
                case true:
                    settings.style.display = 'block';
                    nodeChildren.forEach(node => node.addEventListener('click', this.settings(root)));
                    settingsBtn.blur();
                    break
                default:
                    settings.style.display = 'none';
                    settingsBtn.blur();
                    break
            }
        }
    }
    /**
     * @param {HTMLElement} node 
     * @param {function} callback 
     * @description finds a  HTMLElemtent with nodeName of Button.
     */
    getParent(node, callback) {

        if (node['nodeName'] === 'BUTTON') {
            callback(node);
        } else {
            getParent(node.parentElement, callback);
        }
    }


    settings(root) {
       
        return this.closureMethod(root,this.getParent, this.changeSettings);
    }
    /**
     * @param {#shadowroot} root 
     * @param {function} getParent
     * @param {function} changeSettings
     * @description listens for a click event, on settings child node.
     */
    closureMethod(root, getParent, changeSettings) {

        return function (e) {
            if (e.target['nodeName'] !== 'BUTTON') {

                getParent(e.target, parent => {
                    changeSettings(parent);
                });
    
            } else {
                changeSettings(e.target, root);
            }
        }
        
    }
    /**
     * 
     * @param {HTMLElement} target 
     * @param {#shadowroot} root 
     * @description changes dropup menu settings as desired.
     */
    changeSettings(target, root) {
        
        const settingsMenu = {
            'pip': (root) => {
                console.log(root)
                const video = root.querySelector('video');
                if (!root.pictureInPictureElement) {
                    video.requestPictureInPicture()
                        .catch(err => console.error(err));
                } else {
                    root.exitPictureInPicture()
                        .catch(err => console.error(err));
                }
            },
            'speed': (root) => {

                const video = root.querySelector('video');
                video.playBackRate = 1;
               
            }

        }

        const xspeed = [
            0.25, 0.75,
            1, 1.25, 1.75,
            2, 2.5, 3, 3.5,
            4, 4.5, 5
        ];

        xspeed.forEach(xspeed => {
            settingsMenu[`${xspeed}`] = (root) => {

                const video = root.querySelector('video');
                video.playBackRate = xspeed;
                
            }
        });

        settingsMenu[target['attributes']['name'].value](root);

        target.blur();
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

    /**
     * @param {blob} source
     * @description sets parameter as video.src and autoplay video.
     */
    playVideo(source) {
        const root = this.shadowRoot;
        if (source) {
            const video = root.querySelector('video');
            video.src = source;
            video.autoplay = true;
        }
    }

}

window.customElements.define('player-card', Player);

const playerCard = document.createElement('player-card');

export default playerCard;