import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid'
import { sendResponse } from '../utils/sendResponse.js'

export async function handlePost(req, res) {

  try {

    let content = ""
    for await (const chunk of req) {
      content += chunk
    } 

    const filePath = path.join('public', 'orders.txt')
    await fsp.appendFile(filePath, content)

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`order-${uuidv4().slice(0, 8)}.pdf`));
    doc.fontSize(30).text('ORDER SUMMARY', {
      align: 'center'
    }).moveDown()
    doc
      .fontSize(20)
      .text(content, {
        align: 'center'
      })
    doc.end()

    sendResponse(res, 201, 'text/plain', content)
    
  } catch (err) {
    sendResponse(res, 400, 'text/plain', `Error: Bad Request. ${err}`)
  }

}