const fastify = require("fastify");
const fastifyProxy = require("@fastify/http-proxy");
const path = require("path");
const { existsSync, readFileSync } = require("fs");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 3030;

const DOMAIN = process.env.DOMAIN || "echo365.cz";

const UPSTREAM = "https://echo24.cz";

const ITIX_PATH = path.join(__dirname, "itix.js");

const ITIX_URL = "/templateAssets/itix.js";

const shouldReplaceItix = existsSync(ITIX_PATH);

const app = fastify();

app.setErrorHandler((err, req, res) => {
    console.log({ err })
    res.send({ error: "internal intercept-echo error" });
})

if (shouldReplaceItix) {
    app.get("/templateAssets/itix.echo24.js", async (req, res) => {
        res.send(((await axios.get(`${UPSTREAM}${ITIX_URL}`)).data).replace(/\w+\.currentScript/, "itixScript"))
    })

    app.get("/templateAssets/itix.js", async (req, res) => {
        res.header("Content-Type", "application/javascript").send(readFileSync(ITIX_PATH, "utf-8").replace("%__domain__%", DOMAIN).replace("%%__upstream_js__%%", "/templateAssets/itix.echo24.js"))
    })
}

app.register(fastifyProxy, {
    upstream: UPSTREAM,
})

app.listen({
    port: PORT,
}).then((v) => console.log(v));