import React, { Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export type AudioBannerContextType = [boolean, Dispatch<SetStateAction<boolean>>];

export const AudioBannerContext = React.createContext<AudioBannerContextType>([false, () => {}]);

export const useAudioBannerToggle = () => {
    return useContext(AudioBannerContext);
}

export const AudioBannerProvider = ({children}: PropsWithChildren<{}>) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <AudioBannerContext.Provider value={[isShown, setIsShown]}>
            {children}
        </AudioBannerContext.Provider>
    )
}