import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from '../utils/sendResponse.js'

export async function handlePost(req, res) {

  try {

    let content = ""
    for await (const chunk of req) {
      content += chunk
    } 

    const filePath = path.join('public', 'orders.txt')
    await fs.appendFile(filePath, content)
    sendResponse(res, 201, 'text/plain', content)
    
  } catch (err) {
    sendResponse(res, 400, 'text/plain', `Error: Bad Request. ${err}`)
  }

}