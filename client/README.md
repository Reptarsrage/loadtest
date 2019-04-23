# LoadTest Client

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

Access running app at [http://localhost:8080/](http://localhost:8080/)

### Compiles and minifies for production

```sh
yarn build
```

### Run your tests

```sh
yarn test
```

### Lints and fixes files

```sh
yarn lint
```

### Run your end-to-end tests

```sh
yarn test:e2e
```

### Run your unit tests

```sh
yarn test:unit
```

## Docker

### Build your docker image

```sh
docker build . -t loadtest-client
```

### Run your docker image

This build is based on the official nginx image so log redirection has already been set up and self daemonizing has been turned off. Some other default settings have been setup to improve running nginx in a docker container. See the nginx docker repo for more info.

```sh
docker run -d -p 8080:80 loadtest-client
```

Access running app at [http://localhost:8080/](http://localhost:8080/)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
