import { AjaxAnchor } from "./ajax";
import { mountAudio } from "./audio";
import topbar from "topbar";

import "./styles.scss";
import { AJAX_RELOAD_EVENT } from "./constants";

topbar.config({
    barColors: {
        "0.1": "#47c1af",
    }
});

// document.addEventListener("DOMContentLoaded", () => {
//     alert("DOMContentLoaded");
// })

// window.addEventListener("load", () => {
//     alert("loadwindow");
// })

document.addEventListener(AJAX_RELOAD_EVENT, () => {
    if ('lazyLoadInstance' in window) {
        (window.lazyLoadInstance as any).update()
    }
    // window.dispatchEvent(new Event("load"))
    // document.dispatchEvent(new Event("DOMContentLoaded"))
})

new AjaxAnchor().attachAnchors();

mountAudio();
