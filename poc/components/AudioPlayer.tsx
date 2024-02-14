import React from "react";
import { MemoizedButtonPlayPause } from "./buttons";
import { CloseIcon, LoadingIcon, PlayingIcon } from "./icons";

// @ts-ignore
import rp from "../assets/rp.svg";
import { useAudioBannerToggle } from "../contexts/AudioBannerProvider";

export const AudioPlayer = () => {
    const [opened, setOpened] = useAudioBannerToggle();
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);

    React.useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        const handleLoadedData = () => {
            setIsLoading(true);
        }

        const handlePlaying = () => {
            setIsPlaying(true);
            setIsLoading(false);
        }

        const handlePause = () => {
            setIsPlaying(false);
            setIsLoading(false);
        }

        audioRef.current.addEventListener("load", () => {
            setIsLoading(true);
        })
        audioRef.current.addEventListener("loadeddata", handleLoadedData)
        audioRef.current.addEventListener("playing", handlePlaying)
        audioRef.current.addEventListener("pause", handlePause)

        return
    }, [audioRef, setIsLoading, setIsPlaying])

    const play = () => {
        setIsLoading(true);
        audioRef.current?.play();
    }

    const pause = () => {
        setIsLoading(false);
        audioRef.current?.pause();
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            pause();
            return;
        } 

        play();
    }

    const handleCloseButton = () => {
        setOpened(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    React.useEffect(() => {
        if (opened) {
            play()
        }
    }, [opened, play])

    return (
        <>
            <audio ref={audioRef} src="https://bcast.spmmedia.cz/prostor-mp3"></audio>
            <div className={`echo-audio-player ${opened ? "opened" : ""}`}>
                <div className={`audio-bar`}>
                    <div className="audio-container">
                        <div>
                            <img className="rp-logo" src={rp} alt="Radio Prostor" />
                        </div>
                        <div className="controls-container">
                            <MemoizedButtonPlayPause isPlaying={isPlaying} disabled={isLoading} className="audio-control" onClick={handlePlayPause} />
                            {isLoading ? (
                                <LoadingIcon className="state-icon" />
                            ) : (
                                <PlayingIcon key={String(isPlaying)} className="state-icon" isPlaying={isPlaying} />
                            )}
                            <button onClick={handleCloseButton}>
                                <CloseIcon className="state-icon" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* <button className={`audio-open ${!opened ? "closed" : ""}`} onClick={handleToggleButtonClick}>{opened ? "Zavřít" : "Otevřít"} přehrávač</button> */}
            </div>
        </>
    )
}