# LoadTest Server

## Project setup

```sh
yarn install
```

### Run development server

```sh
yarn dev
```

Access running app at [http://localhost:3000/](http://localhost:3000/)

### Run production server

```sh
yarn start
```

Access running app at [http://0.0.0.0:8080/](http://0.0.0.0:8080/)

## Docker

### Build your docker image

```sh
docker build . -t loadtest-server
```

### Run your docker image

This build is based on the official nginx image so log redirection has already been set up and self daemonizing has been turned off. Some other default settings have been setup to improve running nginx in a docker container. See the nginx docker repo for more info.

```sh
docker run -d -p 3000:3000 loadtest-server
```

Access running app at [http://localhost:3000/](http://localhost:3000/)
