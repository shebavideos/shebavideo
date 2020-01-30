import addvideo from "./videos.js";
export default () => {
    const upload = document.querySelector(".fileupload");
    upload.addEventListener("change", e => {
        let files = e.target.files,
            videos = [],
            allowed = /\.ogg|\.webm|\.mp4|\.avi$/,
            types = ["video/avi","video/ogg","video/mp4","video/webm"];

        for (let i = 0; i < files.length; i++) {
            let file = files.item(i);
            if (types.includes(file.type) && allowed.test(file.name)) {
                videos.push({
                    id: i,
                    src: URL.createObjectURL(new Blob([file],{type:file.type}))
                });
            }
        }
        e.target.value = null;
        addvideo(videos);
    });
}