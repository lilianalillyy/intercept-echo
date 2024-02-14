export const evalJS = (url: string, onComplete = () => {}) => {
    if (!url?.length) return;
    fetch(url).then((res) => res.text()).then(js => {
        eval(js);
        if (typeof onComplete === "function") {
            onComplete();
        }
    })
}

export const addStyle = (url) => {
    if (!url?.length) return;
    fetch(url).then((res) => res.text()).then(css => {
        const styleEl = document.createElement("style");
        styleEl.setAttribute("cool-data-source", url);
        styleEl.innerHTML = css;
        document.head.append(styleEl);
    })
}