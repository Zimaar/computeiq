const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const port = process.env.PORT || 8080;
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const filePath = path.join(dir, url === '/' ? 'index.html' : decodeURIComponent(url));
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    }
  });
}).listen(port, () => console.log('Listening on ' + port));
