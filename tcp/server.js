const net = require('net')
const server = net.createServer()
const config = {
  host: '0.0.0.0',
  port: 9670
}

server.on('connection', (socket) => {
  console.log("A new client is connected!")
  socket.on('data', (data) =>{
    const code = data.toString().slice(0,3)
    switch (code) {
      case '404':
        return socket.write(`Code ${code}: Not found, used when user request for a resource or page that does not exist.\n`)
      case '500':
        return socket.write(`Code ${code}: Internal Server, used when web server has an unxpected error.\n`)
      default:
        return socket.write(`I dont know about code "${code}" mate, or I am yet to learn about it \n`)
    }
  })

  socket.on('error', (err) => {
    console.log({ error: `error in connection ${err}` })
    socket.destroy(JSON.stringify({
      error: 'connection error',
      code: 500
    }))
  socket.end()
  })
})

server.listen(config)

server.on('listening', () => {
  console.log('Server is listening on %j', config.port)
})

server.on('error', (err) => {
  console.log({ err: 'Server error ${err}' })
})

module.exports = server