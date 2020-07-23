"strict mode"
import styles from "./styles";
import svgBtn from "./svg/remove.svg";
import {
    subscribe,
    watch,
    watchNext,
    remove
} from "../../context/videos/State";


const temp = document.createElement('template');
temp.innerHTML = `
<style>
    @import url('https://fonts.googleapies.com/css2?family=Comic+Neue&display=swap');
    ${styles()}
</style>
<section id="videoPlaylist"> 
</section>
`;

class PlayList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }

    connectedCallback() {
        const root =  this.shadowRoot,
        list = root.querySelector('#videoPlaylist');

            list.appendChild(this.videoElement);
          
    }
    /**
     * 
     * @param {URL} source 
     * @description creates a video element.
     */
    videoElement(source) {

        const root =  this.shadowRoot;
        const removeBtn = document.createElement('span');
        removeBtn.classList.add('remove');
        removeBtn.innerHTML = svgBtn;
        removeBtn.onclick = e => {
            e.stopImmediatePropagation();
           root.querySelector('#videoPlaylist')
           .removeChild(e.target.parentElement);
        //    remove relevent data associated with 'id' from redux store.
        }
    
        const video = document.createElement('video');
        video.src = source.src;
        video.currentTime += 2; //seconds.

        const durationCard = document.createElement('div');
        durationCard.classList.add('duration');
        durationCard.textContent = video.duration;
    
        const component = document.createElement('nextVideo');
        component.classList.add('nextVideo');
        component.onclick = e => {
            e.stopImmediatePropagation();
            console.log("play video")
            // use source.id to remove source in redux store.
            console.dir(source)
        }
    
        [durationCard,video,removeBtn].forEach(element =>{
            component.appendChild(element);
        });
    
       return (component);
    
    }

}

window.customElements.define('playlist-card', PlayList);

const playlistCard = document.createElement('playlist-card');

export default playlistCard;