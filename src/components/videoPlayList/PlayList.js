"strict mode"
import styles from "./styles";
import svgBtn from "./svg/remove.svg";

const temp = document.createElement('template');
temp.innerHTML = `
${styles()}
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

            list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
            list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
              list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
            list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
            list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
            list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
            list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
              list.appendChild(this.videoElement('#','05:00', 1, 'hello keba'));
            list.appendChild(this.videoElement('#','07:30:53', 2, 'hello tokyo'));
           
    }
    /**
     * 
     * @param {URL} source 
     * @param {string} length 
     * @param {string} id 
     * @param {object} data 
     * @description creates a video element.
     */
    videoElement(source, length, id, data) {
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
    
        const durationCard = document.createElement('div');
        durationCard.classList.add('duration');
        durationCard.textContent = length;
    
        const video = document.createElement('video');
        video.src = source;
        video.currentTime += 2; //seconds.
    
        const component = document.createElement('nextVideo');
        component.classList.add('nextVideo');
        component.onclick = e => {
            e.stopImmediatePropagation();
            console.log("play video")
            console.dir(source)
            console.log(id)
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