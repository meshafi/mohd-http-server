const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8001;

app.get('/html', (req, res) => {
  const filePath = path.join(__dirname, 'htmlpage.html');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send('Not Found');
    } else {
      res.status(200).type('text/html').send(data);
    }
  });
});

app.get('/json', (req, res) => {
  const filePath = path.join(__dirname, 'jsonfile.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send('Not Found');
    } else {
      res.status(200).type('application/json').send(data);
    }
  });
});

app.get('/uuid', (req, res) => {
  const generatedUUID = uuidv4();
  res.status(200).type('text/plain').send(generatedUUID);
});

app.get('/status/:status', (req, res) => {
  const status = parseInt(req.params.status);
  if (!isNaN(status) && status >= 100 && status <= 599) {
    res.status(status).type('text/plain').send(`Response with status code ${status}`);
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/delay/:seconds', (req, res) => {
  const seconds = parseInt(req.params.seconds);
  if (!isNaN(seconds)) {
    setTimeout(() => {
      res.status(200).type('text/plain').send(`Content is showing after ${seconds} seconds`);
    }, seconds * 1000);
  } else {
    res.status(400).send('Bad Request');
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
