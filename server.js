const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const types = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
};

http.createServer(function(req, res) {
  var filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  var ext = path.extname(filePath);
  var contentType = types[ext] || 'text/plain';

  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, function() {
  console.log('');
  console.log('  High & Wide is running!');
  console.log('  Open: http://localhost:' + PORT);
  console.log('  Stop: Ctrl+C');
  console.log('');
});
