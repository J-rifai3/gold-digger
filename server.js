import http from 'http'
import { serveStatic } from './utils/serveStatic.js'
import { handlePost } from './handlers/routeHandlers.js'

const PORT = 6000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/api')) {
    await serveStatic(req, res, __dirname)
  } else if (req.url === '/api' && req.method === "POST") {
    await handlePost()
  }
});

server.listen(PORT, () => console.log(`Connected on Port: ${PORT}`));