// proxy.js
const http = require("http");
const httpProxy = require("http-proxy");

const TARGET = "https://rpc.devnet.linea.build";
const PORT = 3000; // local port

const proxy = httpProxy.createProxyServer({
  target: TARGET,
  changeOrigin: true,  // set Host to target
  secure: true,        // verify upstream TLS cert
  ws: true,            // support websockets if needed
  preserveHeaderKeyCase: true, // don't normalize headers
});

// Pass everything through untouched
proxy.on("proxyReq", (proxyReq, req, res, options) => {
  // Don't modify body; just stream as-is.
  // Optionally keep connection alive:
  proxyReq.setHeader("Connection", "keep-alive");

  let bodyData = [];
  req.on("data", chunk => {
    bodyData.push(chunk);
  });

  req.on("end", () => {
    if (bodyData.length) {
      const raw = Buffer.concat(bodyData).toString();
      console.log(">>> Request Body:");
      console.log(raw);
    }
  });
});

proxy.on("proxyRes", (proxyRes, req, res) => {
  let bodyData = [];
  proxyRes.on("data", chunk => {
    bodyData.push(chunk);
  });
  proxyRes.on("end", () => {
    console.log("ending")
    if (bodyData.length) {
      const raw = Buffer.concat(bodyData).toString();
      console.log(">>> Response Body:");
      console.log(raw);
    }
  });
});

proxy.on("error", (err, req, res) => {
  console.log("error:", err);
  res.writeHead(502, { "Content-Type": "text/plain" });
  res.end("Upstream proxy error.");
});

const server = http.createServer((req, res) => {
  proxy.web(req, res);
});

// If you ever need WS (not typical for JSON-RPC HTTP), this supports it:
server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head);
});

server.listen(PORT, () => {
  console.log(`Proxy listening on http://127.0.0.1:${PORT} → ${TARGET}`);
});
