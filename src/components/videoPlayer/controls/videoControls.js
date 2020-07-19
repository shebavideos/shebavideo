import fullScreen from "./full_screen.svg";
import volume from "./volume.svg";
import skipBack from "./skipback.svg";
import playBtn from "./playbutton.svg";
import skipAhead from "./skipahead.svg";

export default () => {
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
</section>
`
    );
}