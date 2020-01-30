export default (source) => {
  const  volumeUp = document.querySelector("#volumeUp"),
    volumeDown = document.querySelector("#volumeDown"),
    fullScreen = document.querySelector("#fullScreen"),
    backward = document.querySelector("#skipBackwards"),
    forward = document.querySelector("#skipForward"),
    play = document.querySelector("#play"),
    xspeed = document.querySelector("#xsp"),
    pip = document.querySelector("#pip"),
    curVideo = document.querySelector("#curVideo"),
    xp = [0.5, 1, 1.75, 2, 2.75, 3, 3.75, 4, ],
    xrate = document.createElement("div");
    xrate.classList.add("xrate");

    fullScreen.onclick = e => {
        e.stopImmediatePropagation();
        curVideo.requestFullscreen();
    }
    volumeUp.onclick = e => {
        e.stopImmediatePropagation();
        try{
            curVideo.volume += 0.1;
        }catch (err){
            
        }
    }

    volumeDown.onclick = e => {
        e.stopImmediatePropagation();
        try{
            curVideo.volume -= 0.1;
        } catch (err){

        }
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

    xspeed.onclick = e => {
        e.stopImmediatePropagation()
        document.body.appendChild(xrate);

    }
    xp.forEach(x => {
        let p = document.createElement("p");
        p.classList.add("rate")
        p.textContent = x;
        xrate.appendChild(p);
        p.onclick = e => {
            e.stopImmediatePropagation();
            curVideo.playbackRate = e.target.textContent;
            document.body.removeChild(xrate);
        }
    });
    document.onclick = e => {
        e.stopPropagation();
        try{
            document.body.removeChild(xrate);
        }
        catch (err){

        }
    }

// picture in picture mode.
    pip.onclick = e => {
        e.stopImmediatePropagation();
        if (!document.pictureInPictureElement) {
            curVideo.requestPictureInPicture()
                .catch(err => {
                    console.error(`Bothata ke bo ${err}`);
                });
        } else {
            document.exitPictureInPicture()
                .catch(err => {
                    console.error(`Bothata ke bo ${err}`);
                })
        }
    }


    // play video
    if (source) {
      
            curVideo.style.backgroundColor = '#222';
            curVideo.src = source;
            curVideo.autoplay = true;
    
    }
}