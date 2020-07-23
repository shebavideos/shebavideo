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
    connectedCallback() {
        const root = this.shadowRoot,
            upload = root.querySelector('input[type="file"]'),
            aboutBtn = root.querySelector('#about');
        console.log(aboutBtn)

        upload.addEventListener('change', this.upload);
        aboutBtn.addEventListener('click', this.about);
    }
    about(e) {
        e.stopImmediatePropagation();
        console.log("clicked.");
        e.target.blur();
    }
    upload(e) {

        const files = e.target.files,
            ADDTOVIDEOS = [],
            allowedVideoFormats = /\.(avi|divx|flv|mkv|mov|mp4|mpeg|mpg|ogm|ogv|ogx|rm|rmvb|smil|webm|wmv|xvid)$/,
            allowedVideoTypes = /^video\/(avi|divx|flv|mkv|mov|mp4|mpeg|mpg|ogm|ogv|ogx|rm|rmvb|smil|webm|wmv|xvid)$/;

        for (let i = 0; i < files.length; i++) {

            let file = files.item(i),
                { name, type } = file,
                formatIsOkay = allowedVideoFormats.test(name),
                typeIsOkay = allowedVideoTypes.test(type);

            if (formatIsOkay && typeIsOkay) {
                ADDTOVIDEOS.push({
                    id: i,
                    name,
                    type,
                    src: URL.createObjectURL(new Blob([file], { type }))
                });
            }
        }
        console.log(ADDTOVIDEOS);
        e.target.value = null;

        e.target.blur();
    }

}
window.customElements.define('navbar-card', Navbar);

const navbarCard = document.createElement('navbar-card');

export default navbarCard;