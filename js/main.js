
import upload from "./components/upload.js";
document.addEventListener("DOMContentLoaded", function () {
    "strict mode"
    upload();
    document.onkeydown = e => {
        e.stopImmediatePropagation();
        if (e.keyCode === 32) {
            curVideo.paused ? curVideo.play() : curVideo.pause()

        }
    }

});