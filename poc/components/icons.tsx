import React from "react";

export function LoadingIcon(props: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
                <path strokeDasharray={60} strokeDashoffset={60} strokeOpacity={0.3} d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate>
                </path>
                <path strokeDasharray={15} strokeDashoffset={15} d="M12 3C16.9706 3 21 7.02944 21 12">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate>
                    <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
                </path>
            </g>
        </svg>
    );
}

export function PlayingIcon({ isPlaying = false, ...props }: { className?: string, isPlaying?: boolean }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <rect width={2.8} height={12} x={1} y={6} fill="currentColor">
                {isPlaying && (
                    <>
                        <animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate>
                        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate>
                    </>
                )}
            </rect>
            <rect width={2.8} height={12} x={5.8} y={6} fill="currentColor">
                {isPlaying && (
                    <>
                        <animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate>
                        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate>
                    </>
                )}
            </rect>
            <rect width={2.8} height={12} x={10.6} y={6} fill="currentColor">
                {isPlaying && (
                    <>
                        <animate id="svgSpinnersBarsScaleMiddle0" attributeName="y" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate>
                        <animate attributeName="height" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate>
                    </>
                )}
            </rect>
            <rect width={2.8} height={12} x={15.4} y={6} fill="currentColor">
                {isPlaying && (
                    <>
                        <animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate>
                        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate>
                    </>
                )}
            </rect>
            <rect width={2.8} height={12} x={20.2} y={6} fill="currentColor">
                {isPlaying && (
                    <>
                        <animate id="svgSpinnersBarsScaleMiddle1" attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate>
                        <animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate>
                    </>
                )}
            </rect>
        </svg>
    );
}

export function CloseIcon(props: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M368 368L144 144m224 0L144 368"></path>
        </svg>
    );
}