const fastify = require("fastify");
const fastifyProxy = require("@fastify/http-proxy");
const path = require("path");
const { existsSync, readFileSync } = require("fs");

const PORT = process.env.PORT || 3030;

const DOMAIN = process.env.DOMAIN || "echo365.cz";

const UPSTREAM = "https://echo24.cz";

const ITIX_PATH = path.join(__dirname, "itix.js");

const ITIX_URL = "/templateAssets/itix.js";

const shouldReplaceItix = existsSync(ITIX_PATH);

const app = fastify();

app.register(fastifyProxy, {
    upstream: UPSTREAM,
    proxyPayloads: !shouldReplaceItix,
    replyOptions: shouldReplaceItix ? {
        async onResponse(req, res, body) {        
            if (req.url === ITIX_URL) {
                res.removeHeader("Content-Encoding")
                res.removeHeader("Content-Length")
                res.removeHeader("Via")
                res.removeHeader("X-Varnish")
                res.header("Server", "intercept-echo")
                return res.send(readFileSync(ITIX_PATH, "utf-8").replace("%__domain__%", DOMAIN))
            }

            res.send(body);
        }
    } : undefined,
})

app.listen({
    port: PORT,
}).then((v) => console.log(v));