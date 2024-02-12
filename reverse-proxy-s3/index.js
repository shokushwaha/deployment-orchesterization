const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const REVERSE_PROXY_PORT = process.env.REVERSE_PROXY_PORT

const BASE_PATH = process.env.BASE_PATH

const proxy = httpProxy.createProxy()

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    const resolvesTo = `${BASE_PATH}/${subdomain}`

    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })

})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/')
        proxyReq.path += 'index.html'

})

app.listen(REVERSE_PROXY_PORT, () => console.log(`Reverse Proxy Running..${REVERSE_PROXY_PORT}`))