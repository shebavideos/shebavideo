import settings from "./settings.svg";

export default () => {
    return(
        `<section class="dropup">
            <aside class="dropup-content">
                <span>pip</span>
                <hr/>
                <span>speed</span>
                <hr/>
                <span>0.25</span>
                <hr/>
                <span>0.75</span>
                <hr/>
                <span >1</span>   
            </aside>
            <button class="dropupbtn">${settings}</button>
       </section>
        `
    );
}