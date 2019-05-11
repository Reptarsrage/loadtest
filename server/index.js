const { createServer } = require('http')
const bodyParser = require('body-parser')
const consola = require('consola')
const cors = require('cors')
const express = require('express')
const createSocketIo = require('socket.io')
const { Nuxt, Builder } = require('nuxt')

const config = require('../nuxt.config.js')
const loadTester = require('./loadTester')

const app = express()
const server = createServer(app)
const io = createSocketIo(server)

// Set up middleware
app.use(bodyParser.json())
app.use(cors())

// Set up routes
app.post('/loadtest', (req, res) => {
  const options = req.body
  const jobId = loadTester.createJob(options)

  res.status(200).json({
    options,
    jobId
  })
})

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  // Set up socket
  io.on('connection', client => {
    consola.info('Client connected...')

    client.on('start', jobId => {
      try {
        consola.info(`${jobId} started`)
        loadTester.runJob(
          jobId,
          (_error, _result, latency) => client.emit('update', latency),
          error => {
            if (error) {
              consola.error(`${jobId} encountered an error: ${error}`)
            }
            consola.info(`${jobId} run successfully`)
            client.emit('end')
          }
        )
      } catch (error) {
        consola.error('Got an error while running load test: %s', error)
        client.emit('end')
      }
    })

    client.on('disconnect', () => {
      consola.info('Client disconnected...')
    })
  })
}
start()
