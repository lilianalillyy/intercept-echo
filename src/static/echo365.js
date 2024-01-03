const STYLES = `
#kampanak {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    height: 245px;
    width: 231px;
    background-image: url(https://datastore.liliana.digital/kampanak.png);
    transition: transform 300ms ease-in-out;
    transform: translateX(-110%) rotate(0deg) scale(0);
}

#kampanak.show {
    transform: translateX(0%) rotate(180deg) scale(1.25);
}
`;

const KAMPAN = ["k", "a", "m", "p", "a", "n"];

const kampanak = document.createElement("div")
kampanak.setAttribute("id", "kampanak");
document.body.prepend(kampanak);

const styleEl = document.createElement("style");
styleEl.innerHTML = STYLES;
document.head.append(styleEl);

let state = 0;

let kampanuje = false;

const showKampanak = () => {
    kampanuje = true;
    kampanak.classList.add("show");

    setTimeout(() => {
        kampanak.classList.remove("show");
        kampanuje = false;
    }, 700)
}

const onKeyboardLetter = (letter) => {
    const nextLetter = KAMPAN[state] ?? null;

    if (nextLetter === KAMPAN[KAMPAN.length - 1]) {
        state = 0;
        showKampanak();
        return;
    }

    if (letter.toLowerCase() !== nextLetter) {
        state = 0;
        return;
    }

    state++;
}

document.addEventListener('keydown', (event) => {
    if (kampanuje) {
        return;
    }

    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        onKeyboardLetter(event.key);
    }
});