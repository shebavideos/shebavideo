document.addEventListener("DOMContentLoaded", function () {
    "strict mode"

    let upload = document.querySelector(".fileupload"),
        volumeUp = document.querySelector("#volumeUp"),
        volumeDown = document.querySelector("#volumeDown"),
        fullScreen = document.querySelector("#fullScreen"),
        backward = document.querySelector("#skipBackwards"),
        forward = document.querySelector("#skipForward"),
        play = document.querySelector("#play"),
        xspeed = document.querySelector("#xsp"),
        pip = document.querySelector("#pip"),
        homeBtn= document.querySelector("#home"),
        curVideo = document.querySelector("#curVideo"),
        list = document.querySelector(".playlist"),
        videoList = [],
        xp = [
            0.5,
            1,
            1.75,
            2,
            2.75,
            3,
            3.75,
            4,
        ];

    // homeBtn.onclick = e => history.back()

    pip.onclick = e => {
        e.stopImmediatePropagation();
        if (!document.pictureInPictureElement){
            curVideo.requestPictureInPicture()
            .catch (err => {
                console.error(`Bothata ke bo ${err}`);
            }); 
        }else{
            document.exitPictureInPicture()
            .catch(err => {
                console.error(`Bothata ke bo ${err}`);
            })
        }
    }
    document.onkeydown = e => {
        e.stopImmediatePropagation();
        if (e.keyCode === 32) {
            curVideo.paused ? curVideo.play() : curVideo.pause()

        }
    }
    xspeed.onclick = e => {
        e.stopImmediatePropagation()
        document.body.appendChild(xrate);

    }


    fullScreen.onclick = e => {
        e.stopImmediatePropagation();
        curVideo.requestFullscreen();
    }
    volumeUp.onclick = e => {
        e.stopImmediatePropagation();
        curVideo.volume += 0.1;
    }

    volumeDown.onclick = e => {
        e.stopImmediatePropagation();
        curVideo.volume -= 0.1;
    }

    backward.onclick = e => {
        e.stopImmediatePropagation();
        curVideo.currentTime -= 25;
    }
    forward.onclick = e => {
        e.stopImmediatePropagation();
        curVideo.currentTime += 25
    }
    play.onclick = e => {
        e.stopImmediatePropagation();
        curVideo.paused ? curVideo.play() : curVideo.pause()

    }
    curVideo.onclick = e => e.target.paused ? e.target.play() : e.target.pause()

    function playVideo(src) {
        curVideo.src = src;
        curVideo.autoplay = true;
    }

    upload.addEventListener("change", e => {

        const files = e.target.files,
            videos = [];

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            videos.push({
                id: i,
                src: URL.createObjectURL(file),
                name: file.name
            });

        }
        uploadCMP(videos);
    });


    function uploadCMP(videos) {
        videos.forEach(vid => {
            videoList.push(vid);
            const nxt = document.createElement("div"),
                video = document.createElement("video"),
                del = document.createElement("div");
            nxt.classList.add("next-vid");
            video.classList.add("next");
            del.classList.add("delete");
            video.currentTime += 59; //seconds
            del.textContent = "x";
            video.src = vid.src;
            nxt.appendChild(video);
            nxt.appendChild(del);
            list.appendChild(nxt);

            nxt.onclick = e => {
                e.stopImmediatePropagation();
                playVideo(e.target.src);
            }

            del.onclick = e => {
                e.stopImmediatePropagation();
                // console.log(e.target.previousElementSibling.src)
                videos = videos.filter(video => video.src !== e.target.previousElementSibling.src);
                let parent = e.target.parentElement,
                    grandParent = parent.parentElement;
                grandParent.removeChild(parent);

            }
        });

    }

    const xrate = document.createElement("div");
    xrate.classList.add("xrate");

    xp.forEach(x => {
        let p = document.createElement("p");
        p.classList.add("rate")
        p.textContent = x;
        xrate.appendChild(p);
        p.onclick = e => {
            e.stopImmediatePropagation();
            // console.log(e.target.textContent);
            curVideo.playbackRate = e.target.textContent;
            document.body.removeChild(xrate);
        }
    });

    document.onclick = e => {
        e.stopPropagation();
        document.body.removeChild(xrate);
    }

});