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
  res.status(200).send('up');
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
        (_error, _result, latency) => {
          client.emit('update', latency);
        },
        error => {
          if (error) {
            console.error(`${jobId} encountered an error: ${error}`);
          }
          console.log(`${jobId} run successfully`);
          client.emit('end');
        }
      );
    } catch (error) {
      console.error('Got an error while running load test: %s', error);
      client.emit('end');
    }
  });

  client.on('disconnect', () => {
    console.log('Client disconnected...');
  });
});

// Constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
