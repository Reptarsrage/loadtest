const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require('http');
const createSocketIo = require('socket.io');

const loadTester = require('./loadTester');

const app = express();
const server = createServer(app);
const io = createSocketIo(server);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    options: {
      url: 'The URL to invoke. Mandatory.',
      concurrency: 'How many clients to start in parallel.',
      maxRequests: 'A max number of requests; after they are reached the test will end.',
      maxSeconds: 'Max number of seconds to run the tests.',
      timeout: 'Timeout for each generated request in milliseconds. Setting this to 0 disables timeout (default).',
      cookies: 'An array of cookies to send. Each cookie should be a string of the form name=value.',
      headers:
        'A map of headers. Each header should be an entry in the map with the value given as a string. If you want to have several values for a header, write a single value separated by semicolons.',
      method: 'The method to use: POST, PUT. Default: GET.',
      body:
        'The contents to send in the body of the message, for POST or PUT requests. Can be a string or an object (which will be converted to JSON).',
      contentType: 'The MIME type to use for the body. Default content type is text/plain.',
      requestsPerSecond: 'How many requests each client will send per second.',
      indexParam: 'The given string will be replaced in the final URL with a unique index.',
      secureProtocol: 'The TLS/SSL method to use. (e.g. TLSv1_method)',
      agentKeepAlive: "Use an agent with 'Connection: Keep-alive'.",
      insecure: 'Allow invalid and self-signed certificates over https.',
    },
  });
});

app.post('/', (req, res) => {
  const options = req.body;
  const jobId = loadTester.createJob(options);

  res.status(200).json({
    options,
    jobId,
  });
});

io.on('connection', client => {
  console.log('Client connected...');

  client.on('join', jobId => {
    try {
      console.log(`${jobId} started`);
      loadTester.runJob(
        jobId,
        (error, result, latency) => {
          client.emit('update', { error, result, latency });
        },
        error => {
          if (error) {
            console.error(`${jobId} encounted an error: ${error}`);
          }
          console.log(`${jobId} run successfully`);
          client.emit('end');
        }
      );
    } catch (error) {
      console.error('Got an error while running loadtest: %s', error);
      client.emit('end');
    }
  });

  client.on('disconnect', () => {
    console.log('Client disconnnected...');
  });
});

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
