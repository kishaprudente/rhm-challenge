const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

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

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
