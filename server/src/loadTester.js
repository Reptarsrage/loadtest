const uuid = require('uuid');
const loadtest = require('loadtest');

const jobs = {};

const isNotNullOrEmpty = o => o && o.length > 0;
const isNotNullAndPositive = o => o && o > 0;

/**
 *  url: 'The URL to invoke. Mandatory.',
 *  concurrency: 'How many clients to start in parallel.',
 *  maxRequests: 'A max number of requests; after they are reached the test will end.',
 *  maxSeconds: 'Max number of seconds to run the tests.',
 *  timeout: 'Timeout for each generated request in milliseconds. Setting this to 0 disables timeout (default).',
 *  cookies: 'An array of cookies to send. Each cookie should be a string of the form name=value.',
 *  headers:
 *    'A map of headers. Each header should be an entry in the map with the value given as a string. If you want to have several values for a header, write a single value separated by semicolons.',
 *  method: 'The method to use: POST, PUT. Default: GET.',
 *  body:
 *    'The contents to send in the body of the message, for POST or PUT requests. Can be a string or an object (which will be converted to JSON).',
 *  contentType: 'The MIME type to use for the body. Default content type is text/plain.',
 *  requestsPerSecond: 'How many requests each client will send per second.',
 *  indexParam: 'The given string will be replaced in the final URL with a unique index.',
 *  secureProtocol: 'The TLS/SSL method to use. (e.g. TLSv1_method)',
 *  agentKeepAlive: "Use an agent with 'Connection: Keep-alive'.",
 *  insecure: 'Allow invalid and self-signed certificates over https.',
 */
const sanitizeOptions = options => {
  const sanitized = {
    url: options.url, // required
  };

  if (isNotNullAndPositive(options.concurrency)) {
    sanitized.concurrency = Math.min(1000, options.concurrency);
  }

  if (isNotNullAndPositive(options.maxRequests)) {
    sanitized.maxRequests = Math.min(1000000, options.maxRequests);
  }

  if (isNotNullAndPositive(options.maxSeconds)) {
    sanitized.maxSeconds = Math.min(3600, options.maxSeconds);
  } else if (!('maxRequests' in sanitized)) {
    options.maxSeconds = 120; // make sure job ends
  }

  if (isNotNullAndPositive(options.timeout)) {
    sanitized.timeout = options.timeout;
  }

  if (isNotNullOrEmpty(options.cookies)) {
    sanitized.cookies = options.cookies;
  }

  if (options.headers && Object.keys(options.headers).length > 0) {
    sanitized.headers = options.headers;
  }

  if (isNotNullOrEmpty(options.method)) {
    sanitized.method = options.method;
  }

  if (isNotNullOrEmpty(options.body)) {
    sanitized.body = options.body;
  }

  if (isNotNullOrEmpty(options.contentType)) {
    sanitized.contentType = options.contentType;
  }

  if (isNotNullAndPositive(options.requestsPerSecond) && options.requestsPerSecond < 5000) {
    sanitized.requestsPerSecond = options.requestsPerSecond;
  } else if (isNotNullAndPositive(options.requestsPerSecond)) {
    options.requestsPerSecond = 5000;
  }

  if (isNotNullOrEmpty(options.indexParam)) {
    sanitized.indexParam = options.indexParam;
  }

  if (isNotNullOrEmpty(options.secureProtocol)) {
    sanitized.secureProtocol = options.secureProtocol;
  }

  if ('agentKeepAlive' in options) {
    sanitized.agentKeepAlive = options.agentKeepAlive;
  }

  if ('insecure' in options) {
    sanitized.insecure = options.insecure;
  }

  return sanitized;
};

const createJob = options => {
  const id = uuid.v4();
  jobs[id] = { options: sanitizeOptions(options) };
  return id;
};

const runJob = (jobId, statusCallback, finishedCallback) => {
  if (!(jobId in jobs)) {
    throw new Error('Job not found');
  }

  const { options } = jobs[jobId];
  loadtest.loadTest({ ...options, statusCallback }, finishedCallback);
};

module.exports = {
  createJob,
  runJob,
};
