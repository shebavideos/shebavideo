"strict mode"

const temp = document.createElement('template');
temp.innerHTML = `
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: #ffff;
    }

    .nextVideo {
        max-width: 200px;
        height: 140px;
        background:black;
        border:1px solid red;
        cursor:pointer;
        display:grid;
        grid-template-column:repeat(12,auto);
        grid-template-rows: repeat(12, auto);
    }
    #videoPlaylist{
        margin:auto;
        width:95%;
        height:290px;
        padding:10px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(50, 1fr);
        gap: 8px;
        overflow-y: auto; 
        scrollbar-width: thin;          /* "auto" or "thin"  */
        scrollbar-color: #008CFF transparent;
    }
    #videoPlaylist::-webkit-scrollbar {
        width: 12px;               /* width of the entire scrollbar */
      }
    #videoPlaylist::-webkit-scrollbar-track {
        background: transparent;        /* color of the tracking area */
    }
    #videoPlaylist::-webkit-scrollbar-thumb {
        
        background-color: #008CFF;    /* color of the scroll thumb */
        border-radius: 2px;       /* roundness of the scroll thumb */
        border: 3px solid transparent;  /* creates padding around scroll thumb */
    }
     
  
    @media only screen and (min-width:520px){
        #videoPlaylist{
            width:90%;
            height:400px;
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media only screen and (min-width:900px){
        #videoPlaylist{
            margin-left:20px;
            width:280px;
            height:450px;
            grid-template-columns: repeat(2, 1fr);
            
        }
    }
    @media only screen and (min-width:1000px){
        #videoPlaylist{
            margin-left:20px;
            width:400px;
            height:450px;
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media only screen and (min-width:1100px){
        #videoPlaylist{
            margin-left:20px;
            width:500px;
            height:450px;
           
        }
    }

    
    
</style>
<section id="videoPlaylist"> 
    <article class="nextVideo">
    </article>

</section>
`;

class PlayList extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
    // disconnectedCallback () {}
    // attributeChangedCallback (attrName, oldVal, newVal){}
    // adoptedCallback () {}
}

window.customElements.define('playlist-card', PlayList);

const playlistCard = document.createElement('playlist-card');

export default playlistCard;