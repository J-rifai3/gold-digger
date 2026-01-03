import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {

  try {
      const publicDir = path.join(baseDir, 'public');
      const filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url)
      const content = await fs.readFile(filePath) //gets it in buffer form
      const ext = path.extname(filePath)
      const contentType = getContentType(ext)
      
      sendResponse(res, 200, contentType, content)
  } catch (err) {
      if (err.code === 'ENOENT') {
        const filePath = path.join(baseDir, 'public', '404.html')
        const content = await fs.readFile(filePath)
        sendResponse(res, 404, 'text/html', content)
      } else {
        console.error(err)
      }
  }
  
}