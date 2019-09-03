const express = require('express')
const EventEmitter = require('events').EventEmitter

const app = express()
app.use(express.static('public'))

const eventEmitter = new EventEmitter()

app.get(('/:html'), async (req, res) => {
  const code = req.query.statusCode
  let status = false
  eventEmitter.emit('connection', req, res)

  setTimeout(() => {
    if(status) return true
    eventEmitter.removeAllListeners(code)
    res.send({ error: 'timedout' })
  }, 2000)
})

app.listen(8090, '0.0.0.0', () => {
  console.log('Server is listening on http://localhost:8090')
  eventEmitter.on('connection', (req, res) => {
    status = true
    res.sendFile(req.params.html, { root: __dirname })
    eventEmitter.removeAllListeners('connection')
  })
})
