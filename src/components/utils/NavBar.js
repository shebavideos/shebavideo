"strict mode"
import { uploadVideos } from "../../context/videos/State";
import { nanoid } from "nanoid";
import { setAutoplay, getState } from "../../context/player/State";

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
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #ccc;
        transition: 4s;
        -webkit-transition: 4s;
    }
    
    .slider::before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 4px;
        background-color: white;
    }
    
    input:checked+.slider {
        background-color: #33373a;
    }
    
    input:focus+.slider {
        box-shadow: 0 0 1px rgba(9, 84, 146, 0.247);
    }
    
    input:checked+.slider::before {
        transform: translateX(26px);
    }
    
    .slider.round {
        border-radius: 34px;
    }
    
    .slider.slider.round::before {
        border-radius: 50%;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
    }
    
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
</style>
<nav> 
    <label id="dark-mode" class="switch">
        <input type="checkbox"  id="autoplay"/>
        <span class="slider round"></span>
    </label>
    <input type="file" multiple accept="video/*" />
    <button id="about"> About </button>
 </nav>
`;


class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
    connectedCallback() {
        const root = this.shadowRoot,
            autoplay = root.querySelector('#autoplay'),
            upload = root.querySelector('input[type="file"]'),
            aboutBtn = root.querySelector('#about');

        autoplay.addEventListener('click', this.autoplay);
        upload.addEventListener('change', this.upload);
        aboutBtn.addEventListener('click', this.about);
    }
   
    /**
     * 
     * @param {Event} e 
     * @description adds uploaded videos to reducx store.
     */
    upload(e) {

        const files = e.target.files,
         videos = [],
            allowedVideoFormats = /\.(avi|divx|flv|mkv|mov|mp4|mpeg|mpg|ogm|ogv|ogx|rm|rmvb|smil|webm|wmv|xvid)$/,
            allowedVideoTypes = /^video\/(avi|divx|flv|mkv|mov|mp4|mpeg|mpg|ogm|ogv|ogx|rm|rmvb|smil|webm|wmv|xvid)$/;

        for (let i = 0; i < files.length; i++) {

            let file = files.item(i),
                { name, type, size } = file,
                formatIsOkay = allowedVideoFormats.test(name),
                typeIsOkay = allowedVideoTypes.test(type);

            if (formatIsOkay && typeIsOkay) {
                videos.push({
                    id: nanoid(),
                    name,
                    type,
                    size,
                    src: URL.createObjectURL(new Blob([file], { type }))
                });
            }
        }

        uploadVideos(videos);
        e.target.value = null;
        e.target.blur();
    }
     /**
     * 
     * @param {Event} e 
     * @description toggles autoplay mode.
     */
    autoplay(e){
        e.stopImmediatePropagation();
       console.log("checked")
        let state = getState();
        
        setAutoplay(state.autoplay === true ? false : true );
       
        e.target.blur();
    }
    /**
     * 
     * @param {Event} e 
     * @description displays app about information card.
     */
    about(e) {
        e.stopImmediatePropagation();
      
        e.target.blur();
    }

}
window.customElements.define('navbar-card', Navbar);

const navbarCard = document.createElement('navbar-card');

export default navbarCard;