const fastify = require("fastify");
const fastifyProxy = require("@fastify/http-proxy");
const fastifyStatic = require("@fastify/static");
const path = require("path");
const { existsSync, readFileSync, createReadStream } = require("fs");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 3030;

const DOMAIN = process.env.DOMAIN || "echo365.cz";

const UPSTREAM = "https://echo24.cz";

const ITIX_PATH = path.join(__dirname, "itix.js");

const LOGO_PATH = path.join(__dirname, "static", "images", "logo.png");

const CUSTOM_JS_PATH = path.join(__dirname, "static", "echo365.js");

const ITIX_URL = "/templateAssets/itix.js";

const CUSTOM_LOGO_URL = "/_static/images/logo.png";

const CUSTOM_JS_URL = "/_static/echo365.js";

const shouldReplaceItix = existsSync(ITIX_PATH);

const hasCustomLogo = existsSync(LOGO_PATH);
const hasCustomJs = existsSync(CUSTOM_JS_PATH);

const app = fastify();

app.setErrorHandler((err, req, res) => {
    console.log({ err })
    res.send({ error: "internal intercept-echo error" });
})

if (shouldReplaceItix) {
    app.get("/templateAssets/itix.echo24.js", async (req, res) => {
        res.send(((await axios.get(`${UPSTREAM}${ITIX_URL}`)).data).replace(/\w+\.currentScript/, "itixScript"))
    })

    app.get(ITIX_URL, async (_, res) => {
        res.header("Content-Type", "application/javascript").send(
            readFileSync(ITIX_PATH, "utf-8")
            .replace("%%__domain__%%", DOMAIN)
            .replace("%%__upstream_js__%%", "/templateAssets/itix.echo24.js")
            .replace("%%__custom_logo__%%", hasCustomLogo ? CUSTOM_LOGO_URL : "")
            .replace("%%__custom_js__%%", hasCustomJs ? CUSTOM_JS_URL : "")
        );
    })
}

app.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/_static',
  })

app.register(fastifyProxy, {
    upstream: UPSTREAM,
})

app.listen({
    port: PORT,
}).then((v) => console.log(v));