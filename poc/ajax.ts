import topbar from "topbar";
import { AJAX_RELOAD_EVENT } from "./constants";

export class AjaxAnchor {
    loading = false;

    attachedAnchors: HTMLAnchorElement[] = [];

    constructor() {
        window.addEventListener("popstate", (e) => {
            alert(e.state.url);
        })
    }

    refreshContent() {
        this.unattachAnchors()
        this.attachAnchors();

        document.dispatchEvent(new CustomEvent(AJAX_RELOAD_EVENT));
    }

    /**
     * @param {Event} e
     */
    handleAnchorClick(e) {
        if (!(e.target instanceof HTMLAnchorElement)) {
            return;
        }

        const anchor = e.target;

        const href = anchor.getAttribute("href");
        const target = anchor.getAttribute("target") ?? null;

        if (target && target === "_blank") {
            return;
        }

        if (href.startsWith("http://") || href.startsWith("https://")) {
            return;
        }

        e.preventDefault();

        if (this.loading) {
            return;
        }

        this.loading = true;
        topbar.show();

        fetch(href)
            .then((res) => res.text())
            .then((html) => {
                const doc = new DOMParser().parseFromString(html, "text/html");

                const pageTitle = doc.title;

                document.title = pageTitle;
                window.history.pushState({ url: href }, "", href);

                document.querySelectorAll("head script, body script").forEach((origScript) => {
                    const scriptClone = document.createElement("script")
                    origScript.getAttributeNames().forEach((attr) => {
                        scriptClone.setAttribute(attr, origScript.getAttribute(attr)!);
                    })

                    const parent = origScript.parentNode;

                    origScript.remove();
                    parent?.appendChild(scriptClone);
                });

                [".l-wrapper:nth-child(4)"].forEach((domTarget) => {
                    const oldEl = document.querySelector(domTarget);
                    console.log(oldEl);

                    if (!oldEl) {
                        return;
                    }

                    const newEl = doc.querySelector(domTarget);

                    if (!newEl) {
                        oldEl.remove();
                    }

                    oldEl.replaceWith(newEl as any);


                    this.refreshContent();
                    this.loading = false;
                    topbar.hide();
                });
            });
    }

    getAllAnchors(root = document) {
        return root.querySelectorAll("a");
    }

    attachAnchors(root = document) {
        this.getAllAnchors(root).forEach((anchor) => {
            this.attachedAnchors.push(anchor);
            anchor.addEventListener("click", this.handleAnchorClick.bind(this));
        });
    }

    unattachAnchors() {
        this.attachedAnchors.forEach((anchor) => {
            anchor.removeEventListener("click", this.handleAnchorClick.bind(this));
        })
    }
}