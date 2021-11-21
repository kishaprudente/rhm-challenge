const express = require('express')
const next = require('next')
const fs = require('fs')
const https = require('https')
const http = require('http');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const ports = {
  http: 3000,
  https: 3001,
}

const httpsOptions = {
  key: fs.readFileSync("./certs/localhost.key"),
  cert: fs.readFileSync("./certs/localhost.crt"),
};

const guests = [];

app.prepare().then(() => {
  const server = express()
  server.use(express.urlencoded({extended: true}));
  server.use(express.json())

  server.post('/api/guestbook', (req, res, next) => {
    const { body } = req;
    guests.push(body);
    res.status(200).send({ message: 'Guest Added!' });
  })

  server.get('/api/guestbook', (req, res, next) => {
    res.json(guests);
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // server.listen(3000, (err) => {
  //   if (err) throw err
  //   console.log('> Ready on http://localhost:3000')
  // })
  http.createServer(server).listen(ports.http, () => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
  https.createServer(httpsOptions, server).listen(ports.https, () => {
    if (err) throw err
    console.log('> Ready on https://localhost:3000')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
