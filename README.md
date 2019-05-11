# Load Test

Runs configurable load tests against web API endpoints

[![Travis CI](https://travis-ci.org/Reptarsrage/loadtest.svg?branch=master)](https://travis-ci.org/Reptarsrage/loadtest)
[![CodeCov](https://codecov.io/gh/Reptarsrage/loadtest/branch/master/graph/badge.svg)](https://codecov.io/gh/Reptarsrage/loadtest)

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Docker

```bash
# Build a nuxt-docker image
$ docker build -t loadtest .

# Run the container for the nuxt-docker image with a exposed port 3000
$ docker run --rm -it -p 3000:3000 loadtest
```
