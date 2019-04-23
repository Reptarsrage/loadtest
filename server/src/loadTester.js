const uuid = require('uuid');
const loadtest = require('loadtest');

const jobs = {};

const isNotNullOrEmpty = o => o && o.length > 0;
const isNotNullAndPositive = o => o && o > 0;

const sanitizeOptions = options => {
  const sanitized = {
    url: options.url, // required
  };

  if (isNotNullAndPositive(options.concurrency)) {
    sanitized.concurrency = options.concurrency;
  }

  if (isNotNullAndPositive(options.maxRequests)) {
    sanitized.maxRequests = options.maxRequests;
  }

  if (isNotNullAndPositive(options.maxSeconds)) {
    sanitized.maxSeconds = options.maxSeconds;
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

  if (isNotNullAndPositive(options.requestsPerSecond)) {
    sanitized.requestsPerSecond = options.requestsPerSecond;
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
