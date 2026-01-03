export function getContentType(ext) {
  const extObj = {
    ".css": 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
  }

  return extObj[ext] || 'text/html'
}