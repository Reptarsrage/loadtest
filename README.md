# vue-practice-app

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn run serve
```

### Compiles and minifies for production

```sh
yarn run build
```

### Run your tests

```sh
yarn run test
```

### Lints and fixes files

```sh
yarn run lint
```

### Run your end-to-end tests

```sh
yarn run test:e2e
```

### Run your unit tests

```sh
yarn run test:unit
```

## Docker

### Build your docker image

```sh
docker build . -t vue-practice-app
# Sending build context to Docker daemon  884.7kB
# ...
# Successfully built 4b00e5ee82ae
# Successfully tagged my-app:latest
```

### Run your docker image

This build is based on the official nginx image so log redirection has already been set up and self daemonizing has been turned off. Some other default settings have been setup to improve running nginx in a docker container. See the nginx docker repo for more info.

```sh
docker run -d -p 8080:80 vue-practice-app
curl localhost:8080
# <!DOCTYPE html><html lang=en>...</html>
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
