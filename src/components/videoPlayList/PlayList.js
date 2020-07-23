"strict mode"
import styles from "./styles";
import svgBtn from "./svg/remove.svg";
import {
    subscribe,
    watch,
    watchNext,
    remove,
    getState
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
        const listener = this.listener(this);
        subscribe(listener);
    }
    /**
     * @description listens for new added videoObjects in the redux store.
     */
    listener(root) {

        return () => {
            console.log("video playlist listener");

            const state = getState();

            const videoPlaylist = root.shadowRoot.querySelector('#videoPlaylist');

            const visibleVideos = [...videoPlaylist.children].reduce((accumulator, videoComponent) => {
                accumulator.push(videoComponent.getAttribute('id'));
                return accumulator;
            }, []);

            let loadedVideos = state.videos;
            
            console.log(visibleVideos);

            if (visibleVideos.length > 0) {
                for (let videoObject of loadedVideos) {
                    if (visibleVideos.includes(videoObject.id)) {
                        loadedVideos = loadedVideos.filter(source => source.id !== videoObject.id);
                    }
                }
                console.log("not visible videos")
                console.log(loadedVideos);
            } else {

                root.displayVideo(loadedVideos);

            }
        }

    }
    /**
     * 
     * @param {ArrayLike} videos an array of objects.
     * @description displays videos added in redux store.
     */
    displayVideo(videos) {
        const userInterface = this.shadowRoot.querySelector('#videoPlaylist');

        for (let videoObject of videos) {
            userInterface.appendChild(this.videoElement(videoObject));
        }
    }
    /**
     * 
     * @param {object} source 
     * @description creates a video element.
     */
    videoElement(source) {

        const root = this.shadowRoot;
        const removeBtn = document.createElement('span');
        removeBtn.classList.add('remove');
        removeBtn.innerHTML = svgBtn;
        removeBtn.onclick = e => {
            e.stopImmediatePropagation();
            root.querySelector('#videoPlaylist')
                .removeChild(e.target.parentElement);
            remove(source.id);
        }

        const video = document.createElement('video');
        video.src = source.src;
        video.currentTime += 2; //seconds.

        const durationCard = document.createElement('div');
        durationCard.classList.add('duration');
        durationCard.textContent = video.duration;

        const component = document.createElement('nextVideo');
        component.classList.add('nextVideo');
        component.id = source.id;
        component.onclick = e => {
            e.stopImmediatePropagation();
            watch(source.id);
        }

        [durationCard, video, removeBtn].forEach(element => {
            component.appendChild(element);
        });

        return (component);

    }

}

window.customElements.define('playlist-card', PlayList);

const playlistCard = document.createElement('playlist-card');

export default playlistCard;