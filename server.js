import http from 'http'
import { serveStatic } from './utils/serveStatic.js'
import { handlePost } from './handlers/routeHandlers.js'
import { sendResponse } from './utils/sendResponse.js'

const PORT = 6000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/api')) {
    await serveStatic(req, res, __dirname)
  } else if (req.url === '/api' && req.method === "POST") {
    return await handlePost(req, res)
  } else {
    return sendResponse(res, 404, 'text/plain', 'Error. Resource Not Found.')
  }
});

server.listen(PORT, () => console.log(`Connected on Port: ${PORT}`));