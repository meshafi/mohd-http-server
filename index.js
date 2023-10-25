const http = require('http');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer((req, res) => {
  const url = req.url;
  const parts = req.url.split('/');
  const status = parseInt(parts[2]);
  if (url == '/html') {
    const filePath = path.join(__dirname, 'htmlpage.html');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
  else if(url == '/json'){
    const filePath=path.join(__dirname,'jsonfile.json');
    fs.readFile(filePath,"utf-8",(err,data)=>{
      if(err){
        res.writeHead(404);
        res.end('Not Found');
      }
      else{
        res.writeHead(200,{ 'Content-Type':'text/json'});
        res.end(data);
      }
    })
  }
  else if(url == '/uuid'){
    const generatedUUID = uuidv4();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(generatedUUID);
  }
  else if (parts[1] === 'status' && !isNaN(status) && status >= 100 && status <= 599) {
      res.writeHead(status,  { 'Content-Type': 'text/plain' });
      res.end(`Response with status code ${status}`);
  } 
  else if(parts[1]=='delay'){
    setTimeout(()=>{
      res.writeHead(200,{'Content-Type':'text/plain'});

      res.end(`content is showing after ${status} seconds`)},status*1000);
  }
   else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const port = 8002;
const hostname = 'localhost';
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
