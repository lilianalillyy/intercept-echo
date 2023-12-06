const DOMAIN = "%%__domain__%%";
const UPSTREAM_ITIX = "%%__upstream_js__%%";
const CUSTOM_LOGO = "%%__custom_logo__%%";

const banner = document.createElement("div");

banner.style.padding = "20px 10px";
banner.style.backgroundColor = "#000";
banner.style.color = "#fff";
banner.style.zIndex = 9999;
banner.style.fontWeight = 900;
banner.style.fontSize = "20px"
banner.style.display = "block";
banner.style.position = "absolute";
banner.style.width = "100%";
banner.style.top = "0";
banner.innerText = "Toto není oficiální adresa portálu Echo24, tato stránka je pouze alternativní proxy pro https://echo24.cz";
document.body.prepend(banner);

document.head.querySelector(`[data-domain="echo24.cz"]`)?.setAttribute("data-domain", DOMAIN);

if (CUSTOM_LOGO.length >= 1) {
    const svg = document.querySelector(".logo svg");

    if (svg) {
        svg.innerHTML = "";
        svg.style.backgroundColor = "#fff";

        const imageSvgEl = document.createElementNS("http://www.w3.org/2000/svg", "image");
        imageSvgEl.setAttribute("href", CUSTOM_LOGO);
        imageSvgEl.setAttribute("x", "-100");
        imageSvgEl.setAttribute("y", "-100")
        
        svg.appendChild(imageSvgEl);
    }

    document.querySelector(".logo-nonMobile")?.setAttribute("src", CUSTOM_LOGO);
}


window.itixScript = window.document.currentScript;

fetch(UPSTREAM_ITIX).then((res) => res.text()).then(js => {
    console.log({ itixScript })
    eval(js);
})