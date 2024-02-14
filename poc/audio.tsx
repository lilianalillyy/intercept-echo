import React from "react";
import { createRoot } from "react-dom/client";
import { AudioBannerProvider } from "./contexts/AudioBannerProvider";
import { AudioPlayer } from "./components/AudioPlayer";
import { PortalRadioProstorButton } from "./components/RadioProstorButton";


const createEmptyDiv = () => {
    const rootEl = document.createElement("div");
    return rootEl;
}

export const mountAudio = () => {
    const rootEl = createEmptyDiv();
    document.body.insertAdjacentElement("afterend", rootEl);
    const root = createRoot(rootEl);

    const [desktopRpList] = document.querySelectorAll(".js-radioprostor");

    const desktopButtonPortalRoot = createEmptyDiv();
    desktopRpList.insertAdjacentElement("beforebegin", desktopButtonPortalRoot);

    root.render(
        <AudioBannerProvider>
            <AudioPlayer />
            <PortalRadioProstorButton target={desktopButtonPortalRoot}/>
        </AudioBannerProvider>
    );
}