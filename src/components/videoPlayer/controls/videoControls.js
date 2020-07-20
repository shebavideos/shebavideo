import fullScreen from "./svg/full_screen.svg";
import volume from "./svg/volume.svg";
import skipBack from "./svg/skipback.svg";
import playBtn from "./svg/playbutton.svg";
import skipAhead from "./svg/skipahead.svg";
import settings from "./svg/settings.svg";
export default (dropMenu) => {
    return (
        `
  <section id="controls">
  <button name="fullscreen">
      ${fullScreen}
  </button>
  <button name="volume">
      ${volume}
  </button>
  <button name="skipback">
      ${skipBack}
  </button>
  <button name="playbtn">
      ${playBtn}
  </button>
  <button name="skipahead">
      ${skipAhead}
  </button>
  <button class="dropupbtn" name="dropupbtn">${settings}</button>
  ${dropMenu}
</section>
`
    );
}