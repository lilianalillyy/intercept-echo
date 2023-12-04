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

document.head.querySelector(`[data-domain="echo24.cz"]`)?.setAttribute("data-domain", "%__domain__%");

window.itixScript = window.document.currentScript;

fetch("%%__upstream_js__%%").then((res) => res.text()).then(js => {
    console.log({ itixScript })
    eval(js);
})