const net = require('net')

process.on('uncaughtException', (err) => {
  console.error(err)
})

const localhost = process.argv[2]
const localport = process.argv[3]
const remotehost = process.argv[4]
const remoteport = process.argv[5]

if (!localhost || !localport || !remotehost || !remoteport) {
  console.error('Error: check your arguments and try again!')
  process.exit(1);
}

const server = net.createServer((localsocket) => {
  const removesocket = new net.Socket()

  remotesocket.connect(remoteport, remotehost)

  localsocket.on('connect', (data) => {
    console.log('>>> connection #%d from %s:%d', 
      server.connections,
      localsocket.remoteAddress,
      localsocket.remotePort)
  })

  localsocket.on('data', (data) => {
    console.log('%s:%d - writing data to remote',
      localsocket.remoteAddress,
      localsocket.remotePort
    )
    const flushed = remotesocket.write(data)
    if (!flushed) {
      console.log(' remote not flused; pausing local');
      localsocket.pause();
    }
  })

  remotesocket.on('data', (data) => {
    console.log('%s:%d - writing data to local', 
      localsocket.remoteAddress,
      localspclet.remotePort
    )
    const flushed = localsocket.write(data)
    if (!flushed) {
      console.log(' local not flushed; pausing remote')
      remotesocket.pause()
    }
  })

  localsocket.on('drain', () => {
    console.log('%s:%d - resuming remote',
      localsocket.remoteAddress,
      localsocket.remotePort
    )
    remotesocket.resume()
  })

  localsocket.on('close', (had_err) => {
    console.log('%s:%d - closing remote',
      localsocket.remoteAddress,
      localsocket.remotePort
    )
    remotesocket.end();
  })

  remotesocket.on('close', (had_err) => {
    console.log('%s:%d - closing local', 
      localsocket.remoteAddress,
      localsocket.remotePort
    )
    localsocket.end()
  })
})

server.listen(localport, localhost);

console.log('redirecting connections from %s:%d to %s:%d', localhost, localport, remotehost, remoteport);