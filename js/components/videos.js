import playVideo from "./videoPlayer.js";
export default (videos) => {
   let  list = document.querySelector(".playlist");

    videos.forEach(vid => {
        const nxt = document.createElement("div"),
            video = document.createElement("video"),
            del = document.createElement("div");
        nxt.classList.add("next-vid");
        video.classList.add("next");
        del.classList.add("delete");
        video.currentTime +=5; //seconds
        del.textContent = "x";
        video.src = vid.src;
        nxt.onclick = e => {
            e.stopImmediatePropagation();
            playVideo(e.target.src);
        }

        del.onclick = e => {
            e.stopImmediatePropagation();
            let parent = e.target.parentElement,
                grandParent = parent.parentElement;
            grandParent.removeChild(parent);
        }
        nxt.appendChild(video);
        nxt.appendChild(del);
        list.appendChild(nxt);
    });

}