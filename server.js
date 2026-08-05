const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const DIR  = __dirname;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
};

http.createServer(function(req, res) {
  let url = req.url === '/' ? '/index-v2.html' : req.url;
  let file = path.join(DIR, url.split('?')[0]);

  fs.readFile(file, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, function() {
  console.log('Portfolio running at http://localhost:' + PORT);
});
